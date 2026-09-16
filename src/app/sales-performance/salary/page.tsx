"use client";

import React, { useMemo, useState } from "react";
import { Wallet, Eye } from "lucide-react";
import { SalesPerformanceTabs } from "@/components/sales-performance/SalesPerformanceTabs";
import { KpiCard } from "@/components/sales-performance/KpiCard";
import { FilterBar, ALL_FILTERS, SalesPerformanceFilters } from "@/components/sales-performance/FilterBar";
import { SalaryStatusBadge } from "@/components/sales-performance/StatusBadges";
import { PayoutDetailsDialog } from "@/components/sales-performance/PayoutDetailsDialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useToast, ToastViewport } from "@/components/ui/Toast";
import { CURRENT_MONTH, getEmployee } from "@/lib/salesPerformance/mockCore";
import { salaryForMonth } from "@/lib/salesPerformance/dataset";
import { SalaryRecord, SalaryStatus } from "@/lib/salesPerformance/types";
import { Banknote, TrendingDown, Users2 } from "lucide-react";

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export default function SalaryPayoutPage() {
  const { toasts, toast, dismiss } = useToast();
  const [filters, setFilters] = useState<SalesPerformanceFilters>({ ...ALL_FILTERS, month: CURRENT_MONTH });
  const month = filters.month || CURRENT_MONTH;

  // Local, frontend-only status overrides so Approve / Mark as Paid feel real in the demo.
  const [statusOverrides, setStatusOverrides] = useState<Record<string, SalaryStatus>>({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const baseRecords = useMemo(() => salaryForMonth(month), [month]);
  const records: SalaryRecord[] = useMemo(
    () => baseRecords.map((r) => ({ ...r, status: statusOverrides[`${r.employeeId}-${r.month}`] ?? r.status })),
    [baseRecords, statusOverrides]
  );

  const filteredRecords = useMemo(() => {
    let base = records;
    if (filters.employeeId) base = base.filter((r) => r.employeeId === filters.employeeId);
    if (filters.territoryId) base = base.filter((r) => getEmployee(r.employeeId)?.territoryId === filters.territoryId);
    if (filters.managerId) base = base.filter((r) => getEmployee(r.employeeId)?.managerId === filters.managerId);
    return base;
  }, [records, filters]);

  const totals = useMemo(() => {
    const totalNetPay = filteredRecords.reduce((s, r) => s + r.netPay, 0);
    const totalIncentivePaid = filteredRecords.reduce((s, r) => s + r.salesIncentive + r.collectionIncentive + r.newCustomerIncentive + r.performanceBonus, 0);
    const totalDeductions = filteredRecords.reduce((s, r) => s + r.deductions, 0);
    const pendingCount = filteredRecords.filter((r) => r.status === "draft").length;
    return { totalNetPay, totalIncentivePaid, totalDeductions, pendingCount };
  }, [filteredRecords]);

  const selectedRecord = selectedEmployeeId ? records.find((r) => r.employeeId === selectedEmployeeId) ?? null : null;

  const setOverride = (employeeId: string, status: SalaryStatus) => {
    const record = records.find((r) => r.employeeId === employeeId);
    if (!record) return;
    setStatusOverrides((prev) => ({ ...prev, [`${employeeId}-${record.month}`]: status }));
  };

  const handleApprove = (employeeId: string) => {
    setOverride(employeeId, "approved");
    toast({ title: "Payout approved", description: "Marked as approved for this session (demo only).", variant: "success" });
    setSelectedEmployeeId(null);
  };

  const handleMarkPaid = (employeeId: string) => {
    setOverride(employeeId, "paid");
    toast({ title: "Marked as paid", description: "Marked as paid for this session (demo only).", variant: "success" });
    setSelectedEmployeeId(null);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-ambient">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-gradient rounded-xl shadow-brand-glow">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Salary / Payout Dashboard</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            Demo payout calculations — not statutory payroll processing (no PF/ESI/TDS applied).
          </p>
        </div>
      </div>

      <SalesPerformanceTabs />

      <FilterBar filters={filters} onChange={setFilters} show={["month", "employeeId", "territoryId", "managerId"]} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Net Pay" value={formatCurrency(totals.totalNetPay)} icon={Banknote} iconBg="bg-blue-100" iconColor="text-blue-600" />
        <KpiCard label="Total Incentive Paid" value={formatCurrency(totals.totalIncentivePaid)} icon={Wallet} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <KpiCard label="Total Deductions" value={formatCurrency(totals.totalDeductions)} icon={TrendingDown} iconBg="bg-rose-100" iconColor="text-rose-600" />
        <KpiCard label="Pending Approval" value={String(totals.pendingCount)} icon={Users2} iconBg="bg-amber-100" iconColor="text-amber-600" />
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Employee Payouts — {filteredRecords.length} employee(s)</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-right">Basic Salary</th>
                <th className="p-3 text-right">Allowances</th>
                <th className="p-3 text-right">Incentive</th>
                <th className="p-3 text-right">Performance Bonus</th>
                <th className="p-3 text-right">Deductions</th>
                <th className="p-3 text-right">Net Pay</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((r) => {
                const employee = getEmployee(r.employeeId);
                const incentive = r.salesIncentive + r.collectionIncentive + r.newCustomerIncentive;
                return (
                  <tr key={r.employeeId} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <p className="font-semibold text-slate-800">{employee?.fullName}</p>
                      <p className="text-[10px] text-slate-400">{employee?.employeeCode}</p>
                    </td>
                    <td className="p-3 text-right text-slate-600">{formatCurrency(r.basicSalary)}</td>
                    <td className="p-3 text-right text-slate-600">{formatCurrency(r.allowances)}</td>
                    <td className="p-3 text-right text-slate-700">{formatCurrency(incentive)}</td>
                    <td className="p-3 text-right text-slate-700">{formatCurrency(r.performanceBonus)}</td>
                    <td className="p-3 text-right text-rose-600">− {formatCurrency(r.deductions)}</td>
                    <td className="p-3 text-right font-extrabold text-slate-900">{formatCurrency(r.netPay)}</td>
                    <td className="p-3 text-center"><SalaryStatusBadge status={r.status} className="text-[9px]" /></td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedEmployeeId(r.employeeId)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                        aria-label="View payout details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <PayoutDetailsDialog record={selectedRecord} onClose={() => setSelectedEmployeeId(null)} onApprove={handleApprove} onMarkPaid={handleMarkPaid} />
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
