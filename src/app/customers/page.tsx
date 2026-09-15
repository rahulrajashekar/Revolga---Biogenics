"use client";

import React, { useState } from "react";
import { Users, Plus, Search, Eye, Edit2, Phone, Mail, Building2 } from "lucide-react";
import { CUSTOMERS, Customer } from "@/lib/mockData";

const typeBadge: Record<Customer["customerType"], string> = {
  pharmacy:    "bg-emerald-100 text-emerald-700",
  hospital:    "bg-blue-100 text-blue-700",
  clinic:      "bg-purple-100 text-purple-700",
  dealer:      "bg-amber-100 text-amber-700",
  distributor: "bg-indigo-100 text-indigo-700",
  other:       "bg-slate-100 text-slate-600",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch = search === "" || c.businessName.toLowerCase().includes(search.toLowerCase()) || c.contactPerson.toLowerCase().includes(search.toLowerCase()) || (c.gstin || "").includes(search);
    const matchType = typeFilter === "All" || c.customerType === typeFilter;
    return matchSearch && matchType;
  });

  const totalOutstanding = CUSTOMERS.reduce((s, c) => s + c.outstandingBalance, 0);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-xl"><Users className="w-5 h-5 text-blue-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Customers</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            {CUSTOMERS.length} customers · Total outstanding: ₹{totalOutstanding.toLocaleString("en-IN")}
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Add Customer
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Add New Customer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Business Name *", "Contact Person *", "Phone *", "Email", "Address", "City", "GSTIN", "Drug License Number"].map((f) => (
              <div key={f}><label className="block text-xs font-semibold text-slate-700 mb-1">{f}</label>
              <input className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" /></div>
            ))}
            {[
              { label: "Customer Type *", options: ["pharmacy", "hospital", "clinic", "dealer", "distributor", "other"] },
              { label: "Payment Terms (days)", options: ["15", "21", "30", "45", "60"] },
            ].map((f) => (
              <div key={f.label}><label className="block text-xs font-semibold text-slate-700 mb-1">{f.label}</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-blue-500">{f.options.map(o => <option key={o}>{o}</option>)}</select></div>
            ))}
            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Credit Limit (₹)</label>
            <input type="number" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save Customer</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, GSTIN…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {["All", "pharmacy", "hospital", "clinic", "dealer", "distributor"].map((type) => (
            <button key={type} onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize cursor-pointer ${typeFilter === type ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Business Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">GSTIN</th>
                <th className="p-3 text-left">Drug License</th>
                <th className="p-3 text-right">Credit Limit</th>
                <th className="p-3 text-right">Outstanding</th>
                <th className="p-3 text-center">Terms</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className={`hover:bg-slate-50 ${c.outstandingBalance > c.creditLimit * 0.8 ? "bg-rose-50/20" : ""}`}>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{c.businessName}</p>
                        <p className="text-[10px] text-slate-400">{c.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-slate-700">{c.contactPerson}</p>
                    <p className="text-[10px] text-slate-400">{c.phone}</p>
                  </td>
                  <td className="p-3">
                    <span className={`capitalize px-2 py-0.5 rounded-full text-[9px] font-bold ${typeBadge[c.customerType]}`}>{c.customerType}</span>
                  </td>
                  <td className="p-3 font-mono text-slate-600 text-[10px]">{c.gstin || "—"}</td>
                  <td className="p-3 font-mono text-slate-600 text-[10px]">{c.drugLicenseNumber || "—"}</td>
                  <td className="p-3 text-right text-slate-700">₹{c.creditLimit.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right font-bold text-rose-600">₹{c.outstandingBalance.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-center text-slate-600">{c.paymentTerms}d</td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50" title="View"><Eye className="w-3.5 h-3.5" /></button>
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
