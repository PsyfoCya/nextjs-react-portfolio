"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useBootProgress, type BootStep } from "@/lib/useBootProgress";

/**
 * Images that appear in the first two screens. These are the ones whose
 * absence shows up as a pop, so these are the ones worth holding the door for.
 */
const CRITICAL_IMAGES = [
  "/assets/images/me/Psyfo.png",
  "/assets/gallery/me.jpg",
] as const;

const STEP_LABELS: Record<BootStep, string> = {
  fonts: "TYPEFACES",
  imagery: "IMAGERY",
  geometry: "GEOMETRY",
};

/** Shown once per tab. A door you have already walked through is just a wall. */
const SEEN_KEY = "portfolio:booted";

const COLS = 28;
const ROWS = 14;

/**
 * The boot screen.
 *
 * A Macrodata Refinement pastiche in the site's own colours rather than
 * Lumon's cyan-on-navy: the drifting field of digits and the clinical readout
 * are the part worth borrowing, but a door should look like it belongs to the
 * building.
 *
 * It overlays rather than replaces: the server-rendered page sits intact
 * underneath, so crawlers and the LCP measurement see the real content
 * regardless of what is painted on top.
 */
const Boot = () => {
  // `undefined` until we have checked storage, so the very first paint does
  // not flash the overlay at someone who has already seen it this session.
  const [active, setActive] = useState<boolean | undefined>(undefined);
  const [leaving, setLeaving] = useState(false);
  const reduced = useRef(false);

  // A stable reference. Passing `active ? images : []` here span the effect in
  // `useBootProgress` forever: a fresh array literal every render meant fresh
  // effect deps every render, which set state, which rendered again. It pegged
  // the CPU and took the tab with it.
  const { progress, done, steps } = useBootProgress(CRITICAL_IMAGES, active);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* private mode — treat as unseen, it is only a nicety */
    }
    setActive(!seen);
  }, []);

  // Hold the page still while the door is closed, so nothing scrolls behind it.
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  useEffect(() => {
    if (!active || !done) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing worth breaking over */
    }
    setLeaving(true);
    const timer = setTimeout(() => setActive(false), reduced.current ? 0 : 600);
    return () => clearTimeout(timer);
  }, [active, done]);

  // Unmounted entirely once it has gone, so nothing is left compositing.
  if (active !== true) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500"
      style={{
        backgroundColor: "#000000",
        color: "var(--signature-1)",
        opacity: leaving ? 0 : 1,
      }}
    >
      <DigitField animate={!reduced.current} />

      {/*
        The field runs edge to edge, so without this the digits read straight
        through the panel and nothing in it is legible.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 38% at 50% 50%, #000 0%, #000 55%, transparent 100%)",
        }}
      />

      <div className="relative flex w-full max-w-[30rem] flex-col gap-10 px-8">
        <div className="flex flex-col gap-2 text-center">
          <p
            className="font-oswald text-[clamp(1.6rem,6vw,2.6rem)] uppercase leading-none tracking-[0.34em]"
            style={{ textShadow: "0 0 22px rgb(113 121 239 / 0.5)" }}
          >
            Hadebe
          </p>
          <p className="font-pixel text-[0.7rem] uppercase tracking-[0.3em] opacity-60">
            Frontend Refinement
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="h-[3px] w-full overflow-hidden"
            style={{ backgroundColor: "rgb(113 121 239 / 0.16)" }}
          >
            <div
              className="h-full transition-[width] duration-500 ease-out"
              style={{
                width: `${progress}%`,
                backgroundImage: "var(--signature-gradient)",
                boxShadow: "0 0 14px rgb(113 121 239 / 0.6)",
              }}
            />
          </div>
          <div className="flex justify-between font-pixel text-[0.72rem] uppercase tracking-[0.2em]">
            <span>Initialising workspace</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2 font-pixel text-[0.72rem] uppercase tracking-[0.2em]">
          {(Object.keys(STEP_LABELS) as BootStep[]).map((step) => (
            <li key={step} className="flex justify-between">
              <span className="opacity-70">{STEP_LABELS[step]}</span>
              <span style={{ opacity: steps[step] ? 1 : 0.35 }}>
                {steps[step] ? "OK" : "···"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * The wall of shifting numbers.
 *
 * Rendered once and mutated in place through refs — re-rendering 198 cells on
 * an interval would make the loading screen the most expensive thing on the
 * site, which would rather defeat the point of it.
 */
const DigitField = ({ animate }: { animate: boolean }) => {
  const host = useRef<HTMLDivElement>(null);

  const initial = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, () => Math.floor(Math.random() * 10)),
    []
  );

  useEffect(() => {
    if (!animate) return;
    const cells = host.current?.children;
    if (!cells) return;

    const id = setInterval(() => {
      // A handful per tick, not the whole field — the drift should read as
      // data settling, not as static.
      for (let i = 0; i < 6; i += 1) {
        const cell = cells[Math.floor(Math.random() * cells.length)];
        if (cell instanceof HTMLElement) {
          cell.textContent = String(Math.floor(Math.random() * 10));
          cell.style.opacity = String(0.25 + Math.random() * 0.6);
        }
      }
    }, 90);

    return () => clearInterval(id);
  }, [animate]);

  return (
    <div
      ref={host}
      className="pointer-events-none absolute inset-0 grid select-none place-items-center gap-x-[1.2vw] gap-y-[1.6vh] p-6 font-pixel text-[clamp(0.6rem,1.2vw,0.95rem)]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {initial.map((digit, i) => (
        <span key={i} style={{ opacity: 0.25 + ((i * 37) % 60) / 100 }}>
          {digit}
        </span>
      ))}
    </div>
  );
};

export default Boot;
