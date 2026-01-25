/**
 * Hook to fetch all workflows using suspense
 */

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useworkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useworkflowsParams();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

/**
 * Hook to create a new workflow
 */

export const useCreateWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success( `Workflwo "${data.name}" created` );
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({}),
                );
            },
            onError: (error)=>{
                toast.error(`Failed to create workflow: ${error.message}`);
            },
        }),
    );
};