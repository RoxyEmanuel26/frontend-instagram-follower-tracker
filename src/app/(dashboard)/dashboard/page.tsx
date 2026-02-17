"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    WifiOff,
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

    // Mock data — will be replaced with real API data via React Query
    const stats = {
        totalFollowers: 1247,
        mutuals: 892,
        newFollowers7d: 34,
        unfollowers7d: 8,
    };

    const isConnected = false; // Will be from Instagram account status

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
                            <Button size="sm">
                                <Wifi className="h-4 w-4" />
                                Connect Now
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
                    value={stats.totalFollowers}
                    icon={Users}
                    description="All time"
                    trend={{ value: 2.8, positive: true }}
                />
                <StatsCard
                    title="Mutuals"
                    value={stats.mutuals}
                    icon={UserCheck}
                    description="Following you back"
                    trend={{ value: 1.2, positive: true }}
                />
                <StatsCard
                    title="New Followers"
                    value={stats.newFollowers7d}
                    icon={UserPlus}
                    description="Last 7 days"
                    trend={{ value: 12, positive: true }}
                />
                <StatsCard
                    title="Unfollowers"
                    value={stats.unfollowers7d}
                    icon={UserMinus}
                    description="Last 7 days"
                    trend={{ value: 3, positive: false }}
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
                        <CardContent className="space-y-4">
                            {[
                                { action: "New follower", user: "@design_lover", time: "2h ago", type: "success" as const },
                                { action: "Unfollowed", user: "@tech_bot", time: "5h ago", type: "error" as const },
                                { action: "New mutual", user: "@creative_mind", time: "1d ago", type: "info" as const },
                                { action: "Sync completed", user: "1,247 followers synced", time: "2d ago", type: "default" as const },
                            ].map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between py-2 border-b last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <Badge variant={activity.type}>{activity.action}</Badge>
                                        <span className="text-sm font-medium">{activity.user}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground hidden sm:block">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
