"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading, fetchUser } = useAuthStore();
    const sidebarOpen = useUIStore((s) => s.sidebarOpen);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main
                    className={cn(
                        "flex-1 transition-all duration-300 p-4 sm:p-6 lg:p-8",
                        sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]"
                    )}
                >
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
