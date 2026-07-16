import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { prefetchExecution } from "@/features/executions/server/prefetch";
import {
    ExecutionDetails,
    ExecutionDetailsError,
    ExecutionDetailsLoading,
} from "@/features/executions/components/execution-details";

interface PageProps {
    params: Promise<{
        executionId: string;
    }>;
}

const Page = async ({ params }: PageProps) => {
    await requireAuth();

    const { executionId } = await params;

    await prefetchExecution(executionId);

    return (
        <HydrateClient>
            <ErrorBoundary fallback={<ExecutionDetailsError />}>
                <Suspense fallback={<ExecutionDetailsLoading />}>
                    <ExecutionDetails executionId={executionId} />
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    );
};

export default Page;