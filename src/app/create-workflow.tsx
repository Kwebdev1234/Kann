'use client';

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function CreateWorkflow() {
    const trpc = useTRPC();
    const baseOptions = trpc.createWorkflow.mutationOptions();
    const create = useMutation({
        ...baseOptions,
        onMutate() {
            toast("Workflow queued")
            return baseOptions.onMutate?.()
        },
        onSuccess(data, variables, context) {
            toast.success("Workflow completed Successfully")
            return baseOptions.onSuccess?.(data, variables, context)
        },
        onError(error, variables, context) {
            toast.error(error?.message ?? "Workflow failed")
            return baseOptions.onError?.(error, variables, context)
        },
    })

    return (
        <Button disabled={Boolean(create.isPending)} onClick={() => create.mutate()}>
            Create Workflow
        </Button>
    );
}
