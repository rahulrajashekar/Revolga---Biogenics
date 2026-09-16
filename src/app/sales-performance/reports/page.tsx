"use client";

import React, { useState } from "react";
import {
  FileBarChart, Users, MapPin, Package, Percent, Wallet, Calendar, Download, FileText,
} from "lucide-react";
import { SalesPerformanceTabs } from "@/components/sales-performance/SalesPerformanceTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useToast, ToastViewport } from "@/components/ui/Toast";
import { REPORTING_MONTHS, SALES_EMPLOYEES, TERRITORIES, monthLabel } from "@/lib/salesPerformance/mockCore";

interface ReportDef {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const REPORTS: ReportDef[] = [
  { id: "employee-performance", title: "Employee Performance Report", description: "Target vs. actual sales, achievement % and status for every employee.", icon: Users },
  { id: "territory-performance", title: "Territory Performance Report", description: "Sales, collection and order volume rolled up by territory.", icon: MapPin },
  { id: "product-performance", title: "Product Performance Report", description: "Units sold, sales amount and growth % by product and category.", icon: Package },
  { id: "incentive", title: "Incentive Report", description: "Calculated incentive breakdown and approval status by employee.", icon: Percent },
  { id: "salary-payout", title: "Salary / Payout Report", description: "Full salary breakdown and payout status by employee.", icon: Wallet },
  { id: "monthly-sales", title: "Monthly Sales Report", description: "Month-by-month sales vs. target trend across the reporting window.", icon: Calendar },
];

export default function ReportsPage() {
  const { toasts, toast, dismiss } = useToast();
  const [fromMonth, setFromMonth] = useState<string>(REPORTING_MONTHS[0]);
  const [toMonth, setToMonth] = useState<string>(REPORTING_MONTHS[REPORTING_MONTHS.length - 1]);
  const [employeeId, setEmployeeId] = useState("");
  const [territoryId, setTerritoryId] = useState("");

  const handleExport = (report: ReportDef) => {
    toast({ title: "Export started", description: `"${report.title}" export is simulated in this demo.`, variant: "info" });
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-ambient">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-brand-gradient rounded-xl shadow-brand-glow">
              <FileBarChart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Reports</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Generate and export performance reports — exports are simulated for this demo.</p>
        </div>
      </div>

      <SalesPerformanceTabs />

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Select label="From Month" value={fromMonth} onChange={(e) => setFromMonth(e.target.value)} options={REPORTING_MONTHS.map((m) => ({ value: m, label: monthLabel(m) }))} />
            <Select label="To Month" value={toMonth} onChange={(e) => setToMonth(e.target.value)} options={REPORTING_MONTHS.map((m) => ({ value: m, label: monthLabel(m) }))} />
            <Select label="Employee" placeholder="All Employees" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} options={SALES_EMPLOYEES.map((e) => ({ value: e.id, label: e.fullName }))} />
            <Select label="Territory" placeholder="All Territories" value={territoryId} onChange={(e) => setTerritoryId(e.target.value)} options={TERRITORIES.map((t) => ({ value: t.id, label: t.name }))} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {REPORTS.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-brand-gradient rounded-xl shadow-sm">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-sm">{report.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">{report.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => toast({ title: "Preview", description: "Report preview is simulated in this demo.", variant: "info" })}>
                    <FileText className="w-3.5 h-3.5" /> Preview
                  </Button>
                  <Button size="sm" className="flex-1 gap-1.5" onClick={() => handleExport(report)}>
                    <Download className="w-3.5 h-3.5" /> Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
