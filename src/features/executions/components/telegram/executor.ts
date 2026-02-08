import Handlebars from "handlebars";
import { decode } from "html-entities";
import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { telegramChannel } from "@/inngest/channels/telegram";
import ky from "ky";
import prisma from "@/lib/db";
import { decrypt } from "@/lib/encryption";

type TelegramData = {
    variableName?: string;
    message?: string;
    chatId?: string;
    credentialId?: string;
};

// Define the type for context that might contain telegram data
type TelegramContext = Record<string, any> & {
    telegram?: {
        // Add this to match your actual data structure
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
    };
};


export const telegramExecutor: NodeExecutor<TelegramData> = async ({
    data,
    nodeId,
    context: rawContext,
    step,
    publish
}) => {
    // Cast context to our TelegramContext type
    const context = rawContext as TelegramContext;

    
    // Emitting to show this node loading
    await publish(
        telegramChannel().status({
            nodeId,
            status: "loading"
        }),
    );

    if (!data.message) {
        await publish(
            telegramChannel().status({
                nodeId,
                status: "error",
            })
        );
        throw new NonRetriableError("Telegram node: Message is required");
    }

    const rawContent = Handlebars.compile(data.message)(context);
    const message = decode(rawContent);
    
    // Compile chatId if provided, otherwise try to get from context
    const compiledChatId = data.chatId 
        ? decode(Handlebars.compile(data.chatId)(context))
        : null;

    // Update the chatId extraction logic:
    const getChatId = (context: TelegramContext): string | number | null => {
        // First try to get chatId from data.chatId (compiled)
        if (compiledChatId) {
            return compiledChatId;
        }

        // Try to get from telegram.message.chat.id (new structure)
        if (context.telegram?.message?.chat?.id) {
            return context.telegram.message.chat.id;
        }

        // Try to get from telegram.chat.id (old/alternative structure)
        if (context.telegram?.chat?.id) {
            return context.telegram.chat.id;
        }
        
        return null;
    };
    
    // Use provided chatId, or from context, or throw error
    const chatId = getChatId(context);

    try {
        const result = await step.run("telegram-send-message", async () => {
            if (!data.credentialId) {
                throw new NonRetriableError("Telegram node: Credential is required");
            }

            if (!chatId) {
                throw new NonRetriableError("Telegram node: Chat ID is required - either provide it or use Telegram trigger");
            }

            // Get and decrypt the credential
            const credential = await prisma.credential.findUnique({
                where: { id: data.credentialId }
            });

            if (!credential) {
                throw new NonRetriableError("Telegram node: Credential not found");
            }

            const botToken = await decrypt(credential.value);

            // Send message via Telegram Bot API
            const response = await ky.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                json: {
                    chat_id: chatId,
                    text: message,
                    parse_mode: "HTML"
                }
            }).json<any>();

            if (!data.variableName) {
                throw new NonRetriableError("Telegram node: Variable name is required");
            }

            return {
                ...context,
                [data.variableName]: {
                    success: true,
                    messageId: response.result?.message_id,
                    chatId: response.result?.chat?.id,
                    result: response
                }
            };
        });

        await publish(
            telegramChannel().status({
                nodeId,
                status: "success",
            }),
        );

        return result;

    } catch (error) {
        await publish(
            telegramChannel().status({
                nodeId,
                status: "error",
            }),
        );
        throw error;
    }
};