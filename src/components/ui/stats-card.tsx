"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    description?: string;
    trend?: { value: number; positive: boolean };
    className?: string;
}

export function StatsCard({ title, value, icon: Icon, description, trend, className }: StatsCardProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 1000;
                    const steps = 30;
                    const interval = duration / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += value / steps;
                        if (current >= value) {
                            setDisplayValue(value);
                            clearInterval(timer);
                        } else {
                            setDisplayValue(Math.floor(current));
                        }
                    }, interval);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div
            ref={ref}
            className={cn(
                "rounded-2xl border bg-card p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
                className
            )}
        >
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
                <div className="rounded-xl bg-primary/10 p-2.5">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                {displayValue.toLocaleString()}
            </p>
            {(description || trend) && (
                <div className="mt-2 flex items-center gap-2">
                    {trend && (
                        <span
                            className={cn(
                                "text-xs font-medium",
                                trend.positive ? "text-success" : "text-destructive"
                            )}
                        >
                            {trend.positive ? "+" : ""}{trend.value}%
                        </span>
                    )}
                    {description && (
                        <span className="text-xs text-muted-foreground">{description}</span>
                    )}
                </div>
            )}
        </div>
    );
}
