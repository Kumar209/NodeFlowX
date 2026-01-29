import Handlebars from "handlebars";
import { decode } from "html-entities";
import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { geminiChannel } from "@/inngest/channels/gemini";
import { discordChannel } from "@/inngest/channels/discord";
import ky from "ky";

type DiscordData = {
    variableName?: string;
    webhookUrl?: string;
    content?: string;
    username?: string;
};

export const discordExecutor: NodeExecutor<DiscordData> = async ({
    data,
    nodeId,
    context,
    step,
    publish
}) => {
    //Emitting to show this node loading
    await publish(
        discordChannel().status({
            nodeId,
            status: "loading"
        }),
    );

    if(!data.content){
        await publish(  
            discordChannel().status({
                nodeId,
                status: "error",
            })
        );

        throw new NonRetriableError("Discord node: Content is required");
    }

    const rawContent = Handlebars.compile(data.content)(context);
    const content = decode(rawContent);
    const username = data.username
       ? decode(Handlebars.compile(data.username)(context))
       : undefined;

    try{
        const result = await step.run("dicord-webhook", async () => {
            if(!data.webhookUrl){
                await publish(
                    discordChannel().status({
                        nodeId,
                        status: "error",
                    })
                );

                throw new NonRetriableError("Discord node: WebhookUrl is required");
            }

            await ky.post(data.webhookUrl, {
                json: {
                    content: content.slice(0, 2000), // Discord max message length
                    username
                }
            });

            if(!data.variableName){
                await publish(
                    discordChannel().status({
                        nodeId,
                        status: "error",
                    })
                );

                throw new NonRetriableError("Discord node: Variable name is required");
            }

            return {
                ...context,
                [data.variableName]: {
                    messageContent: content.slice(0, 2000),
                }
            }
        }) 

          await publish(
            discordChannel().status({
                nodeId,
                status: "success",
            }),
          );

          return result;

    } catch (error) {
        await publish(
            discordChannel().status({
                nodeId,
                status: "error",
            }),
        );

        throw error;
    }


}