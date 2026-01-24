/**
 * tRPC Server Helpers
 *
 * This file provides server-only utilities for using tRPC
 * outside of React components.
 *
 * `trpc` is used in Server Components and supports React Query
 * features like caching and suspense.
 *
 * `caller` is used in non-React server code (server actions,
 * cron jobs, scripts) to call tRPC procedures directly
 * without hooks or React Query.
 *
 * Example:
 * - await trpc.getUsers.query()   // Server Component
 * - await caller.getUsers()       // Server Action / script
 */

import 'server-only'; // <-- ensure this file cannot be imported from the client
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);