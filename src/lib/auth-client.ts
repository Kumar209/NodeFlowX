/**
 * Auth Client
 *
 * This file creates the client-side authentication helper
 * using `better-auth`.
 *
 * It is used in React components to perform auth actions
 * like login, logout, and fetching the current session.
 *
 * Example:
 *   await authClient.signIn({ email, password });
 *
 * Benefit:
 * - Clean separation between auth logic and UI
 * - Reusable auth client across the app
 */

import { polarClient } from "@polar-sh/better-auth"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000"
    plugins: [polarClient()],
})