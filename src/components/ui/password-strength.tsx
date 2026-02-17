"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
    password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const strength = useMemo(() => {
        if (!password) return { score: 0, label: "", color: "" };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { score: 1, label: "Weak", color: "bg-destructive" };
        if (score <= 3) return { score: 2, label: "Fair", color: "bg-warning" };
        if (score <= 4) return { score: 3, label: "Strong", color: "bg-accent" };
        return { score: 4, label: "Very Strong", color: "bg-success" };
    }, [password]);

    if (!password) return null;

    return (
        <div className="space-y-1.5">
            <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "h-1.5 flex-1 rounded-full transition-all duration-300",
                            i < strength.score ? strength.color : "bg-muted"
                        )}
                    />
                ))}
            </div>
            <p
                className={cn("text-xs font-medium", {
                    "text-destructive": strength.score === 1,
                    "text-warning": strength.score === 2,
                    "text-accent": strength.score === 3,
                    "text-success": strength.score === 4,
                })}
            >
                {strength.label}
            </p>
        </div>
    );
}
