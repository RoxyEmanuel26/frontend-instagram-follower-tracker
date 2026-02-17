import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

interface AvatarProps {
    src?: string | null;
    alt?: string;
    fallback?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
};

export function Avatar({ src, alt = "", fallback, size = "md", className }: AvatarProps) {
    const initials = fallback ? getInitials(fallback) : alt ? getInitials(alt) : "?";

    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className={cn(
                    "rounded-full object-cover ring-2 ring-border",
                    sizes[size],
                    className
                )}
            />
        );
    }

    return (
        <div
            className={cn(
                "rounded-full flex items-center justify-center font-semibold gradient-bg text-white ring-2 ring-border",
                sizes[size],
                className
            )}
            aria-label={alt}
        >
            {initials}
        </div>
    );
}
