import { Info, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighlightBoxProps {
    type: "info" | "warning" | "success" | "danger";
    content: string;
}

const config = {
    info: {
        icon: Info,
        bg: "bg-[color:var(--primary)]/5",
        border: "border-[color:var(--primary)]/20",
        iconColor: "text-[color:var(--primary)]",
        textColor: "text-[color:var(--foreground)]",
    },
    warning: {
        icon: AlertTriangle,
        bg: "bg-[color:var(--warning)]/5",
        border: "border-[color:var(--warning)]/20",
        iconColor: "text-[color:var(--warning)]",
        textColor: "text-[color:var(--foreground)]",
    },
    success: {
        icon: CheckCircle,
        bg: "bg-[color:var(--success)]/5",
        border: "border-[color:var(--success)]/20",
        iconColor: "text-[color:var(--success)]",
        textColor: "text-[color:var(--foreground)]",
    },
    danger: {
        icon: ShieldAlert,
        bg: "bg-[color:var(--destructive)]/5",
        border: "border-[color:var(--destructive)]/20",
        iconColor: "text-[color:var(--destructive)]",
        textColor: "text-[color:var(--foreground)]",
    },
};

export function HighlightBox({ type, content }: HighlightBoxProps) {
    const c = config[type];
    const Icon = c.icon;

    return (
        <div
            className={cn(
                "my-4 flex items-start gap-3 rounded-xl border p-4",
                c.bg,
                c.border
            )}
        >
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", c.iconColor)} />
            <p className={cn("text-sm leading-relaxed", c.textColor)}>
                {content}
            </p>
        </div>
    );
}
