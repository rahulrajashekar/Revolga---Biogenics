"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RefreshCw, Search, Eye } from "lucide-react";
import { PURCHASE_RETURNS } from "@/lib/mockData";

export default function PurchaseReturnsPage() {
  const [search, setSearch] = useState("");
  const filtered = PURCHASE_RETURNS.filter(
    (pr) =>
      search === "" ||
      pr.returnNumber.toLowerCase().includes(search.toLowerCase()) ||
      pr.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      pr.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-xl"><RefreshCw className="w-5 h-5 text-purple-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Purchase Returns</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{PURCHASE_RETURNS.length} purchase returns to suppliers</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 shadow-sm">
          + Record Purchase Return
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/purchases" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Purchase Bills</Link>
        <Link href="/purchases/returns" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white">Purchase Returns</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search return no, supplier, medicine…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Return No</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Ref Bill</th>
                <th className="p-3 text-left">Supplier</th>
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Batch</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-right">Debit Amount</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((pr) => (
                <tr key={pr.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-purple-700">{pr.returnNumber}</td>
                  <td className="p-3 text-slate-600">{pr.date}</td>
                  <td className="p-3 font-mono text-slate-600">{pr.billNumber}</td>
                  <td className="p-3 font-semibold text-slate-800">{pr.supplierName}</td>
                  <td className="p-3 text-slate-800">{pr.medicineName}</td>
                  <td className="p-3 font-mono text-slate-600">{pr.batchNumber}</td>
                  <td className="p-3 text-right font-bold">{pr.quantity}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-800">{pr.reason}</span></td>
                  <td className="p-3 text-right font-bold text-slate-900">₹{pr.refundAmount.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-center"><button className="p-1 text-slate-400 hover:text-purple-600"><Eye className="w-3.5 h-3.5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
