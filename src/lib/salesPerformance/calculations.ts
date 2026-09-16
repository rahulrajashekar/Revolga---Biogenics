// ─── SALES PERFORMANCE — CALCULATION ENGINE ───────────────────────────────
// Pure, isolated functions that turn raw monthly records into the derived
// figures the dashboard renders (achievement %, status, territory/product
// rollups, incentive breakdowns, salary payouts, performance scores).
//
// Nothing here talks to the network or touches component state, so the
// formulas can be reviewed/adjusted (or swapped for a real backend
// calculation) independently of the UI.
//
// IMPORTANT — DEMO CONFIGURATION ONLY: the thresholds, incentive slabs and
// score weights below are illustrative defaults for the walkthrough. They
// are NOT Revolga Biogenics' actual incentive policy, salary structure or
// performance criteria.

import {
  EmployeePerformanceRow,
  IncentiveBreakdown,
  IncentiveSlab,
  MonthlyEmployeeRecord,
  MonthlyTrendPoint,
  PerformanceStatus,
  PerformanceWeightConfig,
  ProductPerformanceRow,
  SalaryRecord,
  TerritoryPerformanceRow,
} from "./types";
import { getEmployee, getTerritory, monthShortLabel, REPORTING_MONTHS, TERRITORIES } from "./mockCore";

