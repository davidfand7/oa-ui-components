/**
 * useKeyboardShortcuts — generic keyboard shortcut registrar
 *
 * @description
 * Registers one or more keyboard shortcuts with a single useEffect. Handles
 * the meta/ctrl/alt guard (never clobbers browser shortcuts), optional input
 * focus bypass, and multi-key bindings. Replaces the duplicated event listener
 * pattern that existed in 13+ pages.
 *
 * @usage
 *   useKeyboardShortcuts([
 *     { key: "f", handler: () => setFilterOpen(v => !v) },
 *     { key: ["1","2","3"], handler: (k) => setTab(k) },
 *     { key: "?", handler: () => setHelpOpen(v => !v) },
 *   ], { deps: [setFilterOpen] });
 *
 * Always calls event.preventDefault() for matched keys.
 * Modifier keys (cmd/ctrl/alt) are never matched.
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (13 repos)
 * @reusability-score 3
 */

import { useEffect } from "react";

export type ShortcutBinding = {
  key: string | string[];
  handler: (key: string, event: KeyboardEvent) => void;
};

type Options = {
  ignoreInputs?: boolean;
  deps?: React.DependencyList;
};

export function useKeyboardShortcuts(
  bindings: ShortcutBinding[],
  { ignoreInputs = true, deps = [] }: Options = {},
) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (ignoreInputs) {
        const t = event.target as HTMLElement | null;
        if (
          t &&
          (t.tagName === "INPUT" ||
            t.tagName === "TEXTAREA" ||
            t.tagName === "SELECT" ||
            t.isContentEditable)
        ) {
          return;
        }
      }
      const raw = event.key.toLowerCase();
      const normalized = raw === "/" && event.shiftKey ? "?" : raw;
      for (const b of bindings) {
        const keys = Array.isArray(b.key)
          ? b.key.map((k) => k.toLowerCase())
          : [b.key.toLowerCase()];
        if (keys.includes(normalized)) {
          event.preventDefault();
          b.handler(normalized, event);
          return;
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
