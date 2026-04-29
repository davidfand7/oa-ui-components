/**
 * EmptyState — "no data yet" placeholder with icon medallion + optional CTA
 *
 * @description
 * Generic empty-state component used on any page that can have zero items.
 * Renders a soft-tinted icon medallion above a headline, supporting copy,
 * and an optional call-to-action. Pure presentation — no business logic.
 *
 * @props
 * - icon: LucideIcon — rendered in the medallion
 * - title: string — short headline
 * - description?: string — supporting copy
 * - action?: ReactNode — CTA button/link rendered below copy
 * - size?: "sm" | "md" | "lg" (default "md")
 * - className?: extra Tailwind utilities
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app, agentic-studio (8 repos)
 * @reusability-score 3
 */

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md",
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const pad = size === "sm" ? "py-8" : size === "lg" ? "py-20" : "py-14";
  const medallion = size === "sm" ? "h-12 w-12" : size === "lg" ? "h-20 w-20" : "h-16 w-16";
  const iconSize = size === "sm" ? "h-5 w-5" : size === "lg" ? "h-9 w-9" : "h-7 w-7";

  return (
    <div className={cn("flex flex-col items-center justify-center text-center px-6", pad, className)}>
      <div
        className={cn(
          "relative mb-4 inline-flex items-center justify-center rounded-full bg-muted/60 ring-1 ring-border/60",
          medallion,
        )}
      >
        <span className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" aria-hidden />
        <Icon className={cn("relative text-ink-soft", iconSize)} aria-hidden />
      </div>
      <div className="text-base font-semibold tracking-tight">{title}</div>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-ink-soft leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