export function round(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function achievementPercentOf(target: number, actual: number): number {
  if (!target || target <= 0) return 0;
  return round((actual / target) * 100);
}

/** Status thresholds — demo defaults, adjustable per client requirements. */
export const STATUS_THRESHOLDS = {
  needsAttentionBelow: 80,
  onTrackBelow: 100,
  aboveTargetFrom: 110,
};

export function classifyStatus(achievementPercent: number): PerformanceStatus {
  if (achievementPercent < STATUS_THRESHOLDS.needsAttentionBelow) return "needs-attention";
  if (achievementPercent < STATUS_THRESHOLDS.onTrackBelow) return "on-track";
  if (achievementPercent >= STATUS_THRESHOLDS.aboveTargetFrom) return "above-target";
  return "target-achieved";
}

export const STATUS_LABEL: Record<PerformanceStatus, string> = {
  "needs-attention": "Needs Attention",
  "on-track": "On Track",
  "target-achieved": "Target Achieved",
  "above-target": "Above Target",
};

export function toPerformanceRow(record: MonthlyEmployeeRecord): EmployeePerformanceRow {
  const achievementPercent = achievementPercentOf(record.target, record.actualSales);
  const collectionAchievementPercent = achievementPercentOf(record.collectionTarget, record.collectionActual);
  const averageOrderValue = record.orders > 0 ? round(record.actualSales / record.orders, 0) : 0;

  return {
    ...record,
    achievementPercent,
    collectionAchievementPercent,
    averageOrderValue,
    status: classifyStatus(achievementPercent),
  };
}

export function buildMonthlyTrend(records: MonthlyEmployeeRecord[]): MonthlyTrendPoint[] {
  return REPORTING_MONTHS.map((month) => {
    const monthRecords = records.filter((r) => r.month === month);
    const target = monthRecords.reduce((s, r) => s + r.target, 0);
    const actual = monthRecords.reduce((s, r) => s + r.actualSales, 0);
    return {
      month,
      monthLabel: monthShortLabel(month),
      target,
      actual,
      achievementPercent: achievementPercentOf(target, actual),
    };
  });
}

export function buildTerritoryPerformance(records: MonthlyEmployeeRecord[], month: string): TerritoryPerformanceRow[] {
  const monthRecords = records.filter((r) => r.month === month);

  return TERRITORIES.map((territory) => {
    const territoryEmployeeIds = new Set(
      monthRecords
        .filter((r) => getEmployee(r.employeeId)?.territoryId === territory.id)
        .map((r) => r.employeeId)
    );
    const territoryRecords = monthRecords.filter((r) => territoryEmployeeIds.has(r.employeeId));

    const target = territoryRecords.reduce((s, r) => s + r.target, 0);
    const actualSales = territoryRecords.reduce((s, r) => s + r.actualSales, 0);
    const orders = territoryRecords.reduce((s, r) => s + r.orders, 0);
    const collection = territoryRecords.reduce((s, r) => s + r.collectionActual, 0);
    const newCustomers = territoryRecords.reduce((s, r) => s + r.newCustomers, 0);

    return {
      territoryId: territory.id,
      territoryName: territory.name,
      employeeCount: territoryEmployeeIds.size,
      target,
      actualSales,
      achievementPercent: achievementPercentOf(target, actualSales),
      orders,
      collection,
      newCustomers,
    };
  }).filter((t) => t.employeeCount > 0);
}

// ─── INCENTIVE CALCULATION ─────────────────────────────────────────────────

export const DEFAULT_INCENTIVE_SLABS: IncentiveSlab[] = [
  { id: "SLAB-1", label: "Below 70%", minAchievement: 0, maxAchievement: 69.99, incentivePercent: 0, fixedIncentive: 0, bonus: 0, effectiveDate: "2026-04-01", status: "active" },
  { id: "SLAB-2", label: "70% – 79%", minAchievement: 70, maxAchievement: 79.99, incentivePercent: 1, fixedIncentive: 0, bonus: 0, effectiveDate: "2026-04-01", status: "active" },
  { id: "SLAB-3", label: "80% – 89%", minAchievement: 80, maxAchievement: 89.99, incentivePercent: 2, fixedIncentive: 500, bonus: 0, effectiveDate: "2026-04-01", status: "active" },
  { id: "SLAB-4", label: "90% – 99%", minAchievement: 90, maxAchievement: 99.99, incentivePercent: 3, fixedIncentive: 1000, bonus: 0, effectiveDate: "2026-04-01", status: "active" },
  { id: "SLAB-5", label: "100%+", minAchievement: 100, maxAchievement: null, incentivePercent: 5, fixedIncentive: 1500, bonus: 2000, effectiveDate: "2026-04-01", status: "active" },
];

export function slabFor(slabs: IncentiveSlab[], achievementPercent: number): IncentiveSlab | undefined {
  return slabs
    .filter((s) => s.status === "active")
    .find((s) => achievementPercent >= s.minAchievement && (s.maxAchievement === null || achievementPercent <= s.maxAchievement));
}

const COLLECTION_INCENTIVE_RATE = 0.5; // % of collection achieved above target used for the collection incentive component (demo).
const NEW_CUSTOMER_INCENTIVE_PER_CUSTOMER = 250; // ₹ per new customer acquired (demo).

export function calculateIncentive(
  row: EmployeePerformanceRow,
  slabs: IncentiveSlab[] = DEFAULT_INCENTIVE_SLABS,
  status: IncentiveBreakdown["status"] = "calculated"
): IncentiveBreakdown {
  const slab = slabFor(slabs, row.achievementPercent);
  const incentivePercent = slab?.incentivePercent ?? 0;

  const salesIncentive = round((row.actualSales * incentivePercent) / 100, 0);
  const collectionIncentive =
    row.collectionAchievementPercent >= 100
      ? round((row.collectionActual * COLLECTION_INCENTIVE_RATE) / 100, 0)
      : 0;
  const newCustomerIncentive = round(row.newCustomers * NEW_CUSTOMER_INCENTIVE_PER_CUSTOMER, 0);
  const performanceBonus = (slab?.fixedIncentive ?? 0) + (slab?.bonus ?? 0);

  return {
    employeeId: row.employeeId,
    month: row.month,
    achievementPercent: row.achievementPercent,
    incentiveRatePercent: incentivePercent,
    salesIncentive,
    collectionIncentive,
    newCustomerIncentive,
    performanceBonus,
    totalIncentive: salesIncentive + collectionIncentive + newCustomerIncentive + performanceBonus,
    status,
  };
}

// ─── SALARY / PAYOUT CALCULATION ───────────────────────────────────────────
// DEMO CALCULATION ONLY — not statutory payroll (no PF/ESI/TDS modelling).

const DEDUCTION_RATE_PERCENT = 6; // flat demo deduction rate against basic + allowances.

export function calculateSalary(
  basicSalary: number,
  allowances: number,
  incentive: IncentiveBreakdown,
  status: SalaryRecord["status"] = "draft"
): SalaryRecord {
  const deductions = round(((basicSalary + allowances) * DEDUCTION_RATE_PERCENT) / 100, 0);
  const netPay =
    basicSalary +
    allowances +
    incentive.salesIncentive +
    incentive.collectionIncentive +
    incentive.newCustomerIncentive +
    incentive.performanceBonus -
    deductions;

  return {
    employeeId: incentive.employeeId,
    month: incentive.month,
    basicSalary,
    allowances,
    salesIncentive: incentive.salesIncentive,
    collectionIncentive: incentive.collectionIncentive,
    newCustomerIncentive: incentive.newCustomerIncentive,
    performanceBonus: incentive.performanceBonus,
    deductions,
    netPay: round(netPay, 0),
    status,
  };
}

// ─── PERFORMANCE SCORE ──────────────────────────────────────────────────────
// Weighted composite score across five configurable components. Weights are
// a demo default (see PerformanceWeightConfig) — designed to be tunable by
// management later, not a fixed business formula.

export const DEFAULT_SCORE_WEIGHTS: PerformanceWeightConfig = {
  salesAchievement: 50,
  collection: 20,
  newCustomers: 10,
  fieldActivity: 10,
  growth: 10,
};

export interface ScoreComponents {
  salesAchievement: number;
  collection: number;
  newCustomers: number;
  fieldActivity: number;
  growth: number;
}

/** Normalizes a raw metric to a 0-100 sub-score by capping at a sensible ceiling for that metric. */
function capScore(value: number, ceiling: number): number {
  return round(Math.min(100, (value / ceiling) * 100));
}

export function scoreComponentsFor(row: EmployeePerformanceRow, growthPercent: number): ScoreComponents {
  const fieldActivityRaw =
    (row.customerVisits / 120) * 40 + (row.followUps / 50) * 30 + (row.productPresentations / 40) * 30;

  return {
    salesAchievement: capScore(row.achievementPercent, 120),
    collection: capScore(row.collectionAchievementPercent, 110),
    newCustomers: capScore(row.newCustomers, 8),
    fieldActivity: capScore(fieldActivityRaw, 100),
    growth: capScore(Math.max(0, growthPercent) + 50, 100),
  };
}

export function weightedScore(components: ScoreComponents, weights: PerformanceWeightConfig): number {
  const totalWeight =
    weights.salesAchievement + weights.collection + weights.newCustomers + weights.fieldActivity + weights.growth;
  if (totalWeight <= 0) return 0;

  const weighted =
    components.salesAchievement * weights.salesAchievement +
    components.collection * weights.collection +
    components.newCustomers * weights.newCustomers +
    components.fieldActivity * weights.fieldActivity +
    components.growth * weights.growth;

  return round(weighted / totalWeight);
}

export function growthPercentFor(current: number, previous: number): number {
  if (!previous) return 0;
  return round(((current - previous) / previous) * 100);
}

export function territoryLabelFor(territoryId: string): string {
  return getTerritory(territoryId)?.name ?? territoryId;
}

export function productPerformanceSummary(rows: ProductPerformanceRow[]) {
  const topSelling = [...rows].sort((a, b) => b.salesAmount - a.salesAmount).slice(0, 5);
  const slowMoving = [...rows].sort((a, b) => a.achievementPercent - b.achievementPercent).slice(0, 5);
  return { topSelling, slowMoving };
}
