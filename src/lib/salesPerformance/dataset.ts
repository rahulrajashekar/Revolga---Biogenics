// ─── SALES PERFORMANCE — COMPOSED DATASET ─────────────────────────────────
// Thin composition layer that assembles employees + records + calculations
// into the exact shapes the pages render. Centralizing this here means the
// page components stay presentational, and the whole module can later be
// re-pointed at real API responses by rewriting only this file.

import {
  activeSalesEmployees,
  CURRENT_MONTH,
  getEmployee,
  REPORTING_MONTHS,
} from "./mockCore";
import { MONTHLY_EMPLOYEE_RECORDS, productPerformanceByMonth, recordsForEmployee } from "./mockRecords";
import {
  buildMonthlyTrend,
  buildTerritoryPerformance,
  calculateIncentive,
  calculateSalary,
  DEFAULT_INCENTIVE_SLABS,
  DEFAULT_SCORE_WEIGHTS,
  growthPercentFor,
  scoreComponentsFor,
  toPerformanceRow,
  weightedScore,
} from "./calculations";
import { buildDashboardAlerts } from "./alerts";
import { simulateExcelUpload } from "./excelImportSimulation";
import {
  EmployeePerformanceRow,
  ExcelImportSummary,
  IncentiveBreakdown,
  IncentiveSlab,
  PerformanceWeightConfig,
  SalaryRecord,
} from "./types";

export function performanceRowsForMonth(month: string): EmployeePerformanceRow[] {
  return MONTHLY_EMPLOYEE_RECORDS.filter((r) => r.month === month).map(toPerformanceRow);
}

export function performanceHistoryForEmployee(employeeId: string): EmployeePerformanceRow[] {
  return recordsForEmployee(employeeId).map(toPerformanceRow);
}

// Cycle incentive statuses deterministically by employee index, so the
// Incentive & Salary dashboards show a realistic mix rather than every row
// looking identical.
const INCENTIVE_STATUS_CYCLE: IncentiveBreakdown["status"][] = ["paid", "approved", "pending-approval", "calculated"];
const SALARY_STATUS_CYCLE: SalaryRecord["status"][] = ["paid", "approved", "draft"];

export function incentivesForMonth(month: string, slabs: IncentiveSlab[] = DEFAULT_INCENTIVE_SLABS): IncentiveBreakdown[] {
  const rows = performanceRowsForMonth(month);
  return rows.map((row, index) =>
    calculateIncentive(row, slabs, INCENTIVE_STATUS_CYCLE[index % INCENTIVE_STATUS_CYCLE.length])
  );
}

export function salaryForMonth(month: string, slabs: IncentiveSlab[] = DEFAULT_INCENTIVE_SLABS): SalaryRecord[] {
  const incentives = incentivesForMonth(month, slabs);
  return incentives.map((incentive, index) => {
    const employee = getEmployee(incentive.employeeId);
    return calculateSalary(
      employee?.basicSalary ?? 0,
      employee?.allowances ?? 0,
      incentive,
      SALARY_STATUS_CYCLE[index % SALARY_STATUS_CYCLE.length]
    );
  });
}

export function monthlyTrend() {
  return buildMonthlyTrend(MONTHLY_EMPLOYEE_RECORDS);
}

export function territoryPerformanceForMonth(month: string) {
  return buildTerritoryPerformance(MONTHLY_EMPLOYEE_RECORDS, month);
}

export function productPerformanceForMonth(month: string) {
  return productPerformanceByMonth(month);
}

export interface EmployeeScorecard {
  employeeId: string;
  current: EmployeePerformanceRow;
  previous: EmployeePerformanceRow | null;
  growthPercent: number;
  incentive: IncentiveBreakdown;
  salary: SalaryRecord;
  scoreComponents: ReturnType<typeof scoreComponentsFor>;
  overallScore: number;
}

export function scorecardFor(
  employeeId: string,
  month: string = CURRENT_MONTH,
  slabs: IncentiveSlab[] = DEFAULT_INCENTIVE_SLABS,
  weights: PerformanceWeightConfig = DEFAULT_SCORE_WEIGHTS
): EmployeeScorecard | null {
  const history = performanceHistoryForEmployee(employeeId);
  const current = history.find((r) => r.month === month);
  if (!current) return null;

  const monthIndex = REPORTING_MONTHS.indexOf(month as (typeof REPORTING_MONTHS)[number]);
  const previous = monthIndex > 0 ? history.find((r) => r.month === REPORTING_MONTHS[monthIndex - 1]) ?? null : null;
  const growthPercent = previous ? growthPercentFor(current.actualSales, previous.actualSales) : 0;

  const incentive = calculateIncentive(current, slabs);
  const employee = getEmployee(employeeId);
  const salary = calculateSalary(employee?.basicSalary ?? 0, employee?.allowances ?? 0, incentive);
  const scoreComponents = scoreComponentsFor(current, growthPercent);
  const overallScore = weightedScore(scoreComponents, weights);

  return { employeeId, current, previous, growthPercent, incentive, salary, scoreComponents, overallScore };
}

// ─── LAST IMPORT (for the Upload history strip + dashboard alerts) ─────────

export const LAST_IMPORT_SUMMARY: ExcelImportSummary = simulateExcelUpload(
  { name: "sales-performance-september-2026.xlsx", size: 486_000 },
  "Rahul Krishnan"
);

export function dashboardAlertsFor(month: string = CURRENT_MONTH) {
  const rows = performanceRowsForMonth(month);
  const incentives = incentivesForMonth(month);
  const activeEmployeeCount = activeSalesEmployees().length;

  return buildDashboardAlerts({
    currentMonthRows: rows,
    incentives,
    lastImportErrorCount: LAST_IMPORT_SUMMARY.errorRows,
    lastImportFileName: LAST_IMPORT_SUMMARY.fileName,
    activeEmployeeCount,
    submittedEmployeeCount: rows.length,
  });
}
