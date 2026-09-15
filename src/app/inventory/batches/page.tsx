"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FlaskConical, Search, AlertTriangle, CheckCircle2, XCircle, Clock, Filter } from "lucide-react";
import { BATCHES, MANUFACTURERS } from "@/lib/mockData";

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  active:     { label: "Active",      color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  near_expiry:{ label: "Near Expiry", color: "bg-amber-100 text-amber-700",    icon: Clock },
  expired:    { label: "Expired",     color: "bg-rose-100 text-rose-700",      icon: XCircle },
  depleted:   { label: "Depleted",    color: "bg-slate-100 text-slate-600",    icon: AlertTriangle },
};

export default function BatchesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [mfrFilter, setMfrFilter] = useState("All");

  const filtered = BATCHES.filter((b) => {
    const matchSearch = search === "" || b.medicineName.toLowerCase().includes(search.toLowerCase()) || b.batchNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    const matchMfr = mfrFilter === "All" || b.manufacturer === mfrFilter;
    return matchSearch && matchStatus && matchMfr;
  });

  const counts = {
    total: BATCHES.length,
    active: BATCHES.filter(b => b.status === "active").length,
    near_expiry: BATCHES.filter(b => b.status === "near_expiry").length,
    expired: BATCHES.filter(b => b.status === "expired").length,
    depleted: BATCHES.filter(b => b.status === "depleted").length,
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-xl"><FlaskConical className="w-5 h-5 text-blue-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Batch Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">{counts.total} batches · {counts.near_expiry} near expiry · {counts.expired} expired</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
          + Add Batch
        </button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(counts).filter(([k]) => k !== "total").map(([status, count]) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <button key={status} onClick={() => setStatusFilter(statusFilter === status ? "All" : status)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${statusFilter === status ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${cfg.color.split(" ")[1]}`} />
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{count}</p>
              <p className="text-[10px] text-slate-500 capitalize">{status.replace("_", " ")} batches</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine name or batch number…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500" />
        </div>
        <select value={mfrFilter} onChange={(e) => setMfrFilter(e.target.value)}
          className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500">
          <option value="All">All Manufacturers</option>
          {MANUFACTURERS.map(m => <option key={m}>{m}</option>)}
        </select>
        <span className="text-xs text-slate-500 flex items-center">{filtered.length} batches</span>
      </div>

      {/* Batches Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Batch No.</th>
                <th className="p-3 text-left">Manufacturer</th>
                <th className="p-3 text-left">Mfg Date</th>
                <th className="p-3 text-left">Expiry Date</th>
                <th className="p-3 text-right">MRP</th>
                <th className="p-3 text-right">Purchase Rate</th>
                <th className="p-3 text-right">Selling Rate</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Free</th>
                <th className="p-3 text-right">GST</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((batch) => {
                const cfg = statusConfig[batch.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={batch.id} className={`hover:bg-slate-50 ${batch.status === "expired" ? "bg-rose-50/20" : batch.status === "near_expiry" ? "bg-amber-50/20" : ""}`}>
                    <td className="p-3 font-semibold text-slate-800">{batch.medicineName}</td>
                    <td className="p-3 font-mono text-blue-700 font-semibold">{batch.batchNumber}</td>
                    <td className="p-3 text-slate-600">{batch.manufacturer}</td>
                    <td className="p-3 text-slate-600">{batch.mfgDate}</td>
                    <td className="p-3 font-semibold text-slate-700">{batch.expiryDate}</td>
                    <td className="p-3 text-right font-semibold">₹{batch.mrp}</td>
                    <td className="p-3 text-right text-slate-600">₹{batch.purchaseRate}</td>
                    <td className="p-3 text-right text-emerald-700 font-semibold">₹{batch.sellingRate}</td>
                    <td className="p-3 text-right font-bold text-slate-800">{batch.quantity}</td>
                    <td className="p-3 text-right text-slate-600">{batch.freeQuantity}</td>
                    <td className="p-3 text-right text-slate-600">{batch.gстRate}%</td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${cfg.color}`}>
                        <StatusIcon className="w-2.5 h-2.5" />
                        {cfg.label.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <FlaskConical className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No batches found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
