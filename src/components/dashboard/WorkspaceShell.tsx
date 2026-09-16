"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlaskConical,
  LayoutDashboard,
  Package,
  Users,
  Truck,
  Boxes,
  ShoppingCart,
  ShoppingBag,
  Wallet,
  Award,
  Sliders,
  Menu,
  X,
  Bell,
  ShieldCheck,
  LogOut,
  Radio,
  ArrowUpRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Suppliers", href: "/suppliers", icon: Truck },
  { label: "Inventory", href: "/inventory", icon: Boxes },
  { label: "Sales", href: "/sales", icon: ShoppingCart },
  { label: "Purchases", href: "/purchases", icon: ShoppingBag },
  { label: "Payments", href: "/payments", icon: Wallet },
  { label: "Performance", href: "/performance", icon: Award },
  { label: "Settings", href: "/settings", icon: Sliders },
];

function useLiveClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * The shared dashboard/app shell (dark sidebar + sticky header + content
 * area). Styling matches the approved reference design pixel-for-pixel;
 * navigation and copy are adapted to Revolga Biogenics' real modules.
 * There's no session to sign out of yet (auth doesn't persist a session in
 * this rebuild) — the sign-out button just navigates to /login.
 */
export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const time = useLiveClock();

  return (
    <div
      className="min-h-screen bg-[#060911]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,240,255,0.025) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,240,255,0.025) 40px)",
      }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[246px] flex flex-col bg-[rgba(8,14,27,0.96)] border-r border-[rgba(0,240,255,0.13)] shadow-[20px_0_50px_rgba(0,0,0,0.15)] px-[18px] pt-7 pb-5 transition-transform duration-[250ms] ease-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        data-testid="workspace-sidebar"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f0ff] to-transparent shadow-[0_0_16px_#00f0ff]" />

        <div className="flex items-center gap-2.5 px-2.5">
          <div className="h-9 w-9 rounded-[10px] bg-[#00f0ff] grid place-items-center shadow-[0_0_18px_rgba(0,240,255,0.35)] shrink-0">
            <FlaskConical size={21} className="text-[#060911]" />
          </div>
          <div className="min-w-0">
            <p className="text-[#f8fafc] font-[family-name:var(--font-grotesk)] font-bold text-[15px] leading-none tracking-[0.18em] truncate">
              REVOLGA
            </p>
            <p className="mt-1 text-[#6e839a] text-[8px] tracking-[0.16em]">MEDICAL &amp; HEALTHCARE</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden ml-auto text-[#7690a5] cursor-pointer"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-[52px] px-2.5 text-[#52647b] text-[9px] tracking-[0.18em]">WORKSPACE / 01</div>

        <nav className="mt-3.5 grid gap-1" aria-label="Primary navigation">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 h-[42px] px-3 rounded-lg text-xs transition-all ${
                  active
                    ? "text-[#00f0ff] bg-gradient-to-r from-[rgba(0,240,255,0.12)] to-transparent"
                    : "text-[#8192a8] hover:text-[#f8fafc] hover:bg-[rgba(0,240,255,0.06)] hover:translate-x-0.5"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{label}</span>
                {active && <span className="ml-auto h-[5px] w-[5px] rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 px-2.5 text-[#52647b] text-[9px] tracking-[0.18em]">SYSTEM</div>
        <div className="flex items-center gap-2 mx-2.5 my-3 text-[#8fa2b8] text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00ffaa] shadow-[0_0_0_4px_rgba(0,255,170,0.1),0_0_10px_#00ffaa] inline-block" />
          All systems operational
          <span className="ml-auto text-[#00ffaa] text-[9px]">DEMO</span>
        </div>

        <div className="flex items-center gap-2.5 mx-1.5 my-3.5 px-2.5 py-3 rounded-lg border border-[rgba(0,240,255,0.13)] bg-[rgba(18,26,46,0.65)]">
          <ShieldCheck size={18} className="text-[#00f0ff] shrink-0" />
          <div>
            <div className="font-[family-name:var(--font-mono-display)] text-[9px] text-[#63758b] tracking-[0.08em]">WORKSPACE MODE</div>
            <div className="font-[family-name:var(--font-mono-display)] text-[10px] text-[#d5e8f3] mt-[5px]">DEMO / SANDBOX</div>
          </div>
        </div>

        <div className="mt-auto border-t border-[rgba(0,240,255,0.11)] pt-4 px-1">
          <div className="flex items-center gap-2.5">
            <div
              className="h-[30px] w-[30px] rounded-full grid place-items-center text-[#00f0ff] font-[family-name:var(--font-mono-display)] font-bold text-[10px] border border-[rgba(0,240,255,0.3)]"
              style={{ background: "linear-gradient(140deg, rgba(0,240,255,0.2), rgba(0,255,170,0.06))" }}
            >
              DA
            </div>
            <div className="grid gap-0.5 min-w-0">
              <strong className="text-[11px] font-semibold text-[#f8fafc] whitespace-nowrap">Demo Admin</strong>
              <span className="text-[9px] text-[#687a90] whitespace-nowrap">Workspace Admin</span>
            </div>
            <Link
              href="/login"
              className="ml-auto grid place-items-center p-1.5 rounded-md text-[#72869b] hover:text-[#00f0ff] hover:bg-[rgba(0,240,255,0.08)] transition-colors"
              aria-label="Sign out"
              title="No session is stored yet — this just returns to the login page"
            >
              <LogOut size={15} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation overlay"
          className="lg:hidden fixed inset-0 z-[25] bg-black/60"
        />
      )}

      {/* Main */}
      <div className="lg:ml-[246px] min-h-screen">
        <header
          className="h-[70px] sticky top-0 z-20 flex items-center justify-between gap-4 px-6 lg:px-[42px] border-b border-[rgba(0,240,255,0.11)] bg-[rgba(6,9,17,0.8)] backdrop-blur-2xl"
          data-testid="workspace-header"
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden grid place-items-center text-[#00f0ff] p-1 cursor-pointer"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3 mr-auto lg:mr-0 text-[#668098] text-[9px] tracking-[0.09em]">
            <span className="flex items-center gap-1.5 text-[#00f0ff]">
              <Radio size={14} /> REVOLGA BIOGENICS WORKSPACE
            </span>
            <span className="hidden lg:block w-6 h-px bg-[#2a3c50]" />
            <span className="hidden lg:inline text-[#677b91]">KOCHI NODE / DEMO</span>
          </div>

          <div className="flex items-center gap-[18px]">
            <button
              className="relative grid place-items-center h-[31px] w-[31px] rounded-[7px] border border-[rgba(0,240,255,0.14)] bg-[rgba(18,26,46,0.6)] text-[#9eb0c1] hover:text-[#00f0ff] hover:border-[rgba(0,240,255,0.5)] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span className="absolute top-[5px] right-[5px] h-[5px] w-[5px] rounded-full bg-[#ff3b5c]" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-[#00ffaa] text-[9px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ffaa] shadow-[0_0_0_4px_rgba(0,255,170,0.1),0_0_10px_#00ffaa] inline-block" />
              LIVE <span className="text-[#688198]">{time ?? "--:--:--"}</span>
            </div>
          </div>
        </header>

        <div className="max-w-[1480px] mx-auto px-6 lg:px-[42px] pt-8 lg:pt-[42px] pb-[70px]">{children}</div>
      </div>
    </div>
  );
}

export function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-5 sm:items-end mb-8" data-testid="page-heading">
      <div>
        <div className="flex items-center gap-2.5 text-[#00f0ff] text-[9px] tracking-[0.16em]">
          <span className="w-[19px] h-px bg-[#00f0ff] shadow-[0_0_7px_#00f0ff]" />
          {eyebrow}
        </div>
        <h1
          data-testid="page-title"
          className="my-2.5 font-[family-name:var(--font-grotesk)] font-semibold text-[clamp(30px,4vw,48px)] leading-[1.05] tracking-[-0.04em] text-[#f8fafc]"
        >
          {title}
        </h1>
        <p data-testid="page-description" className="text-[#8395aa] text-[13px] max-w-[590px] leading-[1.7]">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Small decorative corner brackets used on telemetry-style cards. */
export function CornerMark() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <span className="absolute top-0 right-0 w-[18px] h-px bg-[#00f0ff] opacity-70" />
      <span className="absolute top-0 right-0 h-[18px] w-px bg-[#00f0ff] opacity-70" />
      <span className="absolute bottom-0 left-0 w-[18px] h-px bg-[#00f0ff] opacity-70" />
      <span className="absolute bottom-0 left-0 h-[18px] w-px bg-[#00f0ff] opacity-70" />
    </div>
  );
}

export function TinyLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-[#00f0ff] hover:text-[#00ffaa] font-[family-name:var(--font-mono-display)] text-[9px] cursor-pointer transition-colors">
      {children} <ArrowUpRight size={12} />
    </span>
  );
}
