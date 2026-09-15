"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, XCircle, Clock, Filter, Calendar } from "lucide-react";
import { BATCHES, MANUFACTURERS } from "@/lib/mockData";

const today = new Date("2026-09-15");

function daysUntilExpiry(expiryDate: string): number {
  const exp = new Date(expiryDate);
  return Math.floor((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ExpiryPage() {
  const [rangeFilter, setRangeFilter] = useState<"all" | "expired" | "30" | "60" | "90">("all");
  const [mfrFilter, setMfrFilter] = useState("All");

  const expiryBatches = BATCHES.map((b) => ({ ...b, daysLeft: daysUntilExpiry(b.expiryDate) }))
    .filter((b) => b.daysLeft <= 90)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const filtered = expiryBatches.filter((b) => {
    const matchMfr = mfrFilter === "All" || b.manufacturer === mfrFilter;
    let matchRange = true;
    if (rangeFilter === "expired") matchRange = b.daysLeft < 0;
    else if (rangeFilter === "30") matchRange = b.daysLeft >= 0 && b.daysLeft <= 30;
    else if (rangeFilter === "60") matchRange = b.daysLeft >= 0 && b.daysLeft <= 60;
    else if (rangeFilter === "90") matchRange = b.daysLeft >= 0 && b.daysLeft <= 90;
    return matchMfr && matchRange;
  });

  const chips = [
    { key: "all", label: "All Near Expiry", count: expiryBatches.length, color: "bg-slate-100 text-slate-700" },
    { key: "expired", label: "Expired", count: expiryBatches.filter(b => b.daysLeft < 0).length, color: "bg-rose-100 text-rose-700" },
    { key: "30", label: "Within 30 Days", count: expiryBatches.filter(b => b.daysLeft >= 0 && b.daysLeft <= 30).length, color: "bg-red-100 text-red-700" },
    { key: "60", label: "Within 60 Days", count: expiryBatches.filter(b => b.daysLeft >= 0 && b.daysLeft <= 60).length, color: "bg-amber-100 text-amber-700" },
    { key: "90", label: "Within 90 Days", count: expiryBatches.filter(b => b.daysLeft >= 0 && b.daysLeft <= 90).length, color: "bg-yellow-100 text-yellow-700" },
  ];

  const getRowClass = (days: number) => {
    if (days < 0) return "bg-rose-50/40";
    if (days <= 30) return "bg-red-50/30";
    if (days <= 60) return "bg-amber-50/20";
    return "";
  };

  const getDaysBadge = (days: number) => {
    if (days < 0) return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">EXPIRED ({Math.abs(days)}d ago)</span>;
    if (days <= 30) return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-red-700">{days}d left</span>;
    if (days <= 60) return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700">{days}d left</span>;
    return <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-yellow-100 text-yellow-700">{days}d left</span>;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-rose-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 rounded-xl"><AlertTriangle className="w-5 h-5 text-rose-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Expiry Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            Monitor and manage medicine batches approaching or past expiry date.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/inventory/batches" className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
            All Batches
          </Link>
        </div>
      </div>

      {/* Range Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button key={chip.key} onClick={() => setRangeFilter(chip.key as typeof rangeFilter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${rangeFilter === chip.key ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
            {chip.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${chip.color}`}>{chip.count}</span>
          </button>
        ))}
        <select value={mfrFilter} onChange={(e) => setMfrFilter(e.target.value)}
          className="ml-auto px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-rose-500">
          <option value="All">All Manufacturers</option>
          {MANUFACTURERS.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>

      {/* Summary Info */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {chips.slice(1).map((chip) => (
          <div key={chip.key} className={`p-3 rounded-xl border text-center ${chip.color} border-current/20`}>
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{chip.label}</p>
            <p className="text-2xl font-extrabold mt-1">{chip.count}</p>
            <p className="text-[10px] opacity-70">batches</p>
          </div>
        ))}
      </div>

      {/* Expiry Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Batch No.</th>
                <th className="p-3 text-left">Manufacturer</th>
                <th className="p-3 text-left">Expiry Date</th>
                <th className="p-3 text-center">Days Left</th>
                <th className="p-3 text-right">Qty.</th>
                <th className="p-3 text-right">MRP</th>
                <th className="p-3 text-right">Value</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((batch) => (
                <tr key={batch.id} className={`hover:bg-slate-50 ${getRowClass(batch.daysLeft)}`}>
                  <td className="p-3 font-semibold text-slate-800">{batch.medicineName}</td>
                  <td className="p-3 font-mono text-blue-700">{batch.batchNumber}</td>
                  <td className="p-3 text-slate-600">{batch.manufacturer}</td>
                  <td className="p-3 font-semibold text-slate-700">{batch.expiryDate}</td>
                  <td className="p-3 text-center">{getDaysBadge(batch.daysLeft)}</td>
                  <td className="p-3 text-right font-bold">{batch.quantity}</td>
                  <td className="p-3 text-right">₹{batch.mrp}</td>
                  <td className="p-3 text-right font-semibold text-slate-800">
                    ₹{(batch.quantity * batch.mrp).toLocaleString("en-IN")}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-1">
                      <button className="text-[9px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 transition-colors">Return</button>
                      <button className="text-[9px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold hover:bg-amber-100 transition-colors">Adjust</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No batches match this filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
