# oa-ui-components

> Not just a component library — a React developer toolkit with built-in AI agents.

Battle-tested components, hooks, and utilities extracted from 27 OpenAgentic projects, plus **9 AI agents** you can import into [OpenAgentic](https://openagentic.site) to supercharge your React development workflow.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Powered by OpenAgentic](https://img.shields.io/badge/AI%20agents-OpenAgentic-7c3aed)](https://openagentic.site)

---

## 🤖 9 Built-In AI Agents

The only component library on GitHub with a full AI development toolkit included. Import any agent into [OpenAgentic](https://openagentic.site/app/workflow-importer) in seconds.

| Agent | File | What it does |
|-------|------|-------------|
| **Component Advisor** | [`agents/component-advisor.json`](./agents/component-advisor.json) | "Which component should I use for X?" — knows every prop and pattern |
| **Code Reviewer** | [`agents/code-reviewer.json`](./agents/code-reviewer.json) | Reviews React components for quality, Tailwind patterns, and a11y |
| **Component Generator** | [`agents/component-generator.json`](./agents/component-generator.json) | Describe a UI element → get production-ready TypeScript code |
| **Design System Auditor** | [`agents/design-system-auditor.json`](./agents/design-system-auditor.json) | Finds hardcoded colors, dark mode gaps, and missing empty states |
| **Migration Helper** | [`agents/migration-helper.json`](./agents/migration-helper.json) | Identifies where in your codebase to adopt oa-ui-components |
| **Accessibility Auditor** | [`agents/accessibility-auditor.json`](./agents/accessibility-auditor.json) | WCAG 2.1 AA audit with precise, copy-pasteable fixes |
| **Test Writer** | [`agents/test-writer.json`](./agents/test-writer.json) | Generates React Testing Library test suites |
| **Storybook Writer** | [`agents/storybook-writer.json`](./agents/storybook-writer.json) | Generates CSF3 Storybook stories for any component |
| **Tailwind Optimizer** | [`agents/tailwind-optimizer.json`](./agents/tailwind-optimizer.json) | Finds class conflicts, verbose patterns, and dark mode violations |

**How to import any agent:**
1. Open the JSON file above and copy its contents
2. Go to [OpenAgentic → Workflow Importer](https://openagentic.site/app/workflow-importer)
3. Select **"Description / JSON"**, paste, click Import
4. Chat with your agent

---

## Components

| Component | Category | Description |
|-----------|----------|-------------|
| [`StatusChip`](./components/ui/StatusChip.tsx) + `RiskChip` | UI | Semantic status badges (live/draft/ready/paused/blocked) with animated pulse dot |
| [`EmptyState`](./components/ui/EmptyState.tsx) | UI | Icon medallion + headline + optional CTA — 3 sizes |
| [`NewBadge`](./components/ui/NewBadge.tsx) | UI | Compact amber "NEW" pill — dark-mode aware |
| [`ErrorBoundary`](./components/ui/ErrorBoundary.tsx) | UI | React class error boundary with "Try again" recovery UI |
| [`ScoreGauge`](./components/data-display/ScoreGauge.tsx) | Data Display | SVG gauge in arc (270°) and animated ring (360°) variants |
| [`SharedViewBanner`](./components/banners/SharedViewBanner.tsx) | Banners | Dismissible banner for filtered/deep-linked page views |
| [`TourHint`](./components/banners/TourHint.tsx) + `FeatureDiscoveryBanner` | Banners | Role-aware, once-shown onboarding hints (localStorage-persisted) |

## Hooks

| Hook | Description |
|------|-------------|
| [`useKeyboardShortcuts`](./hooks/useKeyboardShortcuts.ts) | Generic shortcut registrar with meta/ctrl guard and input-focus bypass |
| [`useLocalStorageState`](./hooks/useLocalStorageState.ts) | SSR-safe localStorage-backed `useState` |
| [`useTourHint`](./hooks/useTourHint.ts) | Tracks dismissed hint IDs + reads user role from localStorage |
| [`useIsAdmin`](./hooks/useIsAdmin.ts) | Cached Supabase admin role check (never re-queries on navigation) |

## Utils

| Utility | Description |
|---------|-------------|
| [`cn()`](./utils/cn.ts) | `clsx` + `tailwind-merge` className merger |
| [`formatBytes()`](./utils/formatBytes.ts) | Byte count → human-readable string ("12.3 KB") |
| [`toCSV / downloadFile / stamp()`](./utils/csv.ts) | RFC 4180 CSV builder + browser download |
| [`scoreTier / riskTextClass / riskBgClass…`](./utils/riskColors.ts) | Score → risk tier → semantic Tailwind class helpers |
| [`failureToast / progressToast`](./utils/toast.ts) | Sonner toast wrappers with consistent copy patterns |

---

## Cookbook

Ready-to-copy patterns that combine multiple components for common use cases:

| Pattern | File | Components used |
|---------|------|----------------|
| [Empty / Loading / Error](./cookbook/empty-state-pattern.tsx) | `empty-state-pattern.tsx` | EmptyState, ErrorBoundary |
| [Status Dashboard Card](./cookbook/status-dashboard-pattern.tsx) | `status-dashboard-pattern.tsx` | StatusChip, ScoreGauge, RiskChip, riskColors |
| [Progressive Onboarding](./cookbook/onboarding-pattern.tsx) | `onboarding-pattern.tsx` | TourHint, FeatureDiscoveryBanner, NewBadge |
| [Keyboard Shortcuts + Cheatsheet](./cookbook/keyboard-shortcuts-pattern.tsx) | `keyboard-shortcuts-pattern.tsx` | useKeyboardShortcuts |

---

## Install

```bash
npm install oa-ui-components
```

Or copy individual files directly — no build step required.

```tsx
// Barrel import
import { StatusChip, EmptyState, ScoreGauge } from "oa-ui-components";
import { useKeyboardShortcuts, useLocalStorageState } from "oa-ui-components";
import { cn, toCSV, downloadFile, stamp, failureToast } from "oa-ui-components";
```

**Peer dependencies:**
```bash
npm install react react-dom lucide-react framer-motion sonner clsx tailwind-merge
```

---

## Design System

All components use semantic color tokens that are dark-mode aware. Never hardcode Tailwind colors:

| Semantic | Use for | Tailwind token |
|----------|---------|----------------|
| Positive / success | Live status, high scores | `text-sage` `bg-sage` `bg-sage-soft` |
| Warning | Paused, medium risk | `text-amber` `bg-amber` `bg-amber-soft` |
| Error / danger | Blocked, low scores | `text-clay` `bg-clay` `bg-clay-soft` |
| Info / accent | Tested, info banners | `text-indigo` `bg-indigo` `bg-indigo-soft` |
| Muted text | Labels, descriptions | `text-ink-soft` |
| Background | Cards, surfaces | `bg-background` `bg-card` `bg-muted` |
| Border | Dividers, rings | `border-border` |

---

## GitHub Actions

This repo includes an [AI PR review workflow](./.github/workflows/pr-review.yml) that posts an OpenAgentic review prompt on every component PR. Zero setup — just works on forks too.

---

## Source

Extracted from [OpenAgentic](https://openagentic.site) — an open-source AI agent control plane for building, testing, and deploying AI agents.  
Found across 27 repos, scored for reusability. Only score-3 components included.

MIT License · Built by [David Anderson](https://github.com/davidfand7)
