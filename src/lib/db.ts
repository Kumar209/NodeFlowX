/**
 * Purpose:
 * --------
 * Creates and exports a SINGLE shared PrismaClient instance.
 *
 * Why this is needed:
 * -------------------
 * In Next.js development mode, the app reloads modules frequently.
 * Creating a new PrismaClient on every reload can open too many
 * database connections and crash the app.
 *
 * To prevent that, we store PrismaClient on the global object
 * and reuse it across reloads.
 */

import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'


/**
 * Extend the global object to safely store PrismaClient.
 * This avoids creating multiple instances during hot reloads.
 */
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Prisma PostgreSQL adapter configuration.
 * Uses DATABASE_URL from environment variables.
 */
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

/**
 * Create PrismaClient instance:
 * - Reuse existing client if already created (from global)
 * - Otherwise, create a new PrismaClient with the PostgreSQL adapter
 */
const prisma = globalForPrisma.prisma || new PrismaClient({adapter})

/**
 * In development mode, store PrismaClient on the global object
 * so it persists across module reloads.
 *
 * In production, a new instance is created per server start,
 * which is the recommended behavior.
 */
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}


export default prisma
