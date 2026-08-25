import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** An in-page anchor, as opposed to a route we should navigate to. */
export const isHashLink = (href: string) => href.startsWith("#");

/**
 * Smooth-scrolls to an in-page anchor. Returns false when the target isn't in
 * the document, so callers can fall back to normal navigation.
 */
export function scrollToHash(href: string): boolean {
  const target = document.querySelector(href);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth" });
  return true;
}
