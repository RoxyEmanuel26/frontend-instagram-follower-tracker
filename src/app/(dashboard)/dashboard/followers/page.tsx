"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/ui/search-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonList } from "@/components/ui/skeleton";
import { Users, Download, Filter, UserCheck, UserX } from "lucide-react";

// Mock data for display
const mockFollowers = Array.from({ length: 20 }, (_, i) => ({
    id: `follower-${i}`,
    followerUsername: `user_${i + 1}`,
    followerId: `ig-${i}`,
    profilePictureUrl: null,
    cachedAt: new Date().toISOString(),
    isFollowingBack: i % 3 !== 0,
}));

type FilterType = "all" | "following_back" | "not_following_back";

export default function FollowersPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");
    const [sortBy, setSortBy] = useState<"alpha" | "recent" | "oldest">("recent");

    const followers = mockFollowers.filter((f) => {
        if (search && !f.followerUsername.toLowerCase().includes(search.toLowerCase())) return false;
        if (filter === "following_back" && !f.isFollowingBack) return false;
        if (filter === "not_following_back" && f.isFollowingBack) return false;
        return true;
    });

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
                        {mockFollowers.length} total followers
                    </p>
                </div>
                <Button variant="outline" size="sm">
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

            {/* Followers List */}
            {followers.length === 0 ? (
                <EmptyState
                    icon={Users}
                    title="No followers found"
                    description="Try adjusting your search or filters."
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {followers.map((follower, i) => (
                        <motion.div
                            key={follower.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                        >
                            <Card hover className="p-3 sm:p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        src={follower.profilePictureUrl}
                                        alt={follower.followerUsername}
                                        fallback={follower.followerUsername}
                                        size="md"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">
                                            @{follower.followerUsername}
                                        </p>
                                        <div className="mt-1">
                                            {follower.isFollowingBack ? (
                                                <Badge variant="success">
                                                    <UserCheck className="h-3 w-3" />
                                                    Mutual
                                                </Badge>
                                            ) : (
                                                <Badge variant="warning">
                                                    <UserX className="h-3 w-3" />
                                                    Not Following
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
