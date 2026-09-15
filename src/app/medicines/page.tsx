"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Pill, Plus, Search, Filter, ChevronDown, Eye, Edit2,
  CheckCircle2, XCircle, AlertTriangle, Package,
} from "lucide-react";
import { MEDICINES, Medicine, CATEGORIES, MANUFACTURERS } from "@/lib/mockData";

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
    discontinued: "bg-rose-100 text-rose-700",
  };
  return map[status] || "bg-slate-100 text-slate-600";
};

export default function MedicinesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [manufacturerFilter, setManufacturerFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = MEDICINES.filter((m) => {
    const matchSearch =
      search === "" ||
      m.medicineName.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase()) ||
      m.sku.toLowerCase().includes(search.toLowerCase()) ||
      m.manufacturer.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || m.category === categoryFilter;
    const matchMfr = manufacturerFilter === "All" || m.manufacturer === manufacturerFilter;
    const matchStatus = statusFilter === "All" || m.status === statusFilter;
    return matchSearch && matchCat && matchMfr && matchStatus;
  });

  const lowStockCount = MEDICINES.filter((m) => m.currentStock <= m.minStockLevel).length;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Pill className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Medicine Master</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            {MEDICINES.length} medicines · {lowStockCount} low stock · {MEDICINES.filter(m => m.status === "active").length} active
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lowStockCount > 0 && (
            <Link href="/inventory/low-stock" className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors">
              <AlertTriangle className="w-3.5 h-3.5" /> {lowStockCount} Low Stock
            </Link>
          )}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Medicine
          </button>
        </div>
      </div>

      {/* Add Medicine Form */}
      {showAddForm && (
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" /> Add New Medicine
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Medicine Name *", placeholder: "e.g. Dolo 650mg", type: "text" },
              { label: "Generic Name *", placeholder: "e.g. Paracetamol 650mg", type: "text" },
              { label: "Brand", placeholder: "e.g. Dolo", type: "text" },
              { label: "Manufacturer *", placeholder: "e.g. Mankind Pharma", type: "text" },
              { label: "HSN Code", placeholder: "e.g. 30049099", type: "text" },
              { label: "SKU / Product Code", placeholder: "e.g. DOLO650-15", type: "text" },
              { label: "Pack Size *", placeholder: "e.g. 15 Tablets", type: "text" },
              { label: "MRP (₹) *", placeholder: "120", type: "number" },
              { label: "Purchase Price (₹) *", placeholder: "72", type: "number" },
              { label: "Selling Price (₹) *", placeholder: "96", type: "number" },
              { label: "Min Stock Level", placeholder: "100", type: "number" },
              { label: "Reorder Level", placeholder: "150", type: "number" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all" />
              </div>
            ))}
            {[
              { label: "Category *", options: ["Select...", ...CATEGORIES] },
              { label: "Dosage Form *", options: ["Select...", "Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops", "Inhaler", "Gel"] },
              { label: "GST Rate (%) *", options: ["Select...", "0%", "5%", "12%", "18%"] },
              { label: "Unit *", options: ["Select...", "Strip", "Bottle", "Vial", "Tube", "Box", "Inhaler"] },
              { label: "Status *", options: ["active", "inactive", "discontinued"] },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{f.label}</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white">
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-4">
              <input type="checkbox" id="rx-required" className="rounded" />
              <label htmlFor="rx-required" className="text-xs font-semibold text-slate-700">Prescription Required (Rx)</label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">Save Medicine</button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines, generics, SKU…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500">
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={manufacturerFilter} onChange={(e) => setManufacturerFilter(e.target.value)}
          className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500">
          <option value="All">All Manufacturers</option>
          {MANUFACTURERS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500">
          <option value="All">All Statuses</option>
          <option>active</option><option>inactive</option><option>discontinued</option>
        </select>
        <div className="text-xs text-slate-500 flex items-center">
          {filtered.length} of {MEDICINES.length} medicines
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200">
              <tr className="text-slate-500 uppercase text-[10px] tracking-wider">
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Generic Name</th>
                <th className="p-3 text-left">Manufacturer</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Pack Size</th>
                <th className="p-3 text-right">MRP</th>
                <th className="p-3 text-right">Sell Price</th>
                <th className="p-3 text-right">GST</th>
                <th className="p-3 text-right">Stock</th>
                <th className="p-3 text-center">Rx</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((med) => {
                const isLow = med.currentStock <= med.minStockLevel;
                return (
                  <tr key={med.id} className={`hover:bg-slate-50 transition-colors ${isLow ? "bg-amber-50/30" : ""}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                          <Pill className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{med.medicineName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{med.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">{med.genericName}</td>
                    <td className="p-3 text-slate-600">{med.manufacturer}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700">{med.category}</span>
                    </td>
                    <td className="p-3 text-slate-600">{med.packSize}</td>
                    <td className="p-3 text-right font-semibold text-slate-800">₹{med.mrp}</td>
                    <td className="p-3 text-right font-semibold text-emerald-700">₹{med.sellingPrice}</td>
                    <td className="p-3 text-right text-slate-600">{med.gstRate}%</td>
                    <td className="p-3 text-right">
                      <span className={`font-bold ${isLow ? "text-rose-600" : "text-slate-800"}`}>
                        {med.currentStock}
                      </span>
                      {isLow && <AlertTriangle className="w-3 h-3 text-amber-500 inline ml-1" />}
                    </td>
                    <td className="p-3 text-center">
                      {med.prescriptionRequired
                        ? <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">Rx</span>
                        : <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">OTC</span>
                      }
                    </td>
                    <td className="p-3 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusBadge(med.status)}`}>
                        {med.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <Pill className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="font-medium">No medicines found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
