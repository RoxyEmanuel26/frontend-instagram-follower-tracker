import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "success" | "warning" | "error" | "info";
    className?: string;
}

const variants = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-success/15 text-success border-success/20",
    warning: "bg-warning/15 text-warning border-warning/20",
    error: "bg-destructive/15 text-destructive border-destructive/20",
    info: "bg-accent/15 text-accent border-accent/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
