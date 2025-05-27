import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Lấy tất cả khách hàng với thông tin chi tiết
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Xây dựng điều kiện where
    const where: any = {};
    
    if (search) {
      where.user = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    // Xây dựng điều kiện sắp xếp
    const orderBy: any = {};
    if (sortBy === 'name' || sortBy === 'email') {
      orderBy.user = { [sortBy]: sortOrder };
    } else {
      orderBy[sortBy] = sortOrder;
    }

    // Lấy khách hàng với pagination
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              createdAt: true
            }
          },
          orders: {
            select: {
              id: true,
              total: true,
              status: true,
              createdAt: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          _count: {
            select: {
              orders: true
            }
          }
        },
        orderBy,
        skip,
        take: limit
      }),
      prisma.customer.count({ where })
    ]);

    // Tính toán thống kê cho mỗi khách hàng
    const customersWithStats = customers.map(customer => {
      const totalSpent = customer.orders.reduce((sum, order) => {
        return sum + (order.status !== 'cancelled' ? order.total : 0);
      }, 0);
      
      const completedOrders = customer.orders.filter(order => 
        order.status === 'delivered'
      ).length;

      const lastOrderDate = customer.orders.length > 0 
        ? customer.orders[0].createdAt 
        : null;

      return {
        ...customer,
        stats: {
          totalOrders: customer._count.orders,
          completedOrders,
          totalSpent,
          lastOrderDate
        }
      };
    });

    return NextResponse.json({
      customers: customersWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khách hàng:', error);
    return NextResponse.json(
      { error: 'Lấy danh sách khách hàng thất bại' },
      { status: 500 }
    );
  }
}

// Tạo khách hàng mới (cho admin)
export async function POST(request: Request) {
  try {
    const { name, email, phone, address, dateOfBirth } = await request.json();

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Tên và email là bắt buộc' },
        { status: 400 }
      );
    }

    // Kiểm tra email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra email đã tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    // Tạo user và customer trong transaction
    const result = await prisma.$transaction(async (tx) => {
      // Tạo user
      const user = await tx.user.create({
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim(),
          role: 'customer'
        }
      });

      // Tạo customer
      const customer = await tx.customer.create({
        data: {
          userId: user.id,
          address: address?.trim(),
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
        }
      });

      return { user, customer };
    });

    // Lấy thông tin đầy đủ của khách hàng vừa tạo
    const fullCustomer = await prisma.customer.findUnique({
      where: { id: result.customer.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true
          }
        },
        _count: {
          select: {
            orders: true
          }
        }
      }
    });

    return NextResponse.json(fullCustomer, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo khách hàng:', error);
    
    // Xử lý lỗi Prisma specific
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Tạo khách hàng thất bại' },
      { status: 500 }
    );
  }
}