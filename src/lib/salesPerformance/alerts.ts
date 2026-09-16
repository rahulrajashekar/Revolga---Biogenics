// ─── DASHBOARD ALERTS ──────────────────────────────────────────────────────
// Derives management alerts from the current month's computed performance,
// incentive and import data. Pure function so it can be recomputed for any
// month/dataset without touching the UI.

import { DashboardAlert } from "./types";
import { EmployeePerformanceRow, IncentiveBreakdown } from "./types";
import { getEmployee } from "./mockCore";

export interface BuildAlertsInput {
  currentMonthRows: EmployeePerformanceRow[];
  incentives: IncentiveBreakdown[];
  lastImportErrorCount: number;
  lastImportFileName: string;
  activeEmployeeCount: number;
  submittedEmployeeCount: number;
}

export function buildDashboardAlerts(input: BuildAlertsInput): DashboardAlert[] {
  const alerts: DashboardAlert[] = [];

  const belowTarget = input.currentMonthRows.filter((r) => r.status === "needs-attention");
  if (belowTarget.length > 0) {
    alerts.push({
      id: "ALERT-BELOW-TARGET",
      severity: "critical",
      title: `${belowTarget.length} employee(s) below target`,
      description: belowTarget
        .slice(0, 3)
        .map((r) => `${getEmployee(r.employeeId)?.fullName ?? r.employeeId} (${r.achievementPercent}%)`)
        .join(", ") + (belowTarget.length > 3 ? `, +${belowTarget.length - 3} more` : ""),
    });
  }

  const nearTarget = input.currentMonthRows.filter((r) => r.achievementPercent >= 90 && r.achievementPercent < 100);
  if (nearTarget.length > 0) {
    alerts.push({
      id: "ALERT-NEAR-TARGET",
      severity: "warning",
      title: `${nearTarget.length} employee(s) close to target`,
      description: "90–99% achievement — likely to hit target with a final push this month.",
    });
  }

  const highPerformers = input.currentMonthRows.filter((r) => r.status === "above-target");
  if (highPerformers.length > 0) {
    alerts.push({
      id: "ALERT-HIGH-PERFORMERS",
      severity: "success",
      title: `${highPerformers.length} high-performing employee(s)`,
      description: highPerformers
        .slice(0, 3)
        .map((r) => `${getEmployee(r.employeeId)?.fullName ?? r.employeeId} (${r.achievementPercent}%)`)
        .join(", "),
    });
  }

  const lowCollection = input.currentMonthRows.filter((r) => r.collectionAchievementPercent < 75);
  if (lowCollection.length > 0) {
    alerts.push({
      id: "ALERT-LOW-COLLECTION",
      severity: "warning",
      title: `${lowCollection.length} employee(s) with low collection achievement`,
      description: "Collection achievement under 75% of target — flag for follow-up with finance.",
    });
  }

  const missingSubmissions = input.activeEmployeeCount - input.submittedEmployeeCount;
  if (missingSubmissions > 0) {
    alerts.push({
      id: "ALERT-MISSING-SUBMISSIONS",
      severity: "warning",
      title: `${missingSubmissions} employee(s) missing sales submissions`,
      description: "No uploaded data found for the current reporting month yet.",
    });
  }

  if (input.lastImportErrorCount > 0) {
    alerts.push({
      id: "ALERT-IMPORT-ERRORS",
      severity: "critical",
      title: `${input.lastImportErrorCount} row(s) failed in the last Excel import`,
      description: `File "${input.lastImportFileName}" had validation errors — review before re-importing.`,
    });
  }

  const pendingApprovals = input.incentives.filter((i) => i.status === "pending-approval");
  if (pendingApprovals.length > 0) {
    alerts.push({
      id: "ALERT-PENDING-APPROVALS",
      severity: "info",
      title: `${pendingApprovals.length} incentive(s) pending approval`,
      description: "Awaiting management sign-off before payout processing.",
    });
  }

  return alerts;
}
