import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "rounded-xl bg-muted shimmer",
                className
            )}
        />
    );
}

export function SkeletonCard() {
    return (
        <div className="rounded-2xl border bg-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/5" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                </div>
            ))}
        </div>
    );
}

export function SkeletonStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border bg-card p-4 sm:p-6 space-y-3">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                </div>
            ))}
        </div>
    );
}
