"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlaskConicalIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";

export const ExecuteWorkflowButton = ({
    workflowId,
}: {
    workflowId: string;
}) => {
    const router = useRouter();

    const [executionId, setExecutionId] =
        useState<string | null>(null);

    const [isOpeningResults, setisOpeningResults] = useState(false);
    const executeWorkflow = useExecuteWorkflow();

    const handleExecute = () => {
        executeWorkflow.mutate(
            { id: workflowId },
            {
                onSuccess(data) {
                    setExecutionId(data.executionId);
                },
            }
        );
    };

    return (
        <div className="flex gap-2">
            <Button
                size="lg"
                onClick={handleExecute}
                disabled={executeWorkflow.isPending}
            >
                <FlaskConicalIcon className="size-4" />
                Execute Workflow
            </Button>

            {executionId && (
                <Button
                    size="lg"
                    onClick={() => {
                        setisOpeningResults(true);
                        router.push(`/executions/${executionId}`)
                    }}
                >
                    {isOpeningResults ? (
                        <>
                            <Loader2Icon className="mr-2 size-4 animate-spin" />
                            Opening...
                        </>
                    ) : (
                        "View Results"
                    )}
                </Button>
            )
            }
        </div >
    );
};