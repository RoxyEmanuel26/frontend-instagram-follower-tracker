"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/ui/search-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Users, Download, UserCheck, UserX, Instagram } from "lucide-react";

type FilterType = "all" | "following_back" | "not_following_back";

export default function FollowersPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");
    const [sortBy, setSortBy] = useState<"alpha" | "recent" | "oldest">("recent");

    // Real follower data will come from API when Instagram is connected
    const followers: Array<{ id: string; followerUsername: string; isFollowingBack: boolean }> = [];
    const isConnected = false;

    const filters: { value: FilterType; label: string; icon: typeof Users }[] = [
        { value: "all", label: "All", icon: Users },
        { value: "following_back", label: "Following Back", icon: UserCheck },
        { value: "not_following_back", label: "Not Following Back", icon: UserX },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Followers</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {followers.length} total followers
                    </p>
                </div>
                <Button variant="outline" size="sm" disabled={!isConnected}>
                    <Download className="h-4 w-4" />
                    Export
                </Button>
            </div>

            {/* Search & Filters */}
            <Card className="p-4 sm:p-6 space-y-4">
                <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Search followers..."
                />
                <div className="flex flex-wrap items-center gap-2">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${filter === f.value
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                        >
                            <f.icon className="h-3.5 w-3.5" />
                            {f.label}
                        </button>
                    ))}
                    <div className="ml-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="rounded-lg border bg-card px-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="recent">Most Recent</option>
                            <option value="alpha">Alphabetical</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Empty State */}
            <EmptyState
                icon={Instagram}
                title={isConnected ? "No followers found" : "Connect Instagram"}
                description={
                    isConnected
                        ? "Try adjusting your search or filters."
                        : "Connect your Instagram account to see your followers here."
                }
            />
        </motion.div>
    );
}
