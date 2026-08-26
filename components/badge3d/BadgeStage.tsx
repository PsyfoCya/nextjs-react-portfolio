"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInViewport } from "@/lib/useInViewport";

/**
 * Only pulled in once the media queries below actually pass, so phones never
 * download three.js, rapier's wasm, or the physics scene. `hidden lg:block`
 * would not have achieved that — CSS hides the element, but React still mounts
 * it and the dynamic import still fires.
 */
const Badge3D = dynamic(() => import("./Badge3D"), {
  ssr: false,
  loading: () => <BadgeSkeleton />,
});

const BadgeSkeleton = () => (
  <div className="flex h-full w-full items-start justify-center pt-24">
    <div className="h-64 w-44 animate-pulse rounded-xl border border-white/10 bg-white/5" />
  </div>
);

/** Subscribes to a media query and re-renders when it flips. */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

/**
 * A physics toy that flings itself around is exactly what
 * prefers-reduced-motion is meant to suppress, so those visitors get the same
 * badge as a still image instead.
 */
const StaticBadge = () => (
  <div className="flex h-full w-full items-start justify-center pt-20">
    <div className="w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1226] shadow-2xl">
      <div className="h-3 bg-gradient-to-r from-[#7179ef] via-[#693d55] to-[rgb(240,128,128)]" />
      <div className="flex flex-col items-center gap-3 px-5 py-6">
        <Image
          src="/assets/images/me/psyfo-badge.png"
          alt="Siyabonga Hadebe"
          width={96}
          height={96}
          className="h-24 w-24 rounded-full object-cover ring-2 ring-white/25"
        />
        <p className="text-center text-lg font-semibold leading-tight text-white">
          Siyabonga Hadebe
        </p>
        <p className="text-center text-xs uppercase tracking-wide text-white/60">
          Frontend Developer
        </p>
      </div>
    </div>
  </div>
);

/**
 * Decides whether the landing page gets the interactive badge, a static one,
 * or nothing at all.
 */
const BadgeStage = () => {
  // Below this the headline already fills the viewport and the badge would
  // simply sit on top of it.
  const isWideEnough = useMediaQuery("(min-width: 1280px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInViewport(stageRef, { rootMargin: "100px" });

  // Pointer-events are enabled only on the canvas itself, so the badge can be
  // dragged without the container swallowing clicks meant for the headline.
  if (!isWideEnough) return null;

  return (
    <div
      ref={stageRef}
      className="pointer-events-none absolute right-[2vw] top-24 z-20 h-[76vh] w-[17rem] 2xl:right-[4vw] 2xl:w-[20rem]"
      aria-hidden
    >
      <div className="pointer-events-auto h-full w-full">
        {prefersReducedMotion ? <StaticBadge /> : <Badge3D running={inView} />}
      </div>
    </div>
  );
};

export default BadgeStage;
