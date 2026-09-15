"use client";

import React from "react";
import Link from "next/link";
import { ClipboardList, Plus, Search, Eye } from "lucide-react";

export default function QuotationsPage() {
  const quotations = [
    { id: "1", quoteNo: "QT-2026-001", date: "2026-09-10", customer: "HealthCare Pharmacy, Calicut", total: 45000, status: "sent" },
    { id: "2", quoteNo: "QT-2026-002", date: "2026-09-12", customer: "Malabar Specialty Hospital", total: 182000, status: "accepted" },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-xl"><ClipboardList className="w-5 h-5 text-blue-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Quotations</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Manage price estimates & formal quotes</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
          + Create Quotation
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/sales" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Tax Invoices</Link>
        <Link href="/sales/returns" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Sales Returns</Link>
        <Link href="/sales/quotations" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white">Quotations</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3 text-left">Quote No</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotations.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-blue-700">{q.quoteNo}</td>
                <td className="p-3 text-slate-600">{q.date}</td>
                <td className="p-3 font-semibold text-slate-800">{q.customer}</td>
                <td className="p-3 text-right font-bold text-slate-900">₹{q.total.toLocaleString("en-IN")}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${q.status === "accepted" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                    {q.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 text-center"><button className="p-1 text-slate-400 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
