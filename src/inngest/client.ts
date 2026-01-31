/**
 * Inngest Client
 *
 * This file initializes the Inngest client used for
 * sending and handling background events.
 *
 * It allows the app to run async jobs like workflows,
 * background tasks, and scheduled processes.
 *
 * Example:
 * - inngest.send({ name: "user.created", data: {...} })
 *
 * Benefit:
 * - Reliable background jobs
 * - Event-driven workflows
 * - Keeps heavy work out of request/response flow
 */

import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
    id: "nodeflowx",
    // eventKey: process.env.INNGEST_EVENT_KEY,
    middleware: [ realtimeMiddleware() ]
});