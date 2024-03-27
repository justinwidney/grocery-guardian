import { PrismaClient } from "@prisma/client";

//
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.RLS_DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
