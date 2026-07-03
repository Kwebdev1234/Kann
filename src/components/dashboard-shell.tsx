"use client";

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type DashboardShellProps = {
    children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(false);
    }, [pathname]);

    useEffect(() => {
        void router.prefetch("/workflows");
        void router.prefetch("/credentials");
        void router.prefetch("/executions");
    }, [router]);

    const handleNavigate = (href: string) => {
        if (href === pathname) {
            setIsNavigating(false);
            return;
        }

        setIsNavigating(true);
        router.prefetch(href);
        router.push(href);
    };

    return (
        <SidebarProvider>
            <AppSidebar onNavigate={handleNavigate} />
            <SidebarInset className="relative bg-accent/20">
                {isNavigating && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background/90 px-6 py-5 shadow-lg">
                            <Loader2Icon className="size-8 animate-spin" style={{ color: "#FFA500" }} />
                            <p className="text-sm font-medium text-foreground">Loading...</p>
                        </div>
                    </div>
                )}
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
