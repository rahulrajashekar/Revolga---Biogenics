"use client";

import React from "react";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MonthlyTrendPoint } from "@/lib/salesPerformance/types";

function formatCompactCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

interface TooltipPayloadItem {
  color?: string;
  name?: string;
  value?: number | string;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/95 backdrop-blur-sm px-3 py-2 shadow-ambient-lg text-xs">
      <p className="font-semibold text-slate-800 mb-1">{label}</p>
      {payload.map((item, i) => (
        <p key={i} style={{ color: item.color }} className="font-medium">
          {item.name}: {typeof item.value === "number" && item.name !== "Achievement %" ? formatCompactCurrency(item.value) : `${item.value}%`}
        </p>
      ))}
    </div>
  );
}

/** Monthly target vs. actual sales, with an achievement % trend line — built on the project's existing recharts dependency. */
export function SalesVsTargetChart({ data }: { data: MonthlyTrendPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="salesActualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="monthLabel" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
          <YAxis
            yAxisId="left"
            tickFormatter={formatCompactCurrency}
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={56}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<ChartTooltip />} />
          <Bar yAxisId="left" dataKey="target" name="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={22} />
          <Bar yAxisId="left" dataKey="actual" name="Actual Sales" fill="url(#salesActualGradient)" radius={[4, 4, 0, 0]} barSize={22} />
          <Line yAxisId="right" type="monotone" dataKey="achievementPercent" name="Achievement %" stroke="#059669" strokeWidth={2.5} dot={{ r: 3, fill: "#059669" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
