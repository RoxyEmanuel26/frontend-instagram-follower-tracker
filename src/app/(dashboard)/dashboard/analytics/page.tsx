"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { Users, UserPlus, UserMinus, TrendingUp } from "lucide-react";

// Mock chart data
const growthData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
        date: date.toLocaleDateString("en", { month: "short", day: "numeric" }),
        followers: 1180 + Math.floor(Math.random() * 80) + i * 2,
        following: 450 + Math.floor(Math.random() * 20),
    };
});

const weeklyData = [
    { day: "Mon", gained: 5, lost: 2 },
    { day: "Tue", gained: 8, lost: 1 },
    { day: "Wed", gained: 3, lost: 3 },
    { day: "Thu", gained: 12, lost: 0 },
    { day: "Fri", gained: 6, lost: 2 },
    { day: "Sat", gained: 2, lost: 4 },
    { day: "Sun", gained: 4, lost: 1 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border bg-card p-3 shadow-lg">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
                        {entry.name}: {entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

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
                    value={1247}
                    icon={Users}
                    trend={{ value: 2.8, positive: true }}
                />
                <StatsCard
                    title="Growth Rate"
                    value={34}
                    icon={TrendingUp}
                    description="new this week"
                    trend={{ value: 12, positive: true }}
                />
                <StatsCard
                    title="Gained"
                    value={40}
                    icon={UserPlus}
                    description="Last 7 days"
                    trend={{ value: 15, positive: true }}
                />
                <StatsCard
                    title="Lost"
                    value={8}
                    icon={UserMinus}
                    description="Last 7 days"
                    trend={{ value: 3, positive: false }}
                />
            </div>

            {/* Follower Growth Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Follower Growth</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="gradientFollowers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis
                                    dataKey="date"
                                    stroke="var(--muted-foreground)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="var(--muted-foreground)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="followers"
                                    name="Followers"
                                    stroke="#8b5cf6"
                                    fill="url(#gradientFollowers)"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="following"
                                    name="Following"
                                    stroke="#06b6d4"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-56 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="var(--muted-foreground)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="var(--muted-foreground)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="gained" name="Gained" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="lost" name="Lost" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Engagement Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: "Follower-to-Following Ratio", value: "2.77:1", desc: "Very Good" },
                            { label: "Mutual Rate", value: "71.5%", desc: "892 of 1,247" },
                            { label: "Avg. Daily Growth", value: "+4.9", desc: "Last 30 days" },
                            { label: "Best Growth Day", value: "Thursday", desc: "+12 followers" },
                            { label: "Sync Status", value: "Active", desc: "Last sync 2h ago" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2.5 border-b last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium">{s.label}</p>
                                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                                </div>
                                <span className="text-sm font-bold text-primary">{s.value}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
