import type { NodeExecutor } from "@/features/executions/types";
import { telegramTriggerChannel } from "@/inngest/channels/telegram-trigger";
import prisma from "@/lib/db";
import { NonRetriableError } from "inngest";

type TelegramTriggerData = Record<string, unknown>;

// Define the type for context that might contain telegram data
type TelegramUpdate = {
    telegram:{
        message?: {
            chat?: {
                id?: string | number;
                first_name?: string;
                last_name?: string;
                type?: string;
                username?: string;
            };
            from?: {
                id?: string | number;
                first_name?: string;
                last_name?: string;
                username?: string;
                is_bot?: boolean;
                language_code?: string;
            };
            text?: string;
            message_id?: number;
            date?: number;
        };
        // Keep these for backward compatibility or direct access
        chat?: {
            id?: string | number;
        };
        from?: {
            first_name?: string;
            username?: string;
            id?: string | number;
        };
        text?: string;
        raw?: any;
    }
};


export const telegramTriggerExecutor: NodeExecutor<TelegramTriggerData> = async ({
    nodeId,
    context,
    step,
    publish
}) => {
    try{
        await publish(
            telegramTriggerChannel().status({
                nodeId,
                status: "loading"
            }),
        );

        const result = await step.run("telegram-trigger", async () => {

            const update = context as TelegramUpdate;

            /** Validate message exists*/
            if (!update?.telegram.message) {
                throw new NonRetriableError("No Telegram message");
            }

            const msg = update.telegram.message;

            /** Private chats only */
            if (msg.chat?.type !== "private") {
                throw new NonRetriableError("Only private chats allowed");
            }

            const senderId = msg.from?.id?.toString();

            if (!senderId) {
                throw new NonRetriableError("No sender ID");
            }

            /** Fetch node */
            const node = await prisma.node.findUnique({
                where: { id: nodeId },
            });

            if (!node) {
                throw new NonRetriableError("Node not found");
            }

            const nodeData = (node.data ?? {}) as Record<string, any>;
            const ownerUserId = nodeData.ownerUserId;

            /** FIRST MESSAGE = BIND OWNER */
            if (!ownerUserId) {
                await prisma.node.update({
                    where: { id: nodeId },
                    data: {
                        data: {
                            ...nodeData,
                            ownerUserId: senderId,
                        },
                    },
                });

                // Stop execution so first message doesn't run workflow
                throw new NonRetriableError(
                    "Telegram owner bound. Send another message to trigger workflow."
                );
            }

            /** BLOCK UNAUTHORIZED USERS */
            if (ownerUserId !== senderId) {
                throw new NonRetriableError(
                    "Unauthorized Telegram Bot user"
                );
            }

            /** Pass telegram data in correct format for action nodes */

            console.log(context);
            return context;
        });

        await publish(
            telegramTriggerChannel().status({
                nodeId,
                status: "success"
            }),
        );

        return result;
    }catch (err) {

        await publish(
            telegramTriggerChannel().status({
                nodeId,
                status: "error"
            }),
        );

        throw err;
    }
    
};
