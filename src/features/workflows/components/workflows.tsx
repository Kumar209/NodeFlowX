"use client";

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
    const WorkflowsList = useSuspenseWorkflows();

    return (
        <div className="flex-1 flex justify-center items-center">
            {JSON.stringify(WorkflowsList.data, null, 2)}
        </div>
    )
};


export const WorkflowsHeader = ({ disabled} : {disabled?: boolean}) => {
    const createWorkflows  = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();
    const router = useRouter();

    const handleCreate = () => {
        createWorkflows.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => { 
                handleError(error);
            }
        })
    }

    return (
        <>
        {modal}
        <EntityHeader 
            title="Workflows" 
            description="Create and manage your workflows" 
            onNew={handleCreate} 
            newButtonLabel="New workflow"
            disabled={disabled}
            isCreating={createWorkflows.isPending} 
        />
        </>
    )
};

export const WorkflowsContainer = ({
    children
} : {children : React.ReactNode;

}) => {
    return (
        <EntityContainer
           header={<WorkflowsHeader />}
           search={<></>}
           pagination={<></>}
        >
            {children}
        </EntityContainer>
    )
}