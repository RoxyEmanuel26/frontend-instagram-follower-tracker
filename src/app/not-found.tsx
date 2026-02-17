"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <div className="rounded-2xl bg-primary/10 p-5 w-fit mx-auto mb-6">
                    <SearchX className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-6xl sm:text-7xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-muted-foreground text-sm mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/">
                    <Button size="lg">
                        <Home className="h-4 w-4" />
                        Go Home
                    </Button>
                </Link>
            </motion.div>

            {/* Decorative gradient orbs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
            </div>
        </div>
    );
}
