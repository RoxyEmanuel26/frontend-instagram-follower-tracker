"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { resendVerification } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";

function VerifyEmailSentContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const [cooldown, setCooldown] = useState(0);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleResend = async () => {
        if (!email || cooldown > 0) return;
        setResending(true);
        try {
            await resendVerification(email);
            toast.success("Verification email sent!");
            setCooldown(60);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to resend";
            toast.error(message);
        } finally {
            setResending(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="p-8 sm:p-10 text-center">
                <div className="rounded-2xl bg-primary/10 p-4 w-fit mx-auto mb-6">
                    <Mail className="h-10 w-10 text-primary" />
                </div>

                <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                    We&apos;ve sent a verification link to{" "}
                    {email && <strong className="text-foreground">{email}</strong>}
                    {!email && "your email address"}. Please check your inbox and click the link to verify your account.
                </p>

                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleResend}
                        loading={resending}
                        disabled={cooldown > 0 || resending}
                    >
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
                    </Button>

                    <Link href="/login">
                        <Button variant="ghost" className="w-full">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Sign In
                        </Button>
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
}

export default function VerifyEmailSentPage() {
    return (
        <Suspense>
            <VerifyEmailSentContent />
        </Suspense>
    );
}
