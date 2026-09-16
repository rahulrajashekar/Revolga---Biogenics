// ─── MINIMAL CSV PARSER ────────────────────────────────────────────────────
// Hand-written, dependency-free CSV parsing. Kept intentionally small: it
// only needs to handle what a spreadsheet export produces (quoted fields,
// escaped quotes, commas inside quotes, CRLF/LF line endings) — not the
// full RFC 4180 edge-case surface. This avoids pulling in a binary .xlsx
// parser (and its dependency/security tradeoffs) for a feature that only
// needs flat tabular data in and out.

export interface CsvParseResult {
  headers: string[];
  rows: Record<string, string>[];
}

export function parseCsv(text: string): CsvParseResult {
  const rows = parseCsvRows(text.replace(/^﻿/, "")); // strip BOM if present
  if (rows.length === 0) return { headers: [], rows: [] };

  const headers = rows[0].map((h) => h.trim());
  const dataRows = rows.slice(1).filter((row) => row.some((cell) => cell.trim() !== ""));

  return {
    headers,
    rows: dataRows.map((row) => {
      const record: Record<string, string> = {};
      headers.forEach((header, i) => {
        record[header] = (row[i] ?? "").trim();
      });
      return record;
    }),
  };
}

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  // Flush the last field/row if the file doesn't end with a newline.
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/** Normalizes a header for loose matching: lowercase, strip spaces/underscores/hyphens. */
export function normalizeHeaderKey(key: string): string {
  return key.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

/** Finds the first header whose normalized form matches one of the given aliases. */
export function findColumn(headers: string[], aliases: string[]): string | undefined {
  const normalizedAliases = new Set(aliases.map(normalizeHeaderKey));
  return headers.find((h) => normalizedAliases.has(normalizeHeaderKey(h)));
}

/** Parses a numeric cell that may contain currency symbols, commas, or a trailing "%". */
export function parseNumericCell(value: string | undefined): number | null {
  if (!value) return null;
  const cleaned = value.replace(/[₹$,\s%]/g, "");
  if (cleaned === "") return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}
