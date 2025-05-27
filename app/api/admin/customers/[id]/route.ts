import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Lấy thông tin khách hàng theo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);
    
    if (isNaN(customerId)) {
      return NextResponse.json(
        { error: 'ID khách hàng không hợp lệ' },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
            updatedAt: true
          }
        },
        orders: {
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    price: true,
                    imageUrl: true
                  }
                }
              }
            }
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
      }
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Không tìm thấy khách hàng' },
        { status: 404 }
      );
    }

    // Tính toán thống kê
    const totalSpent = customer.orders.reduce((sum, order) => {
      return sum + (order.status !== 'cancelled' ? order.total : 0);
    }, 0);
    
    const completedOrders = customer.orders.filter(order => 
      order.status === 'delivered'
    ).length;

    const pendingOrders = customer.orders.filter(order => 
      ['pending', 'confirmed', 'processing', 'shipped'].includes(order.status)
    ).length;

    const cancelledOrders = customer.orders.filter(order => 
      order.status === 'cancelled'
    ).length;

    const lastOrderDate = customer.orders.length > 0 
      ? customer.orders[0].createdAt 
      : null;

    const averageOrderValue = customer.orders.length > 0 
      ? totalSpent / customer.orders.filter(order => order.status !== 'cancelled').length 
      : 0;

    // Sản phẩm được mua nhiều nhất
    const productPurchases = new Map();
    customer.orders.forEach(order => {
      if (order.status !== 'cancelled') {
        order.items.forEach(item => {
          const productId = item.product.id;
          const current = productPurchases.get(productId) || {
            product: item.product,
            totalQuantity: 0,
            totalSpent: 0
          };
          current.totalQuantity += item.quantity;
          current.totalSpent += item.price * item.quantity;
          productPurchases.set(productId, current);
        });
      }
    });

    const favoriteProducts = Array.from(productPurchases.values())
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 5);

    const customerWithStats = {
      ...customer,
      stats: {
        totalOrders: customer._count.orders,
        completedOrders,
        pendingOrders,
        cancelledOrders,
        totalSpent,
        averageOrderValue,
        lastOrderDate,
        favoriteProducts
      }
    };

    return NextResponse.json(customerWithStats);
  } catch (error) {
    console.error('Lỗi khi lấy khách hàng:', error);
    return NextResponse.json(
      { error: 'Lấy thông tin khách hàng thất bại' },
      { status: 500 }
    );
  }
}

// Cập nhật khách hàng theo ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);
    
    if (isNaN(customerId)) {
      return NextResponse.json(
        { error: 'ID khách hàng không hợp lệ' },
        { status: 400 }
      );
    }

    const { name, email, phone, address, dateOfBirth, notes } = await request.json();

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

    // Kiểm tra khách hàng tồn tại
    const existingCustomer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        user: true
      }
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: 'Không tìm thấy khách hàng' },
        { status: 404 }
      );
    }

    // Kiểm tra email đã được sử dụng bởi user khác
    if (email !== existingCustomer.user.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() }
      });

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email đã được sử dụng bởi tài khoản khác' },
          { status: 400 }
        );
      }
    }

    // Cập nhật trong transaction
    const result = await prisma.$transaction(async (tx) => {
      // Cập nhật user
      await tx.user.update({
        where: { id: existingCustomer.userId },
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim(),
          updatedAt: new Date()
        }
      });

      // Cập nhật customer
      const updatedCustomer = await tx.customer.update({
        where: { id: customerId },
        data: {
          address: address?.trim(),
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          notes: notes?.trim(),
          updatedAt: new Date()
        }
      });

      return updatedCustomer;
    });

    // Lấy thông tin đầy đủ của khách hàng đã cập nhật
    const fullCustomer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
            updatedAt: true
          }
        },
        _count: {
          select: {
            orders: true
          }
        }
      }
    });

    return NextResponse.json(fullCustomer);
  } catch (error) {
    console.error('Lỗi khi cập nhật khách hàng:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Không tìm thấy khách hàng để cập nhật' },
        { status: 404 }
      );
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Cập nhật khách hàng thất bại' },
      { status: 500 }
    );
  }
}

// Xóa khách hàng theo ID (soft delete)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);
    
    if (isNaN(customerId)) {
      return NextResponse.json(
        { error: 'ID khách hàng không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra khách hàng tồn tại
    const existingCustomer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        orders: {
          where: {
            status: {
              in: ['pending', 'confirmed', 'processing', 'shipped']
            }
          }
        }
      }
    });

    if (!existingCustomer) {
      return NextResponse.json(
        { error: 'Không tìm thấy khách hàng để xóa' },
        { status: 404 }
      );
    }

    // Kiểm tra có đơn hàng đang xử lý không
    if (existingCustomer.orders.length > 0) {
      return NextResponse.json(
        { error: 'Không thể xóa khách hàng có đơn hàng đang xử lý' },
        { status: 400 }
      );
    }

    // Soft delete: đánh dấu là đã xóa thay vì xóa thật
    await prisma.$transaction(async (tx) => {
      // Cập nhật user (soft delete)
      await tx.user.update({
        where: { id: existingCustomer.userId },
        data: {
          email: `deleted_${Date.now()}_${existingCustomer.user?.email}`,
          deletedAt: new Date()
        }
      });

      // Cập nhật customer (soft delete)
      await tx.customer.update({
        where: { id: customerId },
        data: {
          deletedAt: new Date()
        }
      });
    });

    return NextResponse.json(
      { message: 'Xóa khách hàng thành công' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi khi xóa khách hàng:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Không tìm thấy khách hàng để xóa' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Xóa khách hàng thất bại' },
      { status: 500 }
    );
  }
}