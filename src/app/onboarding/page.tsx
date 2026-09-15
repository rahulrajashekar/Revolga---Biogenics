"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import { BusinessConfig, BusinessType, SubscriptionPlanTier, VendorTenant } from "@/types/config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  paintShopConfig,
  medicalDistributorConfig,
  hardwareShopConfig,
  serviceBusinessConfig,
  generalRetailConfig,
} from "@/config/businesses";
import {
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Store,
  Pill,
  Wrench,
  Laptop,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Check,
  Globe,
  Sliders,
  Users,
} from "lucide-react";

export default function VendorOnboardingPage() {
  const router = useRouter();
  const { registerVendorTenant } = useBusiness();

  // Wizard Step Control (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Kochi");
  const [state, setState] = useState("Kerala");
  const [gstin, setGstin] = useState("");

  const [selectedType, setSelectedType] = useState<BusinessType>("paint_shop");
  const [brandColor, setBrandColor] = useState("#2563eb");
  const [tagline, setTagline] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanTier>("pro");
  const [isProvisioning, setIsProvisioning] = useState(false);

  // Get base template config according to selected business type
  const getBaseConfigForType = (type: BusinessType): BusinessConfig => {
    switch (type) {
      case "paint_shop":
        return paintShopConfig;
      case "medical_distributor":
        return medicalDistributorConfig;
      case "hardware_shop":
        return hardwareShopConfig;
      case "service_business":
        return serviceBusinessConfig;
      case "general_retail":
        return generalRetailConfig;
      default:
        return paintShopConfig;
    }
  };

  const currentPreset = getBaseConfigForType(selectedType);

  const businessTypes: { type: BusinessType; name: string; icon: any; desc: string; badge: string }[] = [
    {
      type: "paint_shop",
      name: "Paint Shop & Coating",
      icon: Store,
      badge: "Retail & Tinting",
      desc: "Uses Paints, Customers, Sales Bills, Purchase Bills, Quotations, and Paint Stock.",
    },
    {
      type: "medical_distributor",
      name: "Medical Wholesaler",
      icon: Pill,
      badge: "Pharma Wholesaler",
      desc: "Uses Medicines, Dealers, Tax Invoices, Delivery Challans, and Batch Inventory.",
    },
    {
      type: "hardware_shop",
      name: "Hardware & Tools Store",
      icon: Wrench,
      badge: "Building Materials",
      desc: "Uses Items, Customers, Sales Invoices, Vendor Bills, and Stock Inventory.",
    },
    {
      type: "service_business",
      name: "IT & Digital Services",
      icon: Laptop,
      badge: "Consulting & Services",
      desc: "Uses Services, Clients, Service Invoices, Proposals, and Scope Documents (No Stock).",
    },
    {
      type: "general_retail",
      name: "General Retail / Superstore",
      icon: ShoppingCart,
      badge: "Groceries & FMCG",
      desc: "Uses Items, Customers, Retail POS Bills, Purchase Invoices, and Delivery Slips.",
    },
  ];

  const brandColors = [
    { name: "Royal Blue", hex: "#2563eb" },
    { name: "Emerald Green", hex: "#059669" },
    { name: "Amber Gold", hex: "#d97706" },
    { name: "Purple Accent", hex: "#7c3aed" },
    { name: "Cyan Ocean", hex: "#0284c7" },
    { name: "Rose Crimson", hex: "#e11d48" },
  ];

  const handleFinishOnboarding = () => {
    setIsProvisioning(true);

    const baseConfig = getBaseConfigForType(selectedType);
    const tenantSlug = (businessName || "new-vendor").toLowerCase().replace(/[^a-z0-9]/g, "-");
    const tenantId = `tenant-${tenantSlug}-${Date.now().toString().slice(-4)}`;

    const planPrice = selectedPlan === "starter" ? 999 : selectedPlan === "pro" ? 2499 : 4999;
    const maxUsers = selectedPlan === "starter" ? 3 : selectedPlan === "pro" ? 10 : 50;

    const vendorConfig: BusinessConfig = {
      ...baseConfig,
      id: tenantId,
      businessName: businessName || baseConfig.businessName,
      tagline: tagline || baseConfig.tagline,
      gstin: gstin || baseConfig.gstin,
      phone: ownerPhone || baseConfig.phone,
      email: ownerEmail || baseConfig.email,
      address: address || baseConfig.address,
      city: city || baseConfig.city,
      state: state || baseConfig.state,
      branding: {
        ...baseConfig.branding,
        brandColor: brandColor,
        tagline: tagline || baseConfig.branding.tagline,
      },
    };

    setTimeout(() => {
      registerVendorTenant({
        id: tenantId,
        slug: tenantSlug,
        ownerName: ownerName || "Vendor Owner",
        ownerEmail: ownerEmail || "owner@vendor.com",
        ownerPhone: ownerPhone || "+91 98000 00000",
        status: "active",
        joinedDate: new Date().toISOString().split("T")[0],
        subscription: {
          plan: selectedPlan,
          status: "active",
          monthlyPrice: planPrice,
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          maxUsers: maxUsers,
          customDomainEnabled: selectedPlan !== "starter",
        },
        config: vendorConfig,
      });

      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Vendor Self-Onboarding & SaaS Tenant Provisioning</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Register Your Business on Kerala Business OS
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Configure your dynamic business profile in 5 simple steps. The system instantly adapts terminology, invoice protocols, forms, and modules for your vendor account.
        </p>
      </div>

      {/* Wizard Progress Indicator */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { step: 1, title: "Profile", icon: Building2 },
            { step: 2, title: "Vertical", icon: Sliders },
            { step: 3, title: "Branding", icon: Sparkles },
            { step: 4, title: "Plan", icon: Zap },
            { step: 5, title: "Launch", icon: ShieldCheck },
          ].map((item) => {
            const isDone = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                  isCurrent
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20"
                    : isDone
                    ? "bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                    : "bg-slate-50 text-slate-400 border border-slate-100"
                }`}
              >
                <div className="flex items-center gap-1">
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-white" : "text-slate-400"}`} />
                  )}
                  <span className="text-[11px] hidden sm:inline">Step {item.step}</span>
                </div>
                <span className="text-[11px] truncate max-w-[80px]">{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: BUSINESS & OWNER DETAILS */}
      {currentStep === 1 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-slate-50/80 border-b border-slate-200">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" /> Step 1: Business & Owner Profile
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Enter your vendor store details and primary contact information.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Business / Store Name *</label>
                <Input
                  placeholder="e.g. Royal Paint Traders"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Owner / Manager Full Name *</label>
                <Input
                  placeholder="e.g. Rajesh Varma"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Owner Email Address *</label>
                <Input
                  type="email"
                  placeholder="e.g. rajesh@royalpaints.in"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Phone / WhatsApp Number *</label>
                <Input
                  placeholder="e.g. +91 98470 12345"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Store / Building Address</label>
                <Input
                  placeholder="e.g. Building No. 45/102, MG Road Junction"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">City / District</label>
                <Input
                  placeholder="e.g. Kochi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">GSTIN / Tax ID Number</label>
                <Input
                  placeholder="e.g. 32AAAAA0000A1Z5"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="text-xs h-9"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/50 border-t border-slate-200 px-6 py-3 flex justify-end">
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!businessName || !ownerEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center gap-1.5"
            >
              Continue to Step 2 <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 2: BUSINESS VERTICAL SELECTION */}
      {currentStep === 2 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-slate-50/80 border-b border-slate-200">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" /> Step 2: Select Your Business Type
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              The platform will automatically inject appropriate terminology, catalog fields, and invoice protocols.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {businessTypes.map((item) => {
                const isSelected = selectedType === item.type;
                const Icon = item.icon;

                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setSelectedType(item.type)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-500 text-blue-900 shadow-sm ring-2 ring-blue-500/30"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                          <Badge variant="secondary" className="text-[10px] mt-0.5">{item.badge}</Badge>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Vertical Preview Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                <span>Active Terminology Preview for {currentPreset.businessName}:</span>
                <Badge variant="outline" className="border-amber-400/40 text-amber-300 text-[10px]">
                  Preset Active
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div><span className="text-slate-400 text-[10px] block">Item Label:</span> <strong>{currentPreset.terminology.product}</strong></div>
                <div><span className="text-slate-400 text-[10px] block">Client Label:</span> <strong>{currentPreset.terminology.customer}</strong></div>
                <div><span className="text-slate-400 text-[10px] block">Invoice Label:</span> <strong>{currentPreset.terminology.invoice}</strong></div>
                <div><span className="text-slate-400 text-[10px] block">Inventory:</span> <strong>{currentPreset.terminology.inventory || "Active"}</strong></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/50 border-t border-slate-200 px-6 py-3 flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)} className="text-xs flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
            <Button onClick={() => setCurrentStep(3)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1">
              Continue to Step 3 <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 3: BRANDING & COLORS */}
      {currentStep === 3 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-slate-50/80 border-b border-slate-200">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" /> Step 3: Brand Identity & Colors
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Customize your vendor portal colors and tagline for invoices and headers.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Select Primary Brand Color</label>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {brandColors.map((c) => {
                  const isSelected = brandColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setBrandColor(c.hex)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-xs transition-all cursor-pointer ${
                        isSelected ? "border-slate-900 ring-2 ring-slate-900/20 shadow-md" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center text-white" style={{ backgroundColor: c.hex }}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <span className="font-semibold text-[11px] text-slate-800">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Vendor Tagline / Business Motto</label>
              <Input
                placeholder="e.g. Premium Quality Paints & Industrial Coating Solutions"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="text-xs h-9"
              />
            </div>

            {/* Live Invoice Branding Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Invoice Header Sample</span>
              <div className="p-4 rounded-lg bg-white border border-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg text-white font-extrabold flex items-center justify-center text-sm shadow-md" style={{ backgroundColor: brandColor }}>
                    {businessName ? businessName.charAt(0) : "V"}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{businessName || "Your Business Name"}</h4>
                    <p className="text-xs text-slate-500">{tagline || "Your Custom Business Tagline"}</p>
                  </div>
                </div>
                <Badge variant="default" style={{ backgroundColor: brandColor }} className="text-white text-xs">
                  {currentPreset.terminology.invoice} #CWP-1042
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/50 border-t border-slate-200 px-6 py-3 flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)} className="text-xs flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
            <Button onClick={() => setCurrentStep(4)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1">
              Continue to Step 4 <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 4: SUBSCRIPTION PLAN */}
      {currentStep === 4 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-slate-50/80 border-b border-slate-200">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" /> Step 4: Choose SaaS Vendor Subscription Plan
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Select the pricing tier that best fits your business size and staff requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: "starter" as SubscriptionPlanTier,
                  name: "Starter Plan",
                  price: "₹999",
                  period: "/month",
                  users: "Up to 3 Staff Users",
                  features: ["Core Invoicing & Bills", "Basic Terminology Engine", "Standard Reports", "Single Store Location"],
                  popular: false,
                },
                {
                  id: "pro" as SubscriptionPlanTier,
                  name: "Pro Business Plan",
                  price: "₹2,499",
                  period: "/month",
                  users: "Up to 10 Staff Users",
                  features: ["Advanced Batch/Stock Tracking", "Custom Product Fields Engine", "Custom Subdomain & Branding", "GST Tax Return Filing Export", "Priority Phone Support"],
                  popular: true,
                },
                {
                  id: "enterprise" as SubscriptionPlanTier,
                  name: "Enterprise Multi-Branch",
                  price: "₹4,999",
                  period: "/month",
                  users: "Up to 50 Staff Users",
                  features: ["Multi-Branch Warehouse Sync", "Dedicated Database Isolation", "API Access & Custom Webhooks", "Dedicated Account Manager"],
                  popular: false,
                },
              ].map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 relative ${
                      isSelected
                        ? "bg-slate-900 text-white border-blue-500 ring-2 ring-blue-500 shadow-xl"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                        Most Popular
                      </div>
                    )}
                    <div>
                      <h4 className={`text-sm font-extrabold ${isSelected ? "text-white" : "text-slate-900"}`}>{plan.name}</h4>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className={`text-2xl font-black ${isSelected ? "text-blue-400" : "text-blue-600"}`}>{plan.price}</span>
                        <span className="text-xs opacity-75">{plan.period}</span>
                      </div>
                      <p className="text-xs font-semibold mt-2 opacity-90">{plan.users}</p>

                      <ul className="mt-4 space-y-2 text-xs">
                        {plan.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-emerald-400" : "text-emerald-600"}`} />
                            <span className="opacity-90">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant={isSelected ? "primary" : "outline"}
                      className={`w-full text-xs font-bold ${isSelected ? "bg-blue-600 hover:bg-blue-500 text-white" : ""}`}
                    >
                      {isSelected ? "Selected Plan" : "Select Plan"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50/50 border-t border-slate-200 px-6 py-3 flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)} className="text-xs flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
            <Button onClick={() => setCurrentStep(5)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1">
              Review & Launch <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 5: REVIEW & PROVISION */}
      {currentStep === 5 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-slate-50/80 border-b border-slate-200">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Step 5: Review & Instant Provisioning
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Confirm your vendor tenant setup and initialize your live SaaS environment.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Vendor Summary</h4>
                <div className="space-y-1 text-slate-600">
                  <p>Business Name: <strong className="text-slate-900">{businessName || "Royal Paint Traders"}</strong></p>
                  <p>Owner Name: <strong className="text-slate-900">{ownerName || "Rajesh Varma"}</strong></p>
                  <p>Email: <strong className="text-slate-900">{ownerEmail || "owner@vendor.com"}</strong></p>
                  <p>Phone: <strong className="text-slate-900">{ownerPhone || "+91 98470 12345"}</strong></p>
                  <p>GSTIN: <strong className="text-slate-900">{gstin || "32AAAAA0000A1Z5"}</strong></p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Engine Configuration</h4>
                <div className="space-y-1 text-slate-600">
                  <p>Business Type: <strong className="text-slate-900 capitalize">{selectedType.replace("_", " ")}</strong></p>
                  <p>Primary Product: <strong className="text-blue-700 font-bold">{currentPreset.terminology.product}</strong></p>
                  <p>Customer Label: <strong className="text-blue-700 font-bold">{currentPreset.terminology.customer}</strong></p>
                  <p>Invoice Protocol: <strong className="text-blue-700 font-bold">{currentPreset.terminology.invoice}</strong></p>
                  <p>Selected Subscription: <strong className="text-emerald-700 font-bold uppercase">{selectedPlan} Plan</strong></p>
                </div>
              </div>
            </div>

            {/* Instant Provisioning Status Indicator */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Globe className="w-4 h-4" /> Ready for Live SaaS Provisioning
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clicking <strong className="text-white">&quot;Provision Vendor Portal&quot;</strong> will instantly register your vendor account in the local state & LocalStorage database, generate your dynamic workspace, and launch your tenant dashboard.
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50/50 border-t border-slate-200 px-6 py-4 flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(4)} disabled={isProvisioning} className="text-xs flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
            <Button
              onClick={handleFinishOnboarding}
              disabled={isProvisioning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2 flex items-center gap-2 shadow-md"
            >
              {isProvisioning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Provisioning Vendor Tenant...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Provision Vendor Portal Now
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
