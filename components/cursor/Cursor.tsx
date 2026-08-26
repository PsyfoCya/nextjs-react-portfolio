"use client";

import { useEffect, useRef } from "react";

interface CursorProps {
  /** Any CSS colour. Used for the dot's fill and the ring's border. */
  color?: string;
}

/** What counts as interactive, and therefore swells the ring. */
const CLICKABLE = "a, button, select, input, textarea, [role='button'], .link";

/** How far the ring lags the dot. Higher is looser. */
const TRAILING = 6;

const INNER_SIZE = 8;
const OUTER_SIZE = 34;

/**
 * The custom pointer.
 *
 * Replaces `react-animated-cursor`, which was the single most expensive thing
 * on the page. That library kept `isActive` in its effect's dependency array
 * while flipping `isActive` on `mouseover`/`mouseout` of any clickable, so the
 * whole effect tore down and re-ran on every hover — re-running
 * `document.querySelectorAll` across ~100 nodes and attaching five listeners
 * to each. Its cleanup passed freshly allocated anonymous functions to
 * `removeEventListener`, so none of them were ever removed: listeners
 * accumulated without bound and every later hover fired all the stale
 * duplicates. It also wrote `top`/`left` in a rAF loop that never stopped,
 * forcing layout every frame even with the pointer parked.
 *
 * This version:
 *  - attaches exactly three listeners, to the document, for its lifetime;
 *  - decides hover with `closest()` on the event target rather than by
 *    subscribing to every interactive node;
 *  - writes only `transform`, so the compositor handles it and layout is
 *    never invalidated;
 *  - holds no React state, so pointer movement never triggers a render;
 *  - parks its rAF loop once the ring has caught up, so an idle pointer
 *    costs nothing.
 */
const Cursor = ({ color = "red" }: CursorProps) => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A coarse pointer has no cursor to replace, and drawing one there just
    // leaves a stray dot where the last tap landed.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    let scale = 1;
    let targetScale = 1;
    let frame: number | null = null;
    let visible = false;

    const draw = () => {
      eased.x += (target.x - eased.x) / TRAILING;
      eased.y += (target.y - eased.y) / TRAILING;
      scale += (targetScale - scale) / 4;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      // Park the loop once the ring has settled; a stationary pointer should
      // not keep the compositor awake.
      const settled =
        Math.abs(target.x - eased.x) < 0.1 &&
        Math.abs(target.y - eased.y) < 0.1 &&
        Math.abs(targetScale - scale) < 0.01;

      frame = settled ? null : requestAnimationFrame(draw);
    };

    const wake = () => {
      if (frame === null) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        visible = true;
        dot.current?.style.setProperty("opacity", "1");
        ring.current?.style.setProperty("opacity", "1");
      }

      // One `closest` call on the event's own target, rather than listeners on
      // every interactive element in the document.
      const over = (event.target as Element | null)?.closest?.(CLICKABLE);
      targetScale = over ? 2 : 1;

      wake();
    };

    const onLeave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      ring.current?.style.setProperty("opacity", "0");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ring}
        className="fixed left-0 top-0 rounded-full opacity-0 transition-opacity duration-200 will-change-transform"
        style={{
          width: OUTER_SIZE,
          height: OUTER_SIZE,
          border: `1px solid ${color}`,
        }}
      />
      <div
        ref={dot}
        className="fixed left-0 top-0 rounded-full opacity-0 transition-opacity duration-200 will-change-transform"
        style={{
          width: INNER_SIZE,
          height: INNER_SIZE,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default Cursor;
