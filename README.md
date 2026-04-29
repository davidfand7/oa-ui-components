# oa-ui-components

> Battle-tested React components, hooks, and utilities extracted from 27 OpenAgentic projects.

Built with **Tailwind CSS**, **Radix UI**, **Lucide React**, and **shadcn/ui** conventions.

---

## 🤖 AI-Powered Component Advisor

This is the only component library on GitHub with a **built-in AI advisor** — powered by [OpenAgentic](https://openagentic.site).

Import the advisor agent into OpenAgentic and ask it anything:
- *"Which component should I use for a status indicator?"*
- *"Show me how to use ScoreGauge with the ring variant"*
- *"What's the difference between TourHint and FeatureDiscoveryBanner?"*

**How to import:**
1. Copy the contents of [`agent.json`](./agent.json) in this repo
2. Go to [OpenAgentic → Workflow Importer](https://openagentic.site/app/workflow-importer)
3. Select **"Description / JSON"**, paste, and click Import
4. Chat with your new Component Advisor agent

---

## Components

| Component | Category | Description |
|-----------|----------|-------------|
| `StatusChip` + `RiskChip` | UI | Semantic status badges (live/draft/ready/paused/blocked) with animated pulse dot |
| `EmptyState` | UI | Icon medallion + headline + optional CTA — 3 sizes |
| `NewBadge` | UI | Compact amber "NEW" pill — dark-mode aware |
| `ErrorBoundary` | UI | React class error boundary with "Try again" recovery UI |
| `ScoreGauge` | Data Display | SVG gauge in arc (270°) and animated ring (360°) variants |
| `SharedViewBanner` | Banners | Dismissible banner for filtered/deep-linked page views |
| `TourHint` + `FeatureDiscoveryBanner` | Banners | Role-aware, once-shown onboarding hints (localStorage-persisted) |

## Hooks

| Hook | Description |
|------|-------------|
| `useKeyboardShortcuts` | Generic shortcut registrar with meta/ctrl guard and input-focus bypass |
| `useLocalStorageState` | SSR-safe localStorage-backed `useState` |
| `useTourHint` | Tracks dismissed hint IDs + reads user role from localStorage |
| `useIsAdmin` | Cached Supabase admin role check (never re-queries on navigation) |

## Utils

| Utility | Description |
|---------|-------------|
| `cn()` | `clsx` + `tailwind-merge` className merger |
| `formatBytes()` | Byte count → human-readable string ("12.3 KB") |
| `toCSV / downloadFile / stamp()` | RFC 4180 CSV builder + browser download |
| `scoreTier / riskTextClass / riskBgClass…` | Score → risk tier → semantic Tailwind class helpers |
| `failureToast / progressToast` | Sonner toast wrappers with consistent copy patterns |

---

## Usage

```tsx
import { StatusChip, EmptyState, ScoreGauge } from "./index";
import { useKeyboardShortcuts, useLocalStorageState } from "./index";
import { cn, toCSV, downloadFile, stamp, failureToast } from "./index";
```

---

## Source

Extracted from [OpenAgentic](https://openagentic.site) — an open-source AI agent control plane.  
Found across 27 repos, scored for reusability (score 3 = drop-in, 2 = minor changes, 1 = domain-specific).  
Only score-3 components are included here.

MIT License.
