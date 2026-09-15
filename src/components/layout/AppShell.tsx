"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { cn } from "@/lib/utils";
import { X, Pill } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-64 bg-slate-900 h-full relative">
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
        <div className="bg-sky-950 text-sky-200 text-xs py-1.5 px-4 sm:px-6 flex items-center justify-between border-b border-sky-900">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
            <span className="font-bold text-white">RB</span>
            <span className="font-semibold text-sky-100">Revolga Biogenics</span>
            <span className="text-sky-400">·</span>
            <span className="text-sky-300">GSTIN: 32ABCDC1234D1Z8</span>
            <span className="text-sky-400 hidden sm:inline">·</span>
            <span className="text-sky-400 hidden sm:inline">Kochi, Kerala</span>
          </div>
          <div className="text-[11px] text-sky-300 hidden sm:block">
            Medical & Healthcare Company
          </div>
        </div>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="font-extrabold text-sky-700">RB</span>
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
