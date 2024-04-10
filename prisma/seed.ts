import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.store.create({
    data: {
      name: "Walmart",
      address: "123 Walmart St",
      city: "Edmonton",
    },
  });
  await prisma.store.create({
    data: {
      name: "Safeway",
      address: "456 Safeway St",
      city: "Edmonton",
    },
  });
}

async function items() {
  await prisma.item.create({
    data: {
      name: "Milk",
      stores: {
        create: [
          {
            storeid: "cluu5e6bq0001oayk746hzcvp",
            price: 2.99,
            priceid: "cluu5e6bq0001oayk746hzcvd",
          },
        ],
      },
    },
  }),
    await prisma.item.create({
      data: {
        name: "Eggs",
      },
    });
  await prisma.item.create({
    data: {
      name: "Bread",
    },
  });
}

items()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
