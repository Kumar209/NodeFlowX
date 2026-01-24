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

import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { betterAuth, check } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polarClient } from "./polar";
import prisma from "@/lib/db";


export const auth = betterAuth({
  database : prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Automatically sign in users after they register (they don't have to login)
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "ef964bfa-fdf8-48a8-aad2-cb68e6ea71b4",
              slug: "pro",
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        
        portal(),
      ]
    })
  ]
});