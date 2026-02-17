"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, LogIn, Shield } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    twoFactorCode: z.string().length(6, "Must be 6 digits").optional().or(z.literal("")),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((s) => s.login);
    const [loading, setLoading] = useState(false);
    const [show2FA, setShow2FA] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const email = watch("email");
    const password = watch("password");

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try {
            const result = await login(
                data.email,
                data.password,
                data.twoFactorCode || undefined
            );
            if (result.requires2FA) {
                setShow2FA(true);
                toast("Please enter your 2FA code", { icon: "🔐" });
            } else {
                toast.success("Welcome back!");
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Login failed";
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
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground text-sm mt-2">
                    Sign in to your FollowTracker account
                </p>
            </div>

            <Card className="p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        valid={!!email && !errors.email}
                        {...register("email")}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        valid={!!password && !errors.password}
                        {...register("password")}
                    />

                    {show2FA && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                        >
                            <Input
                                label="Two-Factor Code"
                                placeholder="123456"
                                maxLength={6}
                                error={errors.twoFactorCode?.message}
                                {...register("twoFactorCode")}
                            />
                        </motion.div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-muted-foreground">
                            <input type="checkbox" className="rounded border-border" />
                            Remember me
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-primary hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        loading={loading}
                        disabled={!isValid || loading}
                    >
                        <LogIn className="h-4 w-4" />
                        {show2FA ? "Verify & Sign In" : "Sign In"}
                    </Button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-3 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button variant="outline" className="w-full" size="lg">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Sign in with Google
                </Button>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary font-medium hover:underline">
                    Create one
                </Link>
            </p>
        </motion.div>
    );
}
