"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TerritoryPerformanceRow } from "@/lib/salesPerformance/types";

function formatCompactCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

export function TerritoryChart({ data }: { data: TerritoryPerformanceRow[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="territoryActualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="territoryName" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
          <YAxis tickFormatter={formatCompactCurrency} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={56} />
          <Tooltip
            formatter={(value) => formatCompactCurrency(Number(value))}
            contentStyle={{ fontSize: 12, borderRadius: 12, border: "1px solid rgba(15, 23, 42, 0.08)", boxShadow: "0 24px 48px -20px rgba(15, 23, 42, 0.18)" }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="target" name="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={22} />
          <Bar dataKey="actualSales" name="Actual Sales" fill="url(#territoryActualGradient)" radius={[4, 4, 0, 0]} barSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
