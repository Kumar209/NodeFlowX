import Handlebars from "handlebars";
import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { generateText, experimental_generateImage } from "ai";
import { geminiChannel } from "@/inngest/channels/gemini";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Handlebars.registerHelper("json", (context) => {
//     const jsonString = JSON.stringify(context, null, 2);
//     const safeString =  new Handlebars.SafeString(jsonString);

//     return safeString;
// });

type GeminiData = {
    variableName?: string;
    mode?: 'text' | 'image';
    // model?: string;
    systemPrompt?: string;
    userPrompt?: string;

    //Text-specific
    temperature?: number;
    maxTokens?: number;

    //Image-specific
    imageCount?: number;
    size?: string;
    aspectRatio?: string;
    outputFormat?: string;
    style?: string;
};

export const geminiExecutor: NodeExecutor<GeminiData> = async ({
    data,
    nodeId,
    context,
    step,
    publish
}) => {
    //Emitting to show this node loading
    await publish(
        geminiChannel().status({
            nodeId,
            status: "loading"
        }),
    );

    if(!data.variableName){
        await publish(
            geminiChannel().status({
                nodeId,
                status: "error",
            })
        );

        throw new NonRetriableError("Gemini node: Variable name is missing");
    }

    if(!data.userPrompt){
        await publish(
            geminiChannel().status({
                nodeId,
                status: "error",
            })
        );

        throw new NonRetriableError("Gemini node: User prompt is missing");
    }

    // Todo: Throw if credential is missing

    const systemPrompt = data.systemPrompt
       ? Handlebars.compile(data.systemPrompt)(context)
       : data.mode === 'image'
        ? "You are an AI image generator. Generate high-quality, detailed images based on the prompts."
        : "You are a helpful assistant.";

    const userPrompt = Handlebars.compile(data.userPrompt)(context);

    //Todo: fetch credential that user selected

    const credentialValue = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    const google = createGoogleGenerativeAI({
        apiKey : credentialValue,
    });

    try{
        // Determine mode (default to text if not specified)
        const mode = data.mode || 'text'; 

        if(mode === 'text'){
            const { steps } = await step.ai.wrap(
                "gemini-generate-text",
                generateText,
                {
                    // model: google(data.model || "gemini-2.5-flash"),
                    model: google("gemini-2.5-flash"),
                    system: systemPrompt,
                    prompt: userPrompt,
                    temperature: data.temperature || 0.7,
                    maxOutputTokens: data.maxTokens || 1024,
                    experimental_telemetry: {
                        isEnabled: true,
                        recordInputs: true,
                        recordOutputs: true,
                    },
                },
            );

            const text = steps[0].content[0].type === "text"
                ? steps[0].content[0].text
                : "";

            await publish(
                geminiChannel().status({
                    nodeId,
                    status: "success",
                }),
            );

            return {
                ...context,
                [data.variableName]: {
                    text,
                    mode: 'text',
                    model: 'gemini-2.5-flash'
                },
            }
        }

        else if(mode === 'image'){
            // IMAGE GENERATION
            const imageModel = google.image("imagen-3.0-generate-002");

            // Parse size if provided
            let size: `${number}x${number}` | undefined;
            
            if (data.size) {
                const [width, height] = data.size.split('x').map(Number);
                if (width && height && width > 0 && height > 0) {
                size = `${width}x${height}` as const;
                }
            }

            // Parse aspect ratio if provided
            let aspectRatio: `${number}:${number}` | undefined;
            if (data.aspectRatio) {
                const [widthRatio, heightRatio] = data.aspectRatio.split(':').map(Number);
                if (widthRatio && heightRatio && widthRatio > 0 && heightRatio > 0) {
                aspectRatio = `${widthRatio}:${heightRatio}` as const;
                }
            }

            // Enhance prompt with style if specified
            const enhancedPrompt = data.style 
                ? `In the style of ${data.style}: ${userPrompt}`
                : userPrompt;

            // Generate images
            const { images, warnings } = await step.ai.wrap(
                "gemini-generate-images",
                experimental_generateImage,
                {
                    model: imageModel,
                    prompt: `${systemPrompt}\n\n${enhancedPrompt}`,
                    n: data.imageCount || 1,
                    size: size || "1024x1024",
                    aspectRatio: aspectRatio || "1:1",
                    providerOptions: {
                        google: {
                            aspectRatio: (aspectRatio || "1:1") as any,
                            personGeneration: "allow_adult" as const
                        }
                    },
                }
            );

            // Convert images to base64 URLs
            const imageUrls = images.map((image, index) => {
                const base64 = image.base64;
                const mediaType = data.outputFormat === 'jpeg' 
                    ? 'image/jpeg' 
                    : data.outputFormat === 'webp' 
                        ? 'image/webp' 
                        : 'image/png';

                return {
                    url: `data:${mediaType};base64,${base64}`,
                    base64: base64,
                    mediaType: mediaType,
                    index: index + 1
                };
            });

            await publish(
                geminiChannel().status({
                    nodeId,
                    status: "success",
                }),
            );

            return {
                ...context,
                [data.variableName]: {
                    images: imageUrls,
                    firstImage: imageUrls[0]?.url,
                    text: `Generated ${images.length} image${images.length > 1 ? 's' : ''}`, // Keep text for compatibility
                    count: images.length,
                    mode: 'image',
                    model: 'imagen-3.0-generate-002',
                    warnings: warnings,
                    metadata: {
                        size: size || "1024x1024",
                        aspectRatio: aspectRatio || "1:1",
                        style: data.style
                    }
                },
            };
        }

        else{
            throw new NonRetriableError(`Unknown mode: ${mode}`);
        }

    } catch (error) {
        await publish(
            geminiChannel().status({
                nodeId,
                status: "error",
            }),
        );

        throw error;
    }


}