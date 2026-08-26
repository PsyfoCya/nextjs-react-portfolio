"use client";

import { RefObject, useEffect, useState } from "react";

interface Options {
  /** Grows the trigger area, so work can start just before it scrolls in. */
  rootMargin?: string;
  /** Latch on first entry and stop observing — for one-shot reveals. */
  once?: boolean;
}

/**
 * Reports whether an element is currently on screen.
 *
 * The page has several things that should not run while nobody can see them —
 * a physics simulation, a carousel's autoplay, video playback. Each of them
 * previously ran from mount until unmount regardless.
 */
export function useInViewport<T extends Element>(
  ref: RefObject<T>,
  { rootMargin = "0px", once = false }: Options = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}

export default useInViewport;
