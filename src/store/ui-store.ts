import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "@/types";

interface UIState {
    theme: Theme;
    sidebarOpen: boolean;
    setTheme: (theme: Theme) => void;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: "dark",
            sidebarOpen: true,
            setTheme: (theme) => set({ theme }),
            toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),
        }),
        {
            name: "ui-storage",
            partialize: (state) => ({
                theme: state.theme,
                sidebarOpen: state.sidebarOpen,
            }),
        }
    )
);
