"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordStrength } from "@/components/ui/password-strength";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Avatar } from "@/components/ui/avatar";
import {
    User,
    Lock,
    Shield,
    Instagram,
    Bell,
    Trash2,
    Monitor,
    Smartphone,
    LogOut,
} from "lucide-react";

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(8, "Must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain uppercase")
            .regex(/[a-z]/, "Must contain lowercase")
            .regex(/[0-9]/, "Must contain number")
            .regex(/[^A-Za-z0-9]/, "Must contain special character"),
        confirmPassword: z.string(),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type PasswordForm = z.infer<typeof passwordSchema>;

const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "instagram", label: "Instagram", icon: Instagram },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
];

export default function SettingsPage() {
    const user = useAuthStore((s) => s.user);
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        mode: "onChange",
    });

    const newPassword = watch("newPassword") || "";

    const onPasswordSubmit = async (data: PasswordForm) => {
        setLoading(true);
        try {
            toast.success("Password changed successfully!");
            reset();
        } catch {
            toast.error("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    // Sessions will be fetched from the API
    const sessions = [
        { id: "current", device: "Current Session", ip: "—", current: true, lastActive: "Now" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage your account preferences
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tabs */}
                <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 lg:w-56 shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar
                                        alt={user?.email || "User"}
                                        fallback={user?.email || "U"}
                                        size="lg"
                                    />
                                    <div>
                                        <p className="font-semibold">{user?.email?.split("@")[0]}</p>
                                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <p className="mt-1 text-sm text-muted-foreground border rounded-xl px-4 py-2.5 bg-muted/50">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Account Status</label>
                                        <div className="mt-1">
                                            <Badge variant={user?.isVerified ? "success" : "warning"}>
                                                {user?.isVerified ? "Verified" : "Unverified"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                        <div className="space-y-6">
                            {/* Change Password */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lock className="h-5 w-5" />
                                        Change Password
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-md">
                                        <Input
                                            label="Current Password"
                                            type="password"
                                            error={errors.currentPassword?.message}
                                            {...register("currentPassword")}
                                        />
                                        <div className="space-y-2">
                                            <Input
                                                label="New Password"
                                                type="password"
                                                error={errors.newPassword?.message}
                                                {...register("newPassword")}
                                            />
                                            <PasswordStrength password={newPassword} />
                                        </div>
                                        <Input
                                            label="Confirm New Password"
                                            type="password"
                                            error={errors.confirmPassword?.message}
                                            {...register("confirmPassword")}
                                        />
                                        <Button type="submit" loading={loading}>
                                            Update Password
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* 2FA */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Two-Factor Authentication
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm">
                                                {user?.twoFactorEnabled
                                                    ? "2FA is enabled on your account"
                                                    : "Add an extra layer of security"}
                                            </p>
                                            <Badge variant={user?.twoFactorEnabled ? "success" : "warning"} className="mt-1">
                                                {user?.twoFactorEnabled ? "Enabled" : "Disabled"}
                                            </Badge>
                                        </div>
                                        <Button variant={user?.twoFactorEnabled ? "outline" : "primary"} size="sm">
                                            {user?.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Active Sessions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Active Sessions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {sessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl border"
                                        >
                                            <div className="flex items-center gap-3">
                                                {session.device.includes("iPhone") ? (
                                                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <Monitor className="h-5 w-5 text-muted-foreground" />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {session.device}
                                                        {session.current && (
                                                            <Badge variant="success" className="ml-2">
                                                                Current
                                                            </Badge>
                                                        )}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {session.ip} • {session.lastActive}
                                                    </p>
                                                </div>
                                            </div>
                                            {!session.current && (
                                                <Button variant="outline" size="sm">
                                                    <LogOut className="h-3.5 w-3.5" />
                                                    Revoke
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Instagram Tab */}
                    {activeTab === "instagram" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Instagram className="h-5 w-5" />
                                    Instagram Connection
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-muted/30">
                                    <div>
                                        <p className="text-sm font-medium">No account connected</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Connect your Instagram to start tracking followers
                                        </p>
                                    </div>
                                    <Button size="sm">Connect Instagram</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    Notification Preferences
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: "New Follower Alerts", desc: "Get notified when someone follows you" },
                                    { label: "Unfollower Alerts", desc: "Get notified when someone unfollows you" },
                                    { label: "Sync Completion", desc: "Get notified when sync is complete" },
                                    { label: "Weekly Report", desc: "Receive a weekly analytics summary" },
                                ].map((pref, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                                        <div>
                                            <p className="text-sm font-medium">{pref.label}</p>
                                            <p className="text-xs text-muted-foreground">{pref.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-muted rounded-full peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                                        </label>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Danger Zone Tab */}
                    {activeTab === "danger" && (
                        <Card className="border-destructive/20">
                            <CardHeader>
                                <CardTitle className="text-destructive flex items-center gap-2">
                                    <Trash2 className="h-5 w-5" />
                                    Danger Zone
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-destructive/20 bg-destructive/5">
                                    <div>
                                        <p className="text-sm font-semibold">Delete Account</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Permanently delete your account and all associated data. This action cannot be undone.
                                        </p>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => setDeleteModalOpen(true)}
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Account"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This will permanently delete your account and all data. Type <strong>DELETE</strong> to confirm.
                    </p>
                    <Input placeholder="Type DELETE to confirm" />
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive">Delete Forever</Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
}
