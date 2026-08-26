"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Tall enough to cover any viewport until the real height is measured. */
const FALLBACK_HEIGHT = 1000;

const bulge = (height: number) => `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
const flat = (height: number) => `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;

/**
 * The curved edge that sweeps in alongside the full-screen menu.
 *
 * The height is measured in an effect rather than read during render. The old
 * version called `window.innerHeight` in the component body, which only worked
 * because the whole page was client-only — it throws the moment this is
 * server-rendered, and it never recomputed on resize or orientation change.
 */
const Curve = () => {
  const [height, setHeight] = useState(FALLBACK_HEIGHT);

  useEffect(() => {
    const measure = () => setHeight(window.innerHeight);
    measure();

    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  const curve = {
    initial: { d: bulge(height) },
    enter: {
      d: flat(height),
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: bulge(height),
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className="absolute top-0 -left-[99px] w-[100px] h-full stroke-none fill-black">
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );
};

export default Curve;
