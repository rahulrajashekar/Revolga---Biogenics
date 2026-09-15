import React from "react";
import { getPasswordStrength } from "@/lib/passwordStrength";
import { cn } from "@/lib/utils";

const levelStyles: Record<string, { bar: string; text: string }> = {
  weak: { bar: "bg-rose-500", text: "text-rose-600" },
  medium: { bar: "bg-amber-500", text: "text-amber-600" },
  strong: { bar: "bg-emerald-500", text: "text-emerald-600" },
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  const { level, score, label } = getPasswordStrength(password);
  if (level === "empty") return null;

  const style = levelStyles[level] || levelStyles.weak;
  const segments = 5;

  return (
    <div className="space-y-1" aria-live="polite">
      <div className="flex items-center gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 flex-1 rounded-full bg-slate-200 transition-colors", i < score && style.bar)}
          />
        ))}
      </div>
      <p className={cn("text-[11px] font-semibold", style.text)}>{label} password</p>
    </div>
  );
}
