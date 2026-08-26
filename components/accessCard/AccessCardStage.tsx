"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInViewport } from "@/lib/useInViewport";
import CardSkeleton from "./CardSkeleton";
import StaticCard from "./StaticCard";

/**
 * Only pulled in once the media queries below actually pass, so phones never
 * download three.js, rapier's wasm, or the physics scene. `hidden lg:block`
 * would not have achieved that — CSS hides the element, but React still mounts
 * it and the dynamic import still fires.
 */
const AccessCard3D = dynamic(() => import("./AccessCard3D"), {
  ssr: false,
  loading: () => <CardSkeleton />,
});

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
 * The access card's stage.
 *
 * Nothing is imported until the section is within a screen of the viewport:
 * three.js, drei, fiber and rapier's base64-inlined wasm are several hundred
 * kilobytes gzipped, and none of it should compete with the hero for
 * bandwidth. Once mounted, the canvas and physics world still pause whenever
 * the section leaves the screen.
 *
 * Below 1280px it falls back to the still card — the scene is built around a
 * tall column and a pointer, and neither survives a phone.
 */
const AccessCardStage = () => {
  const isWideEnough = useMediaQuery("(min-width: 1280px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  // One observer, read two ways: `inView` drives the frame loop, and `loaded`
  // latches the first time we come near so the chunk is fetched once and the
  // scene is never torn back down.
  const { ref: stageRef, inView } = useInViewport<HTMLDivElement>({
    rootMargin: "400px",
  });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (inView) setLoaded(true);
  }, [inView]);

  const [touched, setTouched] = useState(false);

  // The ref is attached in every branch. Hanging it off the wide-screen branch
  // only would mean it never attaches on the first render — `useMediaQuery`
  // starts false — and the observer would have nothing to watch.
  const interactive = isWideEnough && !prefersReducedMotion;

  return (
    <div
      ref={stageRef}
      className={
        interactive
          ? "relative mx-auto h-[70vh] min-h-[32rem] w-full max-w-4xl"
          : "flex min-h-[24rem] items-center justify-center py-12"
      }
      onPointerDown={() => setTouched(true)}
    >
      {!interactive ? (
        <StaticCard />
      ) : loaded ? (
        <AccessCard3D running={inView} />
      ) : (
        <CardSkeleton />
      )}

      {/* The affordance retires once the visitor has worked it out. */}
      {interactive && !touched ? (
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

export default AccessCardStage;
