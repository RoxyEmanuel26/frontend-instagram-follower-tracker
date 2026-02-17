"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="rounded-2xl bg-destructive/10 p-5 w-fit mx-auto mb-6">
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                </div>
                <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
                <p className="text-muted-foreground text-sm mb-8">
                    An unexpected error occurred. Please try again.
                </p>
                <Button onClick={reset} size="lg">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>
            </div>
        </div>
    );
}
