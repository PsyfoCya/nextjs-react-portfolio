"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const KEY_PREFIX = "portfolio:scroll:";

/** Roughly a second at 60fps before we accept wherever the restore landed. */
const MAX_RESTORE_FRAMES = 60;

/** Deliberate input means the reader has taken over; stop repositioning them. */
const TAKEOVER_EVENTS = ["wheel", "touchstart", "keydown"] as const;

/**
 * Remembers how far down each route was scrolled and puts you back there.
 *
 * The App Router scrolls to the top on every push navigation, so leaving the
 * home page for a case study and coming back via the "Back to home" link would
 * otherwise dump you at the headline again. We record the offset per pathname
 * in sessionStorage — session-scoped, so a brand new tab still starts at the
 * top — and re-apply it once the route has mounted.
 *
 * Restoring is a loop rather than a single scrollTo because the page grows
 * after mount: fonts swap, images decode, and the 3D canvas mounts. Until the
 * document is tall enough to reach the saved offset, scrolling there is a
 * no-op, so we keep re-applying it for a short window.
 */
const ScrollMemory = () => {
  const pathname = usePathname();

  useEffect(() => {
    const key = KEY_PREFIX + pathname;

    // Private-mode and blocked-storage browsers throw on access; scroll memory
    // is a nicety, so degrade to "no memory" rather than breaking the page.
    const read = (): number => {
      try {
        return Number(sessionStorage.getItem(key) ?? "0");
      } catch {
        return 0;
      }
    };
    const write = (value: number): void => {
      try {
        sessionStorage.setItem(key, String(value));
      } catch {
        /* nothing we can do, and nothing worth breaking over */
      }
    };

    const cleanups: Array<() => void> = [];
    const saved = read();

    // An explicit anchor in the URL should always win over a remembered offset.
    if (saved > 0 && !window.location.hash) {
      let restoring = true;
      let frames = 0;

      const stopRestoring = () => {
        restoring = false;
      };

      const restore = () => {
        if (!restoring) return;

        const furthest = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          0
        );
        window.scrollTo(0, Math.min(saved, furthest));

        // Still too short to reach the offset — wait for more content.
        if (furthest < saved && frames < MAX_RESTORE_FRAMES) {
          frames += 1;
          requestAnimationFrame(restore);
        } else {
          restoring = false;
        }
      };

      TAKEOVER_EVENTS.forEach((event) =>
        window.addEventListener(event, stopRestoring, {
          passive: true,
          once: true,
        })
      );
      cleanups.push(() => {
        restoring = false;
        TAKEOVER_EVENTS.forEach((event) =>
          window.removeEventListener(event, stopRestoring)
        );
      });

      requestAnimationFrame(restore);
    }

    /*
      Debounced, not coalesced into a frame. `sessionStorage.setItem` is a
      synchronous, disk-backed, main-thread call, and the previous rAF version
      made roughly sixty of them a second for the whole duration of any scroll.
      Where you left off does not need that resolution.
    */
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        write(window.scrollY);
      }, 150);
    };

    // A tab closed or backgrounded mid-scroll would otherwise lose the last
    // 150ms of movement.
    const onHide = () => {
      if (document.visibilityState === "hidden") write(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    cleanups.push(() => {
      if (timer !== null) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
};

export default ScrollMemory;
