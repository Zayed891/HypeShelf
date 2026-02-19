"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const icons: Record<ToastType, string> = {
        success: "✓",
        error: "✕",
        info: "ℹ",
    };

    const colors: Record<ToastType, string> = {
        success: "border-green-500/30 bg-neutral-900 text-green-400",
        error: "border-red-500/30 bg-neutral-900 text-red-400",
        info: "border-white/20 bg-neutral-900 text-white",
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast container */}
            <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium shadow-xl animate-in slide-in-from-bottom-2 duration-300 ${colors[t.type]}`}
                    >
                        <span className="text-base">{icons[t.type]}</span>
                        <span className="text-white">{t.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

/** Use this hook inside any client component to show toast notifications. */
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx.toast;
}
