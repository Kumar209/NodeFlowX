/**
 * tRPC App Router
 *
 * This file defines the main tRPC router for the application.
 * All API procedures are registered here or composed from
 * smaller routers.
 *
 * It uses protected procedures to ensure only authenticated
 * users can access certain endpoints.
 *
 * Example:
 * - trpc.getUsers.useQuery()
 *
 * Benefit:
 * - Type-safe backend APIs
 * - Centralized access control
 * - Shared types between server and client
 */

import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure
    .query(({ ctx }) => {
      return prisma.user.findMany({
        where: {
          id : ctx.auth.user.id,
        }
      });
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;