"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReadingProgress } from "./ReadingProgress";
import { BackToTop } from "./BackToTop";
import { TableOfContents } from "./TableOfContents";
import { HighlightBox } from "./HighlightBox";
import { LegalNavigation } from "./LegalNavigation";
import type { LegalPageData } from "@/lib/legal/types";

interface LegalLayoutProps {
    data: LegalPageData;
    currentPage: "privacy" | "terms";
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
};

export function LegalLayout({ data, currentPage }: LegalLayoutProps) {
    // Estimate reading time: ~200 words per minute
    const wordCount = data.sections.reduce((acc, section) => {
        const contentWords = section.content.join(" ").split(/\s+/).length;
        const subWords =
            section.subsections?.reduce(
                (a, sub) => a + sub.items.join(" ").split(/\s+/).length,
                0
            ) ?? 0;
        return acc + contentWords + subWords;
    }, 0);
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>
            <ReadingProgress />
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <div
                    className="border-b"
                    style={{
                        borderColor: "var(--border)",
                        background:
                            "linear-gradient(180deg, color-mix(in srgb, var(--primary) 5%, transparent) 0%, transparent 100%)",
                    }}
                >
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                                style={{ color: "var(--foreground)" }}
                            >
                                {data.title}
                            </h1>
                            <p
                                className="mt-3 text-base sm:text-lg max-w-2xl"
                                style={{ color: "var(--muted-foreground)" }}
                            >
                                {data.description}
                            </p>
                            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
                                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                                    <Calendar className="h-4 w-4" />
                                    <span>Terakhir diperbarui: {data.lastUpdated}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                                    <Clock className="h-4 w-4" />
                                    <span>{readingTime} menit baca</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Sidebar — Table of Contents */}
                        <aside className="lg:w-64 shrink-0">
                            <div className="lg:sticky lg:top-20">
                                <TableOfContents sections={data.sections} />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <motion.article
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex-1 min-w-0"
                        >
                            {data.sections.map((section) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    variants={item}
                                    className="mb-10 scroll-mt-20"
                                >
                                    <h2
                                        className="text-xl sm:text-2xl font-bold mb-4"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        {section.title}
                                    </h2>

                                    {section.content.map((paragraph, i) => (
                                        <p
                                            key={i}
                                            className="text-[15px] leading-relaxed mb-3"
                                            style={{ color: "var(--muted-foreground)" }}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}

                                    {section.subsections?.map((sub) => (
                                        <div key={sub.id} id={sub.id} className="mt-5 mb-4">
                                            <h3
                                                className="text-base sm:text-lg font-semibold mb-3"
                                                style={{ color: "var(--foreground)" }}
                                            >
                                                {sub.title}
                                            </h3>
                                            <ul className="space-y-2 ml-1">
                                                {sub.items.map((listItem, i) => (
                                                    <li key={i} className="flex items-start gap-2.5">
                                                        <span
                                                            className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                                                            style={{ backgroundColor: "var(--primary)" }}
                                                        />
                                                        <span
                                                            className="text-[15px] leading-relaxed"
                                                            style={{ color: "var(--muted-foreground)" }}
                                                        >
                                                            {listItem}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                    {section.highlight && (
                                        <HighlightBox
                                            type={section.highlight.type}
                                            content={section.highlight.content}
                                        />
                                    )}

                                    {/* Section divider */}
                                    <div
                                        className="mt-8 border-b"
                                        style={{ borderColor: "var(--border)" }}
                                    />
                                </motion.section>
                            ))}

                            {/* Cross-navigation */}
                            <LegalNavigation currentPage={currentPage} />
                        </motion.article>
                    </div>
                </div>
            </main>

            <Footer />
            <BackToTop />
        </div>
    );
}
