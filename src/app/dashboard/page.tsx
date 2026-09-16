"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, AlertTriangle, Pill, Users, Truck,
  ShoppingCart, ShoppingBag, CreditCard, Boxes, ArrowRight,
  CheckCircle2, Clock, XCircle, RotateCcw, FlaskConical,
} from "lucide-react";
import {
  DASHBOARD_STATS, SALES_INVOICES, PURCHASE_BILLS, TOP_SELLING_MEDICINES,
  TOP_CUSTOMERS, BATCHES, MEDICINES,
} from "@/lib/mockData";

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const paymentStatusBadge = (status: string) => {
  const map: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-700",
    partial: "bg-amber-100 text-amber-700",
    credit: "bg-blue-100 text-blue-700",
    pending: "bg-slate-100 text-slate-600",
  };
  return map[status] || "bg-slate-100 text-slate-600";
};

export default function MedicalDashboard() {
  const nearExpiryBatches = BATCHES.filter((b) => b.status === "near_expiry" || b.status === "expired");
  const lowStockMeds = MEDICINES.filter((m) => m.currentStock <= m.minStockLevel);

  const kpiCards = [
    { label: "Today's Sales", value: fmt(DASHBOARD_STATS.todaysSales), icon: TrendingUp, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", sub: "5 invoices today", trend: "+12% vs yesterday", positive: true, href: "/sales" },
    { label: "Today's Purchases", value: fmt(DASHBOARD_STATS.todaysPurchases), icon: ShoppingBag, iconBg: "bg-blue-100", iconColor: "text-blue-600", sub: "No bills today", trend: "2 pending receipts", positive: null, href: "/purchases" },
    { label: "Total Outstanding", value: fmt(DASHBOARD_STATS.totalOutstanding), icon: CreditCard, iconBg: "bg-rose-100", iconColor: "text-rose-600", sub: "Combined dues", trend: "Receivable + Payable", positive: null, href: "/payments" },
    { label: "Receivables", value: fmt(DASHBOARD_STATS.totalReceivables), icon: TrendingUp, iconBg: "bg-amber-100", iconColor: "text-amber-600", sub: "From customers", trend: "12 accounts", positive: null, href: "/payments/receivables" },
    { label: "Payables", value: fmt(DASHBOARD_STATS.totalPayables), icon: TrendingDown, iconBg: "bg-purple-100", iconColor: "text-purple-600", sub: "To suppliers", trend: "3 accounts", positive: null, href: "/payments/payables" },
    { label: "Stock Value", value: fmt(DASHBOARD_STATS.totalStockValue), icon: Boxes, iconBg: "bg-slate-100", iconColor: "text-slate-600", sub: "All active batches", trend: "1,240 SKUs", positive: null, href: "/inventory" },
    { label: "Low Stock", value: `${DASHBOARD_STATS.lowStockMedicines} Medicines`, icon: TrendingDown, iconBg: "bg-amber-100", iconColor: "text-amber-600", sub: "Below minimum level", trend: "Action required", positive: false, href: "/inventory/low-stock" },
    { label: "Near Expiry", value: `${DASHBOARD_STATS.nearExpiryMedicines} Batches`, icon: Clock, iconBg: "bg-orange-100", iconColor: "text-orange-600", sub: "Within 90 days", trend: "Review & return", positive: false, href: "/inventory/expiry" },
    { label: "Expired", value: `${DASHBOARD_STATS.expiredMedicines} Batches`, icon: XCircle, iconBg: "bg-rose-100", iconColor: "text-rose-600", sub: "Quarantine required", trend: "Immediate action", positive: false, href: "/inventory/expiry" },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-ambient-lg border border-white/10"
        style={{ background: "linear-gradient(135deg, #0b1224 0%, #0f2447 45%, #0369a1 85%, #0ea5e9 130%)" }}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(480px circle at 85% -10%, rgba(14,165,233,0.35), transparent 60%)" }}
        />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark text-sky-200 text-xs font-medium">
            <span className="font-extrabold text-white">RB</span>
            <span>Revolga Biogenics — Medical & Healthcare Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Good afternoon, Dr. Nair 👋
          </h1>
          <p className="text-sm text-sky-100">
            Here&apos;s your medical business & healthcare operations overview for{" "}
            <strong className="text-white">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </strong>
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link href="/sales/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-blue-700 text-xs font-bold shadow-ambient hover:bg-sky-50 transition-colors">
              <ShoppingCart className="w-3.5 h-3.5" /> New Tax Invoice
            </Link>
            <Link href="/purchases/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glass-dark text-white text-xs font-semibold hover:bg-white/15 transition-colors">
              <ShoppingBag className="w-3.5 h-3.5" /> New Purchase Bill
            </Link>
            <Link href="/inventory/expiry" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/90 text-white border border-rose-400/40 text-xs font-semibold hover:bg-rose-500 transition-colors">
              <AlertTriangle className="w-3.5 h-3.5" /> Expiry Alerts ({DASHBOARD_STATS.expiredMedicines + DASHBOARD_STATS.nearExpiryMedicines})
            </Link>
          </div>
        </div>
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
          <Pill className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* ── KPI Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href}
              className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-ambient hover:shadow-ambient-lg hover:border-blue-300/70 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{card.label}</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-1">{card.value}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{card.sub}</p>
                </div>
                <div className={`p-2.5 rounded-xl shadow-sm ${card.iconBg}`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
              <div className={`mt-3 flex items-center gap-1 text-[11px] font-medium ${card.positive === true ? "text-emerald-600" : card.positive === false ? "text-rose-600" : "text-slate-500"}`}>
                {card.positive === true && <TrendingUp className="w-3 h-3" />}
                {card.positive === false && <TrendingDown className="w-3 h-3" />}
                {card.trend}
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Recent Sales + Top Medicines ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-ambient">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Recent Tax Invoices</h3>
            </div>
            <Link href="/sales" className="text-xs text-emerald-600 font-medium hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {SALES_INVOICES.slice(0, 5).map((inv) => (
              <div key={inv.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{inv.customerName}</p>
                  <p className="text-[10px] text-slate-500">{inv.invoiceNumber} · {inv.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-slate-900">{fmt(inv.grandTotal)}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${paymentStatusBadge(inv.paymentStatus)}`}>
                    {inv.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Medicines */}
        <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-ambient">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Top Selling Medicines</h3>
            </div>
            <Link href="/medicines" className="text-xs text-emerald-600 font-medium hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {TOP_SELLING_MEDICINES.map((med, i) => (
              <div key={med.name} className="flex items-center gap-3 p-3 hover:bg-slate-50">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{med.name}</p>
                  <div className="w-full bg-slate-100 rounded-full h-1 mt-1">
                    <div className="bg-emerald-500 h-1 rounded-full transition-all" style={{ width: `${(med.units / 1240) * 100}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-semibold text-slate-700">{med.units} units</p>
                  <p className="text-[10px] text-slate-500">{fmt(med.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Expiry Alert Table ── */}
      <div className="bg-white border border-rose-200/70 rounded-2xl overflow-hidden shadow-ambient">
        <div className="flex items-center justify-between p-4 border-b border-rose-100 bg-rose-50/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900">Near Expiry & Expired Batches</h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100 text-rose-700">{nearExpiryBatches.length} Batches</span>
          </div>
          <Link href="/inventory/expiry" className="text-xs text-rose-600 font-medium hover:underline">Manage Expiry →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Batch</th>
                <th className="p-3 text-left">Manufacturer</th>
                <th className="p-3 text-left">Expiry Date</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">MRP</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {nearExpiryBatches.map((batch) => (
                <tr key={batch.id} className={`hover:bg-slate-50 ${batch.status === "expired" ? "bg-rose-50/30" : "bg-amber-50/20"}`}>
                  <td className="p-3 font-semibold text-slate-800">{batch.medicineName}</td>
                  <td className="p-3 font-mono text-slate-600">{batch.batchNumber}</td>
                  <td className="p-3 text-slate-600">{batch.manufacturer}</td>
                  <td className="p-3 text-slate-700 font-medium">{batch.expiryDate}</td>
                  <td className="p-3 text-right font-semibold">{batch.quantity}</td>
                  <td className="p-3 text-right">₹{batch.mrp}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${batch.status === "expired" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                      {batch.status === "expired" ? "EXPIRED" : "NEAR EXPIRY"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Low Stock + Top Customers ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock */}
        <div className="bg-white border border-amber-200/70 rounded-2xl overflow-hidden shadow-ambient">
          <div className="flex items-center justify-between p-4 border-b border-amber-100 bg-amber-50/50">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Low Stock Medicines</h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700">{lowStockMeds.length}</span>
            </div>
            <Link href="/inventory/low-stock" className="text-xs text-amber-700 font-medium hover:underline">Reorder →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {lowStockMeds.slice(0, 5).map((med) => (
              <div key={med.id} className="flex items-center gap-3 p-3 hover:bg-slate-50">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Pill className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{med.medicineName}</p>
                  <p className="text-[10px] text-slate-500">{med.manufacturer}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-rose-600">{med.currentStock} left</p>
                  <p className="text-[10px] text-slate-500">Min: {med.minStockLevel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-ambient">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Top Customers</h3>
            </div>
            <Link href="/customers" className="text-xs text-emerald-600 font-medium hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {TOP_CUSTOMERS.map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 hover:bg-slate-50">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{c.name}</p>
                  <p className="text-[10px] text-slate-500">{c.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-slate-500">Outstanding</p>
                  <p className="text-xs font-bold text-rose-600">{fmt(c.outstanding)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Stats Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/purchases" className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-ambient hover:shadow-ambient-lg hover:border-blue-300/70 hover:-translate-y-0.5 transition-all duration-200 group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl"><ShoppingBag className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Recent Purchase Bills</p>
              <p className="text-lg font-extrabold text-slate-900">{PURCHASE_BILLS.length}</p>
            </div>
          </div>
        </Link>
        <Link href="/suppliers" className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-ambient hover:shadow-ambient-lg hover:border-purple-300/70 hover:-translate-y-0.5 transition-all duration-200 group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 rounded-xl"><Truck className="w-5 h-5 text-purple-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Active Suppliers</p>
              <p className="text-lg font-extrabold text-slate-900">7</p>
            </div>
          </div>
        </Link>
        <Link href="/inventory/batches" className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-ambient hover:shadow-ambient-lg hover:border-emerald-300/70 hover:-translate-y-0.5 transition-all duration-200 group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl"><FlaskConical className="w-5 h-5 text-emerald-600" /></div>
            <div>
              <p className="text-xs text-slate-500">Active Batches</p>
              <p className="text-lg font-extrabold text-slate-900">{BATCHES.filter(b => b.status === "active").length}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
