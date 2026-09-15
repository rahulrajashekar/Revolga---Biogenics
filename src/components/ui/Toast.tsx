"use client";

import React, { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
}

let idCounter = 0;

/** Minimal self-contained toast hook — no provider wiring required. Mount `<ToastViewport />` once per page that calls `toast()`. */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = `toast-${++idCounter}`;
      setToasts((prev) => [...prev, { ...item, id }]);
      setTimeout(() => dismiss(id), 4000);
      return id;
    },
    [dismiss]
  );

  return { toasts, toast, dismiss };
}

const variantStyles: Record<NonNullable<ToastItem["variant"]>, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
};

const variantIcons: Record<NonNullable<ToastItem["variant"]>, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function ToastViewport({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 w-[calc(100vw-2rem)] sm:w-80">
      {toasts.map((t) => {
        const Icon = variantIcons[t.variant || "info"];
        return (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-2.5 rounded-xl border p-3.5 shadow-lg animate-in fade-in slide-in-from-bottom-2",
              variantStyles[t.variant || "info"]
            )}
            role="status"
          >
            <Icon className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold">{t.title}</p>
              {t.description && <p className="text-[11px] mt-0.5 opacity-90">{t.description}</p>}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="shrink-0 p-0.5 rounded hover:bg-black/5 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>,
    document.body
  );
}
