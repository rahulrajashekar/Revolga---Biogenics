"use client";

import React, { useMemo, useState } from "react";
import {
  Award, Users, Wallet, TrendingUp, ShoppingCart, UserPlus, Target, Landmark, Percent, UserCheck,
} from "lucide-react";
import { SalesPerformanceTabs } from "@/components/sales-performance/SalesPerformanceTabs";
import { KpiCard } from "@/components/sales-performance/KpiCard";
import { FilterBar, ALL_FILTERS, SalesPerformanceFilters } from "@/components/sales-performance/FilterBar";
import { SalesVsTargetChart } from "@/components/sales-performance/SalesVsTargetChart";
import { AlertsPanel } from "@/components/sales-performance/AlertsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmployeePerformanceTable, EmployeePerformanceTableRow } from "@/components/sales-performance/EmployeePerformanceTable";
import { EmployeeScorecardDialog } from "@/components/sales-performance/EmployeeScorecardDialog";
import { activeSalesEmployees, CURRENT_MONTH, getEmployee, monthLabel, SALES_EMPLOYEES } from "@/lib/salesPerformance/mockCore";
import { dashboardAlertsFor, incentivesForMonth, monthlyTrend, performanceRowsForMonth, scorecardFor } from "@/lib/salesPerformance/dataset";

function formatCompactCurrency(value: number): string {
  return `₹${(value / 100000).toFixed(2)}L`;
}

export default function SalesPerformanceOverviewPage() {
  const [filters, setFilters] = useState<SalesPerformanceFilters>({ ...ALL_FILTERS, month: CURRENT_MONTH });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const month = filters.month || CURRENT_MONTH;

  const rows = useMemo(() => {
    let base = performanceRowsForMonth(month);
    if (filters.employeeId) base = base.filter((r) => r.employeeId === filters.employeeId);
    if (filters.territoryId) base = base.filter((r) => getEmployee(r.employeeId)?.territoryId === filters.territoryId);
    if (filters.managerId) base = base.filter((r) => getEmployee(r.employeeId)?.managerId === filters.managerId);
    return base;
  }, [month, filters]);

  const incentives = useMemo(() => incentivesForMonth(month), [month]);
  const trend = useMemo(() => monthlyTrend(), []);
  const alerts = useMemo(() => dashboardAlertsFor(month), [month]);

  const tableRows: EmployeePerformanceTableRow[] = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        incentive: incentives.find((i) => i.employeeId === row.employeeId)?.totalIncentive ?? 0,
      })),
    [rows, incentives]
  );

  const totals = useMemo(() => {
    const totalSales = rows.reduce((s, r) => s + r.actualSales, 0);
    const totalTarget = rows.reduce((s, r) => s + r.target, 0);
    const totalOrders = rows.reduce((s, r) => s + r.orders, 0);
    const totalCollection = rows.reduce((s, r) => s + r.collectionActual, 0);
    const totalNewCustomers = rows.reduce((s, r) => s + r.newCustomers, 0);
    const totalIncentive = incentives.reduce((s, i) => s + i.totalIncentive, 0);
    const avgAchievement = rows.length ? rows.reduce((s, r) => s + r.achievementPercent, 0) / rows.length : 0;
    const achievementPercent = totalTarget > 0 ? (totalSales / totalTarget) * 100 : 0;
    return { totalSales, totalTarget, totalOrders, totalCollection, totalNewCustomers, totalIncentive, avgAchievement, achievementPercent };
  }, [rows, incentives]);

  const activeCount = activeSalesEmployees().length;

  const scorecard = selectedEmployeeId ? scorecardFor(selectedEmployeeId, month) : null;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-ambient">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-gradient rounded-xl shadow-brand-glow">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Sales Employee Performance</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            Territory-wide sales, collection and incentive overview for {monthLabel(month)} · Demo data for walkthrough purposes.
          </p>
        </div>
      </div>

      <SalesPerformanceTabs />

      <FilterBar filters={filters} onChange={setFilters} show={["month", "employeeId", "territoryId", "managerId"]} />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard label="Total Sales" value={formatCompactCurrency(totals.totalSales)} icon={TrendingUp} iconBg="bg-blue-100" iconColor="text-blue-600" sub={`of ${formatCompactCurrency(totals.totalTarget)} target`} />
        <KpiCard label="Monthly Target" value={formatCompactCurrency(totals.totalTarget)} icon={Target} iconBg="bg-slate-100" iconColor="text-slate-600" />
        <KpiCard
          label="Target Achievement"
          value={`${totals.achievementPercent.toFixed(1)}%`}
          icon={Percent}
          iconBg={totals.achievementPercent >= 100 ? "bg-emerald-100" : "bg-amber-100"}
          iconColor={totals.achievementPercent >= 100 ? "text-emerald-600" : "text-amber-600"}
          trend={totals.achievementPercent >= 100 ? "On/above target" : "Below target"}
          positive={totals.achievementPercent >= 100}
        />
        <KpiCard label="Total Employees" value={String(SALES_EMPLOYEES.length)} icon={Users} iconBg="bg-slate-100" iconColor="text-slate-600" sub={`${activeCount} active`} />
        <KpiCard label="Active Employees" value={String(activeCount)} icon={UserCheck} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <KpiCard label="Orders Generated" value={totals.totalOrders.toLocaleString("en-IN")} icon={ShoppingCart} iconBg="bg-indigo-100" iconColor="text-indigo-600" />
        <KpiCard label="New Customers" value={String(totals.totalNewCustomers)} icon={UserPlus} iconBg="bg-purple-100" iconColor="text-purple-600" />
        <KpiCard label="Total Collection" value={formatCompactCurrency(totals.totalCollection)} icon={Landmark} iconBg="bg-sky-100" iconColor="text-sky-600" />
        <KpiCard label="Incentive Earned" value={formatCompactCurrency(totals.totalIncentive)} icon={Wallet} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <KpiCard label="Avg. Achievement %" value={`${totals.avgAchievement.toFixed(1)}%`} icon={Award} iconBg="bg-blue-100" iconColor="text-blue-600" />
      </div>

      {/* Sales vs Target chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales vs. Target — 6-Month Trend</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <SalesVsTargetChart data={trend} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-3">
          <h2 className="text-sm font-bold text-slate-800 px-1">Employee Performance — {monthLabel(month)}</h2>
          <EmployeePerformanceTable rows={tableRows} onSelectEmployee={setSelectedEmployeeId} />
        </div>
        <AlertsPanel alerts={alerts} />
      </div>

      <EmployeeScorecardDialog employeeId={selectedEmployeeId} scorecard={scorecard} onClose={() => setSelectedEmployeeId(null)} />
    </div>
  );
}
