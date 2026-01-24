"use client";

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { use } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page =  ()=> {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(trpc.testAi.mutationOptions(
    {
      onSuccess: () => {
        toast.success("AI Job queued successfully");
      }
    }
  ));

  const create = useMutation(trpc.createWorkflow.mutationOptions(
    {
      onSuccess: () => {
        toast.success("Job queued successfully");
      }
    }
  ));

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6" >
      Protected server components
      <div>
        {JSON.stringify(data)}
      </div>

      <LogoutButton />
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>Test AI</Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
    </div>
  );
};

export default Page;
