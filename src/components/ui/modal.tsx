"use client";

import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
}

const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
};

export function Modal({ isOpen, onClose, title, children, className, size = "md" }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className={cn(
                            "relative w-full rounded-2xl border bg-card p-6 shadow-xl",
                            sizes[size],
                            className
                        )}
                    >
                        {title && (
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
