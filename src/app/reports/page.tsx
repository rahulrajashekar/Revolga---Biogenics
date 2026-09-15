"use client";

import React, { useState } from "react";
import { BarChart3, Download, Calendar, Pill, AlertTriangle, TrendingUp, TrendingDown, Users, Truck } from "lucide-react";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("sales");

  const reports = [
    { id: "sales", title: "Sales & Tax Invoice Register", desc: "Detailed sales register with GST breakdown (GSTR-1 format)", icon: TrendingUp },
    { id: "purchases", title: "Purchase Register", desc: "Inward stock purchases with ITC calculation (GSTR-2B format)", icon: TrendingDown },
    { id: "expiry", title: "Expiry & Quarantine Report", desc: "Batches expiring in 30/60/90 days and list of expired stock", icon: AlertTriangle },
    { id: "stock", title: "Stock Valuation & Batch Register", desc: "Valuation of current inventory by batch, MRP, and purchase rate", icon: Pill },
    { id: "receivables", title: "Outstanding Receivables Aging", desc: "Customer dues categorized by 30, 60, 90+ days credit period", icon: Users },
    { id: "payables", title: "Supplier Outstanding Payables", desc: "Manufacturer & distributor payment schedules and pending bills", icon: Truck },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-xl"><BarChart3 className="w-5 h-5 text-indigo-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Pharma Distribution Reports</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">GST Statements, Expiry Reports, Stock Valuation & Financial Audit</p>
        </div>
        <button onClick={() => alert("Report downloaded successfully in Excel & PDF formats.")} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm">
          <Download className="w-3.5 h-3.5" /> Export Selected Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          const isSelected = reportType === r.id;
          return (
            <button key={r.id} onClick={() => setReportType(r.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${isSelected ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-xs" : "border-slate-200 bg-white hover:border-slate-300"}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{r.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Report Demo View */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            Preview: {reports.find(r => r.id === reportType)?.title}
          </h3>
          <span className="text-xs text-slate-500">Period: Current Financial Year 2026-27</span>
        </div>
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
          <p className="text-xs font-semibold text-slate-700">Ready to export {reports.find(r => r.id === reportType)?.title}</p>
          <p className="text-[11px] text-slate-500 mt-1">Includes full GST breakdown, drug license numbers, batch details, and HSN summary.</p>
          <button onClick={() => alert("Report generated & downloaded!")} className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Generate & Download CSV / PDF
          </button>
        </div>
      </div>
    </div>
  );
}
