import Link from "next/link";
import { FileText, Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalNavigationProps {
    currentPage: "privacy" | "terms";
}

export function LegalNavigation({ currentPage }: LegalNavigationProps) {
    const links = [
        {
            id: "privacy" as const,
            href: "/privacy-policy",
            label: "Kebijakan Privasi",
            icon: Shield,
            description: "Bagaimana kami melindungi data Anda",
        },
        {
            id: "terms" as const,
            href: "/terms-of-service",
            label: "Syarat dan Ketentuan",
            icon: FileText,
            description: "Aturan penggunaan layanan",
        },
    ];

    const other = links.find((l) => l.id !== currentPage)!;
    const OtherIcon = other.icon;

    return (
        <div
            className="mt-12 rounded-xl border p-6"
            style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
            }}
        >
            <p
                className="text-sm font-medium mb-3"
                style={{ color: "var(--muted-foreground)" }}
            >
                Dokumen Terkait
            </p>
            <Link
                href={other.href}
                className={cn(
                    "flex items-center justify-between rounded-xl border p-4 transition-all duration-200 group"
                )}
                style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--background)",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="rounded-lg p-2"
                        style={{
                            backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                        }}
                    >
                        <OtherIcon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                            {other.label}
                        </p>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                            {other.description}
                        </p>
                    </div>
                </div>
                <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--muted-foreground)" }}
                />
            </Link>
        </div>
    );
}
