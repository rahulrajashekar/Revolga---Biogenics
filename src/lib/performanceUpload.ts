import { Employee } from "@/lib/mockEmployees";
import { parseCsv, findColumn, parseNumericCell } from "@/lib/csvParser";
import { buildPerformanceResult, PerformanceResult } from "@/lib/performanceCalculation";

// ─── UPLOAD ORCHESTRATION ──────────────────────────────────────────────────
// Ties the CSV parser + employee directory + calculation engine together.
// Pure function (no I/O) so it's easy to reason about / adjust independently
// of the page component.

export type UploadMode = "single" | "bulk";

const COLUMN_ALIASES = {
  month: ["month", "period", "monthyear", "targetmonth"],
  target: ["target", "monthlytarget", "targetamount", "targetunits", "targetvalue", "targetsales"],
  achievement: ["achievement", "achieved", "actual", "actualachievement", "achievementamount", "achievedunits", "achievedsales"],
  employeeCode: ["employeecode", "empcode", "code", "employeeid", "empid", "id"],
  employeeName: ["employeename", "name", "employee", "fullname"],
};

export interface ProcessUploadParams {
  mode: UploadMode;
  csvText: string;
  employees: Employee[];
  /** Required for mode "single" — the employee this file's rows belong to. */
  singleEmployee?: Employee;
  /** Required for mode "bulk" — the month every row in this file applies to. */
  bulkMonth?: string;
}

export interface ProcessUploadOutcome {
  results: PerformanceResult[];
  /** Human-readable messages for rows that were skipped. */
  issues: string[];
  /** Set when a required column couldn't be found at all — nothing was processed. */
  missingColumns: string[];
}

function findEmployee(employees: Employee[], identifier: string): Employee | undefined {
  const needle = identifier.trim().toLowerCase();
  if (!needle) return undefined;
  return (
    employees.find((e) => e.employeeCode.trim().toLowerCase() === needle) ||
    employees.find((e) => e.fullName.trim().toLowerCase() === needle)
  );
}

export function processPerformanceUpload({
  mode,
  csvText,
  employees,
  singleEmployee,
  bulkMonth,
}: ProcessUploadParams): ProcessUploadOutcome {
  const { headers, rows } = parseCsv(csvText);

  if (headers.length === 0 || rows.length === 0) {
    return { results: [], issues: ["The file has no data rows."], missingColumns: [] };
  }

  const targetCol = findColumn(headers, COLUMN_ALIASES.target);
  const achievementCol = findColumn(headers, COLUMN_ALIASES.achievement);
  const monthCol = mode === "single" ? findColumn(headers, COLUMN_ALIASES.month) : undefined;
  const codeCol = mode === "bulk" ? findColumn(headers, COLUMN_ALIASES.employeeCode) : undefined;
  const nameCol = mode === "bulk" ? findColumn(headers, COLUMN_ALIASES.employeeName) : undefined;

  const missingColumns: string[] = [];
  if (!targetCol) missingColumns.push("Target");
  if (!achievementCol) missingColumns.push("Achievement");
  if (mode === "single" && !monthCol) missingColumns.push("Month");
  if (mode === "bulk" && !codeCol && !nameCol) missingColumns.push("Employee Code or Employee Name");

  if (missingColumns.length > 0) {
    return { results: [], issues: [], missingColumns };
  }

  const results: PerformanceResult[] = [];
  const issues: string[] = [];

  rows.forEach((row, index) => {
    const spreadsheetRow = index + 2; // +1 for 1-based, +1 for the header row

    let employee: Employee | undefined;
    let month: string;

    if (mode === "single") {
      employee = singleEmployee;
      month = row[monthCol!] || "";
      if (!month) {
        issues.push(`Row ${spreadsheetRow}: missing a Month value — skipped.`);
        return;
      }
    } else {
      const identifier = (codeCol && row[codeCol]) || (nameCol && row[nameCol]) || "";
      employee = findEmployee(employees, identifier);
      month = bulkMonth || "";
      if (!identifier) {
        issues.push(`Row ${spreadsheetRow}: missing an Employee Code/Name value — skipped.`);
        return;
      }
      if (!employee) {
        issues.push(`Row ${spreadsheetRow}: no employee found matching "${identifier}" — skipped.`);
        return;
      }
    }

    if (!employee) {
      issues.push(`Row ${spreadsheetRow}: no employee selected — skipped.`);
      return;
    }

    const target = parseNumericCell(row[targetCol!]);
    const achievement = parseNumericCell(row[achievementCol!]);

    if (target === null || achievement === null) {
      issues.push(`Row ${spreadsheetRow}: Target/Achievement must be numbers — skipped.`);
      return;
    }
    if (target < 0 || achievement < 0) {
      issues.push(`Row ${spreadsheetRow}: Target/Achievement cannot be negative — skipped.`);
      return;
    }

    results.push(buildPerformanceResult(employee, month, target, achievement));
  });

  return { results, issues, missingColumns: [] };
}
