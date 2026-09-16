"use client";

import React, { useMemo, useState } from "react";
import { Percent, Wallet, Clock, CheckCircle2, Banknote, Settings2, SlidersHorizontal, Plus, Trash2, RotateCcw, Save } from "lucide-react";
import { SalesPerformanceTabs } from "@/components/sales-performance/SalesPerformanceTabs";
import { KpiCard } from "@/components/sales-performance/KpiCard";
import { FilterBar, ALL_FILTERS, SalesPerformanceFilters } from "@/components/sales-performance/FilterBar";
import { IncentiveStatusBadge } from "@/components/sales-performance/StatusBadges";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast, ToastViewport } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { CURRENT_MONTH, getEmployee } from "@/lib/salesPerformance/mockCore";
import { incentivesForMonth, performanceRowsForMonth } from "@/lib/salesPerformance/dataset";
import { DEFAULT_INCENTIVE_SLABS, DEFAULT_SCORE_WEIGHTS } from "@/lib/salesPerformance/calculations";
import { IncentiveSlab, IncentiveStatus, PerformanceWeightConfig } from "@/lib/salesPerformance/types";

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

type SubTab = "dashboard" | "rules" | "weights";

export default function IncentivesPage() {
  const { toasts, toast, dismiss } = useToast();
  const [subTab, setSubTab] = useState<SubTab>("dashboard");
  const [filters, setFilters] = useState<SalesPerformanceFilters>({ ...ALL_FILTERS, month: CURRENT_MONTH });
  const [slabs, setSlabs] = useState<IncentiveSlab[]>(DEFAULT_INCENTIVE_SLABS);
  const [weights, setWeights] = useState<PerformanceWeightConfig>(DEFAULT_SCORE_WEIGHTS);

  const month = filters.month || CURRENT_MONTH;

  const incentiveRows = useMemo(() => {
    let base = incentivesForMonth(month, slabs);
    if (filters.employeeId) base = base.filter((i) => i.employeeId === filters.employeeId);
    if (filters.territoryId) base = base.filter((i) => getEmployee(i.employeeId)?.territoryId === filters.territoryId);
    if (filters.managerId) base = base.filter((i) => getEmployee(i.employeeId)?.managerId === filters.managerId);
    return base;
  }, [month, slabs, filters]);

  const pool = useMemo(() => {
    const totalPool = performanceRowsForMonth(month).reduce((s, r) => s + r.target * 0.05, 0); // demo pool = 5% of total target
    const earned = incentiveRows.reduce((s, i) => s + i.totalIncentive, 0);
    const pending = incentiveRows.filter((i) => i.status === "pending-approval").reduce((s, i) => s + i.totalIncentive, 0);
    const approved = incentiveRows.filter((i) => i.status === "approved").reduce((s, i) => s + i.totalIncentive, 0);
    const paid = incentiveRows.filter((i) => i.status === "paid").reduce((s, i) => s + i.totalIncentive, 0);
    return { totalPool, earned, pending, approved, paid };
  }, [month, incentiveRows]);

  const updateSlab = (id: string, patch: Partial<IncentiveSlab>) => {
    setSlabs((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const removeSlab = (id: string) => setSlabs((prev) => prev.filter((s) => s.id !== id));

  const addSlab = () => {
    setSlabs((prev) => [
      ...prev,
      {
        id: `SLAB-${Date.now()}`,
        label: "New Slab",
        minAchievement: 0,
        maxAchievement: null,
        incentivePercent: 0,
        fixedIncentive: 0,
        bonus: 0,
        effectiveDate: new Date().toISOString().slice(0, 10),
        status: "active",
      },
    ]);
  };

  const totalWeight = weights.salesAchievement + weights.collection + weights.newCustomers + weights.fieldActivity + weights.growth;

  const subTabs: { id: SubTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "dashboard", label: "Incentive Dashboard", icon: Wallet },
    { id: "rules", label: "Incentive Rule Configuration", icon: Settings2 },
    { id: "weights", label: "Performance Score Weights", icon: SlidersHorizontal },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-ambient">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-gradient rounded-xl shadow-brand-glow">
              <Percent className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Incentive Dashboard</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Demo incentive calculation, approval status and configurable slab rules.</p>
        </div>
      </div>

      <SalesPerformanceTabs />

      <div className="flex gap-2 flex-wrap">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                isActive ? "text-white bg-brand-gradient border-transparent shadow-brand-glow" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              )}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {subTab === "dashboard" && (
        <div className="space-y-4">
          <FilterBar filters={filters} onChange={setFilters} show={["month", "employeeId", "territoryId", "managerId"]} />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiCard label="Total Incentive Pool" value={formatCurrency(pool.totalPool)} icon={Banknote} iconBg="bg-slate-100" iconColor="text-slate-600" sub="Demo: 5% of total target" />
            <KpiCard label="Incentive Earned" value={formatCurrency(pool.earned)} icon={Wallet} iconBg="bg-blue-100" iconColor="text-blue-600" />
            <KpiCard label="Pending Incentive" value={formatCurrency(pool.pending)} icon={Clock} iconBg="bg-amber-100" iconColor="text-amber-600" />
            <KpiCard label="Approved Incentive" value={formatCurrency(pool.approved)} icon={CheckCircle2} iconBg="bg-sky-100" iconColor="text-sky-600" />
            <KpiCard label="Paid Incentive" value={formatCurrency(pool.paid)} icon={Banknote} iconBg="bg-emerald-100" iconColor="text-emerald-600" />
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Employee Incentive Table — {incentiveRows.length} employee(s)</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 text-left">Employee</th>
                    <th className="p-3 text-right">Achv. %</th>
                    <th className="p-3 text-right">Incentive Rate</th>
                    <th className="p-3 text-right">Sales Incentive</th>
                    <th className="p-3 text-right">Collection Incentive</th>
                    <th className="p-3 text-right">New Cust. Incentive</th>
                    <th className="p-3 text-right">Bonus</th>
                    <th className="p-3 text-right">Total Incentive</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {incentiveRows.map((i) => {
                    const employee = getEmployee(i.employeeId);
                    return (
                      <tr key={i.employeeId} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3">
                          <p className="font-semibold text-slate-800">{employee?.fullName}</p>
                          <p className="text-[10px] text-slate-400">{employee?.employeeCode}</p>
                        </td>
                        <td className="p-3 text-right font-bold text-blue-600">{i.achievementPercent}%</td>
                        <td className="p-3 text-right text-slate-600">{i.incentiveRatePercent}%</td>
                        <td className="p-3 text-right text-slate-700">{formatCurrency(i.salesIncentive)}</td>
                        <td className="p-3 text-right text-slate-700">{formatCurrency(i.collectionIncentive)}</td>
                        <td className="p-3 text-right text-slate-700">{formatCurrency(i.newCustomerIncentive)}</td>
                        <td className="p-3 text-right text-slate-700">{formatCurrency(i.performanceBonus)}</td>
                        <td className="p-3 text-right font-bold text-emerald-700">{formatCurrency(i.totalIncentive)}</td>
                        <td className="p-3 text-center"><IncentiveStatusBadge status={i.status as IncentiveStatus} className="text-[9px]" /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {subTab === "rules" && (
        <Card>
          <CardHeader>
            <CardTitle>Incentive Slab Configuration</CardTitle>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              Demo values only — these percentages, fixed amounts and bonuses do not represent Revolga Biogenics&apos; actual incentive policy. Changes here are stored in this session only.
            </p>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-2.5 text-left">Min Achv. %</th>
                    <th className="p-2.5 text-left">Max Achv. %</th>
                    <th className="p-2.5 text-left">Incentive %</th>
                    <th className="p-2.5 text-left">Fixed Incentive (₹)</th>
                    <th className="p-2.5 text-left">Bonus (₹)</th>
                    <th className="p-2.5 text-left">Effective Date</th>
                    <th className="p-2.5 text-left">Status</th>
                    <th className="p-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {slabs.map((slab) => (
                    <tr key={slab.id}>
                      <td className="p-2 w-24"><Input type="number" value={slab.minAchievement} onChange={(e) => updateSlab(slab.id, { minAchievement: Number(e.target.value) })} /></td>
                      <td className="p-2 w-28">
                        <Input
                          type="number"
                          placeholder="No limit"
                          value={slab.maxAchievement ?? ""}
                          onChange={(e) => updateSlab(slab.id, { maxAchievement: e.target.value === "" ? null : Number(e.target.value) })}
                        />
                      </td>
                      <td className="p-2 w-24"><Input type="number" value={slab.incentivePercent} onChange={(e) => updateSlab(slab.id, { incentivePercent: Number(e.target.value) })} /></td>
                      <td className="p-2 w-32"><Input type="number" value={slab.fixedIncentive} onChange={(e) => updateSlab(slab.id, { fixedIncentive: Number(e.target.value) })} /></td>
                      <td className="p-2 w-28"><Input type="number" value={slab.bonus} onChange={(e) => updateSlab(slab.id, { bonus: Number(e.target.value) })} /></td>
                      <td className="p-2 w-40"><Input type="date" value={slab.effectiveDate} onChange={(e) => updateSlab(slab.id, { effectiveDate: e.target.value })} /></td>
                      <td className="p-2 w-32">
                        <Select
                          value={slab.status}
                          onChange={(e) => updateSlab(slab.id, { status: e.target.value as IncentiveSlab["status"] })}
                          options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
                        />
                      </td>
                      <td className="p-2">
                        <button onClick={() => removeSlab(slab.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer" aria-label="Remove slab">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={addSlab}>
                <Plus className="w-3.5 h-3.5" /> Add Slab
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setSlabs(DEFAULT_INCENTIVE_SLABS)}>
                  <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
                </Button>
                <Button size="sm" className="gap-1.5" onClick={() => toast({ title: "Configuration saved", description: "Incentive slab rules updated for this session.", variant: "success" })}>
                  <Save className="w-3.5 h-3.5" /> Save Configuration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {subTab === "weights" && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Score — Component Weighting</CardTitle>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              Demo configuration only — adjust how much each component contributes to an employee&apos;s overall performance score. Not a fixed business formula.
            </p>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {(
              [
                { key: "salesAchievement", label: "Sales Achievement" },
                { key: "collection", label: "Collection Achievement" },
                { key: "newCustomers", label: "New Customer Acquisition" },
                { key: "fieldActivity", label: "Field Activity" },
                { key: "growth", label: "Sales Growth" },
              ] as { key: keyof PerformanceWeightConfig; label: string }[]
            ).map(({ key, label }) => (
              <div key={key}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">{label}</span>
                  <span className="font-bold text-blue-600">{weights[key]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weights[key]}
                  onChange={(e) => setWeights((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            ))}

            <div className={cn("rounded-lg p-3 text-xs font-semibold flex items-center justify-between", totalWeight === 100 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>
              <span>Total Weight</span>
              <span>{totalWeight}% {totalWeight !== 100 && "(should total 100%)"}</span>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setWeights(DEFAULT_SCORE_WEIGHTS)}>
                <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
              </Button>
              <Button size="sm" className="gap-1.5" onClick={() => toast({ title: "Weights saved", description: "Performance score weighting updated for this session.", variant: "success" })}>
                <Save className="w-3.5 h-3.5" /> Save Weights
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
