"use client";

import React from "react";
import Link from "next/link";
import { TrendingDown, Pill, Plus } from "lucide-react";
import { MEDICINES } from "@/lib/mockData";

export default function LowStockPage() {
  const lowStock = MEDICINES.filter((m) => m.currentStock <= m.minStockLevel);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-xl"><TrendingDown className="w-5 h-5 text-amber-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Low Stock Medicines</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{lowStock.length} medicines below minimum required stock level</p>
        </div>
        <Link href="/purchases/new" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Reorder via Purchase Bill
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3 text-left">Medicine Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Manufacturer</th>
              <th className="p-3 text-right">Current Stock</th>
              <th className="p-3 text-right">Min Stock</th>
              <th className="p-3 text-right">Reorder Qty</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lowStock.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 bg-amber-50/20">
                <td className="p-3 font-semibold text-slate-800">{m.medicineName}</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700">{m.category}</span></td>
                <td className="p-3 text-slate-600">{m.manufacturer}</td>
                <td className="p-3 text-right font-bold text-rose-600">{m.currentStock}</td>
                <td className="p-3 text-right text-slate-600">{m.minStockLevel}</td>
                <td className="p-3 text-right font-bold text-slate-900">{m.reorderLevel - m.currentStock}</td>
                <td className="p-3 text-center">
                  <Link href="/purchases/new" className="px-2.5 py-1 text-[10px] font-bold rounded bg-amber-600 text-white hover:bg-amber-700">Reorder</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
