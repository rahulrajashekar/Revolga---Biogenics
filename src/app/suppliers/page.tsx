"use client";

import React, { useState } from "react";
import { Truck, Plus, Search, Eye, Edit2, Building2 } from "lucide-react";
import { SUPPLIERS, Supplier } from "@/lib/mockData";

const typeBadge: Record<Supplier["supplierType"], string> = {
  manufacturer: "bg-purple-100 text-purple-700",
  distributor:  "bg-blue-100 text-blue-700",
};

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = SUPPLIERS.filter((s) => {
    const matchSearch = search === "" || s.companyName.toLowerCase().includes(search.toLowerCase()) || s.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || s.supplierType === typeFilter;
    return matchSearch && matchType;
  });

  const totalPayable = SUPPLIERS.reduce((s, sup) => s + sup.outstandingPayable, 0);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-xl"><Truck className="w-5 h-5 text-purple-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Suppliers</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{SUPPLIERS.length} suppliers · Total payable: ₹{totalPayable.toLocaleString("en-IN")}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Add Supplier
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Add New Supplier</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Company Name *", "Contact Person *", "Phone *", "Email", "Address", "City", "GSTIN *", "Drug License Number"].map((f) => (
              <div key={f}><label className="block text-xs font-semibold text-slate-700 mb-1">{f}</label>
              <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500" /></div>
            ))}
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Supplier Type *</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-purple-500"><option>manufacturer</option><option>distributor</option></select></div>
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Payment Terms (days)</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-purple-500"><option>15</option><option>21</option><option>30</option><option>45</option></select></div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700">Save Supplier</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search suppliers…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500" />
        </div>
        {["All", "manufacturer", "distributor"].map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize cursor-pointer transition-all ${typeFilter === t ? "bg-purple-600 text-white border-purple-600" : "bg-white text-slate-600 border-slate-200"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Company Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">GSTIN</th>
                <th className="p-3 text-left">Drug License</th>
                <th className="p-3 text-center">Payment Terms</th>
                <th className="p-3 text-right">Outstanding Payable</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{s.companyName}</p>
                        <p className="text-[10px] text-slate-400">{s.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-slate-700">{s.contactPerson}</p>
                    <p className="text-[10px] text-slate-400">{s.phone}</p>
                  </td>
                  <td className="p-3"><span className={`capitalize px-2 py-0.5 rounded-full text-[9px] font-bold ${typeBadge[s.supplierType]}`}>{s.supplierType}</span></td>
                  <td className="p-3 font-mono text-slate-600 text-[10px]">{s.gstin}</td>
                  <td className="p-3 font-mono text-slate-600 text-[10px]">{s.drugLicenseNumber || "—"}</td>
                  <td className="p-3 text-center text-slate-600">{s.paymentTerms}d</td>
                  <td className="p-3 text-right font-bold text-rose-600">₹{s.outstandingPayable.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1 rounded text-slate-400 hover:text-purple-600 hover:bg-purple-50" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                    </div>
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
