/**
 * useIsAdmin — cached Supabase admin role check
 *
 * @description
 * Returns true if the current user has the "admin" role in the user_roles
 * table. Module-level cache (keyed by uid) means navigating between admin
 * pages doesn't refire the query on every mount. Returns false (never null)
 * so callers can gate UI without handling tri-state.
 *
 * Requires: Supabase client, useAuth hook, user_roles table with (user_id, role) columns.
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (11 repos)
 * @reusability-score 3
 */

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

const cache = new Map<string, boolean>();

export function useIsAdmin(): boolean {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(
    user ? (cache.get(user.id) ?? false) : false,
  );

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    const cached = cache.get(user.id);
    if (cached !== undefined) {
      setIsAdmin(cached);
      return;
    }
    let cancelled = false;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        const result = !!data;
        cache.set(user.id, result);
        if (!cancelled) setIsAdmin(result);
      });
    return () => { cancelled = true; };
  }, [user]);

  return isAdmin;
}
