/**
 * tRPC Initialization
 *
 * This file sets up tRPC on the server.
 * It defines the shared context, routers,
 * and reusable procedures.
 *
 * A procedure is a single API endpoint in tRPC
 * (similar to a REST route or controller method).
 *
 * `baseProcedure` is a public endpoint.
 * `protectedProcedure` is a procedure that requires
 * the user to be authenticated.
 *
 * Example:
 * - baseProcedure.query(...)
 * - protectedProcedure.mutation(...)
 */

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { polarClient } from '@/lib/polar';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import superjson from "superjson";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

//Used for unsubcribed users
export const protectedProcedure = baseProcedure.use(async ({ ctx, next}) => {
  const session = await auth.api.getSession({
    headers : await headers(),
  });

  if(!session){
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({ ctx: {...ctx, auth:session }});
});

//Used for subscribed user
export const premiumProcedure = protectedProcedure.use(
  async ({ ctx, next}) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id
    });

    // Get user email
    const userEmail = ctx.auth.user.email;

    // Get bypass emails from environment variable
    const bypassEmails = process.env.PREMIUM_BYPASS_EMAILS?.split(',') || [];

    // Check if user email is in bypass list
    const isBypassEmail = bypassEmails
      .map(email => email.trim().toLowerCase())
      .includes(userEmail.toLowerCase());
    
    // If user is in bypass list, allow immediately
    if (isBypassEmail) {
      console.log(`Premium bypass granted for:`, JSON.stringify(customer, null, 2));
      return next({ ctx: { ...ctx, customer } });
    }



     // Check if user has active subscription
    const hasActiveSubscription = customer.activeSubscriptions && customer.activeSubscriptions.length > 0;

    // If user has active subscription, allow unlimited
    if (hasActiveSubscription) {
      return next({ ctx: { ...ctx, customer } });
    }

    // For free tier users, check workflow count
    const workflowCount = await prisma.workflow.count({
      where: {
        userId: ctx.auth.user.id
      }
    });

    // Allow free users to create up to 2 workflows
    if (workflowCount >= 2) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Free tier limit reached. Upgrade to premium to create more workflows.",
      });
    }

    // Allow free tier user with < 2 workflows to proceed
    return next({ ctx: { ...ctx, customer } });

    // if(!customer.activeSubscriptions || customer.activeSubscriptions.length === 0){
    //   throw new TRPCError({
    //     code: "FORBIDDEN",
    //     message: "Active subscription required",
    //   });
    //   }

    //   return next({ ctx : {...ctx, customer }})
  }
);