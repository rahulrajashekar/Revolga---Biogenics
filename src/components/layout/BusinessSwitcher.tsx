"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import { ChevronDown, Store, Pill, Wrench, Laptop, ShoppingCart, Sparkles, Check, Plus, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function BusinessSwitcher() {
  const { currentBusiness, selectedDemoId, setBusinessById, vendors } = useBusiness();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "paint_shop":
        return <Store className="w-4 h-4 text-blue-500" />;
      case "medical_distributor":
        return <Pill className="w-4 h-4 text-emerald-500" />;
      case "hardware_shop":
        return <Wrench className="w-4 h-4 text-amber-500" />;
      case "service_business":
        return <Laptop className="w-4 h-4 text-purple-500" />;
      case "general_retail":
        return <ShoppingCart className="w-4 h-4 text-sky-500" />;
      default:
        return <Store className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-xs font-medium text-slate-800 shadow-xs cursor-pointer group"
      >
        <div className="flex items-center justify-center p-1 rounded-md bg-slate-100 group-hover:bg-slate-200/70 transition-colors">
          {getIcon(currentBusiness.businessType)}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-600 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Workspace Switcher
          </span>
          <span className="font-semibold text-slate-900 truncate max-w-[140px] sm:max-w-[180px]">
            {currentBusiness.businessName}
          </span>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Registered Vendor Tenants ({vendors.length})
              </p>
              <p className="text-[10px] text-slate-500">Select business to launch dynamic workspace.</p>
            </div>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <ShieldCheck className="w-3 h-3" /> Admin
            </Link>
          </div>

          <div className="max-h-72 overflow-y-auto px-1 space-y-0.5">
            {vendors.map((vendor) => {
              const isSelected = vendor.id === selectedDemoId || currentBusiness.id === vendor.id;
              return (
                <button
                  key={vendor.id}
                  onClick={() => {
                    setBusinessById(vendor.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors text-xs cursor-pointer",
                    isSelected ? "bg-blue-50/80 text-blue-900 font-semibold" : "hover:bg-slate-100 text-slate-700"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">
                      {getIcon(vendor.config.businessType)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">{vendor.config.businessName}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {vendor.ownerName} • <span className="capitalize">{vendor.config.businessType.replace("_", " ")}</span>
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 px-2 flex items-center justify-between">
            <Link
              href="/onboarding"
              onClick={() => setIsOpen(false)}
              className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Register New Vendor Store
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
