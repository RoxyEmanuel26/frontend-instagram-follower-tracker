"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sun,
    Moon,
    Monitor,
    Menu,
    X,
    LogOut,
    User,
    LayoutDashboard,
    Users,
    UserCheck,
    BarChart3,
    Settings,
} from "lucide-react";
import { useState } from "react";

export function Header() {
    const pathname = usePathname();
    const { theme, setTheme, toggleSidebar, sidebarOpen } = useUIStore();
    const { user, isAuthenticated, logout } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const isDashboard = pathname?.startsWith("/dashboard");

    const dashboardNavItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/followers", label: "Followers", icon: Users },
        { href: "/dashboard/mutuals", label: "Mutuals", icon: UserCheck },
        { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    const themeIcons = { light: Sun, dark: Moon, system: Monitor };
    const ThemeIcon = themeIcons[theme];
    const nextTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";

    const navLinks = isDashboard
        ? []
        : [
            { href: "/", label: "Home" },
            { href: "/#features", label: "Features" },
            { href: "/#pricing", label: "Pricing" },
        ];

    return (
        <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">IG</span>
                        </div>
                        <span className="font-bold text-lg hidden sm:block group-hover:text-primary transition-colors">
                            FollowTracker
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === link.href
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Theme toggle */}
                        <button
                            onClick={() => setTheme(nextTheme)}
                            className="rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                            aria-label={`Switch to ${nextTheme} mode`}
                        >
                            <ThemeIcon className="h-5 w-5" />
                        </button>

                        {isAuthenticated && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-secondary transition-all"
                                >
                                    <Avatar
                                        alt={user.email}
                                        fallback={user.email}
                                        size="sm"
                                    />
                                    <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">
                                        {user.email}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {profileMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-2 w-56 rounded-xl border bg-card shadow-xl py-2 z-50"
                                        >
                                            <div className="px-3 py-2 border-b mb-1">
                                                <p className="text-sm font-medium truncate">{user.email}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {user.role === "ADMIN" ? "Admin" : "User"}
                                                </p>
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setProfileMenuOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors"
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/dashboard/settings"
                                                onClick={() => setProfileMenuOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors"
                                            >
                                                <User className="h-4 w-4" />
                                                Settings
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setProfileMenuOpen(false);
                                                    logout();
                                                }}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-secondary transition-colors w-full text-left"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/register" className="hidden sm:block">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => {
                                if (isDashboard) {
                                    toggleSidebar();
                                } else {
                                    setMobileMenuOpen(!mobileMenuOpen);
                                }
                            }}
                            className="lg:hidden rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                            aria-label="Toggle menu"
                        >
                            {isDashboard ? (
                                sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />
                            ) : (
                                mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && !isDashboard && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden border-t overflow-hidden"
                    >
                        <nav className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                        pathname === link.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-secondary"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {!isAuthenticated && (
                                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full mt-2" size="sm">
                                        Get Started
                                    </Button>
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
