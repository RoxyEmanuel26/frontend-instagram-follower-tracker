"use client";

import { Header } from "@/components/layout/header";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>

            {/* Decorative gradient orbs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
            </div>
        </div>
    );
}
