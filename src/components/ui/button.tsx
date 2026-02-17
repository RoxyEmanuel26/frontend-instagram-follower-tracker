"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
        const base =
            "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline: "border-2 border-border bg-transparent text-foreground hover:bg-secondary",
            ghost: "bg-transparent text-foreground hover:bg-secondary",
            destructive: "bg-destructive text-destructive-foreground hover:opacity-90 shadow-lg shadow-destructive/25",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs sm:text-sm",
            md: "h-10 px-4 sm:px-5 text-sm sm:text-base",
            lg: "h-12 px-6 sm:px-8 text-base sm:text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(base, variants[variant], sizes[size], className)}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
export { Button };
