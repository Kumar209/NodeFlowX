import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.credentials.getMany>;

/**
 * Prefetch a all executions
 */

export const prefetchExecutions = (params : Input)=> {
    return prefetch(trpc.credentials.getMany.queryOptions(params));
}


/**
 * Prefetch a single execution
 */

export const prefetchExecution  = (id: string) => {
    return prefetch(trpc.credentials.getOne.queryOptions({ id }));
};