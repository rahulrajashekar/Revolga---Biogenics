// ─── CSV TEMPLATE HELPERS ──────────────────────────────────────────────────
// Small, self-contained helpers for generating and downloading a sample CSV
// so users know exactly which columns the upload expects.

export function getSingleModeTemplate(): string {
  return ["Month,Target,Achievement", "January 2026,100000,85000", "February 2026,100000,110000"].join("\n");
}

export function getBulkModeTemplate(): string {
  return ["Employee Code,Target,Achievement", "RB-E001,100000,85000", "RB-E002,150000,160000"].join("\n");
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
