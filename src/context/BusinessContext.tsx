"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { BusinessConfig, DemoBusinessOption, VendorTenant } from "@/types/config";
import { revolgaBiogenicsConfig } from "@/config/businesses/revolga-biogenics";
import { demoBusinesses, paintShopConfig } from "@/config/demoBusinesses";

// ─── PHASE 3.6: ACTIVE COMPANY ────────────────────────────────────────────────
// Revolga Biogenics (Medical Company) is the sole active tenant in production UI.
const ACTIVE_BUSINESS_ID = "revolga-biogenics-001";

// Development-only: set NEXT_PUBLIC_DEV_TENANT_SWITCH=true to enable switcher
const DEV_TENANT_SWITCH_ENABLED =
  process.env.NEXT_PUBLIC_DEV_TENANT_SWITCH === "true";

const INITIAL_VENDORS: VendorTenant[] = [
  {
    id: "revolga-biogenics-001",
    slug: "revolga-biogenics",
    ownerName: "Dr. K. S. Nair",
    ownerEmail: "contact@revolgabiogenics.com",
    ownerPhone: "+91 94471 99887",
    status: "active",
    joinedDate: "2026-02-01",
    subscription: {
      plan: "enterprise",
      status: "active",
      monthlyPrice: 4999,
      renewalDate: "2026-11-01",
      maxUsers: 25,
      customDomainEnabled: true,
    },
    config: revolgaBiogenicsConfig,
  },
];

// Dev-only vendors (hidden from production UI)
const _DEV_VENDORS: VendorTenant[] = [
  {
    id: "colour-world-paints",
    slug: "colour-world",
    ownerName: "Rajesh Varma",
    ownerEmail: "rajesh@colourworld.in",
    ownerPhone: "+91 98470 12345",
    status: "active",
    joinedDate: "2026-01-15",
    subscription: { plan: "pro", status: "active", monthlyPrice: 2499, renewalDate: "2026-10-15", maxUsers: 5, customDomainEnabled: true },
    config: demoBusinesses[0].config,
  },
];

interface BusinessContextType {
  currentBusiness: BusinessConfig;
  selectedDemoId: string;
  vendors: VendorTenant[];
  setBusinessById: (id: string) => void;
  updateBusinessConfig: (newConfig: Partial<BusinessConfig>) => void;
  resetBusinessConfig: () => void;
  registerVendorTenant: (vendorData: Partial<VendorTenant> & { config: BusinessConfig }) => VendorTenant;
  updateVendorStatus: (vendorId: string, status: VendorTenant["status"]) => void;
  demoOptions: DemoBusinessOption[];
  t: (key: keyof BusinessConfig["terminology"] | string, fallback?: string) => string;
  isModuleEnabled: (moduleKey: keyof BusinessConfig["modules"]) => boolean;
  hasCustomizations: boolean;
  isDevMode: boolean;
}

