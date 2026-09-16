import React from "react";
import { ChartPoint } from "@/lib/dashboardData";

/** SVG sparkline: a filled cyan "sales" line plus a dashed mint "orders" line, scaled to a 0–100 viewBox. */
export function MiniChart({ data }: { data: ChartPoint[] }) {
  const salesPoints = data.map((item, i) => `${(i / (data.length - 1)) * 100},${100 - item.sales}`).join(" ");
  const orderPoints = data.map((item, i) => `${(i / (data.length - 1)) * 100},${100 - item.orders}`).join(" ");

  return (
    <div
      className="h-[172px] mt-[26px] mx-0.5 relative border-b border-[rgba(0,240,255,0.14)]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,240,255,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.065) 1px, transparent 1px)",
        backgroundSize: "20% 25%",
      }}
      data-testid="dashboard-performance-chart"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[150px] overflow-visible">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${salesPoints} 100,100`} fill="url(#chartFill)" />
        <polyline points={orderPoints} fill="none" stroke="#00ffaa" strokeWidth="1.2" strokeDasharray="2 2" />
        <polyline points={salesPoints} fill="none" stroke="#00f0ff" strokeWidth="1.8" />
      </svg>
      <div className="flex justify-between text-[#5f7187] font-[family-name:var(--font-mono-display)] text-[9px] pt-1.5">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}
