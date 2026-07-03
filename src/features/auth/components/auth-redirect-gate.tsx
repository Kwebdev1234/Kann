"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type AuthRedirectGateProps = {
    children: React.ReactNode;
    redirectTo?: string;
};

export function AuthRedirectGate({ children, redirectTo = "/workflows" }: AuthRedirectGateProps) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && session) {
            router.replace(redirectTo);
        }
    }, [isPending, redirectTo, router, session]);

    if (isPending || session) {
        return null;
    }

    return <>{children}</>;
}
