"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Bell,
  Plus,
  Menu,
  User,
  Settings,
  Shield,
  Pill,
  AlertTriangle,
  TrendingDown,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { BusinessSwitcher } from "./BusinessSwitcher";

interface TopNavProps {
  onToggleMobileSidebar: () => void;
}

export function TopNav({ onToggleMobileSidebar }: TopNavProps) {
  const { currentBusiness, t, isDevMode } = useBusiness();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 px-4 sm:px-6 flex items-center justify-between shadow-ambient">
      {/* Left: Mobile toggle + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={`Search Products, Invoices, Customers, INV-000001…`}
            className="w-full pl-9 pr-4 py-1.5 rounded-full border border-slate-200 bg-slate-50/80 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Dev Switcher (dev only) + Quick Actions + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Dev-only: Business Switcher hidden in production */}
        {isDevMode && <BusinessSwitcher />}

        {/* Quick Add Button */}
        <Link href="/sales/new">
          <Button size="sm" variant="primary" className="hidden lg:flex items-center gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>New {t("invoice")}</span>
          </Button>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-ambient-lg py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-900">Alerts</span>
                <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-medium">5 Unread</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">Batch Expiry Alert</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Batch DL2025C12 (Dolo 650) expiring in 25 days.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Today</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <TrendingDown className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">Low Stock: Pan-D Capsule</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Only 22 strips remaining. Min level: 80.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Today</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">Expired: Pantoprazole Batch</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Batch PANTO2025B10 has expired. Quarantine required.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Yesterday</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <Pill className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">Payment Received</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">₹15,400 received from Malabar Pharma via NEFT.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">GSTR-1 Filing Due</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">GSTR-1 for September 2026 due in 5 days.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pt-2 border-t border-slate-100">
                <Link href="/reports" className="text-[11px] text-emerald-600 font-medium hover:underline">View all alerts →</Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-brand-gradient text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-brand-glow">
              KN
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-ambient-lg py-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-semibold text-xs text-slate-900">{user?.fullName || "Dr. K. S. Nair"}</p>
                <p className="text-[11px] text-slate-500">{user?.email || currentBusiness.businessName}</p>
                <p className="text-[10px] text-emerald-600 font-medium">{user ? user.role : "Enterprise Plan"}</p>
              </div>
              <div className="py-1 text-xs">
                <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100">
                  <User className="w-3.5 h-3.5 text-slate-400" /> My Profile
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100">
                  <Settings className="w-3.5 h-3.5 text-slate-400" /> Business Settings
                </Link>
                <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100">
                  <Shield className="w-3.5 h-3.5 text-slate-400" /> SaaS Admin Portal
                </Link>
              </div>
              <div className="py-1 border-t border-slate-100 text-xs">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
