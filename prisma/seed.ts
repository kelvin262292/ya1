import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed User
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      customer: {
        create: {
          address: '123 Main St',
          phone: '0123456789'
        }
      }
    }
  });

  // Seed Admin
  const admin = await prisma.admin.create({
    data: {
      user: {
        create: {
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin'
        }
      }
    }
  });

  // Seed Product
  const product = await prisma.product.create({
    data: {
      name: 'Sample Product',
      description: 'A sample product',
      price: 99.99,
      stock: 100
    }
  });

  // Seed Order
  const order = await prisma.order.create({
    data: {
      customerId: user.customer?.id!,
      total: 99.99,
      status: 'completed',
      orderItems: {
        create: {
          productId: product.id,
          quantity: 1,
          price: product.price
        }
      }
    }
  });

  console.log({
    user: user.email,
    admin: admin.user.email,
    product: product.name,
    order: order.id
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });