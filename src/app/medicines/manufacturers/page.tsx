"use client";

import React from "react";
import { Factory, Plus } from "lucide-react";
import { MANUFACTURERS, MEDICINES } from "@/lib/mockData";

export default function ManufacturersPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-xl"><Factory className="w-5 h-5 text-purple-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Pharmaceutical Manufacturers</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{MANUFACTURERS.length} registered manufacturers</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 shadow-sm">
          + Add Manufacturer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MANUFACTURERS.map((mfr) => {
          const count = MEDICINES.filter((m) => m.manufacturer === mfr).length;
          return (
            <div key={mfr} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600 font-bold text-xs"><Factory className="w-4 h-4" /></div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xs">{mfr}</h3>
                  <p className="text-[11px] text-slate-500">{count} medicines in catalog</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">Verified</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
