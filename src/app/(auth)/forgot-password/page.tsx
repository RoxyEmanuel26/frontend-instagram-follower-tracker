"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { forgotPassword } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const forgotSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotForm>({
        resolver: zodResolver(forgotSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: ForgotForm) => {
        setLoading(true);
        try {
            await forgotPassword(data.email);
            setSubmitted(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to send reset email";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {!submitted ? (
                <>
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold">Forgot Password</h1>
                        <p className="text-muted-foreground text-sm mt-2">
                            Enter your email and we&apos;ll send you a reset link
                        </p>
                    </div>

                    <Card className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                error={errors.email?.message}
                                {...register("email")}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                loading={loading}
                                disabled={!isValid || loading}
                            >
                                <Mail className="h-4 w-4" />
                                Send Reset Link
                            </Button>
                        </form>
                    </Card>
                </>
            ) : (
                <Card className="p-8 sm:p-10 text-center">
                    <div className="rounded-2xl bg-success/10 p-4 w-fit mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-success" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                    <p className="text-muted-foreground text-sm mb-6">
                        If an account with that email exists, we&apos;ve sent a password reset link.
                    </p>
                </Card>
            )}

            <p className="text-center mt-6">
                <Link href="/login" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Sign In
                </Link>
            </p>
        </motion.div>
    );
}
