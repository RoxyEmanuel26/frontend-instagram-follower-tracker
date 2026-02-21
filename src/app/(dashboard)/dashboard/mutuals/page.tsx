"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/ui/search-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { UserCheck, Download, Instagram } from "lucide-react";

export default function MutualsPage() {
    const [search, setSearch] = useState("");

    // Real mutual data will come from API when Instagram is connected
    const mutuals: Array<{ id: string; mutualUsername: string }> = [];
    const isConnected = false;

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
                        {mutuals.length} mutual followers
                    </p>
                </div>
                <Button variant="outline" size="sm" disabled={!isConnected}>
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

            {/* Empty State */}
            <EmptyState
                icon={Instagram}
                title={isConnected ? "No mutuals found" : "Connect Instagram"}
                description={
                    isConnected
                        ? "Try adjusting your search."
                        : "Connect your Instagram account to see your mutual followers here."
                }
            />
        </motion.div>
    );
}
