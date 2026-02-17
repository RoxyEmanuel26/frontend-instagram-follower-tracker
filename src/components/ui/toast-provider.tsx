"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: "var(--card)",
                    color: "var(--card-foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "14px",
                },
                success: {
                    iconTheme: {
                        primary: "var(--success)",
                        secondary: "var(--success-foreground)",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "var(--destructive)",
                        secondary: "var(--destructive-foreground)",
                    },
                },
            }}
        />
    );
}
