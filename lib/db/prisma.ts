import { PrismaClient } from "@prisma/client";

// Extend the NodeJS global type
declare global {
  // This must be a var - let/const won't work here
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize the prisma client
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma }; 