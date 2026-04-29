/**
 * COOKBOOK: Status Dashboard Pattern
 *
 * Combines StatusChip + ScoreGauge + RiskChip into a standard
 * "agent health card" layout. Used across 11+ repos.
 *
 * Copy this as a starting point for any card that shows
 * status + score + risk together.
 */

import { StatusChip, RiskChip } from "../components/ui/StatusChip";
import { ScoreGauge } from "../components/data-display/ScoreGauge";
import { scoreTextClass } from "../utils/riskColors";
import { cn } from "../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentHealthCardProps {
  name: string;
  status: "draft" | "tested" | "ready" | "live" | "paused" | "blocked";
  readinessScore: number;   // 0–100
  riskLevel: "low" | "medium" | "elevated";
  lastRun?: string;         // ISO date string
  onClick?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AgentHealthCard({
  name,
  status,
  readinessScore,
  riskLevel,
  lastRun,
  onClick,
}: AgentHealthCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-border bg-card p-4",
        onClick && "cursor-pointer hover:bg-muted/40 transition-colors",
      )}
      onClick={onClick}
    >
      {/* Score gauge — compact arc variant */}
      <ScoreGauge score={readinessScore} size={60} stroke={5} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold truncate">{name}</span>
          <StatusChip status={status} />
        </div>
        <div className="flex items-center gap-3">
          <RiskChip level={riskLevel} />
          <span className={cn("text-xs font-semibold tabular-nums", scoreTextClass(readinessScore))}>
            {readinessScore}/100
          </span>
          {lastRun && (
            <span className="text-xs text-ink-soft">
              Last run {new Date(lastRun).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Usage ────────────────────────────────────────────────────────────────────

export function AgentDashboard() {
  const agents = [
    { id: "1", name: "Lead Enrichment Agent", status: "live" as const, readinessScore: 92, riskLevel: "low" as const },
    { id: "2", name: "Email Drafter", status: "ready" as const, readinessScore: 78, riskLevel: "medium" as const },
    { id: "3", name: "CRM Updater", status: "paused" as const, readinessScore: 45, riskLevel: "elevated" as const },
  ];

  return (
    <div className="space-y-3">
      {agents.map(agent => (
        <AgentHealthCard key={agent.id} {...agent} onClick={() => console.log(agent.id)} />
      ))}
    </div>
  );
}
