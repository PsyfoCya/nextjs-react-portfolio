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
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-72 w-52 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
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
  <div className="flex h-full w-full items-center justify-center">
    <div className="w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1226] shadow-2xl">
      <div className="fancy-bg h-3" />
      <div className="flex flex-col items-center gap-3 px-5 py-6">
        <Image
          src="/assets/images/me/psyfo-badge.png"
          alt="Siyabonga Hadebe"
          width={96}
          height={96}
          sizes="96px"
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
 * The badge's stage.
 *
 * Nothing is imported until the section is within a screen of the viewport:
 * three.js, drei, fiber and rapier's base64-inlined wasm are several hundred
 * kilobytes gzipped, and none of it should compete with the hero for
 * bandwidth. Once mounted, the canvas and physics world still pause whenever
 * the section leaves the screen.
 *
 * Below 1280px it renders nothing at all — the scene is built around a tall
 * column and a pointer, and neither survives a phone.
 */
const BadgeStage = () => {
  const isWideEnough = useMediaQuery("(min-width: 1280px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const stageRef = useRef<HTMLDivElement>(null);
  // A screen of lead time, so the chunk is fetched before it is needed.
  const near = useInViewport(stageRef, { rootMargin: "600px", once: true });
  const visible = useInViewport(stageRef, { rootMargin: "100px" });

  const [touched, setTouched] = useState(false);

  if (!isWideEnough) {
    return (
      <div className="flex min-h-[24rem] items-center justify-center py-12">
        <StaticBadge />
      </div>
    );
  }

  return (
    <div
      ref={stageRef}
      className="relative mx-auto h-[70vh] min-h-[32rem] w-full max-w-4xl"
      onPointerDown={() => setTouched(true)}
    >
      {prefersReducedMotion ? (
        <StaticBadge />
      ) : near ? (
        <Badge3D running={visible} />
      ) : (
        <BadgeSkeleton />
      )}

      {/* The affordance retires once the visitor has worked it out. */}
      {!prefersReducedMotion && !touched ? (
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-6 text-center font-pixel text-xs uppercase tracking-[0.2em] text-secondary-foreground transition-opacity duration-500"
        >
          grab it and let go
        </p>
      ) : null}
    </div>
  );
};

export default BadgeStage;
