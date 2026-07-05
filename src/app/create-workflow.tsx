'use client';

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Renders a "Create Workflow" button that triggers the `createWorkflow` mutation and shows toast notifications for mutation lifecycle events.
 */
export default function CreateWorkflow() {
    const trpc = useTRPC();

    const baseOptions = trpc.createWorkflow.mutationOptions();

    const create = useMutation({
        ...baseOptions,
        onMutate(variables, context) {
            toast("Workflow queued");
            return baseOptions.onMutate?.(variables, context);
        },
        onSuccess(data, variables, onMutationResult, context) {
            toast.success("Workflow completed Successfully");
            return baseOptions.onSuccess?.(
                data,
                variables,
                onMutationResult,
                context
            );
        },
        onError(error, variables, onMutationResult, context) {
            toast.error(error?.message ?? "Workflow failed");
            return baseOptions.onError?.(
                error,
                variables,
                onMutationResult,
                context
            );
        },
    });

    return (
        <Button
            disabled={create.isPending}
            onClick={() => create.mutate()}
        >
            Create Workflow
        </Button>
    );
}