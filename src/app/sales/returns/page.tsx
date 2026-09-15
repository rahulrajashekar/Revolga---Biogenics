"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RotateCcw, Plus, Search, Eye } from "lucide-react";
import { SALES_RETURNS } from "@/lib/mockData";

export default function SalesReturnsPage() {
  const [search, setSearch] = useState("");
  const filtered = SALES_RETURNS.filter(
    (sr) =>
      search === "" ||
      sr.returnNumber.toLowerCase().includes(search.toLowerCase()) ||
      sr.customerName.toLowerCase().includes(search.toLowerCase()) ||
      sr.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-xl">
              <RotateCcw className="w-5 h-5 text-amber-600" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">Sales Returns</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            {SALES_RETURNS.length} sales return records (Credit Notes)
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-sm">
          + Record Sales Return
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/sales" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Tax Invoices</Link>
        <Link href="/sales/returns" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white">Sales Returns</Link>
        <Link href="/sales/quotations" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Quotations</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search return number, customer, medicine…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Return No</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Ref Invoice</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Batch</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-right">Credit Amount</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sr) => (
                <tr key={sr.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-amber-700">{sr.returnNumber}</td>
                  <td className="p-3 text-slate-600">{sr.date}</td>
                  <td className="p-3 font-mono text-slate-600">{sr.invoiceNumber}</td>
                  <td className="p-3 font-semibold text-slate-800">{sr.customerName}</td>
                  <td className="p-3 text-slate-800">{sr.medicineName}</td>
                  <td className="p-3 font-mono text-slate-600">{sr.batchNumber}</td>
                  <td className="p-3 text-right font-bold">{sr.quantity}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">{sr.reason}</span>
                  </td>
                  <td className="p-3 text-right font-bold text-rose-600">₹{sr.refundAmount.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-center">
                    <button className="p-1 text-slate-400 hover:text-amber-600"><Eye className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
