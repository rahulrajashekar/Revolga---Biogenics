"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Activity, UploadCloud, ShoppingCart, ChevronRight, CheckCircle2 } from "lucide-react";
import { WorkspaceShell, PageTitle, CornerMark, TinyLink } from "@/components/dashboard/WorkspaceShell";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { DASHBOARD_KPIS, REVENUE_CHART, RECENT_ACTIVITY, QUICK_ACTIONS, KpiAccent, ActivityStatus } from "@/lib/dashboardData";

const ACCENT_BORDER: Record<KpiAccent, string> = {
  cyan: "border-[rgba(0,240,255,0.14)]",
  mint: "border-[rgba(0,255,170,0.16)]",
  amber: "border-[rgba(255,184,0,0.16)]",
  rose: "border-[rgba(255,59,92,0.16)]",
};

const ACCENT_DOT: Record<KpiAccent, string> = {
  cyan: "bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]",
  mint: "bg-[#00ffaa] shadow-[0_0_8px_#00ffaa]",
  amber: "bg-[#ffb800] shadow-[0_0_8px_#ffb800]",
  rose: "bg-[#ff3b5c] shadow-[0_0_8px_#ff3b5c]",
};

const ACTIVITY_STYLE: Record<ActivityStatus, string> = {
  verified: "text-[#00ffaa] bg-[rgba(0,255,170,0.1)]",
  review: "text-[#ffb800] bg-[rgba(255,184,0,0.1)]",
  alert: "text-[#ff3b5c] bg-[rgba(255,59,92,0.1)]",
};

const QUICK_ACTION_ICONS = [UploadCloud, ShoppingCart];

/**
 * Computed client-side only, in an effect. This page is statically
 * prerendered, so `new Date()` at module/render scope would freeze to the
 * build date instead of showing the actual current date to visitors.
 */
function useTodayLabel(): string | null {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const update = () =>
      setLabel(
        new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(new Date())
      );
    update();
  }, []);
  return label;
}

const cardBase =
  "relative overflow-hidden border rounded-none bg-[linear-gradient(135deg,rgba(18,26,46,0.86),rgba(9,16,29,0.86))] shadow-[0_16px_40px_rgba(0,0,0,0.13)] backdrop-blur-[14px]";

