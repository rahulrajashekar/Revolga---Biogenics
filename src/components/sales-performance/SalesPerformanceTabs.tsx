"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UploadCloud, Percent, Wallet, FileBarChart } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview", href: "/sales-performance", icon: LayoutDashboard },
  { id: "employees", label: "Employees", href: "/sales-performance/employees", icon: Users },
  { id: "upload", label: "Excel Upload", href: "/sales-performance/upload", icon: UploadCloud },
  { id: "incentives", label: "Incentives", href: "/sales-performance/incentives", icon: Percent },
  { id: "salary", label: "Salary / Payout", href: "/sales-performance/salary", icon: Wallet },
  { id: "reports", label: "Reports", href: "/sales-performance/reports", icon: FileBarChart },
];

/** Local sub-navigation for the Sales Performance module, mirroring the tab pattern used on /inventory. */
export function SalesPerformanceTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 flex-wrap">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.href === "/sales-performance" ? pathname === tab.href : pathname?.startsWith(tab.href);
        return (
          <Link key={tab.id} href={tab.href}>
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all",
                isActive ? "text-white bg-brand-gradient border-transparent shadow-brand-glow" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
