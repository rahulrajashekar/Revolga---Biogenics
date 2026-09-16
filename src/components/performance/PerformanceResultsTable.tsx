"use client";

import React from "react";
import { UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PerformanceResult, PerformanceStatus } from "@/lib/performanceCalculation";
import { cn } from "@/lib/utils";

const statusLabel: Record<PerformanceStatus, string> = {
  below: "Below Target",
  "on-target": "On Target",
  exceeded: "Exceeded Target",
};

const statusBadgeVariant: Record<PerformanceStatus, "danger" | "info" | "success"> = {
  below: "danger",
  "on-target": "info",
  exceeded: "success",
};

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function PerformanceResultsTable({ results }: { results: PerformanceResult[] }) {
  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden sm:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-right">Target</th>
                <th className="p-3 text-right">Achieved</th>
                <th className="p-3 text-right">Achievement %</th>
                <th className="p-3 text-right">Performance Salary</th>
                <th className="p-3 text-right">Incentive</th>
                <th className="p-3 text-right">Total Payout</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((r) => (
                <tr key={r.key} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <UserRound className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{r.employeeName}</p>
                        <p className="text-[10px] text-slate-400">{r.employeeCode} &middot; {r.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600">{r.month}</td>
                  <td className="p-3 text-right text-slate-600">{r.target.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right text-slate-600">{r.achievement.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right">
                    <span className={cn("font-bold", r.achievementPercent < 90 ? "text-rose-600" : r.achievementPercent > 105 ? "text-emerald-600" : "text-blue-600")}>
                      {r.achievementPercent}%
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-700">{formatCurrency(r.performanceSalary)}</td>
                  <td className="p-3 text-right font-semibold text-emerald-700">{formatCurrency(r.incentive)}</td>
                  <td className="p-3 text-right font-bold text-slate-900">{formatCurrency(r.totalPayout)}</td>
                  <td className="p-3 text-center">
                    <Badge variant={statusBadgeVariant[r.status]} className="text-[9px]">{statusLabel[r.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {results.map((r) => (
          <Card key={r.key}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <UserRound className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{r.employeeName}</p>
                    <p className="text-[10px] text-slate-400">{r.employeeCode} &middot; {r.month}</p>
                  </div>
                </div>
                <Badge variant={statusBadgeVariant[r.status]} className="text-[9px] shrink-0">{statusLabel[r.status]}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Target</p>
                  <p className="text-xs font-bold text-slate-800">{r.target.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Achieved</p>
                  <p className="text-xs font-bold text-slate-800">{r.achievement.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Achv. %</p>
                  <p className="text-xs font-bold text-slate-800">{r.achievementPercent}%</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Perf. Salary</p>
                  <p className="text-xs font-bold text-slate-800">{formatCurrency(r.performanceSalary)}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Incentive</p>
                  <p className="text-xs font-bold text-emerald-700">{formatCurrency(r.incentive)}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">Total</p>
                  <p className="text-xs font-bold text-slate-900">{formatCurrency(r.totalPayout)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
