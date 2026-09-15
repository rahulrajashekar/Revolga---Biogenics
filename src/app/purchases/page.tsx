"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Plus, Search, Eye } from "lucide-react";
import { PURCHASE_BILLS } from "@/lib/mockData";

export default function PurchasesPage() {
  const [search, setSearch] = useState("");
  const filtered = PURCHASE_BILLS.filter(
    (p) =>
      search === "" ||
      p.billNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.supplierName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPurchases = PURCHASE_BILLS.reduce((sum, p) => sum + p.grandTotal, 0);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-xl"><ShoppingBag className="w-5 h-5 text-blue-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Purchase Bills</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{PURCHASE_BILLS.length} bills · Total Purchases: ₹{totalPurchases.toLocaleString("en-IN")}</p>
        </div>
        <Link href="/purchases/new" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Record Purchase Bill
        </Link>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/purchases" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white">Purchase Bills</Link>
        <Link href="/purchases/returns" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Purchase Returns</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search purchase bill or supplier…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Bill No</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Supplier</th>
                <th className="p-3 text-center">Items</th>
                <th className="p-3 text-right">Taxable</th>
                <th className="p-3 text-right">GST</th>
                <th className="p-3 text-right">Grand Total</th>
                <th className="p-3 text-center">Payment Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-700">{p.billNumber}</td>
                  <td className="p-3 text-slate-600">{p.date}</td>
                  <td className="p-3 font-semibold text-slate-800">{p.supplierName}</td>
                  <td className="p-3 text-center text-slate-600">{p.items.length}</td>
                  <td className="p-3 text-right text-slate-600">₹{p.taxableAmount.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right text-slate-600">₹{p.totalGst.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right font-bold text-slate-900">₹{p.grandTotal.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${p.paymentStatus === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {p.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button className="p-1 text-slate-400 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
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
