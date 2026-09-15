"use client";

import React from "react";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { SUPPLIERS } from "@/lib/mockData";

export default function PayablesPage() {
  const supplierPayables = SUPPLIERS.filter((s) => s.outstandingPayable > 0);
  const totalPayables = supplierPayables.reduce((s, sup) => s + sup.outstandingPayable, 0);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-xl"><CreditCard className="w-5 h-5 text-blue-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Accounts Payable</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Supplier Dues & Vendor Payables</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-right">
          <p className="text-[10px] text-blue-700 font-bold uppercase">Total Payable</p>
          <p className="text-xl font-extrabold text-blue-800">₹{totalPayables.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/payments/receivables" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">Receivables</Link>
        <Link href="/payments/payables" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white">Payables</Link>
        <Link href="/payments" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">All Transactions</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3 text-left">Supplier / Manufacturer</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">GSTIN</th>
              <th className="p-3 text-right">Outstanding Payable</th>
              <th className="p-3 text-center">Credit Terms</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {supplierPayables.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">{s.companyName}</td>
                <td className="p-3 capitalize"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700">{s.supplierType}</span></td>
                <td className="p-3 font-mono text-slate-600 text-[10px]">{s.gstin}</td>
                <td className="p-3 text-right font-bold text-rose-600">₹{s.outstandingPayable.toLocaleString("en-IN")}</td>
                <td className="p-3 text-center text-slate-600">{s.paymentTerms} days</td>
                <td className="p-3 text-center">
                  <button className="px-2.5 py-1 text-[10px] font-bold rounded bg-blue-600 text-white hover:bg-blue-700">Make Payment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
