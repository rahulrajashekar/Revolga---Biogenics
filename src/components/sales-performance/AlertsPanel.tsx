import React from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { AlertSeverity, DashboardAlert } from "@/lib/salesPerformance/types";

const SEVERITY_STYLE: Record<AlertSeverity, { icon: React.ComponentType<{ className?: string }>; iconColor: string; bg: string; border: string }> = {
  critical: { icon: XCircle, iconColor: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200/80" },
  warning: { icon: AlertTriangle, iconColor: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200/80" },
  info: { icon: Info, iconColor: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200/80" },
  success: { icon: CheckCircle2, iconColor: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200/80" },
};

export function AlertsPanel({ alerts }: { alerts: DashboardAlert[] }) {
  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center gap-2 text-sm text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No alerts — everything looks healthy this month.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Management Alerts</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {alerts.map((alert) => {
          const style = SEVERITY_STYLE[alert.severity];
          const Icon = style.icon;
          return (
            <div key={alert.id} className={cn("flex items-start gap-2.5 rounded-xl border p-3", style.bg, style.border)}>
              <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", style.iconColor)} />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800">{alert.title}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{alert.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
