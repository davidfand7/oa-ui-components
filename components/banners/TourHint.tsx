/**
 * TourHint — dismissible inline hint card for onboarding tours
 *
 * @description
 * Role-aware, one-time hint banner that persists "seen" state in localStorage.
 * Use it to surface contextual tips at the top of any page. Disappears
 * permanently once dismissed and never re-shows (per hint ID).
 *
 * Depends on useTourHint hook (included in oa-components/hooks/).
 *
 * @props
 * - id: string — unique hint ID (used as localStorage key)
 * - title: string
 * - body: string
 * - cta?: { label: string; to: string } — optional link button
 * - icon?: LucideIcon (default Lightbulb)
 * - showFor?: UserRole[] — restrict to specific roles; shows for all if omitted
 * - className?: extra Tailwind utilities
 *
 * Also exports FeatureDiscoveryBanner — a larger card variant with icon block.
 *
 * @found-in openagenticv4, openagenticv3 (9 repos)
 * @reusability-score 3
 */

import { X, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTourHint, type UserRole } from "@/hooks/useTourHint";

interface TourHintProps {
  id: string;
  title: string;
  body: string;
  cta?: { label: string; to: string };
  icon?: LucideIcon;
  showFor?: UserRole[];
  className?: string;
}

export function TourHint({
  id, title, body, cta, icon: Icon = Lightbulb, showFor, className,
}: TourHintProps) {
  const { role, isSeen, markSeen } = useTourHint();

  if (isSeen(id)) return null;
  if (showFor && role && !showFor.includes(role)) return null;

  return (
    <div className={cn(
      "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3",
      className,
    )}>
      <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">{body}</p>
        {cta && (
          <Link
            to={cta.to as never}
            className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 hover:underline"
          >
            {cta.label} →
          </Link>
        )}
      </div>
      <button
        onClick={() => markSeen(id)}
        className="shrink-0 p-1 rounded-md text-ink-soft hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Dismiss hint"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

interface FeatureDiscoveryBannerProps {
  id: string;
  title: string;
  body: string;
  cta?: { label: string; to: string };
  icon?: LucideIcon;
  showFor?: UserRole[];
  className?: string;
}

export function FeatureDiscoveryBanner({
  id, title, body, cta, icon: Icon = Sparkles, showFor, className,
}: FeatureDiscoveryBannerProps) {
  const { role, isSeen, markSeen } = useTourHint();

  if (isSeen(id)) return null;
  if (showFor && role && !showFor.includes(role)) return null;

  return (
    <div className={cn(
      "flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4 mb-6",
      className,
    )}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">{body}</p>
        {cta && (
          <Link
            to={cta.to as never}
            className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 hover:underline"
          >
            {cta.label} →
          </Link>
        )}
      </div>
      <button
        onClick={() => markSeen(id)}
        className="shrink-0 p-1.5 rounded-md text-ink-soft hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
