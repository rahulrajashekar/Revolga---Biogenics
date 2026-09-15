import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthAlertProps {
  variant: "error" | "success" | "info";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AuthAlertProps["variant"], string> = {
  error: "border-rose-200 bg-rose-50 text-rose-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
};

const variantIcons: Record<AuthAlertProps["variant"], React.ComponentType<{ className?: string }>> = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

/** Inline banner for auth-flow feedback (invalid credentials, reset-link sent, etc). Covers both "error" and "success" cases from one component. */
export function AuthAlert({ variant, children, className }: AuthAlertProps) {
  const Icon = variantIcons[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn("flex items-start gap-2.5 rounded-xl border p-3.5 text-sm", variantStyles[variant], className)}
    >
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
