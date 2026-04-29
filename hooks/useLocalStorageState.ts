/**
 * useLocalStorageState — SSR-safe localStorage-backed useState
 *
 * @description
 * Drop-in replacement for useState that persists value to localStorage.
 * SSR-safe: reads from localStorage only in a useEffect after hydration
 * so server HTML matches the first client render (no hydration mismatch).
 * Handles malformed JSON and storage quota errors silently.
 *
 * @usage
 *   const [collapsed, setCollapsed] = useLocalStorageState("sidebar:collapsed", false);
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (11 repos)
 * @reusability-score 3
 */

import { useCallback, useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return;
      setValue(JSON.parse(raw) as T);
    } catch {
      /* malformed JSON — keep initial */
    }
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          } catch {
            /* quota / disabled — silently ignore */
          }
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, set];
}
