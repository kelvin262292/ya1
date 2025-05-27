import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Lấy thông tin sản phẩm theo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID sản phẩm không hợp lệ' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    return NextResponse.json(
      { error: 'Lấy thông tin sản phẩm thất bại' },
      { status: 500 }
    );
  }
}

// Cập nhật sản phẩm theo ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID sản phẩm không hợp lệ' },
        { status: 400 }
      );
    }

    const { name, description, price, stock, category, imageUrl } = await request.json();

    // Validation cơ bản
    if (!name || !description || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    if (price < 0 || stock < 0) {
      return NextResponse.json(
        { error: 'Giá và số lượng không được âm' },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        stock: parseInt(stock),
        category: category?.trim(),
        imageUrl: imageUrl?.trim(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    
    // Xử lý lỗi Prisma specific
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm để cập nhật' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Cập nhật sản phẩm thất bại' },
      { status: 500 }
    );
  }
}

// Xóa sản phẩm theo ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID sản phẩm không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm để xóa' },
        { status: 404 }
      );
    }

    // Kiểm tra xem sản phẩm có đang được sử dụng trong đơn hàng không
    const orderItems = await prisma.orderItem.findFirst({
      where: { productId: productId }
    });

    if (orderItems) {
      return NextResponse.json(
        { error: 'Không thể xóa sản phẩm đang có trong đơn hàng' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id: productId }
    });

    return NextResponse.json(
      { message: 'Xóa sản phẩm thành công' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    
    // Xử lý lỗi Prisma specific
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm để xóa' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Xóa sản phẩm thất bại' },
      { status: 500 }
    );
  }
}