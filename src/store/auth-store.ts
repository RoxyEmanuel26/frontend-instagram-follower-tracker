import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { api } from "@/lib/api";
import * as authApi from "@/lib/auth";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    setUser: (user: User | null) => void;
    login: (email: string, password: string, twoFactorCode?: string) => Promise<{ requires2FA?: boolean }>;
    register: (email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    googleLogin: (idToken: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: true,

            setUser: (user) =>
                set({ user, isAuthenticated: !!user, isLoading: false }),

            login: async (email, password, twoFactorCode) => {
                const result = await authApi.loginUser(email, password, twoFactorCode);
                if (result.requires2FA) {
                    return { requires2FA: true };
                }
                set({ user: result.user, isAuthenticated: true, isLoading: false });
                return {};
            },

            register: async (email, password, confirmPassword) => {
                await authApi.registerUser(email, password, confirmPassword);
            },

            logout: async () => {
                try {
                    await authApi.logout();
                } catch {
                    // Proceed with logout even if API call fails
                }
                api.setAccessToken(null);
                set({ user: null, isAuthenticated: false, isLoading: false });
            },

            fetchUser: async () => {
                try {
                    set({ isLoading: true });
                    const user = await authApi.getMe();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch {
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },

            googleLogin: async (idToken) => {
                const result = await authApi.googleAuth(idToken);
                set({ user: result.user, isAuthenticated: true, isLoading: false });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
