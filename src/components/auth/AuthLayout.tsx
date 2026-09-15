import React from "react";
import { Sparkles, Boxes, Receipt, Users } from "lucide-react";
import { revolgaBiogenicsConfig } from "@/config/businesses/revolga-biogenics";

const FEATURES = [
  { icon: Boxes, label: "Inventory & stock tracking" },
  { icon: Receipt, label: "Sales & purchase billing" },
  { icon: Users, label: "Role-based team access" },
];

/**
 * Full-page authentication shell (split-screen brand panel + form panel).
 * Deliberately excludes the app Sidebar/TopNav — see AppShell, which skips
 * its normal chrome for `/auth/*` routes.
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Brand panel — desktop only */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[38%] bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white p-10 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" aria-hidden="true" />

        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-md shrink-0">
            RB
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight text-sm flex items-center gap-1">
              Revolga Biogenics <Sparkles className="w-3 h-3 text-sky-400 fill-sky-400" />
            </span>
            <span className="text-[10px] text-sky-400 tracking-wider uppercase font-medium">Medical &amp; Healthcare</span>
          </div>
        </div>

        <div className="relative space-y-6">
          <p className="text-2xl font-bold leading-snug text-white max-w-sm">
            {revolgaBiogenicsConfig.branding.tagline}
          </p>
          <ul className="space-y-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-sky-300" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[11px] text-slate-500">Revolga Biogenics Management System</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md py-8">{children}</div>
      </div>
    </div>
  );
}
