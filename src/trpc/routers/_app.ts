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
import { createTRPCRouter, premiumProcedure, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({

  testAi: premiumProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai"
    });

      return { success: true, message: "Gemini job initiated." };
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
      return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",  // this is event name mentioned in function of inngest
      data: {
        email: "developer@gmail.com",
      },
    });

    return { success: true, message: "Workflow job initiated." };
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;