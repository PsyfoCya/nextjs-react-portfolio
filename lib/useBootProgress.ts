"use client";

import { useEffect, useState } from "react";

/**
 * Short. A gate that outstays the work it is covering is just a delay, and a
 * three-second hold before a page that then keeps loading is the worst of both.
 */
const MIN_MS = 650;

/** A slow asset must never trap anyone behind the door. */
const MAX_MS = 3500;

/** Named so the boot screen can report what it is waiting on. */
export type BootStep = "fonts" | "imagery" | "geometry";

export interface BootState {
  progress: number;
  done: boolean;
  steps: Record<BootStep, boolean>;
}

/**
 * Waits for the things whose absence causes the page to pop in, and reports
 * how far along it is.
 *
 * The point is that this gates on real work rather than on a timer: fonts
 * settled, and the above-the-fold imagery actually *decoded* — not merely
 * fetched. `img.decode()` is what makes the difference, because a loaded image
 * still costs a synchronous decode on first paint, and that decode is the pop.
 */
export function useBootProgress(
  imageUrls: readonly string[],
  enabled = true
): BootState {
  const [steps, setSteps] = useState<Record<BootStep, boolean>>({
    fonts: false,
    imagery: false,
    geometry: false,
  });
  const [elapsed, setElapsed] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const mark = (step: BootStep) => {
      if (!cancelled) setSteps((prev) => ({ ...prev, [step]: true }));
    };

    const minTimer = setTimeout(() => !cancelled && setElapsed(true), MIN_MS);
    const maxTimer = setTimeout(() => !cancelled && setExpired(true), MAX_MS);

    // Fonts. A rejection here is not worth holding the door for.
    (document.fonts?.ready ?? Promise.resolve())
      .then(() => mark("fonts"))
      .catch(() => mark("fonts"));

    // Imagery — fetched *and* decoded.
    Promise.all(
      imageUrls.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => image.decode().then(resolve, () => resolve());
            image.onerror = () => resolve();
            image.src = src;
          })
      )
    ).then(() => mark("imagery"));

    // Layout settled: two frames after mount is enough for the first paint to
    // have happened and for the fonts to have applied.
    requestAnimationFrame(() => requestAnimationFrame(() => mark("geometry")));

    return () => {
      cancelled = true;
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [imageUrls, enabled]);

  const ready = steps.fonts && steps.imagery && steps.geometry;
  const done = expired || (ready && elapsed);

  const completed = Object.values(steps).filter(Boolean).length;
  const progress = done
    ? 100
    : Math.min(96, Math.round((completed / 3) * 88) + (elapsed ? 8 : 0));

  return { progress, done, steps };
}

export default useBootProgress;
