import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Lấy dữ liệu analytics tổng quan
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Tính toán khoảng thời gian
    let dateFilter: any = {};
    
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      };
    } else {
      const days = parseInt(period);
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      
      dateFilter = {
        createdAt: {
          gte: fromDate
        }
      };
    }

    // Lấy dữ liệu song song
    const [totalStats, recentOrders, topProducts, salesByDay, customerStats] = await Promise.all([
      // Thống kê tổng quan
      getTotalStats(dateFilter),
      
      // Đơn hàng gần đây
      prisma.order.findMany({
        where: dateFilter,
        include: {
          customer: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      }),
      
      // Sản phẩm bán chạy
      getTopProducts(dateFilter),
      
      // Doanh thu theo ngày
      getSalesByDay(dateFilter),
      
      // Thống kê khách hàng
      getCustomerStats(dateFilter)
    ]);

    return NextResponse.json({
      totalStats,
      recentOrders,
      topProducts,
      salesByDay,
      customerStats,
      period: {
        days: parseInt(period),
        startDate: startDate || dateFilter.createdAt?.gte?.toISOString(),
        endDate: endDate || new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu analytics:', error);
    return NextResponse.json(
      { error: 'Lấy dữ liệu analytics thất bại' },
      { status: 500 }
    );
  }
}

// Hàm helper: Lấy thống kê tổng quan
async function getTotalStats(dateFilter: any) {
  const [orders, products, customers, revenue] = await Promise.all([
    // Tổng số đơn hàng
    prisma.order.count({
      where: dateFilter
    }),
    
    // Tổng số sản phẩm
    prisma.product.count(),
    
    // Tổng số khách hàng mới
    prisma.customer.count({
      where: dateFilter
    }),
    
    // Tổng doanh thu
    prisma.order.aggregate({
      where: {
        ...dateFilter,
        status: {
          not: 'cancelled'
        }
      },
      _sum: {
        total: true
      }
    })
  ]);

  // Thống kê so với kỳ trước
  const previousPeriodFilter = getPreviousPeriodFilter(dateFilter);
  const [prevOrders, prevCustomers, prevRevenue] = await Promise.all([
    prisma.order.count({
      where: previousPeriodFilter
    }),
    
    prisma.customer.count({
      where: previousPeriodFilter
    }),
    
    prisma.order.aggregate({
      where: {
        ...previousPeriodFilter,
        status: {
          not: 'cancelled'
        }
      },
      _sum: {
        total: true
      }
    })
  ]);

  return {
    totalOrders: orders,
    totalProducts: products,
    totalCustomers: customers,
    totalRevenue: revenue._sum.total || 0,
    growth: {
      orders: calculateGrowth(orders, prevOrders),
      customers: calculateGrowth(customers, prevCustomers),
      revenue: calculateGrowth(revenue._sum.total || 0, prevRevenue._sum.total || 0)
    }
  };
}

// Hàm helper: Lấy sản phẩm bán chạy
async function getTopProducts(dateFilter: any) {
  const topProducts = await prisma.orderItem.groupBy({
    by: ['productId'],
    where: {
      order: {
        ...dateFilter,
        status: {
          not: 'cancelled'
        }
      }
    },
    _sum: {
      quantity: true
    },
    _count: {
      productId: true
    },
    orderBy: {
      _sum: {
        quantity: 'desc'
      }
    },
    take: 10
  });

  // Lấy thông tin chi tiết sản phẩm
  const productsWithDetails = await Promise.all(
    topProducts.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          category: true
        }
      });
      
      return {
        ...product,
        totalSold: item._sum.quantity || 0,
        orderCount: item._count.productId
      };
    })
  );

  return productsWithDetails;
}

// Hàm helper: Lấy doanh thu theo ngày
async function getSalesByDay(dateFilter: any) {
  const salesData = await prisma.$queryRaw`
    SELECT 
      DATE("createdAt") as date,
      COUNT(*) as orders,
      SUM("total") as revenue
    FROM "Order"
    WHERE "createdAt" >= ${dateFilter.createdAt?.gte || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
      AND "createdAt" <= ${dateFilter.createdAt?.lte || new Date()}
      AND "status" != 'cancelled'
    GROUP BY DATE("createdAt")
    ORDER BY DATE("createdAt")
  `;

  return salesData;
}

// Hàm helper: Lấy thống kê khách hàng
async function getCustomerStats(dateFilter: any) {
  const [newCustomers, returningCustomers, topCustomers] = await Promise.all([
    // Khách hàng mới
    prisma.customer.count({
      where: dateFilter
    }),
    
    // Khách hàng quay lại (có > 1 đơn hàng)
    prisma.customer.count({
      where: {
        orders: {
          some: dateFilter
        },
        _count: {
          orders: {
            gt: 1
          }
        }
      }
    }),
    
    // Top khách hàng theo doanh thu
    getTopCustomers(dateFilter)
  ]);

  return {
    newCustomers,
    returningCustomers,
    topCustomers
  };
}

// Hàm helper: Lấy top khách hàng
async function getTopCustomers(dateFilter: any) {
  const topCustomers = await prisma.order.groupBy({
    by: ['customerId'],
    where: {
      ...dateFilter,
      status: {
        not: 'cancelled'
      }
    },
    _sum: {
      total: true
    },
    _count: {
      customerId: true
    },
    orderBy: {
      _sum: {
        total: 'desc'
      }
    },
    take: 10
  });

  // Lấy thông tin chi tiết khách hàng
  const customersWithDetails = await Promise.all(
    topCustomers.map(async (item) => {
      const customer = await prisma.customer.findUnique({
        where: { id: item.customerId },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
      
      return {
        ...customer,
        totalSpent: item._sum.total || 0,
        orderCount: item._count.customerId
      };
    })
  );

  return customersWithDetails;
}

// Hàm helper: Tính toán kỳ trước
function getPreviousPeriodFilter(dateFilter: any) {
  if (!dateFilter.createdAt?.gte) return {};
  
  const currentStart = new Date(dateFilter.createdAt.gte);
  const currentEnd = dateFilter.createdAt?.lte ? new Date(dateFilter.createdAt.lte) : new Date();
  
  const periodLength = currentEnd.getTime() - currentStart.getTime();
  const previousStart = new Date(currentStart.getTime() - periodLength);
  const previousEnd = new Date(currentStart.getTime());
  
  return {
    createdAt: {
      gte: previousStart,
      lte: previousEnd
    }
  };
}

// Hàm helper: Tính toán tỷ lệ tăng trưởng
function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}