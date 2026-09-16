// ─── EXCEL UPLOAD — SIMULATED IMPORT PIPELINE ─────────────────────────────
// This is a FRONTEND-ONLY simulation of an Excel/CSV import. It never reads
// the actual file contents — it fabricates a plausible, deterministic
// validation summary (row counts, warnings, errors) from the file's name and
// size so a demo run feels consistent and repeatable. Wiring this to a real
// parser/backend later only means replacing `simulateExcelUpload` — every
// caller already works against `ExcelImportSummary` / `ValidationIssue`.

import { activeSalesEmployees, monthLabel, REPORTING_MONTHS } from "./mockCore";
import { ColumnMapping, ExcelImportSummary, ValidationIssue } from "./types";
import { mulberry32, randInt } from "./seededRandom";

const VALIDATION_MESSAGES: { column: string; message: string; severity: "error" | "warning" }[] = [
  { column: "Employee ID", message: "Employee ID missing", severity: "error" },
  { column: "Employee ID", message: "Employee not found for this Employee ID", severity: "error" },
  { column: "Sale Date", message: "Invalid date format", severity: "error" },
  { column: "Product", message: "Product not found in catalog", severity: "warning" },
  { column: "Row", message: "Duplicate record (same employee, date & product)", severity: "warning" },
  { column: "Sales Amount", message: "Invalid sales amount (non-numeric or negative)", severity: "error" },
  { column: "Quantity", message: "Invalid quantity value", severity: "error" },
  { column: "Territory", message: "Missing territory", severity: "warning" },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(hash) || 1;
}

export function simulateExcelUpload(file: { name: string; size: number }, uploadedBy: string): ExcelImportSummary {
  const rnd = mulberry32(hashString(file.name + file.size));

  const totalRows = randInt(rnd, 400, 1600);
  const errorRows = Math.round(totalRows * randInt(rnd, 1, 3) / 100);
  const warningRows = Math.round(totalRows * randInt(rnd, 1, 2) / 100);
  const validRows = totalRows - errorRows - warningRows;

  const issues: ValidationIssue[] = [];
  const issueCount = Math.min(errorRows + warningRows, 40); // cap the list shown in the UI
  for (let i = 0; i < issueCount; i++) {
    const template = VALIDATION_MESSAGES[i % VALIDATION_MESSAGES.length];
    issues.push({
      id: `ISSUE-${i + 1}`,
      row: randInt(rnd, 2, totalRows + 1),
      column: template.column,
      message: template.message,
      severity: i < errorRows ? "error" : "warning",
    });
  }
  issues.sort((a, b) => a.row - b.row);

  return {
    id: `IMP-${Date.now()}`,
    fileName: file.name,
    fileSizeKb: Math.max(1, Math.round(file.size / 1024)),
    uploadedAt: new Date().toISOString(),
    uploadedBy,
    totalRows,
    employeeCount: activeSalesEmployees().length,
    dateRangeStart: monthLabel(REPORTING_MONTHS[0]),
    dateRangeEnd: monthLabel(REPORTING_MONTHS[REPORTING_MONTHS.length - 1]),
    validRows,
    warningRows,
    errorRows,
    issues,
  };
}

// ─── COLUMN MAPPING ─────────────────────────────────────────────────────────

export const SYSTEM_FIELDS = [
  { value: "employee", label: "Employee" },
  { value: "employeeId", label: "Employee ID" },
  { value: "saleDate", label: "Sale Date" },
  { value: "customer", label: "Customer" },
  { value: "product", label: "Product" },
  { value: "quantity", label: "Quantity" },
  { value: "salesAmount", label: "Sales Amount" },
  { value: "territory", label: "Territory" },
  { value: "collectionAmount", label: "Collection Amount" },
  { value: "ignore", label: "Do not import" },
] as const;

export const DEFAULT_COLUMN_MAPPING: ColumnMapping[] = [
  { excelColumn: "Employee Name", systemField: "employee" },
  { excelColumn: "Employee ID", systemField: "employeeId" },
  { excelColumn: "Date", systemField: "saleDate" },
  { excelColumn: "Customer", systemField: "customer" },
  { excelColumn: "Product", systemField: "product" },
  { excelColumn: "Quantity", systemField: "quantity" },
  { excelColumn: "Amount", systemField: "salesAmount" },
  { excelColumn: "Territory", systemField: "territory" },
  { excelColumn: "Collection", systemField: "collectionAmount" },
];
