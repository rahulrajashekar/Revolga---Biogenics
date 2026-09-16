import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg?: string;
  iconColor?: string;
  sub?: string;
  trend?: string;
  positive?: boolean | null;
}

/** Compact KPI tile used across the Sales Performance dashboard's top metric row. */
export function KpiCard({ label, value, icon: Icon, iconBg = "bg-blue-100", iconColor = "text-blue-600", sub, trend, positive }: KpiCardProps) {
  return (
    <Card className="hover:-translate-y-0.5">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{value}</p>
          </div>
          <div className={cn("p-2 rounded-xl shrink-0 shadow-sm", iconBg)}>
            <Icon className={cn("w-4 h-4", iconColor)} />
          </div>
        </div>
        {(sub || trend) && (
          <div className="mt-2 flex items-center justify-between text-[11px]">
            {sub && <span className="text-slate-500">{sub}</span>}
            {trend && (
              <span
                className={cn(
                  "font-semibold",
                  positive === true ? "text-emerald-600" : positive === false ? "text-rose-600" : "text-slate-400"
                )}
              >
                {trend}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
