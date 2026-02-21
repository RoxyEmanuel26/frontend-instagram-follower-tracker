"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";
import type { LegalSection } from "@/lib/legal/types";

interface TableOfContentsProps {
    sections: LegalSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
        );

        for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [sections]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center gap-2 w-full rounded-xl border p-3 text-sm font-medium transition-colors hover:bg-[color:var(--muted)]"
                style={{
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                }}
            >
                <List className="h-4 w-4" />
                Daftar Isi
            </button>

            {/* Table of Contents */}
            <nav
                className={cn(
                    "lg:block space-y-1",
                    isOpen ? "block mt-2" : "hidden"
                )}
            >
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollTo(section.id)}
                        className={cn(
                            "block w-full text-left rounded-lg px-3 py-2 text-sm transition-all duration-200",
                            activeId === section.id
                                ? "font-medium"
                                : "hover:bg-[color:var(--muted)]"
                        )}
                        style={{
                            color:
                                activeId === section.id
                                    ? "var(--primary)"
                                    : "var(--muted-foreground)",
                            backgroundColor:
                                activeId === section.id
                                    ? "color-mix(in srgb, var(--primary) 10%, transparent)"
                                    : undefined,
                        }}
                    >
                        {section.title}
                    </button>
                ))}
            </nav>
        </>
    );
}
