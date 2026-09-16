// ─── SALES PERFORMANCE — SHARED TYPES ─────────────────────────────────────
// Central type definitions for the Sales Employee Performance / Excel
// Upload / Incentive / Salary module. Kept isolated from the rest of the
// app's types so this module can be pointed at real backend responses later
// without reshaping unrelated code.
//
// IMPORTANT: All figures produced by this module (targets, salaries,
// incentive %, thresholds) are DEMO / MOCK data only and do not represent
// Revolga Biogenics' actual policies.

export type EmployeeRecordStatus = "active" | "inactive";

export interface SalesEmployee {
  id: string;
  employeeCode: string;
  fullName: string;
  designation: string;
  territoryId: string;
  managerId: string | null;
  joiningDate: string; // ISO date
  status: EmployeeRecordStatus;
  basicSalary: number;
  allowances: number;
  photoInitials: string;
}

export interface Territory {
  id: string;
  name: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  unitPrice: number;
}

/** One employee's raw activity/sales record for a single month — the shape an Excel upload ultimately produces. */
export interface MonthlyEmployeeRecord {
  employeeId: string;
  month: string; // "2026-04"
  target: number;
  actualSales: number;
  orders: number;
  newCustomers: number;
  collectionTarget: number;
  collectionActual: number;
  customerVisits: number;
  newCustomerVisits: number;
  followUps: number;
  productPresentations: number;
  workingDays: number;
}

export type PerformanceStatus = "on-track" | "needs-attention" | "target-achieved" | "above-target";

/** Derived, ready-to-render performance figures for one employee in one month. */
export interface EmployeePerformanceRow extends MonthlyEmployeeRecord {
  achievementPercent: number;
  collectionAchievementPercent: number;
  averageOrderValue: number;
  status: PerformanceStatus;
}

export interface MonthlyTrendPoint {
  month: string;
  monthLabel: string;
  target: number;
  actual: number;
  achievementPercent: number;
}

export interface TerritoryPerformanceRow {
  territoryId: string;
  territoryName: string;
  employeeCount: number;
  target: number;
  actualSales: number;
  achievementPercent: number;
  orders: number;
  collection: number;
  newCustomers: number;
}

export interface ProductPerformanceRow {
  productId: string;
  productName: string;
  categoryId: string;
  categoryName: string;
  unitsSold: number;
  salesAmount: number;
  target: number;
  achievementPercent: number;
  growthPercent: number;
}

export interface IncentiveBreakdown {
  employeeId: string;
  month: string;
  achievementPercent: number;
  incentiveRatePercent: number;
  salesIncentive: number;
  collectionIncentive: number;
  newCustomerIncentive: number;
  performanceBonus: number;
  totalIncentive: number;
  status: IncentiveStatus;
}

export type IncentiveStatus = "calculated" | "pending-approval" | "approved" | "paid";

export interface IncentiveSlab {
  id: string;
  label: string;
  minAchievement: number;
  maxAchievement: number | null; // null = no upper bound ("100%+")
  incentivePercent: number;
  fixedIncentive: number;
  bonus: number;
  effectiveDate: string;
  status: "active" | "inactive";
}

export interface PerformanceWeightConfig {
  salesAchievement: number;
  collection: number;
  newCustomers: number;
  fieldActivity: number;
  growth: number;
}

export interface SalaryRecord {
  employeeId: string;
  month: string;
  basicSalary: number;
  allowances: number;
  salesIncentive: number;
  collectionIncentive: number;
  newCustomerIncentive: number;
  performanceBonus: number;
  deductions: number;
  netPay: number;
  status: SalaryStatus;
}

export type SalaryStatus = "draft" | "approved" | "paid";

export type ValidationSeverity = "error" | "warning";

export interface ValidationIssue {
  id: string;
  row: number;
  column: string;
  message: string;
  severity: ValidationSeverity;
}

export interface ExcelImportSummary {
  id: string;
  fileName: string;
  fileSizeKb: number;
  uploadedAt: string;
  uploadedBy: string;
  totalRows: number;
  employeeCount: number;
  dateRangeStart: string;
  dateRangeEnd: string;
  validRows: number;
  warningRows: number;
  errorRows: number;
  issues: ValidationIssue[];
}

export interface ColumnMapping {
  excelColumn: string;
  systemField: string;
}

export type AlertSeverity = "critical" | "warning" | "info" | "success";

export interface DashboardAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
}
