import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
//dodali smo prisma u ono declare global gore

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
export default prismadb;
