/**
 * StatusChip — semantic status badge with animated live dot
 *
 * @description
 * Compact pill chip for agent/workflow lifecycle states. Uses semantic color
 * tokens (sage/amber/clay/indigo/teal) that work in both light and dark mode.
 * Includes an animated pulse dot for "live" state.
 *
 * @props
 * - status: "draft" | "tested" | "ready" | "live" | "paused" | "blocked" | "warning"
 * - className?: extra Tailwind utilities
 *
 * Also exports RiskChip for 3-tier risk indicators (low/medium/elevated).
 *
 * @found-in openagenticv3, openagenticv4, openagenticv4-app, agent-forge,
 *           agentic-studio, openclaw-agent-studio, signaldesk-os (12 repos)
 * @reusability-score 3
 */

import { cn } from "@/lib/utils";

type Status = "draft" | "tested" | "ready" | "live" | "paused" | "blocked" | "warning";

const STYLES: Record<Status, string> = {
  draft: "bg-muted text-ink-soft ring-border",
  tested: "bg-indigo-soft text-indigo ring-indigo/20",
  ready: "bg-teal-soft text-teal ring-teal/20",
  live: "bg-sage-soft text-sage ring-sage/30",
  paused: "bg-amber-soft text-amber ring-amber/30",
  blocked: "bg-clay-soft text-clay ring-clay/30",
  warning: "bg-amber-soft text-amber ring-amber/30",
};

const LABELS: Record<Status, string> = {
  draft: "Draft",
  tested: "Tested",
  ready: "Ready",
  live: "Live",
  paused: "Paused",
  blocked: "Blocked",
  warning: "Warning",
};

export function StatusChip({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        STYLES[status],
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "live" && "bg-sage animate-pulse",
          status === "ready" && "bg-teal",
          status === "tested" && "bg-indigo",
          status === "draft" && "bg-ink-soft",
          status === "paused" && "bg-amber",
          status === "blocked" && "bg-clay",
          status === "warning" && "bg-amber",
        )}
      />
      {LABELS[status]}
    </span>
  );
}

export function RiskChip({ level, className }: { level: "low" | "medium" | "elevated"; className?: string }) {
  const styles = {
    low: "bg-sage-soft text-sage ring-sage/30",
    medium: "bg-amber-soft text-amber ring-amber/30",
    elevated: "bg-clay-soft text-clay ring-clay/30",
  } as const;
  const labels = { low: "Low risk", medium: "Medium risk", elevated: "Elevated risk" } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        styles[level],
        className,
      )}
    >
      {labels[level]}
    </span>
  );
}
