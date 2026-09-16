"use client";

import React from "react";
import { Award, Briefcase, CalendarDays, MapPin, TrendingDown, TrendingUp, UserCheck } from "lucide-react";
import { Dialog, DialogBody, DialogCloseButton, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Badge } from "@/components/ui/Badge";
import { getEmployee, getManagerName, getTerritory } from "@/lib/salesPerformance/mockCore";
import { EmployeeScorecard } from "@/lib/salesPerformance/dataset";
import { cn } from "@/lib/utils";

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function Stat({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">{label}</p>
      <p className={cn("text-sm font-bold text-slate-800 mt-0.5", valueClassName)}>{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200/70 shadow-ambient p-4">
      <p className="text-xs font-bold text-slate-700 mb-3">{title}</p>
      {children}
    </div>
  );
}

export function EmployeeScorecardDialog({
  employeeId,
  scorecard,
  onClose,
}: {
  employeeId: string | null;
  scorecard: EmployeeScorecard | null;
  onClose: () => void;
}) {
  const open = Boolean(employeeId);
  const employee = employeeId ? getEmployee(employeeId) : undefined;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      {employee && scorecard && (
        <>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-brand-gradient shadow-brand-glow flex items-center justify-center text-white font-bold text-sm shrink-0">
                {employee.photoInitials}
              </div>
              <div>
                <DialogTitle>{employee.fullName}</DialogTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  {employee.employeeCode} &middot; {employee.designation}
                </p>
              </div>
            </div>
            <DialogCloseButton onClose={onClose} />
          </DialogHeader>

          <DialogBody className="space-y-4">
            {/* Employee info */}
            <Section title="Employee Information">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat label="Territory" value={getTerritory(employee.territoryId)?.name ?? "—"} />
                <Stat label="Manager" value={getManagerName(employee.managerId)} />
                <Stat label="Joining Date" value={new Date(employee.joiningDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} />
                <div>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Status</p>
                  <Badge variant={employee.status === "active" ? "success" : "secondary"} className="mt-0.5 text-[9px]">
                    {employee.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </Section>

            {/* Sales performance */}
            <Section title="Sales Performance">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat label="Monthly Target" value={formatCurrency(scorecard.current.target)} />
                <Stat label="Actual Sales" value={formatCurrency(scorecard.current.actualSales)} valueClassName="text-blue-700" />
                <Stat
                  label="Achievement %"
                  value={`${scorecard.current.achievementPercent}%`}
                  valueClassName={scorecard.current.achievementPercent < 80 ? "text-rose-600" : "text-emerald-600"}
                />
                <Stat label="Previous Month Sales" value={scorecard.previous ? formatCurrency(scorecard.previous.actualSales) : "—"} />
                <div>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Growth %</p>
                  <p className={cn("text-sm font-bold mt-0.5 flex items-center gap-1", scorecard.growthPercent >= 0 ? "text-emerald-600" : "text-rose-600")}>
                    {scorecard.growthPercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {scorecard.growthPercent}%
                  </p>
                </div>
                <Stat label="Number of Orders" value={String(scorecard.current.orders)} />
                <Stat label="Avg. Order Value" value={formatCurrency(scorecard.current.averageOrderValue)} />
              </div>
            </Section>

            {/* Field activity */}
            <Section title="Field Activity">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <Stat label="Customer Visits" value={String(scorecard.current.customerVisits)} />
                <Stat label="New Cust. Visits" value={String(scorecard.current.newCustomerVisits)} />
                <Stat label="Follow-ups" value={String(scorecard.current.followUps)} />
                <Stat label="Presentations" value={String(scorecard.current.productPresentations)} />
                <Stat label="Working Days" value={String(scorecard.current.workingDays)} />
              </div>
            </Section>

            {/* Collection */}
            <Section title="Collection">
              <div className="grid grid-cols-3 gap-4">
                <Stat label="Collection Target" value={formatCurrency(scorecard.current.collectionTarget)} />
                <Stat label="Actual Collection" value={formatCurrency(scorecard.current.collectionActual)} />
                <Stat
                  label="Collection Achv. %"
                  value={`${scorecard.current.collectionAchievementPercent}%`}
                  valueClassName={scorecard.current.collectionAchievementPercent < 75 ? "text-rose-600" : "text-emerald-600"}
                />
              </div>
            </Section>

            {/* Incentive breakdown */}
            <Section title="Incentive Breakdown">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Sales Incentive ({scorecard.incentive.incentiveRatePercent}% of sales)</span><span className="font-semibold text-slate-800">{formatCurrency(scorecard.incentive.salesIncentive)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Collection Incentive</span><span className="font-semibold text-slate-800">{formatCurrency(scorecard.incentive.collectionIncentive)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">New Customer Incentive</span><span className="font-semibold text-slate-800">{formatCurrency(scorecard.incentive.newCustomerIncentive)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Performance Bonus</span><span className="font-semibold text-slate-800">{formatCurrency(scorecard.incentive.performanceBonus)}</span></div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 mt-1.5"><span className="font-bold text-slate-800">Total Incentive</span><span className="font-extrabold text-emerald-700">{formatCurrency(scorecard.incentive.totalIncentive)}</span></div>
              </div>
            </Section>

            {/* Overall performance score */}
            <Section title="Overall Performance Score (demo weighting)">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white border-4 border-blue-500 shadow-brand-glow flex items-center justify-center shrink-0">
                  <span className="text-lg font-extrabold text-brand-gradient">{scorecard.overallScore}</span>
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
                  <div className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-slate-400" /> Sales {scorecard.scoreComponents.salesAchievement}</div>
                  <div className="flex items-center gap-1"><Award className="w-3 h-3 text-slate-400" /> Collection {scorecard.scoreComponents.collection}</div>
                  <div className="flex items-center gap-1"><UserCheck className="w-3 h-3 text-slate-400" /> New Cust. {scorecard.scoreComponents.newCustomers}</div>
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> Field {scorecard.scoreComponents.fieldActivity}</div>
                  <div className="flex items-center gap-1"><CalendarDays className="w-3 h-3 text-slate-400" /> Growth {scorecard.scoreComponents.growth}</div>
                </div>
              </div>
            </Section>

            {/* Salary summary */}
            <Section title="Salary Summary">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-500"><Briefcase className="w-3.5 h-3.5" /> Net Pay this month</span>
                <span className="text-base font-extrabold text-slate-900">{formatCurrency(scorecard.salary.netPay)}</span>
              </div>
            </Section>
          </DialogBody>
        </>
      )}
    </Dialog>
  );
}
