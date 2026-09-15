import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

/** Brand mark + page title, shown at the top of every auth screen (matches the Sidebar's RB branding). */
export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-md shrink-0">
          RB
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 tracking-tight text-sm flex items-center gap-1">
            Revolga Biogenics <Sparkles className="w-3 h-3 text-sky-500 fill-sky-500" />
          </span>
          <span className="text-[10px] text-sky-600 tracking-wider uppercase font-medium">
            Medical &amp; Healthcare
          </span>
        </div>
      </Link>

      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1.5">{subtitle}</p>}
      </div>
    </div>
  );
}
