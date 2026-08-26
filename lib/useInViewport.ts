"use client";

import { useCallback, useEffect, useState } from "react";

interface Options {
  /** Grows the trigger area, so work can start just before it scrolls in. */
  rootMargin?: string;
  /** Latch on first entry and stop observing — for one-shot reveals. */
  once?: boolean;
}

interface InViewport<T extends Element> {
  /** Attach to the element to watch. */
  ref: (node: T | null) => void;
  /** The attached element, for callers that also need to drive it. */
  node: T | null;
  inView: boolean;
}

/**
 * Reports whether an element is currently on screen.
 *
 * Several things on this page should not run while nobody can see them — a
 * physics simulation, a carousel's autoplay, video playback.
 *
 * The element is held in state behind a callback ref rather than read out of a
 * `RefObject`. With a ref object the observer effect can only run on mount: if
 * the element is mounted conditionally — as the access card is, behind a media
 * query that resolves to `false` on the first render — the effect sees `null`,
 * bails, and never runs again, because the ref's identity never changes. The
 * card would sit on its skeleton forever. A callback ref fires when the node
 * actually attaches, so the observer starts then.
 */
export function useInViewport<T extends Element>({
  rootMargin = "0px",
  once = false,
}: Options = {}): InViewport<T> {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  const ref = useCallback((next: T | null) => setNode(next), []);

  useEffect(() => {
    if (!node) return;

    // Without IntersectionObserver, treat everything as visible: degrading to
    // "always on" matches the old behaviour rather than hiding content.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin, once]);

  return { ref, node, inView };
}

export default useInViewport;
