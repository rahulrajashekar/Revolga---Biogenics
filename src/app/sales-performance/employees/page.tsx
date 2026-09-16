"use client";

import React, { useMemo, useState } from "react";
import { Users, MapPin, Package, TrendingUp, TrendingDown } from "lucide-react";
import { SalesPerformanceTabs } from "@/components/sales-performance/SalesPerformanceTabs";
import { FilterBar, ALL_FILTERS, SalesPerformanceFilters } from "@/components/sales-performance/FilterBar";
import { EmployeePerformanceTable, EmployeePerformanceTableRow } from "@/components/sales-performance/EmployeePerformanceTable";
import { EmployeeScorecardDialog } from "@/components/sales-performance/EmployeeScorecardDialog";
import { TerritoryChart } from "@/components/sales-performance/TerritoryChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { CURRENT_MONTH, getEmployee } from "@/lib/salesPerformance/mockCore";
import {
  incentivesForMonth,
  performanceRowsForMonth,
  productPerformanceForMonth,
  scorecardFor,
  territoryPerformanceForMonth,
} from "@/lib/salesPerformance/dataset";
import { productPerformanceSummary } from "@/lib/salesPerformance/calculations";

function formatCurrency(value: number): string {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

type SubTab = "employees" | "territory" | "product";

export default function SalesPerformanceEmployeesPage() {
  const [subTab, setSubTab] = useState<SubTab>("employees");
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
  const tableRows: EmployeePerformanceTableRow[] = useMemo(
    () => rows.map((row) => ({ ...row, incentive: incentives.find((i) => i.employeeId === row.employeeId)?.totalIncentive ?? 0 })),
    [rows, incentives]
  );

  const territoryRows = useMemo(() => {
    let base = territoryPerformanceForMonth(month);
    if (filters.territoryId) base = base.filter((t) => t.territoryId === filters.territoryId);
    return base;
  }, [month, filters.territoryId]);

  const productRows = useMemo(() => {
    let base = productPerformanceForMonth(month);
    if (filters.productId) base = base.filter((p) => p.productId === filters.productId);
    if (filters.categoryId) base = base.filter((p) => p.categoryId === filters.categoryId);
    return base;
  }, [month, filters.productId, filters.categoryId]);

  const { topSelling, slowMoving } = useMemo(() => productPerformanceSummary(productRows), [productRows]);

  const scorecard = selectedEmployeeId ? scorecardFor(selectedEmployeeId, month) : null;

  const subTabs: { id: SubTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "employees", label: "Employee Table", icon: Users },
    { id: "territory", label: "Territory Performance", icon: MapPin },
    { id: "product", label: "Product Performance", icon: Package },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-ambient">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-gradient rounded-xl shadow-brand-glow">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Employees, Territory &amp; Products</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Drill into individual, territory-wide and product-wise sales performance.</p>
        </div>
      </div>

      <SalesPerformanceTabs />

      <FilterBar
        filters={filters}
        onChange={setFilters}
        show={
          subTab === "employees"
            ? ["month", "employeeId", "territoryId", "managerId"]
            : subTab === "territory"
            ? ["month", "territoryId"]
            : ["month", "productId", "categoryId"]
        }
      />

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

      {subTab === "employees" && <EmployeePerformanceTable rows={tableRows} onSelectEmployee={setSelectedEmployeeId} />}

      {subTab === "territory" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Territory Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <TerritoryChart data={territoryRows} />
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 text-left">Territory</th>
                    <th className="p-3 text-right">Employees</th>
                    <th className="p-3 text-right">Target</th>
                    <th className="p-3 text-right">Actual Sales</th>
                    <th className="p-3 text-right">Achv. %</th>
                    <th className="p-3 text-right">Orders</th>
                    <th className="p-3 text-right">Collection</th>
                    <th className="p-3 text-right">New Customers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {territoryRows.map((t) => (
                    <tr key={t.territoryId} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-800 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {t.territoryName}</td>
                      <td className="p-3 text-right text-slate-600">{t.employeeCount}</td>
                      <td className="p-3 text-right text-slate-600">{formatCurrency(t.target)}</td>
                      <td className="p-3 text-right font-semibold text-slate-800">{formatCurrency(t.actualSales)}</td>
                      <td className="p-3 text-right">
                        <span className={cn("font-bold", t.achievementPercent < 80 ? "text-rose-600" : t.achievementPercent >= 110 ? "text-emerald-600" : "text-blue-600")}>{t.achievementPercent}%</span>
                      </td>
                      <td className="p-3 text-right text-slate-600">{t.orders}</td>
                      <td className="p-3 text-right text-slate-600">{formatCurrency(t.collection)}</td>
                      <td className="p-3 text-right text-slate-600">{t.newCustomers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {subTab === "product" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-600" /> Top-Selling Products</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {topSelling.map((p) => (
                  <div key={p.productId} className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="font-semibold text-slate-800">{p.productName}</p>
                      <p className="text-[10px] text-slate-400">{p.categoryName} &middot; {p.unitsSold} units</p>
                    </div>
                    <span className="font-bold text-emerald-700">{formatCurrency(p.salesAmount)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-1.5"><TrendingDown className="w-4 h-4 text-rose-600" /> Slow-Moving Products</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {slowMoving.map((p) => (
                  <div key={p.productId} className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="font-semibold text-slate-800">{p.productName}</p>
                      <p className="text-[10px] text-slate-400">{p.categoryName} &middot; {p.unitsSold} units</p>
                    </div>
                    <Badge variant={p.achievementPercent < 80 ? "danger" : "warning"} className="text-[9px]">{p.achievementPercent}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-right">Units Sold</th>
                    <th className="p-3 text-right">Sales Amount</th>
                    <th className="p-3 text-right">Target</th>
                    <th className="p-3 text-right">Achv. %</th>
                    <th className="p-3 text-right">Growth %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {productRows.map((p) => (
                    <tr key={p.productId} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-800">{p.productName}</td>
                      <td className="p-3"><Badge variant="secondary" className="text-[9px]">{p.categoryName}</Badge></td>
                      <td className="p-3 text-right text-slate-600">{p.unitsSold}</td>
                      <td className="p-3 text-right font-semibold text-slate-800">{formatCurrency(p.salesAmount)}</td>
                      <td className="p-3 text-right text-slate-600">{formatCurrency(p.target)}</td>
                      <td className="p-3 text-right">
                        <span className={cn("font-bold", p.achievementPercent < 80 ? "text-rose-600" : "text-emerald-600")}>{p.achievementPercent}%</span>
                      </td>
                      <td className="p-3 text-right">
                        <span className={cn("font-semibold", p.growthPercent >= 0 ? "text-emerald-600" : "text-rose-600")}>
                          {p.growthPercent >= 0 ? "+" : ""}{p.growthPercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      <EmployeeScorecardDialog employeeId={selectedEmployeeId} scorecard={scorecard} onClose={() => setSelectedEmployeeId(null)} />
    </div>
  );
}
