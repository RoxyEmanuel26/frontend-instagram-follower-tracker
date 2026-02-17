"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { verifyEmail } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setErrorMessage("Invalid verification link. No token provided.");
            return;
        }

        const verify = async () => {
            try {
                await verifyEmail(token);
                setStatus("success");
                toast.success("Email verified successfully!");
                setTimeout(() => router.push("/login"), 3000);
            } catch (err: unknown) {
                setStatus("error");
                setErrorMessage(err instanceof Error ? err.message : "Verification failed");
            }
        };

        verify();
    }, [token, router]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="p-8 sm:p-10 text-center">
                {status === "loading" && (
                    <>
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Verifying Your Email</h1>
                        <p className="text-muted-foreground text-sm">Please wait...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="rounded-2xl bg-success/10 p-4 w-fit mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-success" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
                        <p className="text-muted-foreground text-sm mb-6">
                            Your email has been verified. Redirecting to login...
                        </p>
                        <Link href="/login">
                            <Button className="w-full">Go to Login</Button>
                        </Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="rounded-2xl bg-destructive/10 p-4 w-fit mx-auto mb-6">
                            <XCircle className="h-10 w-10 text-destructive" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
                        <p className="text-muted-foreground text-sm mb-6">{errorMessage}</p>
                        <div className="space-y-3">
                            <Link href="/register">
                                <Button variant="outline" className="w-full">
                                    Create New Account
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="ghost" className="w-full">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </Card>
        </motion.div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense>
            <VerifyEmailContent />
        </Suspense>
    );
}
