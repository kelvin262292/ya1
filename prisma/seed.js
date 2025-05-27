const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Cleared existing data');

  // Seed User
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user'
    }
  });

  // Seed Customer
  const customer = await prisma.customer.create({
    data: {
      userId: user.id,
      address: '123 Main St',
      phone: '0123456789'
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
      customerId: customer.id,
      total: 99.99,
      status: 'completed',
      orderItems: {
        create: {
          productId: product.id,
          quantity: 1,
          price: 99.99
        }
      }
    }
  });

  console.log('Seed data created successfully!');
  console.log({ user, customer, admin, product, order });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });