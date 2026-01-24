/**
 * tRPC Server Helpers
 *
 * This file provides server-only utilities for using tRPC
 * outside of React components, especially in the Next.js
 * App Router with React Server Components (RSC).
 *
 * Core helpers:
 * -------------
 * `trpc`
 * - Used inside Server Components
 * - Integrates with React Query
 * - Supports caching, suspense, and prefetching
 *
 * `caller`
 * - Used in non-React server code (server actions, cron jobs, scripts)
 * - Calls tRPC procedures directly without hooks or React Query
 *
 * React Query hydration helpers:
 * ------------------------------
 * `prefetch`
 * - Runs on the server
 * - Prefetches tRPC queries into the React Query cache
 * - Supports both normal and infinite queries
 * - Prevents waterfalls and allows data to be ready before render
 *
 * `HydrateClient`
 * - Runs on the client
 * - Rehydrates the server-prefetched React Query cache
 * - Prevents duplicate client-side refetches
 * - Eliminates loading flicker after SSR
 *
 * Typical flow:
 * -------------
 * 1. Server Component calls `prefetch()` to load data early
 * 2. Data is stored in the shared QueryClient cache
 * 3. Cache is dehydrated and sent to the client
 * 4. `HydrateClient` restores the cache on the client
 * 5. Client components instantly access data via `useQuery`
 */

import 'server-only'; // <-- ensure this file cannot be imported from the client
import { createTRPCOptionsProxy, TRPCQueryOptions } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}


export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === 'infinite') {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}