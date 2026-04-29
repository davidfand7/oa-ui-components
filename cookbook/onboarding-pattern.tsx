/**
 * COOKBOOK: Progressive Onboarding Pattern
 *
 * Combines TourHint + FeatureDiscoveryBanner + NewBadge to build
 * a layered onboarding experience that guides users without
 * interrupting their flow.
 *
 * Three tiers:
 * 1. NewBadge — passive label on nav items (always visible until dismissed)
 * 2. TourHint — inline contextual hint on the relevant page (once per user)
 * 3. FeatureDiscoveryBanner — prominent full-width card for major features (once per user)
 */

import { NewBadge } from "../components/ui/NewBadge";
import { TourHint, FeatureDiscoveryBanner } from "../components/banners/TourHint";
import { Calendar, Wallet, Zap } from "lucide-react";

// ─── Tier 1: Nav badge (sidebar item) ────────────────────────────────────────

export function SchedulerNavItem() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted">
      <Calendar className="h-4 w-4" />
      <span className="text-sm">Scheduler</span>
      <NewBadge className="ml-auto" />
    </div>
  );
}

// ─── Tier 2: Inline contextual hint (on the Scheduler page) ──────────────────

export function SchedulerPageHint() {
  return (
    <TourHint
      id="scheduler-pg-cron"
      title="Enable always-on scheduling"
      body="Run the SQL snippet below in your Supabase SQL Editor to activate pg_cron. Your agents will run on schedule even when nobody's logged in."
      cta={{ label: "View setup guide", to: "/app/docs/scheduler" }}
      icon={Calendar}
      showFor={["operator", "developer"]}
    />
  );
}

// ─── Tier 3: Full-width discovery banner (on first visit to Earn section) ────

export function WalletDiscoveryBanner() {
  return (
    <FeatureDiscoveryBanner
      id="wallet-stripe-connect"
      title="Start earning from your agents"
      body="Connect Stripe to receive payouts when other users run your published agents. Takes 2 minutes to set up."
      cta={{ label: "Connect Stripe", to: "/app/wallet" }}
      icon={Wallet}
    />
  );
}

// ─── Full page example — how all three tiers layer together ──────────────────

export function WorkflowWizardPage() {
  return (
    <div className="space-y-4">
      {/* Tier 3 banner fires once, then disappears forever */}
      <FeatureDiscoveryBanner
        id="workflow-wizard-intro"
        title="Build multi-agent workflows in minutes"
        body="Describe your workflow in plain English — the Wizard breaks it into agents, assigns tools, and wires up the pipeline automatically."
        cta={{ label: "Try a template", to: "/app/templates" }}
        icon={Zap}
      />

      {/* Tier 2 hint fires once after the user starts building */}
      <TourHint
        id="workflow-wizard-tip-testing"
        title="Test before you deploy"
        body="Use Test Lab to run your workflow against sample data. Catch issues before they hit production."
        cta={{ label: "Open Test Lab", to: "/app/test-lab" }}
        showFor={["developer"]}
      />

      {/* Page content below */}
      <div className="rounded-xl border border-border bg-card p-6">
        {/* ... */}
      </div>
    </div>
  );
}
