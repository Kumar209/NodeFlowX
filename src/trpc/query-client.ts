/**
 * React Query Client Factory
 *
 * This file creates and configures a shared React Query client
 * used by tRPC on the client side.
 *
 * It controls caching, stale time, and dehydration behavior
 * for server-side rendering and hydration.
 *
 * Example:
 * - Used internally by the tRPC provider
 *
 * Benefit:
 * - Better caching and performance
 * - Consistent query behavior across the app
 * - Smooth SSR and client hydration
 */

import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
// import superjson from 'superjson';
export function makeQueryClient() {
  return new QueryClient({ 
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}