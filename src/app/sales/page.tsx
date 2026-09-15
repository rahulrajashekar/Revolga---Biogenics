"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, Search, Eye, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { SALES_INVOICES, SalesInvoice } from "@/lib/mockData";

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-700",
    partial: "bg-amber-100 text-amber-700",
    credit: "bg-blue-100 text-blue-700",
    pending: "bg-slate-100 text-slate-600",
  };
  return map[status] || "bg-slate-100 text-slate-600";
};

export default function SalesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = SALES_INVOICES.filter((inv) => {
    const matchSearch =
      search === "" ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || inv.paymentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalSales = SALES_INVOICES.reduce((sum, inv) => sum + inv.grandTotal, 0);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">Tax Invoices</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">
            {SALES_INVOICES.length} invoices · Total Sales: ₹{totalSales.toLocaleString("en-IN")}
          </p>
        </div>
        <Link
          href="/sales/new"
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Create Tax Invoice
        </Link>
      </div>

      {/* Quick Links / Sub-navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Link href="/sales" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white">
          Tax Invoices
        </Link>
        <Link href="/sales/returns" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">
          Sales Returns
        </Link>
        <Link href="/sales/quotations" className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">
          Quotations
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice number or customer…"
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-1">
          {["All", "paid", "partial", "credit", "pending"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize cursor-pointer transition-all ${
                statusFilter === st
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Invoice No</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-center">Items</th>
                <th className="p-3 text-right">Subtotal</th>
                <th className="p-3 text-right">GST</th>
                <th className="p-3 text-right">Grand Total</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-700">{inv.invoiceNumber}</td>
                  <td className="p-3 text-slate-600">{inv.date}</td>
                  <td className="p-3 font-semibold text-slate-800">{inv.customerName}</td>
                  <td className="p-3 text-center text-slate-600">{inv.items.length}</td>
                  <td className="p-3 text-right text-slate-600">₹{inv.subtotal.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right text-slate-600">₹{inv.totalGst.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right font-bold text-slate-900">₹{inv.grandTotal.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusBadge(inv.paymentStatus)}`}>
                      {inv.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50" title="View Document">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
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
