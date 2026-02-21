"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Users,
    UserCheck,
    UserPlus,
    UserMinus,
    RefreshCw,
    BarChart3,
    Instagram,
    ArrowRight,
    Wifi,
    Loader2,
} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
    const user = useAuthStore((s) => s.user);
    const [connecting, setConnecting] = useState(false);

    // Real stats will come from API when Instagram is connected
    const isConnected = false;

    const connectInstagram = async () => {
        setConnecting(true);
        try {
            const response = await api.get<{ url: string; state: string }>("/instagram/connect");
            const url = response?.data?.url;
            if (url) {
                window.location.href = url;
            } else {
                toast.error("Failed to get Instagram connect URL");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to connect Instagram";
            toast.error(message);
        } finally {
            setConnecting(false);
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 sm:space-y-8"
        >
            {/* Welcome */}
            <motion.div variants={item}>
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""} 👋
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Here&apos;s what&apos;s happening with your Instagram account.
                </p>
            </motion.div>

            {/* Instagram Connection Status */}
            {!isConnected && (
                <motion.div variants={item}>
                    <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-primary/10 p-3">
                                    <Instagram className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Connect Instagram</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Link your Instagram account to start tracking followers
                                    </p>
                                </div>
                            </div>
                            <Button size="sm" onClick={connectInstagram} disabled={connecting}>
                                {connecting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Wifi className="h-4 w-4" />
                                )}
                                {connecting ? "Connecting..." : "Connect Now"}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Stats Grid */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                <StatsCard
                    title="Total Followers"
                    value={0}
                    icon={Users}
                    description={isConnected ? "All time" : "Connect Instagram to see data"}
                />
                <StatsCard
                    title="Mutuals"
                    value={0}
                    icon={UserCheck}
                    description={isConnected ? "Following you back" : "Connect Instagram to see data"}
                />
                <StatsCard
                    title="New Followers"
                    value={0}
                    icon={UserPlus}
                    description={isConnected ? "Last 7 days" : "Connect Instagram to see data"}
                />
                <StatsCard
                    title="Unfollowers"
                    value={0}
                    icon={UserMinus}
                    description={isConnected ? "Last 7 days" : "Connect Instagram to see data"}
                />
            </motion.div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Quick Actions */}
                <motion.div variants={item}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link href="/dashboard/followers">
                                <button className="w-full flex items-center justify-between rounded-xl border p-3 sm:p-4 hover:bg-secondary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-primary" />
                                        <span className="text-sm font-medium">View Followers</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </button>
                            </Link>
                            <Link href="/dashboard/mutuals">
                                <button className="w-full flex items-center justify-between rounded-xl border p-3 sm:p-4 hover:bg-secondary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <UserCheck className="h-5 w-5 text-accent" />
                                        <span className="text-sm font-medium">View Mutuals</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </button>
                            </Link>
                            <Link href="/dashboard/analytics">
                                <button className="w-full flex items-center justify-between rounded-xl border p-3 sm:p-4 hover:bg-secondary transition-all group">
                                    <div className="flex items-center gap-3">
                                        <BarChart3 className="h-5 w-5 text-success" />
                                        <span className="text-sm font-medium">View Analytics</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </button>
                            </Link>
                            <button className="w-full flex items-center justify-between rounded-xl border p-3 sm:p-4 hover:bg-secondary transition-all group">
                                <div className="flex items-center gap-3">
                                    <RefreshCw className="h-5 w-5 text-warning" />
                                    <span className="text-sm font-medium">Sync Now</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={item}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="rounded-2xl bg-muted/50 p-4 mb-4">
                                    <Instagram className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    No activity yet
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Connect your Instagram account to see follower activity here.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
