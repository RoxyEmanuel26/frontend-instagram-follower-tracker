import type { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 text-center">
            <div className="rounded-2xl bg-primary/10 p-4 mb-4">
                <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    );
}
