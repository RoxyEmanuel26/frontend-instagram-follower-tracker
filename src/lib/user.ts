import { api } from "./api";
import type { User, Session } from "@/types";

export async function getProfile() {
    const res = await api.get<User>("/user/profile");
    return res.data!;
}

export async function updateProfile(data: { name?: string }) {
    const res = await api.patch<User>("/user/profile", data);
    return res.data!;
}

export async function changePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    const res = await api.put<{ message: string }>("/user/password", {
        currentPassword,
        newPassword,
        confirmPassword,
    });
    return res.data!;
}

export async function listSessions() {
    const res = await api.get<Session[]>("/user/sessions");
    return res.data!;
}

export async function revokeSession(sessionId: string) {
    const res = await api.delete<{ message: string }>(`/user/sessions/${sessionId}`);
    return res.data!;
}

export async function deleteAccount(password: string) {
    const res = await api.delete<{ message: string }>("/user/account");
    return res.data!;
}
