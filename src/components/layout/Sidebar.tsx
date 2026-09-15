"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Users,
  Truck,
  Pill,
  Boxes,
  FileText,
  Receipt,
  CreditCard,
  BarChart3,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles,
  FlaskConical,
  AlertTriangle,
  TrendingDown,
  RotateCcw,
  Tag,
  Factory,
  RefreshCw,
  Wallet,
  ClipboardList,
  ArrowLeftRight,
  ChevronDown,
  Globe,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  collapsible?: boolean;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { currentBusiness } = useBusiness();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["sales", "purchases", "medicines", "inventory", "payments"])
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const navGroups: NavGroup[] = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "sales",
      collapsible: true,
      items: [
        { id: "sales", label: "Tax Invoices", href: "/sales", icon: ShoppingCart },
        { id: "sales-returns", label: "Sales Returns", href: "/sales/returns", icon: RotateCcw },
        { id: "quotations", label: "Quotations", href: "/sales/quotations", icon: ClipboardList },
      ],
    },
    {
      title: "purchases",
      collapsible: true,
      items: [
        { id: "purchases", label: "Purchase Bills", href: "/purchases", icon: ShoppingBag },
        { id: "purchase-returns", label: "Purchase Returns", href: "/purchases/returns", icon: RefreshCw },
      ],
    },
    {
      title: "products",
      collapsible: true,
      items: [
        { id: "products", label: "Medical Products", href: "/products", icon: Package },
        { id: "medicines", label: "Medicine List", href: "/medicines", icon: Pill },
        { id: "categories", label: "Categories", href: "/medicines/categories", icon: Tag },
        { id: "manufacturers", label: "Brands & Mfrs", href: "/medicines/manufacturers", icon: Factory },
      ],
    },
    {
      title: "inventory",
      collapsible: true,
      items: [
        { id: "inventory", label: "Current Stock", href: "/inventory", icon: Boxes },
        { id: "batches", label: "Batches", href: "/inventory/batches", icon: FlaskConical },
        { id: "low-stock", label: "Low Stock", href: "/inventory/low-stock", icon: TrendingDown, badge: "3", badgeColor: "bg-amber-500" },
        { id: "expiry", label: "Expiry", href: "/inventory/expiry", icon: AlertTriangle, badge: "5", badgeColor: "bg-rose-500" },
        { id: "movements", label: "Stock Movements", href: "/inventory/movements", icon: ArrowLeftRight },
      ],
    },
    {
      title: "Parties",
      items: [
        { id: "customers", label: "Customers", href: "/customers", icon: Users },
        { id: "suppliers", label: "Suppliers", href: "/suppliers", icon: Truck },
      ],
    },
    {
      title: "payments",
      collapsible: true,
      items: [
        { id: "receivables", label: "Receivables", href: "/payments/receivables", icon: Wallet },
        { id: "payables", label: "Payables", href: "/payments/payables", icon: CreditCard },
        { id: "payment-history", label: "Payment History", href: "/payments", icon: Receipt },
      ],
    },
    {
      title: "Finance",
      items: [
        { id: "expenses", label: "Expenses", href: "/expenses", icon: Receipt },
        { id: "reports", label: "Reports", href: "/reports", icon: BarChart3 },
        { id: "documents", label: "Documents", href: "/documents", icon: FileText },
      ],
    },
    {
      title: "System",
      items: [
        { id: "settings", label: "Settings", href: "/settings", icon: Sliders },
        { id: "website", label: "Public Website", href: "/website", icon: Globe },
        { id: "admin", label: "SaaS Admin", href: "/admin", icon: ShieldCheck, badge: "Owner", badgeColor: "bg-slate-700" },
      ],
    },
  ];

  const groupDisplayTitles: Record<string, string> = {
    sales: "Sales",
    purchases: "Purchases",
    products: "Products",
    medicines: "Medicines",
    inventory: "Inventory",
    payments: "Payments",
  };

  const groupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    sales: ShoppingCart,
    purchases: ShoppingBag,
    products: Package,
    medicines: Pill,
    inventory: Boxes,
    payments: CreditCard,
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between select-none shadow-xl",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-slate-800/80 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-md shrink-0">
              RB
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-white tracking-tight text-sm flex items-center gap-1">
                  Revolga Biogenics <Sparkles className="w-3 h-3 text-sky-400 fill-sky-400" />
                </span>
                <span className="text-[10px] text-sky-400 tracking-wider uppercase font-medium">
                  Medical & Healthcare
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex h-7 w-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white items-center justify-center transition-colors border border-slate-700 cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Active Business Indicator */}
        {!isCollapsed && (
          <div className="mx-3 mt-3 p-2.5 rounded-lg bg-emerald-900/30 border border-emerald-800/50 flex items-center justify-between shrink-0">
            <div className="truncate">
              <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Active Workspace</p>
              <p className="text-xs font-bold text-white truncate">{currentBusiness.businessName}</p>
            </div>
            <span className="h-2.5 w-2.5 rounded-full shrink-0 bg-emerald-400 animate-pulse" />
          </div>
        )}

        {/* Navigation */}
        <nav className="p-2 space-y-0.5 overflow-y-auto flex-1 mt-2 scrollbar-hide">
          {navGroups.map((group, groupIdx) => {
            const isCollapsibleGroup = group.collapsible;
            const displayTitle = groupDisplayTitles[group.title] || group.title;
            const GroupIcon = groupIcons[group.title];
            const isGroupExpanded = !isCollapsibleGroup || expandedGroups.has(group.title);
            const isAnyItemActive = group.items.some(
              (item) => pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/")
            );

            return (
              <div key={groupIdx} className="space-y-0.5">
                {/* Group Header */}
                {!isCollapsed && (
                  isCollapsibleGroup ? (
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer mt-2",
                        isAnyItemActive
                          ? "text-emerald-400"
                          : "text-slate-400 hover:text-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        {GroupIcon && <GroupIcon className="w-3 h-3" />}
                        {displayTitle}
                      </div>
                      <ChevronDown className={cn("w-3 h-3 transition-transform", isGroupExpanded ? "rotate-180" : "")} />
                    </button>
                  ) : (
                    <h4 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 mt-3 first:mt-0">
                      {displayTitle}
                    </h4>
                  )
                )}

                {/* Nav Items */}
                {(isGroupExpanded || isCollapsed) && group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative",
                        isActive
                          ? "bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/20"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                        )}
                      />
                      {!isCollapsed && (
                        <span className="truncate flex-1 flex items-center justify-between">
                          {item.label}
                          {item.badge && (
                            <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white ml-1", item.badgeColor || "bg-slate-700")}>
                              {item.badge}
                            </span>
                          )}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 shrink-0">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="h-8 w-8 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center font-bold text-xs text-emerald-300 shrink-0">
              KN
            </div>
            {!isCollapsed && (
              <div className="truncate flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate">Dr. K. S. Nair</p>
                <p className="text-[10px] text-slate-500 truncate">Owner / Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
