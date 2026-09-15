"use client";

import React, { useState } from "react";
import { Sliders, Shield, Pill, Building2, Bell, Lock } from "lucide-react";
import { useBusiness } from "@/context/BusinessContext";

export default function SettingsPage() {
  const { currentBusiness, updateBusinessConfig } = useBusiness();
  const [activeTab, setActiveTab] = useState<"general" | "tax" | "expiry" | "inventory">("general");

  const [businessName, setBusinessName] = useState(currentBusiness.businessName);
  const [gstin, setGstin] = useState(currentBusiness.gstin || "");
  const [phone, setPhone] = useState(currentBusiness.phone || "");
  const [email, setEmail] = useState(currentBusiness.email || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig({ businessName, gstin, phone, email });
    alert("Business settings updated!");
  };

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl"><Sliders className="w-5 h-5 text-emerald-600" /></div>
            <h1 className="text-xl font-extrabold text-slate-900">Business Settings</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-9">Medical Distributor Configuration & Rules</p>
        </div>
        <button onClick={handleSave} className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
          Save Settings
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button onClick={() => setActiveTab("general")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${activeTab === "general" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
          General Profile
        </button>
        <button onClick={() => setActiveTab("tax")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${activeTab === "tax" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
          GST & Tax Config
        </button>
        <button onClick={() => setActiveTab("expiry")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${activeTab === "expiry" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
          Expiry Rules
        </button>
        <button onClick={() => setActiveTab("inventory")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${activeTab === "inventory" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
          Batch Rules
        </button>
      </div>

      {activeTab === "general" && (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
              <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN</label>
              <input value={gstin} onChange={(e) => setGstin(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Drug License Number 1 (Form 20B)</label>
              <input defaultValue="KL-DL-WHL-2024-0099" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Drug License Number 2 (Form 21B)</label>
              <input defaultValue="KL-DL-WHL-2024-0100" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono bg-slate-50" readOnly />
            </div>
          </div>
        </form>
      )}

      {activeTab === "expiry" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Expiry Alert Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-800">Alert Threshold Days</p>
                <p className="text-[11px] text-slate-500">Alert when batch expiry is within specified days</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 rounded-lg text-emerald-700">30, 60, 90 Days</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-800">Prevent Sale of Expired Batches</p>
                <p className="text-[11px] text-slate-500">Automatically block expired batch selection in Tax Invoices</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg">ENABLED</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "tax" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">GST & Tax Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Default GST System</label>
              <input defaultValue="GST (India)" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50" readOnly />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">HSN Code Mandatory</label>
              <input defaultValue="Yes (8-digit for Pharma)" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-slate-50" readOnly />
            </div>
          </div>
        </div>
      )}

      {activeTab === "inventory" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Inventory & Batch Rules</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-800">Batch Tracking</p>
                <p className="text-[11px] text-slate-500">Track batch number, manufacturing date, and expiry date for all medicines</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg">ENABLED</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-slate-800">Allow Negative Stock</p>
                <p className="text-[11px] text-slate-500">Permit invoice creation when stock is zero</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-rose-100 text-rose-800 rounded-lg">DISABLED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
