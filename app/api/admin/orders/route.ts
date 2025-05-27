import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Lấy tất cả đơn hàng với thông tin chi tiết
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Xây dựng điều kiện where
    const where: any = {};
    
    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        {
          customer: {
            user: {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
              ]
            }
          }
        },
        {
          id: isNaN(parseInt(search)) ? undefined : parseInt(search)
        }
      ].filter(Boolean);
    }

    // Lấy đơn hàng với pagination
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          customer: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          },
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
        },
        skip,
        take: limit
      }),
      prisma.order.count({ where })
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    return NextResponse.json(
      { error: 'Lấy danh sách đơn hàng thất bại' },
      { status: 500 }
    );
  }
}

// Tạo đơn hàng mới (cho admin)
export async function POST(request: Request) {
  try {
    const { customerId, items, shippingAddress, notes } = await request.json();

    // Validation
    if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Kiểm tra customer tồn tại
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Không tìm thấy khách hàng' },
        { status: 404 }
      );
    }

    // Kiểm tra và tính toán tổng tiền
    let total = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        return NextResponse.json(
          { error: `Không tìm thấy sản phẩm với ID: ${item.productId}` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Sản phẩm ${product.name} không đủ số lượng trong kho` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      validatedItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Tạo đơn hàng trong transaction
    const order = await prisma.$transaction(async (tx) => {
      // Tạo đơn hàng
      const newOrder = await tx.order.create({
        data: {
          customerId,
          total,
          status: 'pending',
          shippingAddress: shippingAddress || customer.address,
          notes
        }
      });

      // Tạo các item của đơn hàng
      await tx.orderItem.createMany({
        data: validatedItems.map(item => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      });

      // Cập nhật stock của sản phẩm
      for (const item of validatedItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      return newOrder;
    });

    // Lấy đơn hàng với thông tin đầy đủ
    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
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
      }
    });

    return NextResponse.json(fullOrder, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return NextResponse.json(
      { error: 'Tạo đơn hàng thất bại' },
      { status: 500 }
    );
  }
}