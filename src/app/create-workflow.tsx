'use client';

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Renders a "Create Workflow" button that triggers the `createWorkflow` mutation and shows toast notifications for mutation lifecycle events.
 *
 * The component displays a "Workflow queued" toast when the mutation is started, a success toast "Workflow completed Successfully" on success, and an error toast using the mutation error message (or "Workflow failed") on failure. The button is disabled while the mutation is pending and calls `mutate()` when clicked.
 *
 * @returns The button element that initiates the workflow creation when clicked.
 */
export default function CreateWorkflow() {
    const trpc = useTRPC();
    const baseOptions = trpc.createWorkflow.mutationOptions();
    const create = useMutation({
        ...baseOptions,
        onMutate(variables, context) {
            toast("Workflow queued")
            return baseOptions.onMutate?.(variables, context)
        },
        onSuccess(data, variables, onMutationResult, context) {
            toast.success("Workflow completed Successfully")
            return baseOptions.onSuccess?.(data, variables, onMutationResult, context)
        },
        onError(error, variables, onMutationResult, context) {
            toast.error(error?.message ?? "Workflow failed")
            return baseOptions.onError?.(error, variables, onMutationResult, context)
        },
    })

    return (
        <Button disabled={Boolean(create.isPending)} onClick={() => create.mutate()}>
            Create Workflow
        </Button>
    );
}
