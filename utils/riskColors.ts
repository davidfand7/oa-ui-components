/**
 * riskColors — semantic risk-tier color helpers
 *
 * @description
 * Maps a 0–100 score to a risk tier and returns dark-mode-aware Tailwind
 * classes backed by semantic tokens (sage/amber/clay). Replaces raw color
 * literals (emerald-600/amber-600/red-600) scattered across components.
 *
 * @usage
 *   const tier = scoreTier(agent.readiness);         // "good" | "warn" | "bad"
 *   <span className={riskTextClass(tier)}>...</span>  // text-sage / text-amber / text-clay
 *   <div className={riskBgClass(tier)}>...</div>      // bg-sage / bg-amber / bg-clay
 *
 * @found-in openagenticv4, openagenticv3 (9 repos)
 * @reusability-score 3
 */

export type RiskTier = "good" | "warn" | "bad";

export function scoreTier(value: number, opts: { good?: number; warn?: number } = {}): RiskTier {
  const good = opts.good ?? 70;
  const warn = opts.warn ?? 40;
  if (value >= good) return "good";
  if (value >= warn) return "warn";
  return "bad";
}

export function riskTextClass(tier: RiskTier): string {
  switch (tier) {
    case "good": return "text-sage";
    case "warn": return "text-amber";
    case "bad":  return "text-clay";
  }
}

export function riskBgClass(tier: RiskTier): string {
  switch (tier) {
    case "good": return "bg-sage";
    case "warn": return "bg-amber";
    case "bad":  return "bg-clay";
  }
}

export function riskSoftBgClass(tier: RiskTier): string {
  switch (tier) {
    case "good": return "bg-sage-soft text-sage";
    case "warn": return "bg-amber-soft text-amber";
    case "bad":  return "bg-clay-soft text-clay";
  }
}

export function scoreTextClass(value: number, opts?: { good?: number; warn?: number }): string {
  return riskTextClass(scoreTier(value, opts));
}

export function scoreBgClass(value: number, opts?: { good?: number; warn?: number }): string {
  return riskBgClass(scoreTier(value, opts));
}
