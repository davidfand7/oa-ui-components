/**
 * COOKBOOK: Keyboard Shortcuts Pattern
 *
 * Full implementation of a page-level keyboard shortcut system:
 * - useKeyboardShortcuts for the bindings
 * - A ShortcutCheatsheet modal (? key)
 * - Proper help UI showing all available shortcuts
 *
 * Copy the bindings array and add your own handlers.
 */

import { useState } from "react";
import { Keyboard, X } from "lucide-react";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { cn } from "../utils/cn";

// ─── Shortcut definitions ─────────────────────────────────────────────────────

const SHORTCUTS = [
  { keys: ["N"], description: "Create new item", section: "Actions" },
  { keys: ["F"], description: "Toggle filters", section: "Actions" },
  { keys: ["R"], description: "Refresh data", section: "Actions" },
  { keys: ["1", "2", "3"], description: "Switch tabs", section: "Navigation" },
  { keys: ["↑", "↓"], description: "Navigate list", section: "Navigation" },
  { keys: ["Enter"], description: "Open selected", section: "Navigation" },
  { keys: ["Esc"], description: "Close / cancel", section: "Navigation" },
  { keys: ["?"], description: "Show this help", section: "Help" },
];

// ─── Hook usage ───────────────────────────────────────────────────────────────

export function usePageShortcuts({
  onCreateNew,
  onToggleFilters,
  onRefresh,
  onTabChange,
}: {
  onCreateNew: () => void;
  onToggleFilters: () => void;
  onRefresh: () => void;
  onTabChange: (tab: string) => void;
}) {
  const [helpOpen, setHelpOpen] = useState(false);

  useKeyboardShortcuts(
    [
      { key: "n",           handler: onCreateNew },
      { key: "f",           handler: onToggleFilters },
      { key: "r",           handler: onRefresh },
      { key: ["1", "2", "3"], handler: (k) => onTabChange(k) },
      { key: "?",           handler: () => setHelpOpen((v) => !v) },
    ],
    { deps: [onCreateNew, onToggleFilters, onRefresh, onTabChange] },
  );

  return { helpOpen, setHelpOpen };
}

// ─── Cheatsheet modal ─────────────────────────────────────────────────────────

export function ShortcutCheatsheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const sections = Array.from(new Set(SHORTCUTS.map((s) => s.section)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Keyboard shortcuts</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-soft hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-border">
          {sections.map((section) => (
            <div key={section} className="px-5 py-3">
              <div className="text-[11px] font-medium uppercase tracking-wider text-ink-soft mb-2">
                {section}
              </div>
              <div className="space-y-1.5">
                {SHORTCUTS.filter((s) => s.section === section).map((shortcut) => (
                  <div key={shortcut.description} className="flex items-center justify-between gap-4">
                    <span className="text-xs text-ink-soft">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key) => (
                        <kbd
                          key={key}
                          className="inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground min-w-[20px]"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border px-5 py-3 text-[11px] text-ink-soft text-center">
          Press <kbd className="rounded border border-border px-1 font-mono text-[10px]">?</kbd> anytime to toggle this
        </div>
      </div>
    </div>
  );
}

// ─── Full page example ────────────────────────────────────────────────────────

export function PageWithShortcuts() {
  const [createOpen, setCreateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const { helpOpen, setHelpOpen } = usePageShortcuts({
    onCreateNew: () => setCreateOpen(true),
    onToggleFilters: () => setFilterOpen((v) => !v),
    onRefresh: () => window.location.reload(),
    onTabChange: setActiveTab,
  });

  return (
    <>
      <ShortcutCheatsheet open={helpOpen} onClose={() => setHelpOpen(false)} />
      {/* page content */}
    </>
  );
}
