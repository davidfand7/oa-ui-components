/**
 * toast — sonner toast convention helpers
 *
 * @description
 * Project-wide toast wrappers that enforce consistent copy patterns:
 *   toast.success  → action completed
 *   toast.error    → action failed
 *   toast.warning  → partial success / caveat
 *   toast.message  → neutral status hint
 *   toast.loading  → in-flight (always paired with success/error on same id)
 *
 * Exports failureToast() for consistent error formatting and
 * progressToast() for loading→success/error in-place toast updates.
 *
 * @requires sonner
 *
 * @found-in openagenticv4, openagenticv3, openagenticv4-app (11 repos)
 * @reusability-score 3
 */

import { toast } from "sonner";

export function failureToast(action: string, err: unknown, opts?: { id?: string }) {
  const description =
    err instanceof Error ? err.message : typeof err === "string" ? err : undefined;
  return toast.error(`Could not ${action}`, { description, id: opts?.id });
}

export function progressToast<T>(
  promise: Promise<T>,
  copy: {
    loading: string;
    success: string | ((value: T) => string);
    error?: string;
  },
  id?: string,
) {
  return toast.promise(promise, {
    loading: copy.loading,
    success: copy.success,
    error: (err) => copy.error ?? (err instanceof Error ? err.message : "Action failed"),
    id,
  });
}

export { toast };
