"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSuspenseExecution } from "../hooks/use-executions";

export const ExecutionDetails = ({
    executionId,
}: {
    executionId: string;
}) => {
    const execution = useSuspenseExecution(executionId);

    //const data = execution.data;
    const { data } = useSuspenseExecution(executionId);
    return (
        <div className="max-w-5xl mx-auto p-8 space-y-6">

            <Card>
                <CardHeader>
                    <CardTitle>
                        Execution Results
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    <div>
                        <h3 className="font-semibold mb-2">
                            Workflow
                        </h3>

                        <p>{data.workflow.name}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">
                            Status
                        </h3>

                        <Badge>
                            {data.status}
                        </Badge>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">
                            Output
                        </h3>

                        <pre className="rounded bg-muted p-4 overflow-auto text-sm">
                            {JSON.stringify(data.output, null, 2)}
                        </pre>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">
                            Error
                        </h3>

                        <pre className="rounded bg-muted p-4 overflow-auto text-sm">
                            {data.error ?? "None"}
                        </pre>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
};

export const ExecutionDetailsLoading = () => {
    return (
        <div className="p-8">
            Loading execution...
        </div>
    );
};

export const ExecutionDetailsError = () => {
    return (
        <div className="p-8">
            Failed to load execution.
        </div>
    );
};