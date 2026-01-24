import prisma from "@/lib/db";
import { inngest } from "./client";
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import * as Sentry from "@sentry/nextjs";

const google = createGoogleGenerativeAI(
//   {
//   apiKey: process.env.GOOGLE_API_KEY!,
// }
);
const openai = createOpenAI();
const anthropic= createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("wait", "5s");

    Sentry.logger.info("User triggered AI execution", {log_source: 'sentry_test'});
    console.warn("Something is missing");
    console.error("This is an error i want to track");

   const { steps : geminiSteps } = await step.ai.wrap("gemini-generate-text", 
    generateText,  {
      model: google('gemini-2.5-flash'),
      system: "You are a helpful assistant.",
      prompt: "what is 2+ 2?",
      experimental_telemetry:{
        isEnabled:true,
        recordInputs:true,
        recordOutputs:true,
      },
    }
   );

  //  const { steps : openaiSteps } = await step.ai.wrap("openai-generate-text", 
  //   generateText,  {
  //     model: openai("gpt-4") as any,
  //     system: "You are a helpful assistant.",
  //     prompt: "what is 2+ 2?",
  //   }
  //  );

  //  const { steps : anthropicSteps } = await step.ai.wrap("anthropic-generate-text", 
  //   generateText, 
  //   {
  //     model: anthropic("claude-3-5-sonnet-20241022") as any,
  //     system: "You are a helpful assistant.",
  //     prompt: "what is 2+ 2?",
  //   }
  //  );

  //  return { geminiSteps, openaiSteps, anthropicSteps };

  return geminiSteps;
  },
);