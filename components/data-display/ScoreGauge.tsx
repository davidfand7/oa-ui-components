/**
 * ScoreGauge — animated SVG arc/ring gauge for 0–100 scores
 *
 * @description
 * Two visual variants:
 * - "arc"  → 270° arc with center number (agent detail, readiness scores)
 * - "ring" → full 360° ring with center label/verdict, framer-motion animated
 *
 * Color tiers use semantic tokens (sage/amber/clay) for dark-mode compatibility.
 * Pass tierMode="grade" for a 5-stop scale (85/70/55/40 thresholds) or
 * tierMode="verdict" for a 3-stop scale (90/70 thresholds).
 *
 * @props
 * - score: number (0–100, clamped)
 * - variant?: "arc" | "ring" (default "arc")
 * - size?: number — SVG pixel size
 * - stroke?: number — stroke width
 * - tierMode?: "grade" | "verdict" (default "grade")
 * - verdict?: string — label under score in ring variant
 * - hasData?: boolean — false shows dashed placeholder + "—"
 * - className?: extra Tailwind utilities
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (11 repos)
 * @reusability-score 3
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TierMode = "grade" | "verdict";

interface ScoreGaugeProps {
  score: number;
  variant?: "arc" | "ring";
  size?: number;
  stroke?: number;
  tierMode?: TierMode;
  verdict?: string;
  hasData?: boolean;
  className?: string;
}

function pickTier(score: number, mode: TierMode) {
  if (mode === "verdict") {
    if (score >= 90) return { className: "text-sage", strokeClass: "stroke-sage" };
    if (score >= 70) return { className: "text-amber", strokeClass: "stroke-amber" };
    if (score > 0)  return { className: "text-clay",  strokeClass: "stroke-clay"  };
    return { className: "text-ink-soft", strokeClass: "stroke-ink-soft" };
  }
  if (score >= 85) return { className: "text-sage",       strokeClass: "stroke-sage"       };
  if (score >= 70) return { className: "text-teal-500",   strokeClass: "stroke-teal-500"   };
  if (score >= 55) return { className: "text-amber",      strokeClass: "stroke-amber"      };
  if (score >= 40) return { className: "text-orange-500", strokeClass: "stroke-orange-500" };
  return { className: "text-clay", strokeClass: "stroke-clay" };
}

export function ScoreGauge({
  score,
  variant = "arc",
  size,
  stroke,
  tierMode = "grade",
  verdict,
  hasData = true,
  className,
}: ScoreGaugeProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const tier = pickTier(clamped, tierMode);

  if (variant === "arc") {
    const sw = stroke ?? 6;
    const radius = 32;
    const sz = size ?? (radius + sw) * 2;
    const c = radius;
    const arcSpan = 270;
    const startAngle = 135;
    const circumference = 2 * Math.PI * radius;
    const arcLength = (arcSpan / 360) * circumference;
    const filled = (clamped / 100) * arcLength;
    return (
      <svg
        width={sz} height={sz}
        viewBox={`0 0 ${(radius + sw) * 2} ${(radius + sw) * 2}`}
        className={cn("shrink-0", className)}
        role="img"
        aria-label={`Score ${clamped} out of 100`}
      >
        <g transform={`rotate(${startAngle} ${c + sw} ${c + sw})`}>
          <circle cx={c + sw} cy={c + sw} r={radius} fill="none"
            className="stroke-muted" strokeWidth={sw} strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`} />
          <circle cx={c + sw} cy={c + sw} r={radius} fill="none"
            className={tier.strokeClass} strokeWidth={sw} strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            style={{ transition: "stroke-dasharray 600ms ease-out" }} />
        </g>
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
          className="fill-foreground font-semibold tabular-nums" style={{ fontSize: 18 }}>
          {clamped}
        </text>
      </svg>
    );
  }

  const sw = stroke ?? 10;
  const sz = size ?? 140;
  const radius = (sz - sw) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("relative flex-shrink-0", className)} style={{ width: sz, height: sz }}>
      <svg width={sz} height={sz} className="-rotate-90" aria-hidden="true">
        <circle cx={sz / 2} cy={sz / 2} r={radius} fill="none" strokeWidth={sw}
          className="text-muted" stroke="currentColor"
          strokeDasharray={hasData ? undefined : "4 6"} />
        {hasData && (
          <motion.circle
            cx={sz / 2} cy={sz / 2} r={radius} fill="none"
            strokeWidth={sw} strokeLinecap="round"
            className={tier.className} stroke="currentColor"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"
        role="img"
        aria-label={hasData ? `Score ${clamped} out of 100${verdict ? `: ${verdict}` : ""}` : "Untested"}>
        <div className="text-3xl font-semibold tracking-tight leading-none">
          {hasData ? clamped : "—"}
          {hasData && <span className="text-sm text-ink-soft font-normal">/100</span>}
        </div>
        {verdict && (
          <div className={cn("mt-1 text-[11px] uppercase tracking-wide font-semibold", tier.className)}>
            {verdict}
          </div>
        )}
      </div>
    </div>
  );
}
