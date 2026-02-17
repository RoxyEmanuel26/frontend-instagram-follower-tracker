"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { resetPassword } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PasswordStrength } from "@/components/ui/password-strength";
import { Lock } from "lucide-react";

const resetSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(128)
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[a-z]/, "Must contain a lowercase letter")
            .regex(/[0-9]/, "Must contain a number")
            .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ResetForm = z.infer<typeof resetSchema>;

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<ResetForm>({
        resolver: zodResolver(resetSchema),
        mode: "onChange",
    });

    const password = watch("password") || "";

    const onSubmit = async (data: ResetForm) => {
        if (!token) {
            toast.error("Invalid reset link");
            return;
        }
        setLoading(true);
        try {
            await resetPassword(token, data.password, data.confirmPassword);
            toast.success("Password reset successfully!");
            router.push("/login");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Reset failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <Card className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-2">Invalid Link</h1>
                <p className="text-muted-foreground text-sm mb-4">
                    This password reset link is invalid or has expired.
                </p>
                <Link href="/forgot-password">
                    <Button>Request New Link</Button>
                </Link>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Reset Password</h1>
                <p className="text-muted-foreground text-sm mt-2">
                    Enter your new password below
                </p>
            </div>

            <Card className="p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Input
                            label="New Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register("password")}
                        />
                        <PasswordStrength password={password} />
                    </div>

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword")}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        loading={loading}
                        disabled={!isValid || loading}
                    >
                        <Lock className="h-4 w-4" />
                        Reset Password
                    </Button>
                </form>
            </Card>
        </motion.div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordContent />
        </Suspense>
    );
}