const STORAGE_KEY = "kerala_business_os_active_id";
const CONFIG_CUSTOMIZATIONS_KEY = "kerala_business_os_customizations_";
const VENDORS_STORAGE_KEY = "kerala_business_os_vendors";

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [selectedDemoId, setSelectedDemoId] = useState<string>(ACTIVE_BUSINESS_ID);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessConfig>(revolgaBiogenicsConfig);
  const [vendors, setVendors] = useState<VendorTenant[]>(INITIAL_VENDORS);
  const [hasCustomizations, setHasCustomizations] = useState<boolean>(false);

  // In production, always force medical distributor
  useEffect(() => {
    if (!DEV_TENANT_SWITCH_ENABLED) {
      // Production: always lock to medical distributor
      setSelectedDemoId(ACTIVE_BUSINESS_ID);
      setCurrentBusiness(revolgaBiogenicsConfig);
      setVendors(INITIAL_VENDORS);
      return;
    }

    // Dev mode: restore from localStorage
    try {
      const savedVendorsRaw = localStorage.getItem(VENDORS_STORAGE_KEY);
      let currentVendorList = [...INITIAL_VENDORS, ..._DEV_VENDORS];
      if (savedVendorsRaw) {
        try {
          const parsed = JSON.parse(savedVendorsRaw);
          if (Array.isArray(parsed) && parsed.length > 0) currentVendorList = parsed;
        } catch { /* ignore */ }
      }
      setVendors(currentVendorList);

      const savedId = localStorage.getItem(STORAGE_KEY) || ACTIVE_BUSINESS_ID;
      const activeVendor = currentVendorList.find((v) => v.id === savedId) || currentVendorList[0];
      const activeId = activeVendor?.id || ACTIVE_BUSINESS_ID;
      const savedCustom = localStorage.getItem(CONFIG_CUSTOMIZATIONS_KEY + activeId);

      setSelectedDemoId(activeId);
      if (savedCustom) {
        try {
          const parsed = JSON.parse(savedCustom);
          setCurrentBusiness({ ...activeVendor.config, ...parsed, terminology: { ...activeVendor.config.terminology, ...(parsed.terminology || {}) }, modules: { ...activeVendor.config.modules, ...(parsed.modules || {}) } });
          setHasCustomizations(true);
        } catch { setCurrentBusiness(activeVendor.config); }
      } else {
        setCurrentBusiness(activeVendor.config);
      }
    } catch { /* fallback */ }
  }, []);

  const setBusinessById = useCallback((id: string) => {
    if (!DEV_TENANT_SWITCH_ENABLED) return; // no-op in production
    setVendors((prevVendors) => {
      const foundVendor = prevVendors.find((v) => v.id === id);
      const foundDemo = demoBusinesses.find((b) => b.id === id);
      const targetConfig = foundVendor ? foundVendor.config : foundDemo ? foundDemo.config : null;
      if (targetConfig) {
        setSelectedDemoId(id);
        try { localStorage.setItem(STORAGE_KEY, id); } catch { /* ignore */ }
        setCurrentBusiness(targetConfig);
        setHasCustomizations(false);
      }
      return prevVendors;
    });
  }, []);

  const updateBusinessConfig = useCallback((partial: Partial<BusinessConfig>) => {
    setCurrentBusiness((prev) => {
      const updated: BusinessConfig = { ...prev, ...partial, terminology: { ...prev.terminology, ...(partial.terminology || {}) }, modules: { ...prev.modules, ...(partial.modules || {}) } };
      try { localStorage.setItem(CONFIG_CUSTOMIZATIONS_KEY + prev.id, JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
    setHasCustomizations(true);
  }, []);

  const resetBusinessConfig = useCallback(() => {
    setCurrentBusiness(revolgaBiogenicsConfig);
    setHasCustomizations(false);
    try { localStorage.removeItem(CONFIG_CUSTOMIZATIONS_KEY + selectedDemoId); } catch { /* ignore */ }
  }, [selectedDemoId]);

  const registerVendorTenant = useCallback(
    (vendorData: Partial<VendorTenant> & { config: BusinessConfig }): VendorTenant => {
      const newId = vendorData.config.id || `vendor-${Date.now()}`;
      const slug = vendorData.slug || vendorData.config.businessName.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const newVendor: VendorTenant = {
        id: newId, slug,
        ownerName: vendorData.ownerName || "New Business Owner",
        ownerEmail: vendorData.ownerEmail || vendorData.config.email || "owner@vendor.com",
        ownerPhone: vendorData.ownerPhone || vendorData.config.phone || "+91 90000 00000",
        status: "active",
        joinedDate: new Date().toISOString().split("T")[0],
        subscription: vendorData.subscription || { plan: "pro", status: "active", monthlyPrice: 2499, renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], maxUsers: 10, customDomainEnabled: true },
        config: { ...vendorData.config, id: newId },
      };
      setVendors((prev) => {
        const updatedVendors = [newVendor, ...prev];
        try { localStorage.setItem(VENDORS_STORAGE_KEY, JSON.stringify(updatedVendors)); } catch { /* ignore */ }
        return updatedVendors;
      });
      setSelectedDemoId(newId);
      setCurrentBusiness(newVendor.config);
      setHasCustomizations(false);
      try { localStorage.setItem(STORAGE_KEY, newId); } catch { /* ignore */ }
      return newVendor;
    }, []
  );

  const updateVendorStatus = useCallback((vendorId: string, status: VendorTenant["status"]) => {
    setVendors((prev) => {
      const updated = prev.map((v) => (v.id === vendorId ? { ...v, status } : v));
      try { localStorage.setItem(VENDORS_STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const t = useCallback(
    (key: keyof BusinessConfig["terminology"] | string, fallback?: string): string => {
      return (currentBusiness.terminology as unknown as Record<string, string>)?.[key] || fallback || key;
    }, [currentBusiness]
  );

  const isModuleEnabled = useCallback(
    (moduleKey: keyof BusinessConfig["modules"]): boolean => {
      return currentBusiness.modules[moduleKey] ?? true;
    }, [currentBusiness]
  );

  return (
    <BusinessContext.Provider
      value={{
        currentBusiness,
        selectedDemoId,
        vendors,
        setBusinessById,
        updateBusinessConfig,
        resetBusinessConfig,
        registerVendorTenant,
        updateVendorStatus,
        demoOptions: demoBusinesses,
        t,
        isModuleEnabled,
        hasCustomizations,
        isDevMode: DEV_TENANT_SWITCH_ENABLED,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) throw new Error("useBusiness must be used within a BusinessProvider");
  return context;
}
