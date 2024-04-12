import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const walmart = await prisma.store.create({
    data: {
      name: "Walmart",
      address: "123 Walmart St",
      city: "Edmonton",
    },
  });
  const safeway = await prisma.store.create({
    data: {
      name: "Safeway",
      address: "456 Safeway St",
      city: "Edmonton",
    },
  });

  console.log({ walmart, safeway });
}

async function items() {
  await prisma.item.create({
    data: {
      name: "Milk",
      stores: {
        create: [
          {
            storeid: "cluw0f4v20000ycl1y3m89nfq",
            price: 2.99,
            priceHistory: {
              create: [
                {
                  price: 5.99,
                },
              ],
            },
          },
        ],
      },
    },
  }),
    await prisma.item.create({
      data: {
        name: "Eggs",
        stores: {
          create: [
            {
              storeid: "cluw0f4v20000ycl1y3m89nfq",
              price: 2.99,
              priceHistory: {
                create: [
                  {
                    price: 3.99,
                  },
                ],
              },
            },
          ],
        },
      },
    });
  await prisma.item.create({
    data: {
      name: "Bread",
      stores: {
        create: [
          {
            storeid: "cluw0f4v20000ycl1y3m89nfq",
            price: 2.99,
            priceHistory: {
              create: [
                {
                  price: 2.99,
                },
              ],
            },
          },
        ],
      },
    },
  });
}

async function items2() {
  const storeId = "cluw0f4v20000ycl1y3m89nfq";

  // Creating an item "Milk" with price history for one store
  await prisma.item.create({
    data: {
      name: "Soy Milk",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 1.99,
            priceHistory: {
              create: [
                {
                  price: 1.99,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Creating an item "Eggs" with price history for one store
  await prisma.item.create({
    data: {
      name: "Bread",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 3.29,
            priceHistory: {
              create: [
                {
                  price: 3.29,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Creating an item "Apples" with price history for one store
  await prisma.item.create({
    data: {
      name: "Bananas",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 0.99,
            priceHistory: {
              create: [
                {
                  price: 0.99,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Creating an item "Bread" with price history for one store
  await prisma.item.create({
    data: {
      name: "Bread",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 2.99,
            priceHistory: {
              create: [
                {
                  price: 2.99,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Creating an item "Cheese" with price history for one store
  await prisma.item.create({
    data: {
      name: "Cheese",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 4.49,
            priceHistory: {
              create: [
                {
                  price: 4.49,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Creating an item "Orange Juice" with price history for one store
  await prisma.item.create({
    data: {
      name: "Orange Juice",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 3.79,
            priceHistory: {
              create: [
                {
                  price: 3.79,
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Oranges",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 1.49,
            priceHistory: {
              create: [
                {
                  price: 1.49,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Creating an item "Potatoes" with price history for one store
  await prisma.item.create({
    data: {
      name: "Potatoes",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 2.29,
            priceHistory: {
              create: [
                {
                  price: 2.29,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Creating an item "Tomatoes" with price history for one store
  await prisma.item.create({
    data: {
      name: "Tomatoes",
      stores: {
        create: [
          {
            storeid: storeId,
            price: 1.99,
            priceHistory: {
              create: [
                {
                  price: 1.99,
                },
              ],
            },
          },
        ],
      },
    },
  });
}

items2()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
