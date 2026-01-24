/**
 * Auth Route Handler
 *
 * This file connects `better-auth` with Next.js App Router.
 * It handles only authentication-related requests under `/api/auth/*`.
 *
 * Example routes:
 * - POST /api/auth/login
 * - POST /api/auth/logout
 * - GET  /api/auth/session
 *
 * Note:
 * - This route does NOT handle non-auth APIs like:
 *   /api/workflow or /api/system/*
 */

import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);