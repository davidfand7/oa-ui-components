/**
 * NewBadge — compact "NEW" / custom label pill for newly-shipped features
 *
 * @description
 * Replaces duplicated amber pill literals across 12+ call sites with a single
 * dark-mode-aware token. Use it inline next to nav labels or feature headings.
 *
 * @props
 * - size?: "xs" | "sm" (default "sm") — xs for inline labels, sm for body chips
 * - label?: string (default "new") — override the badge text
 * - className?: extra Tailwind utilities (e.g. "ml-auto")
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (11 repos)
 * @reusability-score 3
 */

import { cn } from "@/lib/utils";

interface NewBadgeProps {
  size?: "xs" | "sm";
  className?: string;
  label?: string;
}

export function NewBadge({ size = "sm", className, label = "new" }: NewBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full bg-amber text-background dark:text-foreground font-bold uppercase leading-none",
        size === "xs" ? "text-[8px] px-1 py-px" : "text-[9px] px-1.5 py-0.5 tracking-wide",
        className,
      )}
    >
      {label}
    </span>
  );
}
