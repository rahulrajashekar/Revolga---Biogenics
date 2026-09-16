"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { cn } from "@/lib/utils";
import { X, Pill } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Authentication screens render their own full-page layout (see
  // AuthLayout) and must not show the app Sidebar/TopNav/status bar.
  if (pathname?.startsWith("/auth")) {
    return <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/60 text-slate-900 flex flex-col antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-64 sidebar-premium-bg h-full relative">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar isCollapsed={false} setIsCollapsed={() => {}} />
          </div>
          <div className="flex-1" onClick={() => setIsMobileOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isCollapsed ? "md:ml-16" : "md:ml-64"
        )}
      >
        <TopNav onToggleMobileSidebar={() => setIsMobileOpen(true)} />

        {/* Medical & Healthcare Status Bar */}
        <div className="bg-brand-gradient text-white text-xs py-1.5 px-4 sm:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.6)] animate-pulse" />
            <span className="font-extrabold">RB</span>
            <span className="font-semibold text-white/90">Revolga Biogenics</span>
            <span className="text-white/50">·</span>
            <span className="text-white/80">GSTIN: 32ABCDC1234D1Z8</span>
            <span className="text-white/50 hidden sm:inline">·</span>
            <span className="text-white/80 hidden sm:inline">Kochi, Kerala</span>
          </div>
          <div className="text-[11px] text-white/80 hidden sm:block">
            Medical & Healthcare Company
          </div>
        </div>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-sm py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="font-extrabold text-brand-gradient">RB</span>
            <span>Revolga Biogenics — Medical & Healthcare Management System</span>
            <span className="text-slate-400 font-normal">v3.6</span>
          </div>
          <div className="text-[11px]">
            Revolga Biogenics · Healthcare Solutions
          </div>
        </footer>
      </div>
    </div>
  );
}
