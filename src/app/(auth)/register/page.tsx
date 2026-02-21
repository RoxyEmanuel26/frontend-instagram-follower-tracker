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
import { signInWithGoogle } from "@/lib/google-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PasswordStrength } from "@/components/ui/password-strength";
import { UserPlus } from "lucide-react";

const registerSchema = z
    .object({
        email: z.string().email("Invalid email address").max(254),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(128, "Password must not exceed 128 characters")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[a-z]/, "Must contain a lowercase letter")
            .regex(/[0-9]/, "Must contain a number")
            .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
        confirmPassword: z.string(),
        agreeTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const registerUser = useAuthStore((s) => s.register);
    const googleLogin = useAuthStore((s) => s.googleLogin);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const password = watch("password") || "";
    const email = watch("email");

    const onSubmit = async (data: RegisterForm) => {
        setLoading(true);
        try {
            await registerUser(data.email, data.password, data.confirmPassword);
            toast.success("Account created! Check your email for verification.");
            router.push("/verify-email-sent?email=" + encodeURIComponent(data.email));
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Registration failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            await signInWithGoogle(async (idToken) => {
                try {
                    await googleLogin(idToken);
                    toast.success("Welcome!");
                    router.push("/dashboard");
                } catch (err: unknown) {
                    const message = err instanceof Error ? err.message : "Google sign in failed";
                    toast.error(message);
                } finally {
                    setGoogleLoading(false);
                }
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Google sign in failed";
            toast.error(message);
            setGoogleLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Create Account</h1>
                <p className="text-muted-foreground text-sm mt-2">
                    Start tracking your Instagram followers today
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

                    <div className="space-y-2">
                        <Input
                            label="Password"
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

                    <label className="flex items-start gap-2.5 text-sm">
                        <input
                            type="checkbox"
                            className="mt-1 rounded border-border"
                            {...register("agreeTerms")}
                        />
                        <span className="text-muted-foreground">
                            I agree to the{" "}
                            <Link href="/terms-of-service" className="text-primary hover:underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy-policy" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    {errors.agreeTerms && (
                        <p className="text-xs text-destructive -mt-3">{errors.agreeTerms.message}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        loading={loading}
                        disabled={!isValid || loading}
                    >
                        <UserPlus className="h-4 w-4" />
                        Create Account
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

                <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleGoogleSignIn}
                    loading={googleLoading}
                    disabled={googleLoading}
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Sign up with Google
                </Button>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                    Sign in
                </Link>
            </p>
        </motion.div>
    );
}
