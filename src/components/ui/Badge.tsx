import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "info" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-800",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/80 font-medium",
    danger: "bg-rose-50 text-rose-700 border border-rose-200/80 font-medium",
    info: "bg-blue-50 text-blue-700 border border-blue-200/80 font-medium",
    outline: "text-slate-700 border border-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
