import { sendWorkflowExecution } from "@/inngest/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const workflowId = url.searchParams.get("workflowId");

        if (!workflowId) {
            return NextResponse.json(
                { success: false, error: "Missing required query parameter: workflowId" },
                { status: 400 },
            );
        }

        const body = await request.json();

        const telegramData = {
            message: body.message,
            chat: body.chat,
            from: body.from,
            date: body.date,
            text: body.message?.text,
            raw: body
        };

        // Trigger an Inngest Job
        await sendWorkflowExecution({
            workflowId,
            initialData: {
                telegram: telegramData,
            },
        });

        return NextResponse.json(
            { success: true, message: "Telegram webhook processed successfully" },
            { status: 200 },
        );

    } catch (error) {
        console.log("Telegram webhook error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to process Telegram webhook" },
            { status: 500 },
        );
    }
}