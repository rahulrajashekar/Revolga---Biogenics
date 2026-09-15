"use client";

import React, { useState } from "react";
import { useBusiness } from "@/context/BusinessContext";
import { DynamicDocumentPreview } from "@/components/dynamic/DynamicDocumentPreview";
import { DynamicProductForm } from "@/components/dynamic/DynamicProductForm";
import { ConfigCustomizer } from "@/components/config/ConfigCustomizer";
import { ConfigInspector } from "@/components/config/ConfigInspector";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  Package,
  FileText,
  Boxes,
  TrendingUp,
  Sparkles,
  Pill,
  ShieldCheck,
  Sliders,
  Code,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { currentBusiness, t, isModuleEnabled } = useBusiness();
  const [activeTab, setActiveTab] = useState<"form" | "document" | "customizer" | "inspector">("form");

  return (
    <div className="space-y-6 pb-12">
      {/* ── Revolga Biogenics Hero Banner ── */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-sky-900/30"
        style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)" }}>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/20 text-xs font-medium">
            <span className="font-extrabold text-white">RB</span>
            <span>Revolga Biogenics — Medical & Healthcare Management System</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 shadow-md font-black text-xl text-white">
              RB
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {currentBusiness.businessName}
              </h1>
              <p className="text-xs sm:text-sm text-sky-200 font-medium">
                {currentBusiness.tagline}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed max-w-2xl">
            Your medical and healthcare management platform — managing{" "}
            <strong className="text-white">{t("productPlural")}</strong>,{" "}
            <strong className="text-white">{t("customerPlural")}</strong>,{" "}
            <strong className="text-white">{t("invoice")}s</strong>, and{" "}
            <strong className="text-white">{t("inventory")}</strong> in one seamless system.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="secondary" className="bg-white/10 text-emerald-100 border-white/20 text-xs">
              GSTIN: {currentBusiness.gstin}
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-emerald-100 border-white/20 text-xs">
              {currentBusiness.city}, {currentBusiness.state}
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-emerald-100 border-white/20 text-xs">
              GST System: Tax Invoice (12%)
            </Badge>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
          <Pill className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* ── KPI Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-emerald-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("customerPlural")}
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">84</div>
            <p className="text-xs text-slate-500 mt-1">Active <strong className="text-slate-700">{t("customerPlural")}</strong></p>
          </CardContent>
        </Card>

        <Card className="hover:border-blue-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("productPlural")} Catalog
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Package className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">1,240</div>
            <p className="text-xs text-slate-500 mt-1">SKUs in <strong className="text-slate-700">{t("inventory")}</strong></p>
          </CardContent>
        </Card>

        <Card className="hover:border-amber-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("invoicePlural")} (MTD)
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <FileText className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">₹18,42,000</div>
            <p className="text-xs text-slate-500 mt-1">This month via <strong className="text-slate-700">{t("invoice")}</strong></p>
          </CardContent>
        </Card>

        <Card className="hover:border-rose-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("inventory")} Status
            </CardTitle>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Boxes className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">7 Alerts</div>
            <p className="text-xs text-slate-500 mt-1">
              <Badge variant="warning" className="text-[10px]">Near Expiry — Action Needed</Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── Quick Access Links ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/products", icon: Package, label: `Add ${t("product")}`, color: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400" },
          { href: "/customers", icon: Users, label: `New ${t("customer")}`, color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400" },
          { href: "/documents", icon: FileText, label: `New ${t("invoice")}`, color: "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400" },
          { href: "/settings", icon: Sliders, label: "Settings", color: "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400" },
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all group ${item.color}`}>
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>

      {/* ── Configuration Playground (Collapsed by default for single-tenant) ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Configuration & Form Engine
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dynamic {t("product")} forms, {t("invoice")} document preview, and live schema inspector for Revolga Biogenics.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-medium">
            <button onClick={() => setActiveTab("form")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "form" ? "bg-white text-emerald-700 font-bold shadow-xs" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"}`}>
              <Package className="w-3.5 h-3.5" /> {t("product")} Form
            </button>
            <button onClick={() => setActiveTab("document")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "document" ? "bg-white text-emerald-700 font-bold shadow-xs" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"}`}>
              <FileText className="w-3.5 h-3.5" /> {t("invoice")} Preview
            </button>
            <button onClick={() => setActiveTab("customizer")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "customizer" ? "bg-white text-emerald-700 font-bold shadow-xs" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"}`}>
              <Sliders className="w-3.5 h-3.5" /> Customizer
            </button>
            <button onClick={() => setActiveTab("inspector")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "inspector" ? "bg-slate-900 text-white font-bold shadow-xs" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"}`}>
              <Code className="w-3.5 h-3.5" /> Inspector
            </button>
          </div>
        </div>

        {activeTab === "form" && <DynamicProductForm />}
        {activeTab === "document" && <DynamicDocumentPreview />}
        {activeTab === "customizer" && <ConfigCustomizer />}
        {activeTab === "inspector" && <ConfigInspector />}
      </div>
    </div>
  );
}
