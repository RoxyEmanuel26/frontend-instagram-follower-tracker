"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
    className?: string;
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    debounceMs = 300,
    className,
}: SearchInputProps) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const debouncedOnChange = useCallback(
        (() => {
            let timer: NodeJS.Timeout;
            return (val: string) => {
                clearTimeout(timer);
                timer = setTimeout(() => onChange(val), debounceMs);
            };
        })(),
        [onChange, debounceMs]
    );

    const handleChange = (val: string) => {
        setLocalValue(val);
        debouncedOnChange(val);
    };

    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
                type="text"
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border bg-card pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
            {localValue && (
                <button
                    onClick={() => handleChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
