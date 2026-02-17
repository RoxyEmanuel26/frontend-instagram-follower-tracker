import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className, hover }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border bg-card text-card-foreground p-4 sm:p-6",
                hover && "transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5",
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
    return <h3 className={cn("text-lg sm:text-xl font-semibold", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
    return <p className={cn("text-sm text-muted-foreground mt-1", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mt-4 pt-4 border-t flex items-center gap-2", className)}>{children}</div>;
}
