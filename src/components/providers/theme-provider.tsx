"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useUIStore((s) => s.theme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.add(systemDark ? "dark" : "light");

            const handler = (e: MediaQueryListEvent) => {
                root.classList.remove("light", "dark");
                root.classList.add(e.matches ? "dark" : "light");
            };

            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            mq.addEventListener("change", handler);
            return () => mq.removeEventListener("change", handler);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    return <>{children}</>;
}