export default function DashboardPage() {
  const todayLabel = useTodayLabel();
  const totalSalesGrowth =
    (((REVENUE_CHART[REVENUE_CHART.length - 1].sales - REVENUE_CHART[0].sales) / REVENUE_CHART[0].sales) * 100).toFixed(1) + "%";

  return (
    <WorkspaceShell>
      <PageTitle
        eyebrow="EXECUTIVE OVERVIEW / 01"
        title="Operations overview"
        description="One high-signal view of the sales, stock and orders moving Revolga Biogenics forward."
        action={
          <div className="flex items-center gap-2 text-[#7890a3] font-[family-name:var(--font-mono-display)] text-[9px] whitespace-nowrap pb-1.5">
            <CalendarDays size={14} className="text-[#00f0ff]" /> {todayLabel ?? "—"}
          </div>
        }
      />

      {/* KPI grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3.5" data-testid="dashboard-kpi-grid">
        {DASHBOARD_KPIS.map((kpi) => (
          <div key={kpi.label} className={`${cardBase} ${ACCENT_BORDER[kpi.accent]} px-5 pt-[19px] pb-[17px] min-h-[134px]`}>
            <CornerMark />
            <div className="flex items-center gap-2 text-[#8294aa] text-[9px] tracking-[0.1em] uppercase">
              <span className={`h-1 w-1 rounded-full inline-block ${ACCENT_DOT[kpi.accent]}`} />
              {kpi.label}
            </div>
            <p className="mt-3.5 font-[family-name:var(--font-grotesk)] font-medium text-[34px] leading-[0.9] tracking-[-0.04em] text-[#f8fafc]">
              {kpi.value}
            </p>
            <div className="mt-3.5 flex items-center gap-1.5 text-[#5f7187] text-[9px]">
              <span className="text-[#00ffaa] font-[family-name:var(--font-mono-display)]">{kpi.delta}</span>
              vs last cycle
            </div>
          </div>
        ))}
      </section>

      {/* Telemetry + system health */}
      <div className="grid lg:grid-cols-[1.65fr_0.85fr] gap-3.5">
        <div className={`${cardBase} border-[rgba(0,240,255,0.14)] p-6 min-h-[328px]`}>
          <div className="flex justify-between items-start gap-3.5">
            <div>
              <div className="flex items-center gap-2.5 text-[#00f0ff] text-[9px] tracking-[0.16em]">
                <span className="w-[19px] h-px bg-[#00f0ff] shadow-[0_0_7px_#00f0ff]" /> PORTFOLIO SIGNAL / 06 MONTHS
              </div>
              <h2 className="mt-2 font-[family-name:var(--font-grotesk)] font-medium text-[19px] leading-[1.15] tracking-[-0.02em] text-[#ecf8ff]">
                System telemetry
              </h2>
            </div>
            <div className="flex gap-3.5 text-[#74889d] text-[9px] pt-1">
              <span className="flex items-center gap-1.5">
                <span className="h-[5px] w-[5px] rounded-full bg-[#00f0ff] shadow-[0_0_7px_#00f0ff]" /> Sales
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-[5px] w-[5px] rounded-full bg-[#00ffaa] shadow-[0_0_7px_#00ffaa]" /> Orders
              </span>
            </div>
          </div>

          <MiniChart data={REVENUE_CHART} />

          <div className="flex items-center gap-5 text-[#708298] text-xs mt-[17px]">
            <span className="text-[#d8edf6] font-[family-name:var(--font-mono-display)] font-medium text-[13px]">
              {totalSalesGrowth}
            </span>
            growth since {REVENUE_CHART[0].label}
            <div className="ml-auto">
              <TinyLink>View source data</TinyLink>
            </div>
          </div>
        </div>

        <div className={`${cardBase} border-[rgba(0,240,255,0.14)] p-6 min-h-[328px]`}>
          <h2 className="font-[family-name:var(--font-grotesk)] font-medium text-[19px] leading-[1.15] tracking-[-0.02em] text-[#ecf8ff]">
            Inventory health
          </h2>

          <div className="h-[182px] grid place-items-center relative">
            <div
              className="absolute rounded-full border border-[rgba(0,240,255,0.2)]"
              style={{ width: 155, height: 94, transform: "rotate(-25deg) skewX(-10deg)" }}
            />
            <div
              className="absolute rounded-full border border-[rgba(0,255,170,0.2)]"
              style={{ width: 112, height: 66, transform: "rotate(32deg) skewX(-8deg)" }}
            />
            <div className="relative h-[66px] w-[66px] rounded-full grid place-items-center text-[#00f0ff] bg-[rgba(0,240,255,0.09)] border border-[rgba(0,240,255,0.5)] shadow-[0_0_30px_rgba(0,240,255,0.16),inset_0_0_20px_rgba(0,240,255,0.08)]">
              <span className="font-[family-name:var(--font-mono-display)] text-[15px] text-[#f8fafc]">94%</span>
            </div>
            <span className="absolute bottom-[18px] font-[family-name:var(--font-mono-display)] text-[8px] tracking-[0.13em] text-[#698096]">
              STOCK ACCURACY
            </span>
          </div>

          <div className="border-t border-[rgba(0,240,255,0.11)] pt-3.5 flex items-center gap-1.5 text-[#6e8195] text-xs">
            <strong className="text-[#c9dae4] font-medium mr-auto">Last synced 2 min ago</strong>
            <span className="flex items-center gap-1.5 text-[#00ffaa] font-[family-name:var(--font-mono-display)] text-[9px]">
              <CheckCircle2 size={12} /> NO CRITICAL SHORTAGES
            </span>
          </div>
        </div>
      </div>

      {/* Recent activity + quick actions */}
      <div className="grid lg:grid-cols-[1.65fr_0.85fr] gap-3.5 mt-3.5">
        <div className={`${cardBase} border-[rgba(0,240,255,0.14)] p-6 min-h-[280px]`}>
          <h2 className="font-[family-name:var(--font-grotesk)] font-medium text-[19px] leading-[1.15] tracking-[-0.02em] text-[#ecf8ff]">
            Recent activity
          </h2>
          <div className="my-[19px]">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-center gap-2.5 py-2.5 border-b border-[rgba(0,240,255,0.08)] last:border-b-0">
                <span className={`h-[27px] w-[27px] rounded-full grid place-items-center shrink-0 ${ACTIVITY_STYLE[item.status]}`}>
                  <Activity size={14} />
                </span>
                <div className="grid gap-0.5 min-w-0">
                  <strong className="text-[#dcebf3] text-[11px] font-medium truncate">{item.title}</strong>
                  <span className="text-[#667b91] text-[10px] truncate">{item.detail}</span>
                </div>
                <span className="ml-auto text-[#60748a] text-[8px] whitespace-nowrap shrink-0">{item.time}</span>
                <ChevronRight size={14} className="text-[#50647a] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardBase} border-[rgba(0,240,255,0.14)] p-[25px] min-h-[280px]`}>
          <h2 className="font-[family-name:var(--font-grotesk)] font-medium text-[19px] leading-[1.15] tracking-[-0.02em] text-[#ecf8ff]">
            Quick actions
          </h2>
          <p className="text-[#73879b] text-[11px] leading-[1.7] max-w-[270px] my-[15px] mb-[22px]">
            Start a new workflow or bring clean data into the platform.
          </p>
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = QUICK_ACTION_ICONS[i] ?? ShoppingCart;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2.5 w-full text-[#d7e7ef] border-t border-[rgba(0,240,255,0.11)] last:border-b last:border-b-[rgba(0,240,255,0.11)] py-[13px]"
              >
                <span
                  className={`h-[30px] w-[30px] rounded-md grid place-items-center shrink-0 ${
                    i % 2 === 0 ? "text-[#00f0ff] bg-[rgba(0,240,255,0.1)]" : "text-[#00ffaa] bg-[rgba(0,255,170,0.08)]"
                  }`}
                >
                  <Icon size={15} />
                </span>
                <span className="grid gap-0.5 flex-1 min-w-0">
                  <strong className="text-[11px] font-medium">{action.title}</strong>
                  <small className="text-[#61758a] text-[9px]">{action.detail}</small>
                </span>
                <ChevronRight size={16} className="text-[#6d8196] shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </WorkspaceShell>
  );
}
