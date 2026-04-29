/**
 * COOKBOOK: The Empty / Loading / Error Pattern
 *
 * The most copy-pasted pattern in any data-driven React app.
 * Covers all three states a data fetch can be in.
 *
 * Copy this shell and swap in your icon, labels, and data component.
 */

import { Loader2, Package } from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";
import { Button } from "@/components/ui/button";

// ─── Usage ────────────────────────────────────────────────────────────────────

function AgentList({ agents, loading, error, onCreate }: {
  agents: { id: string; name: string }[];
  loading: boolean;
  error: Error | null;
  onCreate: () => void;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-ink-soft">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span className="text-sm">Loading…</span>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Package}
        title="Couldn't load agents"
        description={error.message}
        action={<Button variant="outline" onClick={() => window.location.reload()}>Try again</Button>}
      />
    );
  }

  if (agents.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No agents yet"
        description="Create your first agent to get started."
        action={<Button onClick={onCreate}>Create agent</Button>}
      />
    );
  }

  return (
    <ul className="space-y-2">
      {agents.map(agent => (
        <li key={agent.id} className="rounded-xl border border-border bg-card p-4">
          {agent.name}
        </li>
      ))}
    </ul>
  );
}

// ─── With ErrorBoundary wrapper (catches render errors too) ───────────────────

export function AgentListPage() {
  return (
    <ErrorBoundary>
      {/* AgentList handles data-fetch states; ErrorBoundary catches render crashes */}
      <AgentList agents={[]} loading={false} error={null} onCreate={() => {}} />
    </ErrorBoundary>
  );
}
