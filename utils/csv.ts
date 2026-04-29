/**
 * csv — dependency-free CSV export helpers
 *
 * @description
 * Build and download CSV files from any array of objects. Handles arbitrary
 * cell values (objects/arrays → JSON, dates → ISO, nullish → empty), proper
 * RFC 4180 quoting, and BOM prefix for Excel UTF-8 auto-detection.
 *
 * @usage
 *   const csv = toCSV(rows, [
 *     { header: "ID",      value: r => r.id },
 *     { header: "Title",   value: r => r.title },
 *     { header: "Created", value: r => r.created_at },
 *   ]);
 *   downloadFile(`export-${stamp()}.csv`, csv, "text/csv");
 *
 * @found-in openagenticv4, openagenticv3 (9 repos)
 * @reusability-score 3
 */

export type CsvColumn<T> = {
  header: string;
  value: (row: T) => unknown;
};

function quote(cell: string): string {
  return `"${cell.replace(/"/g, '""')}"`;
}

function stringify(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean" || typeof v === "bigint") return String(v);
  try { return JSON.stringify(v); } catch { return String(v); }
}

export function toCSV<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((c) => quote(c.header)).join(",");
  const body = rows
    .map((row) => columns.map((c) => quote(stringify(c.value(row)))).join(","))
    .join("\n");
  return `﻿${header}\n${body}`;
}

export function downloadFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function stamp(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}
