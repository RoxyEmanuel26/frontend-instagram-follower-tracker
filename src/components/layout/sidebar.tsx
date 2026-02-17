"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    BarChart3,
    Settings,
    Instagram,
    ChevronLeft,
    RefreshCw,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/followers", label: "Followers", icon: Users },
    { href: "/dashboard/mutuals", label: "Mutuals", icon: UserCheck },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen, toggleSidebar } = useUIStore();

    return (
        <>
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={cn(
                    "fixed top-16 left-0 bottom-0 z-30 flex flex-col border-r bg-sidebar transition-all duration-300",
                    sidebarOpen ? "w-64" : "w-0 lg:w-[72px]",
                    !sidebarOpen && "overflow-hidden lg:overflow-visible"
                )}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <Instagram className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-sm">Dashboard</span>
                        </div>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all hidden lg:flex"
                        aria-label="Toggle sidebar"
                    >
                        <ChevronLeft
                            className={cn(
                                "h-4 w-4 transition-transform duration-300",
                                !sidebarOpen && "rotate-180"
                            )}
                        />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                                    !sidebarOpen && "lg:justify-center lg:px-2"
                                )}
                                title={!sidebarOpen ? item.label : undefined}
                            >
                                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Quick sync button */}
                {sidebarOpen && (
                    <div className="p-3 border-t">
                        <button className="flex items-center gap-2 w-full rounded-xl bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-all">
                            <RefreshCw className="h-4 w-4" />
                            Sync Followers
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
