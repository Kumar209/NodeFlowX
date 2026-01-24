/**
 * Auth Configuration
 *
 * This file sets up the main authentication configuration
 * using `better-auth` with Prisma as the database adapter.
 *
 * It defines how users authenticate (email/password),
 * how sessions are stored, and how auth data is persisted.
 *
 * Example:
 *   const session = await auth.api.getSession({ headers });
 *
 * Benefit:
 * - Central place for all auth rules
 * - Database-backed sessions and users
 * - Easy to extend with OAuth providers later
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/db";


export const auth = betterAuth({
  database : prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Automatically sign in users after they register (they don't have to login)
  },
});