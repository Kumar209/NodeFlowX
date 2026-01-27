/**
 * Inngest API Route
 *
 * This file exposes the Inngest endpoint for Next.js.
 * It allows Inngest to receive events and trigger
 * background functions defined in the app.
 *
 * Example:
 * - POST /api/inngest   (event delivery & function execution)
 */

import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { executeWorkflow } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
     executeWorkflow,
  ],
});