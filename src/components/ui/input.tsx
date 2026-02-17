"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Check, X } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    valid?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, valid, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";
        const inputType = isPassword && showPassword ? "text" : type;

        return (
            <div className="space-y-1.5">
                {label && (
                    <label className="block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            "w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                            error && "border-destructive focus:ring-destructive",
                            valid && "border-success focus:ring-success",
                            isPassword && "pr-20",
                            !isPassword && (error || valid !== undefined) && "pr-10",
                            className
                        )}
                        {...props}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        {valid === true && !error && (
                            <Check className="h-4 w-4 text-success" />
                        )}
                        {error && <X className="h-4 w-4 text-destructive" />}
                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        )}
                    </div>
                </div>
                {error && (
                    <p className="text-xs text-destructive mt-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
export { Input };
