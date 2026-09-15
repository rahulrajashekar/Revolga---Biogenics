"use client";

import React, { useState } from "react";
import { useBusiness } from "@/context/BusinessContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Sliders, RefreshCw, Save, Check, Shield, Sparkles } from "lucide-react";

export function ConfigCustomizer() {
  const { currentBusiness, updateBusinessConfig, resetBusinessConfig, hasCustomizations, t } = useBusiness();
  const [savedMessage, setSavedMessage] = useState(false);

  // Terminology form state
  const [termState, setTermState] = useState({
    customer: currentBusiness.terminology.customer,
    supplier: currentBusiness.terminology.supplier,
    product: currentBusiness.terminology.product,
    productPlural: currentBusiness.terminology.productPlural,
    invoice: currentBusiness.terminology.invoice,
    purchase: currentBusiness.terminology.purchase,
    quotation: currentBusiness.terminology.quotation,
    inventory: currentBusiness.terminology.inventory,
  });

  // Keep state synced when active business changes
  React.useEffect(() => {
    setTermState({
      customer: currentBusiness.terminology.customer,
      supplier: currentBusiness.terminology.supplier,
      product: currentBusiness.terminology.product,
      productPlural: currentBusiness.terminology.productPlural,
      invoice: currentBusiness.terminology.invoice,
      purchase: currentBusiness.terminology.purchase,
      quotation: currentBusiness.terminology.quotation,
      inventory: currentBusiness.terminology.inventory,
    });
  }, [currentBusiness]);

  const handleTermChange = (key: string, val: string) => {
    setTermState((prev) => ({ ...prev, [key]: val }));
  };

  const applyTermChanges = () => {
    updateBusinessConfig({
      terminology: {
        ...currentBusiness.terminology,
        ...termState,
      },
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const toggleModule = (moduleKey: keyof typeof currentBusiness.modules) => {
    updateBusinessConfig({
      modules: {
        ...currentBusiness.modules,
        [moduleKey]: !currentBusiness.modules[moduleKey],
      },
    });
  };

  return (
    <Card className="border-slate-200 shadow-md">
      <CardHeader className="bg-slate-50/80 border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base font-bold text-slate-900">
                Interactive Configuration Engine Customizer
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Modify labels & feature flags in real-time. Watch the navigation sidebar, headers, and forms dynamically adapt!
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {hasCustomizations && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetBusinessConfig}
                className="text-xs text-slate-600 border-slate-300 hover:bg-slate-100 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
              </Button>
            )}
            <Button
              size="sm"
              onClick={applyTermChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1.5 shadow-xs"
            >
              {savedMessage ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savedMessage ? "Applied!" : "Apply Custom Terminology"}</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Module Flags Section */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Dynamic Module Switches
          </h4>
          <p className="text-xs text-slate-500 mb-3">
            Click to enable or disable modules. Disabled modules instantly hide from the sidebar navigation and app shell.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {Object.entries(currentBusiness.modules).map(([modKey, isEnabled]) => (
              <button
                key={modKey}
                onClick={() => toggleModule(modKey as any)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isEnabled
                    ? "bg-blue-50/70 border-blue-200 text-blue-900 hover:bg-blue-100/70"
                    : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold capitalize">{modKey}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isEnabled ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block">
                  {isEnabled ? "Module Active" : "Disabled"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Terminology Editor Grid */}
        <div className="border-t border-slate-200 pt-5">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-600" /> Custom Terminology Overrides
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            Type custom labels below to replace default terminology for {currentBusiness.businessName}:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Customer Label:
              </label>
              <Input
                value={termState.customer}
                onChange={(e) => handleTermChange("customer", e.target.value)}
                placeholder="e.g. Customer / Dealer / Client"
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Supplier Label:
              </label>
              <Input
                value={termState.supplier}
                onChange={(e) => handleTermChange("supplier", e.target.value)}
                placeholder="e.g. Manufacturer / Vendor"
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Product Singular Label:
              </label>
              <Input
                value={termState.product}
                onChange={(e) => handleTermChange("product", e.target.value)}
                placeholder="e.g. Paint / Medicine / Item / Service"
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Product Plural Label:
              </label>
              <Input
                value={termState.productPlural}
                onChange={(e) => handleTermChange("productPlural", e.target.value)}
                placeholder="e.g. Paints / Medicines / Services"
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Sales Invoice Label:
              </label>
              <Input
                value={termState.invoice}
                onChange={(e) => handleTermChange("invoice", e.target.value)}
                placeholder="e.g. Sales Bill / Tax Invoice"
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Purchase Invoice Label:
              </label>
              <Input
                value={termState.purchase}
                onChange={(e) => handleTermChange("purchase", e.target.value)}
                placeholder="e.g. Purchase Bill / Vendor Bill"
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Quotation / Estimate Label:
              </label>
              <Input
                value={termState.quotation}
                onChange={(e) => handleTermChange("quotation", e.target.value)}
                placeholder="e.g. Estimate / Quote / Proposal"
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Inventory Label:
              </label>
              <Input
                value={termState.inventory}
                onChange={(e) => handleTermChange("inventory", e.target.value)}
                placeholder="e.g. Paint Stock / Batch Inventory"
                className="text-xs"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
