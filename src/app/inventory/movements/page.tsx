"use client";

import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { STOCK_MOVEMENTS } from "@/lib/mockData";

export default function StockMovementsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-xl"><ArrowLeftRight className="w-5 h-5 text-indigo-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Stock Movements Log</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Audit log of inward (purchase), outward (sales), and return movements</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Movement Type</th>
              <th className="p-3 text-left">Medicine</th>
              <th className="p-3 text-left">Batch No</th>
              <th className="p-3 text-right">Quantity</th>
              <th className="p-3 text-left">Reference Doc</th>
              <th className="p-3 text-left">Performer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {STOCK_MOVEMENTS.map((sm) => (
              <tr key={sm.id} className="hover:bg-slate-50">
                <td className="p-3 text-slate-600">{sm.date}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    sm.type === "purchase" ? "bg-emerald-100 text-emerald-700" : sm.type === "sale" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {sm.type.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 font-semibold text-slate-800">{sm.medicineName}</td>
                <td className="p-3 font-mono text-slate-600">{sm.batchNumber}</td>
                <td className={`p-3 text-right font-bold ${sm.quantity > 0 ? "text-emerald-700" : "text-rose-700"}`}>
                  {sm.quantity > 0 ? `+${sm.quantity}` : sm.quantity}
                </td>
                <td className="p-3 font-mono text-slate-600">{sm.reference}</td>
                <td className="p-3 text-slate-600">{sm.notes || "System Automated"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
