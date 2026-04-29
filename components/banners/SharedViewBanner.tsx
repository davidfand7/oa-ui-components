/**
 * SharedViewBanner — dismissible banner for filtered/deep-linked views
 *
 * @description
 * Shows when a page is rendering a view from a shared URL (deep link with
 * filters pre-applied). Lets the user see what filter is active and clear it
 * with one click. Renders nothing when active=false.
 *
 * @props
 * - active: boolean — show/hide the banner
 * - onClear: () => void — called when user clicks clear
 * - label?: string — human description of current filter
 * - clearLabel?: string — button copy (default "Clear filters")
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (11 repos)
 * @reusability-score 3
 */

import { Link2, X } from "lucide-react";

type Props = {
  active: boolean;
  onClear: () => void;
  label?: string;
  clearLabel?: string;
};

export function SharedViewBanner({ active, onClear, label, clearLabel = "Clear filters" }: Props) {
  if (!active) return null;
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-indigo/20 bg-indigo-soft/40 px-3 py-2 text-xs">
      <div className="flex items-center gap-2 text-indigo min-w-0">
        <Link2 className="h-3.5 w-3.5 shrink-0" />
        <span className="font-medium shrink-0">Shared view</span>
        {label && <span className="text-ink-soft truncate">{label}</span>}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1 rounded-md border border-indigo/30 bg-card px-2 py-1 text-indigo hover:bg-indigo-soft transition shrink-0"
      >
        <X className="h-3 w-3" /> {clearLabel}
      </button>
    </div>
  );
}
