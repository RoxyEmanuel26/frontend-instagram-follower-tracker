"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/ui/search-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { UserCheck, Download, Heart } from "lucide-react";

// Mock data
const mockMutuals = Array.from({ length: 15 }, (_, i) => ({
    id: `mutual-${i}`,
    mutualUsername: `mutual_user_${i + 1}`,
    mutualId: `ig-m-${i}`,
    cachedAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export default function MutualsPage() {
    const [search, setSearch] = useState("");

    const mutuals = mockMutuals.filter((m) =>
        search ? m.mutualUsername.toLowerCase().includes(search.toLowerCase()) : true
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Mutuals</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {mockMutuals.length} mutual followers
                    </p>
                </div>
                <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
            </div>

            <Card className="p-4 sm:p-6">
                <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Search mutuals..."
                />
            </Card>

            {mutuals.length === 0 ? (
                <EmptyState
                    icon={UserCheck}
                    title="No mutuals found"
                    description="Try adjusting your search."
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {mutuals.map((mutual, i) => (
                        <motion.div
                            key={mutual.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                        >
                            <Card hover className="p-3 sm:p-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar
                                            alt={mutual.mutualUsername}
                                            fallback={mutual.mutualUsername}
                                            size="md"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-success p-0.5">
                                            <Heart className="h-2.5 w-2.5 text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">
                                            @{mutual.mutualUsername}
                                        </p>
                                        <Badge variant="success" className="mt-1">
                                            <UserCheck className="h-3 w-3" />
                                            Mutual
                                        </Badge>
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
