/**
 * cn — className merger (clsx + tailwind-merge)
 *
 * @description
 * Merges Tailwind class strings, resolving conflicts correctly
 * (e.g. "px-2 px-4" → "px-4"). The standard utility used across
 * all OpenAgentic projects.
 *
 * @requires clsx, tailwind-merge
 *
 * @found-in all 27 repos
 * @reusability-score 3
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
