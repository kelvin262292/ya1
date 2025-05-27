import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Lấy tất cả sản phẩm
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Lấy sản phẩm thất bại' }, { status: 500 });
  }
}

// Tạo sản phẩm mới
export async function POST(request: Request) {
  try {
    const { name, description, price, stock } = await request.json();
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Tạo sản phẩm thất bại' }, { status: 500 });
  }
}

// Lưu ý: PUT và DELETE cho sản phẩm cụ thể sẽ được xử lý trong /api/admin/products/[id]/route.ts