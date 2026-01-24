/**
 * tRPC API Route Handler
 *
 * This file exposes the tRPC API for the application using
 * Next.js App Router.
 *
 * It handles all tRPC procedure calls under `/api/trpc/*`.
 *
 * Example:
 * - POST /api/trpc/user.getById
 * - POST /api/trpc/workflow.create
 *
 * Note:
 * - This file only handles tRPC routes.
 * - It does NOT handle auth routes (`/api/auth/*`)
 *   or regular REST APIs.
 */


import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
export { handler as GET, handler as POST };