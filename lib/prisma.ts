import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Optional: If you are running this in a Next.js app, avoid creating multiple Prisma Client instances in development.
const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') {
  // Only assign it in development to prevent multiple instances
  globalForPrisma.prisma = prisma
}

export default prisma
