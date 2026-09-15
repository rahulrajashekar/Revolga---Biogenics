"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Boxes, FlaskConical, TrendingDown, AlertTriangle, ArrowLeftRight, Plus } from "lucide-react";
import { MEDICINES, BATCHES, STOCK_MOVEMENTS } from "@/lib/mockData";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<"stock" | "batches" | "low" | "expiry" | "movements">("stock");

  const lowStockMeds = MEDICINES.filter((m) => m.currentStock <= m.minStockLevel);
  const expiryBatches = BATCHES.filter((b) => b.status === "near_expiry" || b.status === "expired");

  const tabs = [
    { id: "stock", label: "Current Stock", icon: Boxes, count: MEDICINES.length },
    { id: "batches", label: "Batch Stock", icon: FlaskConical, count: BATCHES.length, href: "/inventory/batches" },
    { id: "low", label: "Low Stock", icon: TrendingDown, count: lowStockMeds.length, href: "/inventory/low-stock", alert: lowStockMeds.length > 0 },
    { id: "expiry", label: "Expiry", icon: AlertTriangle, count: expiryBatches.length, href: "/inventory/expiry", alert: expiryBatches.length > 0 },
    { id: "movements", label: "Stock Movements", icon: ArrowLeftRight, count: STOCK_MOVEMENTS.length, href: "/inventory/movements" },
  ];

  const totalStockValue = MEDICINES.reduce((sum, m) => sum + m.currentStock * m.sellingPrice, 0);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-xl"><Boxes className="w-5 h-5 text-indigo-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Medicine Stock</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            {MEDICINES.length} medicines · {BATCHES.length} batches · Total value: ₹{totalStockValue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/purchases/new" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Purchase Bill (Add Stock)
          </Link>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-500">Total Medicines</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{MEDICINES.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-500">Active Batches</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">{BATCHES.filter(b => b.status === "active").length}</p>
        </div>
        <div className={`bg-white border rounded-xl p-4 text-center ${lowStockMeds.length > 0 ? "border-amber-300" : "border-slate-200"}`}>
          <p className="text-xs text-slate-500">Low Stock</p>
          <p className={`text-2xl font-extrabold mt-1 ${lowStockMeds.length > 0 ? "text-amber-600" : "text-slate-900"}`}>{lowStockMeds.length}</p>
        </div>
        <div className={`bg-white border rounded-xl p-4 text-center ${expiryBatches.length > 0 ? "border-rose-300" : "border-slate-200"}`}>
          <p className="text-xs text-slate-500">Expiry Alerts</p>
          <p className={`text-2xl font-extrabold mt-1 ${expiryBatches.length > 0 ? "text-rose-600" : "text-slate-900"}`}>{expiryBatches.length}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isLink = tab.href && tab.id !== "stock";
          const content = (
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}>
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tab.alert ? "bg-rose-500 text-white" : activeTab === tab.id ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{tab.count}</span>
            </div>
          );
          if (isLink) return <Link key={tab.id} href={tab.href!}>{content}</Link>;
          return <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}>{content}</button>;
        })}
      </div>

      {/* Current Stock Table */}
      {activeTab === "stock" && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 text-left">Medicine</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Manufacturer</th>
                  <th className="p-3 text-right">Current Stock</th>
                  <th className="p-3 text-right">Min Level</th>
                  <th className="p-3 text-right">Reorder At</th>
                  <th className="p-3 text-right">MRP</th>
                  <th className="p-3 text-right">Stock Value</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MEDICINES.map((med) => {
                  const isLow = med.currentStock <= med.minStockLevel;
                  const isReorder = med.currentStock <= med.reorderLevel && !isLow;
                  return (
                    <tr key={med.id} className={`hover:bg-slate-50 ${isLow ? "bg-rose-50/20" : isReorder ? "bg-amber-50/10" : ""}`}>
                      <td className="p-3 font-semibold text-slate-800">{med.medicineName}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700">{med.category}</span></td>
                      <td className="p-3 text-slate-600">{med.manufacturer}</td>
                      <td className={`p-3 text-right font-bold ${isLow ? "text-rose-600" : "text-slate-800"}`}>{med.currentStock}</td>
                      <td className="p-3 text-right text-slate-500">{med.minStockLevel}</td>
                      <td className="p-3 text-right text-slate-500">{med.reorderLevel}</td>
                      <td className="p-3 text-right text-slate-700">₹{med.mrp}</td>
                      <td className="p-3 text-right font-semibold text-slate-800">₹{(med.currentStock * med.sellingPrice).toLocaleString("en-IN")}</td>
                      <td className="p-3 text-center">
                        {isLow
                          ? <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">LOW STOCK</span>
                          : isReorder
                          ? <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">REORDER</span>
                          : <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">OK</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
