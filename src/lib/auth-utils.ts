/**
 * Auth Utilities
 *
 * This file contains helper functions for protecting routes
 * based on authentication state.
 *
 * `requireAuth` ensures the user is logged in and redirects
 * to `/login` if no session is found.
 *
 * `requireUnAuth` ensures the user is logged out and redirects
 * to `/` if a session already exists.
 *
 * Example:
 *   const session = await requireAuth(); // protect a page
 *
 * Benefit:
 * - Centralized auth checks
 * - Cleaner pages and layouts
 * - Consistent redirect behavior across the app
 */

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const requireAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session){
        redirect("/login");
    }

    return session;
}

export const requireUnAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(session){
        redirect("/");
    }

}