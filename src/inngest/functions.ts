import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    //Fetching video
    await step.sleep("wait-a0moment", "5s");

    //Fetching transcription
    await step.sleep("wait-a0moment", "5s");

    //Sending transcription to chatgpt
    await step.sleep("wait-a0moment", "5s");

    await step.run("create-workflow", () => {
        return prisma.workflow.create({
          data: {
            name: "Workflow from inngest",
          },
        });
    });
  },
);