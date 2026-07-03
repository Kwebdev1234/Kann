import { Loader2Icon } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="flex h-full min-h-[320px] flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background/80 px-6 py-5 shadow-sm backdrop-blur-sm">
                <Loader2Icon className="size-8 animate-spin" style={{ color: "#FFA500" }} />
                <p className="text-sm font-medium text-foreground">Loading dashboard...</p>
            </div>
        </div>
    );
}
