import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Lấy thông tin đơn hàng theo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);
    
    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: 'ID đơn hàng không hợp lệ' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true
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
                imageUrl: true,
                category: true
              }
            }
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
    return NextResponse.json(
      { error: 'Lấy thông tin đơn hàng thất bại' },
      { status: 500 }
    );
  }
}

// Cập nhật đơn hàng theo ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);
    
    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: 'ID đơn hàng không hợp lệ' },
        { status: 400 }
      );
    }

    const { status, shippingAddress, notes, trackingNumber } = await request.json();

    // Validation trạng thái
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Trạng thái đơn hàng không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra đơn hàng tồn tại
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng' },
        { status: 404 }
      );
    }

    // Xử lý logic đặc biệt khi hủy đơn hàng
    if (status === 'cancelled' && existingOrder.status !== 'cancelled') {
      // Hoàn trả stock cho các sản phẩm
      await prisma.$transaction(async (tx) => {
        for (const item of existingOrder.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              }
            }
          });
        }

        // Cập nhật đơn hàng
        await tx.order.update({
          where: { id: orderId },
          data: {
            status,
            shippingAddress,
            notes,
            trackingNumber,
            updatedAt: new Date()
          }
        });
      });
    } else {
      // Cập nhật bình thường
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status,
          shippingAddress,
          notes,
          trackingNumber,
          updatedAt: new Date()
        }
      });
    }

    // Lấy đơn hàng đã cập nhật
    const updatedOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true
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
                imageUrl: true,
                category: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Lỗi khi cập nhật đơn hàng:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng để cập nhật' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Cập nhật đơn hàng thất bại' },
      { status: 500 }
    );
  }
}

// Xóa đơn hàng theo ID (chỉ cho admin)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = parseInt(params.id);
    
    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: 'ID đơn hàng không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra đơn hàng tồn tại
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng để xóa' },
        { status: 404 }
      );
    }

    // Chỉ cho phép xóa đơn hàng đã hủy hoặc pending
    if (!['cancelled', 'pending'].includes(existingOrder.status)) {
      return NextResponse.json(
        { error: 'Chỉ có thể xóa đơn hàng đã hủy hoặc đang chờ xử lý' },
        { status: 400 }
      );
    }

    // Xóa đơn hàng và hoàn trả stock nếu cần
    await prisma.$transaction(async (tx) => {
      // Nếu đơn hàng chưa hủy, hoàn trả stock
      if (existingOrder.status === 'pending') {
        for (const item of existingOrder.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              }
            }
          });
        }
      }

      // Xóa order items trước
      await tx.orderItem.deleteMany({
        where: { orderId: orderId }
      });

      // Xóa đơn hàng
      await tx.order.delete({
        where: { id: orderId }
      });
    });

    return NextResponse.json(
      { message: 'Xóa đơn hàng thành công' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng để xóa' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Xóa đơn hàng thất bại' },
      { status: 500 }
    );
  }
}