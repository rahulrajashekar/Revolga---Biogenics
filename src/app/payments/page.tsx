"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Receipt, CreditCard, Wallet, Plus, Search } from "lucide-react";
import { PAYMENTS } from "@/lib/mockData";

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = PAYMENTS.filter((p) => {
    const matchSearch = search === "" || p.id.toLowerCase().includes(search.toLowerCase()) || p.partyName.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || (typeFilter === "received" ? p.type === "receivable" : p.type === "payable");
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl"><Receipt className="w-5 h-5 text-emerald-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Payment Transactions</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Customer Collections & Supplier Payments</p>
        </div>
        <div className="flex gap-2">
          <Link href="/payments/receivables" className="px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
            View Receivables
          </Link>
          <Link href="/payments/payables" className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            View Payables
          </Link>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/payments/receivables" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Receivables</Link>
        <Link href="/payments/payables" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Payables</Link>
        <Link href="/payments" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-white">All Transactions</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ID or party name…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg" />
        </div>
        {["All", "received", "paid"].map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize cursor-pointer ${typeFilter === t ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Ref No</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Party Name</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-left">Doc Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 text-slate-600">{p.date}</td>
                  <td className="p-3 font-mono font-bold text-slate-800">{p.id}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${p.type === "receivable" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                      {p.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">{p.partyName}</td>
                  <td className="p-3 uppercase text-slate-600 font-mono text-[10px]">{p.method.replace("_", " ")}</td>
                  <td className={`p-3 text-right font-bold ${p.type === "receivable" ? "text-emerald-700" : "text-blue-700"}`}>
                    ₹{p.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3 font-mono text-slate-500 text-[10px]">{p.invoiceRef || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
