import { api } from "./api";
import type { LoginResponse, RegisterResponse, User } from "@/types";

export async function loginUser(email: string, password: string, twoFactorCode?: string) {
    const res = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
        twoFactorCode,
    });
    if (res.data?.accessToken) {
        api.setAccessToken(res.data.accessToken);
    }
    return res.data!;
}

export async function registerUser(email: string, password: string, confirmPassword: string) {
    const res = await api.post<RegisterResponse>("/auth/register", {
        email,
        password,
        confirmPassword,
    });
    return res.data!;
}

export async function verifyEmail(token: string) {
    const res = await api.post<{ message: string }>("/auth/verify-email", { token });
    return res.data!;
}

export async function resendVerification(email: string) {
    const res = await api.post<{ message: string }>("/auth/resend-verification", { email });
    return res.data!;
}

export async function forgotPassword(email: string) {
    const res = await api.post<{ message: string }>("/auth/forgot-password", { email });
    return res.data!;
}

export async function resetPassword(token: string, password: string, confirmPassword: string) {
    const res = await api.post<{ message: string }>("/auth/reset-password", {
        token,
        password,
        confirmPassword,
    });
    return res.data!;
}

export async function googleAuth(idToken: string) {
    const res = await api.post<LoginResponse>("/auth/google", { idToken });
    if (res.data?.accessToken) {
        api.setAccessToken(res.data.accessToken);
    }
    return res.data!;
}

export async function getMe() {
    const res = await api.get<User>("/auth/me");
    return res.data!;
}

export async function logout() {
    await api.post("/auth/logout");
    api.setAccessToken(null);
}

export async function enable2FA() {
    const res = await api.post<{ secret: string; qrCode: string }>("/auth/enable-2fa");
    return res.data!;
}

export async function verify2FA(code: string, secret?: string) {
    const res = await api.post<{ message: string }>("/auth/verify-2fa", { code, secret });
    return res.data!;
}
