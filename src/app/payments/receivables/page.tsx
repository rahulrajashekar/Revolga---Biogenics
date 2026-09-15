"use client";

import React from "react";
import Link from "next/link";
import { Wallet, Search, Phone } from "lucide-react";
import { CUSTOMERS } from "@/lib/mockData";

export default function ReceivablesPage() {
  const customerReceivables = CUSTOMERS.filter((c) => c.outstandingBalance > 0);
  const totalReceivables = customerReceivables.reduce((s, c) => s + c.outstandingBalance, 0);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl"><Wallet className="w-5 h-5 text-emerald-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Accounts Receivable</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Customer Dues & Outstanding Collections</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-right">
          <p className="text-[10px] text-emerald-700 font-bold uppercase">Total Outstanding</p>
          <p className="text-xl font-extrabold text-emerald-800">₹{totalReceivables.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/payments/receivables" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white">Receivables</Link>
        <Link href="/payments/payables" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Payables</Link>
        <Link href="/payments" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">All Transactions</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3 text-left">Customer / Pharmacy</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-right">Credit Limit</th>
              <th className="p-3 text-right">Outstanding Due</th>
              <th className="p-3 text-center">Credit Terms</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customerReceivables.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">{c.businessName}</td>
                <td className="p-3 capitalize"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-blue-700">{c.customerType}</span></td>
                <td className="p-3 text-slate-600">{c.phone}</td>
                <td className="p-3 text-right text-slate-600">₹{c.creditLimit.toLocaleString("en-IN")}</td>
                <td className="p-3 text-right font-bold text-rose-600">₹{c.outstandingBalance.toLocaleString("en-IN")}</td>
                <td className="p-3 text-center text-slate-600">{c.paymentTerms} days</td>
                <td className="p-3 text-center">
                  <button className="px-2.5 py-1 text-[10px] font-bold rounded bg-emerald-600 text-white hover:bg-emerald-700">Collect</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
