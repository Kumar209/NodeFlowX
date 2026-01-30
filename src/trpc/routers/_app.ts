/**
 * App tRPC Router
 *
 * This file defines the root tRPC router for the application.
 * It combines all feature-level routers into a single API surface
 * that is exposed to the client.
 *
 * Each feature (e.g. workflows) registers its own router here.
 * Access control (public/protected procedures) is handled
 * inside the individual routers.
 *
 * Benefits:
 * - End-to-end type safety
 * - Modular and scalable API structure
 * - Shared types between server and client
 */

import { credentialsRouter } from '@/features/credentials/server/routers';
import { createTRPCRouter} from '../init';
import { workflowRouter } from '@/features/workflows/server/routers';
import { executionsRouter } from '@/features/executions/server/routers';

export const appRouter = createTRPCRouter({
  workflows: workflowRouter,
  credentials: credentialsRouter,
  executions: executionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;