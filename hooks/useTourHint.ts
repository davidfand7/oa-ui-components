/**
 * useTourHint — localStorage-backed "seen" state for onboarding hints
 *
 * @description
 * Tracks which tour hint IDs have been dismissed, persisted to localStorage
 * per-session. Also reads the user's self-selected role so hints can be
 * targeted to specific roles (operator / developer / manager / explorer).
 *
 * Used by TourHint and FeatureDiscoveryBanner components.
 *
 * @returns { role, isSeen, markSeen }
 * - role: UserRole | null — user's selected role from localStorage
 * - isSeen(id): boolean — whether this hint has been dismissed
 * - markSeen(id): void — mark a hint as dismissed
 *
 * @found-in openagenticv4, openagenticv3 (9 repos)
 * @reusability-score 3
 */

import { useState, useCallback } from "react";
import { useAuth } from "@/lib/auth";

export type UserRole = "operator" | "developer" | "manager" | "explorer";

const SEEN_KEY = "oa.tour.seen";
const roleKey = (uid: string) => `oa.onboarding.role.${uid}`;

function readRole(uid: string): UserRole | null {
  if (typeof window === "undefined") return null;
  try { return (localStorage.getItem(roleKey(uid)) as UserRole) || null; }
  catch { return null; }
}

function readSeen(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const arr = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]") as string[];
    return new Set(arr);
  } catch { return new Set(); }
}

export function useTourHint() {
  const { user } = useAuth();
  const role = user ? readRole(user.id) : null;

  const [seenSet, setSeenSet] = useState<Set<string>>(readSeen);

  const isSeen = useCallback((id: string) => seenSet.has(id), [seenSet]);

  const markSeen = useCallback((id: string) => {
    setSeenSet((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem(SEEN_KEY, JSON.stringify([...next])); }
      catch { /* ignore */ }
      return next;
    });
  }, []);

  return { role, isSeen, markSeen };
}
