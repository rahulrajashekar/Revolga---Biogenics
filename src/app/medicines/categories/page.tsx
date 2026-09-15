"use client";

import React from "react";
import { Tag, Plus } from "lucide-react";
import { CATEGORIES, MEDICINES } from "@/lib/mockData";

export default function CategoriesPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl"><Tag className="w-5 h-5 text-emerald-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Medicine Categories</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{CATEGORIES.length} categories configured</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const count = MEDICINES.filter((m) => m.category === cat).length;
          return (
            <div key={cat} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 font-bold text-xs"><Tag className="w-4 h-4" /></div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xs">{cat}</h3>
                  <p className="text-[11px] text-slate-500">{count} medicines</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Active</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
