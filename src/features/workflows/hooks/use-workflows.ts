import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export type WorkflowsQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
};

/**
 * Hook to fetch all workflows using suspense
 */
export const useSuspenseWorkflows = (params?: WorkflowsQueryParams) => {
  const trpc = useTRPC();
  
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params ?? {}));
};

/**
 * Hook to create a new workflow
 */
export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" created`);
        queryClient.invalidateQueries({
          queryKey: trpc.workflows.getMany.queryOptions({}).queryKey,
        });
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    }),
  );
};

export const useRemoveWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow removed");
        queryClient.invalidateQueries({
          queryKey: trpc.workflows.getMany.queryOptions({}).queryKey,
        });
      },
      onError: (error) => {
        toast.error(`Failed to remove workflow: ${error.message}`);
      },
    }),
  );
};