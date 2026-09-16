// ─── DASHBOARD MOCK DATA ────────────────────────────────────────────────────
// Isolated mock data for the Dashboard page — kept out of the component so
// it can be swapped for a real API response later without touching the UI.

export type KpiAccent = "cyan" | "mint" | "amber" | "rose";

export interface DashboardKpi {
  label: string;
  value: string;
  delta: string;
  accent: KpiAccent;
}

export const DASHBOARD_KPIS: DashboardKpi[] = [
  { label: "Monthly revenue", value: "₹18.4L", delta: "+12.4%", accent: "cyan" },
  { label: "Active products", value: "1,240", delta: "+8.2%", accent: "mint" },
  { label: "Open orders", value: "47", delta: "+3.1%", accent: "amber" },
  { label: "On-time fulfillment", value: "96.6%", delta: "+0.8%", accent: "rose" },
];

export interface ChartPoint {
  label: string;
  sales: number;
  orders: number;
}

export const REVENUE_CHART: ChartPoint[] = [
  { label: "Apr", sales: 62, orders: 40 },
  { label: "May", sales: 68, orders: 46 },
  { label: "Jun", sales: 71, orders: 50 },
  { label: "Jul", sales: 75, orders: 58 },
  { label: "Aug", sales: 80, orders: 64 },
  { label: "Sep", sales: 86, orders: 72 },
];

export type ActivityStatus = "verified" | "review" | "alert";

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  status: ActivityStatus;
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: "1", title: "New order placed", detail: "INV-2041 · Kerala Pharmacy & Stores", time: "12 min ago", status: "verified" },
  { id: "2", title: "Low stock alert", detail: "Paracetamol 650mg · 18 strips left", time: "41 min ago", status: "alert" },
  { id: "3", title: "Purchase order received", detail: "PO-118 · Cipla Ltd.", time: "2 hr ago", status: "verified" },
  { id: "4", title: "Payment pending review", detail: "INV-2038 · ₹42,600 outstanding", time: "3 hr ago", status: "review" },
  { id: "5", title: "New customer onboarded", detail: "Lakeshore Hospital, Kochi", time: "Yesterday", status: "verified" },
];

export const QUICK_ACTIONS = [
  { title: "Upload sales data", detail: "CSV file · parse instantly", href: "/performance" },
  { title: "Create a new order", detail: "Start a new sales workflow", href: "/sales" },
];
