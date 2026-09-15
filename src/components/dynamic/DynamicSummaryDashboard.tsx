"use client";

import React from "react";
import { useBusiness } from "@/context/BusinessContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Package,
  FileText,
  Boxes,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Store,
  Pill,
  Wrench,
  Laptop,
  CheckCircle2,
} from "lucide-react";

export function DynamicSummaryDashboard() {
  const { currentBusiness, t, isModuleEnabled, demoOptions, setBusinessById } = useBusiness();

  const getBusinessIcon = (type: string) => {
    switch (type) {
      case "paint_shop":
        return <Store className="w-6 h-6 text-blue-400" />;
      case "medical_distributor":
        return <Pill className="w-6 h-6 text-emerald-400" />;
      case "hardware_shop":
        return <Wrench className="w-6 h-6 text-amber-400" />;
      case "service_business":
        return <Laptop className="w-6 h-6 text-purple-400" />;
      default:
        return <Store className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Hero Banner powered strictly by BusinessConfig */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
        }}
      >
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Phase 2 — Active Configuration Engine Workspace</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 shadow-md">
              {getBusinessIcon(currentBusiness.businessType)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {currentBusiness.businessName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {currentBusiness.tagline || "Multi-Tenant Business OS"}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            This dashboard component is rendered using a single generic <code className="text-blue-300 font-mono">Dashboard.tsx</code> implementation consuming <code className="text-blue-300 font-mono">BusinessConfig</code>.
            Currently rendering active labels: <strong className="text-white font-semibold">{t("product")}</strong>, <strong className="text-white font-semibold">{t("customer")}</strong>, <strong className="text-white font-semibold">{t("invoice")}</strong>, and <strong className="text-white font-semibold">{t("inventory")}</strong>.
          </p>

          {/* Quick Business Profile Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="secondary" className="bg-slate-800 text-slate-200 border-slate-700 text-xs">
              Type: {currentBusiness.businessType.replace("_", " ")}
            </Badge>
            <Badge variant="secondary" className="bg-slate-800 text-slate-200 border-slate-700 text-xs">
              GSTIN: {currentBusiness.gstin || "Configured"}
            </Badge>
            <Badge variant="secondary" className="bg-slate-800 text-slate-200 border-slate-700 text-xs">
              Currency: {currentBusiness.currency} (₹)
            </Badge>
          </div>
        </div>
      </div>

      {/* Dynamic Metric Cards Driven by Config */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Customer Metric Card */}
        <Card className="hover:border-blue-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("customer")} Directory
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">128</div>
            <p className="text-xs text-slate-500 mt-1">
              Active <span className="font-semibold text-slate-700">{t("customer")}s</span> registered
            </p>
          </CardContent>
        </Card>

        {/* Product Metric Card */}
        <Card className="hover:border-emerald-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("product")} Catalog
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Package className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">452</div>
            <p className="text-xs text-slate-500 mt-1">
              Configured <span className="font-semibold text-slate-700">{t("productPlural")}</span> items
            </p>
          </CardContent>
        </Card>

        {/* Invoice Metric Card */}
        <Card className="hover:border-amber-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("invoice")} Stream
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <FileText className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">₹4,85,200</div>
            <p className="text-xs text-slate-500 mt-1">
              Total sales via <span className="font-semibold text-slate-700">{t("invoice")}</span>
            </p>
          </CardContent>
        </Card>

        {/* Inventory Metric Card */}
        <Card className="hover:border-purple-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {t("inventory")} Module
            </CardTitle>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Boxes className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">
              {isModuleEnabled("inventory") ? "Active" : "Disabled"}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Status:{" "}
              <Badge variant={isModuleEnabled("inventory") ? "success" : "secondary"}>
                {isModuleEnabled("inventory") ? t("inventory") : "No Physical Stock"}
              </Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Demo Switcher Quick Launcher */}
      <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Phase 2 Verification Preset Switcher
          </div>
          <CardTitle className="text-lg text-white">Switch Demo Business Profiles</CardTitle>
          <CardDescription className="text-slate-300 text-xs">
            Select a profile below to observe how the exact same components render distinct terminology, forms, document types, and module flags.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {demoOptions.map((item) => {
              const isSelected = item.id === currentBusiness.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setBusinessById(item.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? "bg-blue-600/90 border-blue-400 text-white shadow-lg ring-2 ring-blue-400/50"
                      : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{item.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                  </div>
                  <p className="text-[11px] opacity-80 font-normal leading-relaxed">{item.description}</p>
                  <div className="pt-1 flex items-center justify-between text-[10px]">
                    <span className="uppercase font-semibold tracking-wider opacity-75">{item.badge}</span>
                    <span className="underline underline-offset-2">Select →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
