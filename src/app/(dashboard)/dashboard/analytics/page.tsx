"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Users, UserPlus, UserMinus, TrendingUp, Instagram, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

    // Real data will come from API when Instagram is connected
    const isConnected = false;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Track your follower growth and engagement
                    </p>
                </div>
                <div className="flex gap-1 rounded-xl border bg-card p-1">
                    {(["7d", "30d", "90d"] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setDateRange(range)}
                            className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${dateRange === range
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Followers"
                    value={0}
                    icon={Users}
                    description={isConnected ? "All time" : "Connect Instagram"}
                />
                <StatsCard
                    title="Growth Rate"
                    value={0}
                    icon={TrendingUp}
                    description={isConnected ? "This week" : "Connect Instagram"}
                />
                <StatsCard
                    title="Gained"
                    value={0}
                    icon={UserPlus}
                    description={isConnected ? "Last 7 days" : "Connect Instagram"}
                />
                <StatsCard
                    title="Lost"
                    value={0}
                    icon={UserMinus}
                    description={isConnected ? "Last 7 days" : "Connect Instagram"}
                />
            </div>

            {/* Charts Area — Empty State */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Follower Growth
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="rounded-2xl bg-muted/50 p-4 mb-4">
                            <Instagram className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="text-base font-medium text-muted-foreground">
                            No analytics data yet
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                            Connect your Instagram account and sync your followers to see growth charts and insights here.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Area — Empty State */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <p className="text-sm text-muted-foreground">
                                Weekly data will appear here after your first sync.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: "Follower-to-Following Ratio", value: "—", desc: "Connect Instagram" },
                            { label: "Mutual Rate", value: "—", desc: "Connect Instagram" },
                            { label: "Avg. Daily Growth", value: "—", desc: "Connect Instagram" },
                            { label: "Best Growth Day", value: "—", desc: "Connect Instagram" },
                            { label: "Sync Status", value: "Not Connected", desc: "Connect your account" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2.5 border-b last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium">{s.label}</p>
                                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                                </div>
                                <span className="text-sm font-bold text-muted-foreground">{s.value}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
