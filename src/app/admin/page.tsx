"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import { VendorTenant } from "@/types/config";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  Sliders,
  ExternalLink,
  Power,
} from "lucide-react";

export default function SaaSAdminPage() {
  const router = useRouter();
  const { vendors, setBusinessById, currentBusiness, updateVendorStatus } = useBusiness();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const totalVendors = vendors.length;
  const activeVendorsCount = vendors.filter((v) => v.status === "active").length;
  const totalMRR = vendors
    .filter((v) => v.status === "active")
    .reduce((sum, v) => sum + (v.subscription?.monthlyPrice || 0), 0);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.config.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || vendor.config.businessType === filterType;
    return matchesSearch && matchesType;
  });

  const handleSwitchVendor = (vendorId: string) => {
    setBusinessById(vendorId);
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* SaaS Admin Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Kerala Business OS — SaaS Super Admin Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Multi-Vendor Platform Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Manage tenant subscriptions, provision new vendor store accounts, monitor monthly recurring revenue (MRR), and switch active business contexts.
            </p>
          </div>

          <Link href="/onboarding">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer">
              <Plus className="w-4 h-4" /> Register New Vendor
            </Button>
          </Link>
        </div>
      </div>

      {/* Global SaaS Platform Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-blue-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Total Active Vendors
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">{activeVendorsCount} / {totalVendors}</div>
            <p className="text-xs text-slate-500 mt-1">
              Registered business tenants
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-emerald-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Monthly Recurring Revenue
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">₹{totalMRR.toLocaleString("en-IN")}</div>
            <p className="text-xs text-slate-500 mt-1">
              Estimated subscription revenue (MRR)
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-amber-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Total End-Users & Staff
            </CardTitle>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">51 Staff</div>
            <p className="text-xs text-slate-500 mt-1">
              Active users across all vendor tenants
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-purple-400 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Platform Health
            </CardTitle>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900">99.98%</div>
            <p className="text-xs text-slate-500 mt-1">
              Uptime & multi-tenant isolation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Tenant Management Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Registered Vendor Tenant Accounts ({filteredVendors.length})
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Live list of vendor SaaS tenants on the platform. Click &quot;Impersonate / Launch Workspace&quot; to switch active context.
              </CardDescription>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vendor name, owner, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 w-48 sm:w-60"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-8 px-2.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700"
              >
                <option value="all">All Business Types</option>
                <option value="paint_shop">Paint Shops</option>
                <option value="medical_distributor">Medical Wholesalers</option>
                <option value="hardware_shop">Hardware Stores</option>
                <option value="service_business">IT Services</option>
                <option value="general_retail">General Retail</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="p-3">Vendor / Business</th>
                <th className="p-3">Owner Contact</th>
                <th className="p-3">Business Type</th>
                <th className="p-3">Plan & Price</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredVendors.map((vendor) => {
                const isActiveWorkspace = currentBusiness.id === vendor.id;
                const isSuspended = vendor.status === "suspended";

                return (
                  <tr key={vendor.id} className={`hover:bg-slate-50 transition-colors ${isActiveWorkspace ? "bg-blue-50/60" : ""}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-xs"
                          style={{ backgroundColor: vendor.config.branding?.brandColor || "#2563eb" }}
                        >
                          {vendor.config.businessName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 flex items-center gap-1.5">
                            {vendor.config.businessName}
                            {isActiveWorkspace && (
                              <Badge variant="default" className="bg-blue-600 text-white text-[9px] py-0 px-1">
                                Current Active
                              </Badge>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">slug: {vendor.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <p className="font-medium text-slate-900">{vendor.ownerName}</p>
                      <p className="text-[10px] text-slate-500">{vendor.ownerEmail}</p>
                      <p className="text-[10px] text-slate-400">{vendor.ownerPhone}</p>
                    </td>

                    <td className="p-3">
                      <Badge variant="secondary" className="text-[10px] font-medium capitalize">
                        {vendor.config.businessType.replace("_", " ")}
                      </Badge>
                    </td>

                    <td className="p-3">
                      <p className="font-bold text-slate-900 uppercase text-[11px]">
                        {vendor.subscription?.plan || "Pro"} Plan
                      </p>
                      <p className="text-[10px] text-emerald-700 font-semibold">
                        ₹{(vendor.subscription?.monthlyPrice || 2499).toLocaleString("en-IN")}/mo
                      </p>
                    </td>

                    <td className="p-3 text-slate-600 font-mono text-[11px]">{vendor.joinedDate}</td>

                    <td className="p-3">
                      <Badge variant={isSuspended ? "danger" : "success"} className="text-[10px]">
                        {isSuspended ? "Suspended" : "Active"}
                      </Badge>
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => handleSwitchVendor(vendor.id)}
                          className={`text-xs px-2.5 py-1 font-medium flex items-center gap-1 ${
                            isActiveWorkspace
                              ? "bg-slate-800 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{isActiveWorkspace ? "Active" : "Launch"}</span>
                        </Button>

                        <button
                          onClick={() => updateVendorStatus(vendor.id, isSuspended ? "active" : "suspended")}
                          title={isSuspended ? "Activate Vendor" : "Suspend Vendor"}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            isSuspended
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
