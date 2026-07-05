'use client';

import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function TestAiButton() {
    const trpc = useTRPC();
    const testAi = useMutation(trpc.testWorkflow.mutationOptions({
        onSuccess: () => {
            toast.success("AI execution queued successfully!");
        }
    }));

    return (
        <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
            Test AI

        </Button>
    );
}
