"use client";

import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useworkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";


export const WorkflowsSearch = () => {
    const [params, setParams] = useworkflowsParams();
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams
    })

    return (
        <EntitySearch 
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search workflows"
        />
    );
};

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

export const WorkflowsPagination = () =>{
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useworkflowsParams();

    return (
        <EntityPagination 
          disabled={workflows.isFetching}
          totalPages={workflows.data.totalPages}
          page={workflows.data.page}
          onPageChange={(page) => setParams({...params, page})}
        />
    )
}

export const WorkflowsContainer = ({
    children
} : {children : React.ReactNode;

}) => {
    return (
        <EntityContainer
           header={<WorkflowsHeader />}
           search={<WorkflowsSearch />}
           pagination={<WorkflowsPagination />}
        >
            {children}
        </EntityContainer>
    )
}