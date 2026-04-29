/**
 * formatBytes — human-readable file size string
 *
 * @description
 * Formats a byte count as a short human-readable string (e.g. "12.3 KB").
 * Returns "—" for null/undefined/negative/non-finite values so callers can
 * pipe raw DB values directly without guarding.
 *
 * @example
 *   formatBytes(1234567) // "1.2 MB"
 *   formatBytes(0)       // "0 B"
 *   formatBytes(null)    // "—"
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (11 repos)
 * @reusability-score 3
 */

export function formatBytes(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n) || n < 0) return "—";
  if (n === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log10(n) / 3));
  const value = n / Math.pow(1000, i);
  return `${i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`;
}
