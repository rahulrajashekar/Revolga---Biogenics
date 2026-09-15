"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pill, Search, ShieldAlert, CheckCircle2, ArrowLeft } from "lucide-react";
import { MEDICINES, CATEGORIES, MANUFACTURERS } from "@/lib/mockData";

export default function PublicMedicineCatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedManufacturer, setSelectedManufacturer] = useState("All");
  const [quoteRequested, setQuoteRequested] = useState<string | null>(null);

  const filtered = MEDICINES.filter((m) => {
    const matchSearch =
      search === "" ||
      m.medicineName.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase()) ||
      m.composition.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || m.category === selectedCategory;
    const matchMfr = selectedManufacturer === "All" || m.manufacturer === selectedManufacturer;
    return matchSearch && matchCat && matchMfr;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/website" className="p-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-200">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-sm text-white">Revolga Biogenics — Medical Products Catalog</span>
            </div>
          </div>
          <Link href="/dashboard" className="text-xs font-semibold text-emerald-300 hover:text-white">
            Portal Access →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-6">
        {/* Medical Advice Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900 text-xs">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Trade Wholesale Catalog Notice</p>
            <p className="text-amber-800 text-[11px] mt-0.5">
              This catalog displays product availability for licensed pharmacies, hospitals, and medical practitioners only.
              <strong> No medical advice, diagnosis, or direct-to-consumer sales are provided.</strong>
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by medicine name, generic composition, or brand…"
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Filter by Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              >
                <option value="All">All Categories ({CATEGORIES.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Filter by Manufacturer</label>
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white"
              >
                <option value="All">All Manufacturers ({MANUFACTURERS.length})</option>
                {MANUFACTURERS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((med) => (
            <div key={med.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {med.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 mt-1">{med.medicineName}</h3>
                    <p className="text-xs text-slate-500 italic">{med.genericName}</p>
                  </div>
                  {med.prescriptionRequired && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">Rx</span>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1 border-t border-slate-100 pt-2">
                  <p><strong className="text-slate-700">Manufacturer:</strong> {med.manufacturer}</p>
                  <p><strong className="text-slate-700">Composition:</strong> {med.composition}</p>
                  <p><strong className="text-slate-700">Pack Size:</strong> {med.packSize} ({med.dosageForm})</p>
                  <p><strong className="text-slate-700">HSN Code:</strong> <span className="font-mono">{med.hsnCode}</span></p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Wholesale Rate</p>
                  <p className="text-sm font-extrabold text-slate-900">₹{med.sellingPrice} <span className="text-[10px] font-normal text-slate-400">/ {med.unit}</span></p>
                </div>
                <button
                  onClick={() => {
                    setQuoteRequested(med.id);
                    setTimeout(() => setQuoteRequested(null), 3000);
                  }}
                  className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  {quoteRequested === med.id ? "Quote Requested ✓" : "Request Bulk Quote"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
