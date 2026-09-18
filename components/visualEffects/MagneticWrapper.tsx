"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticWrapperProps {
  className?: string;
  children: ReactNode;
}

/** Matches the feel of the previous `animate`-driven spring. */
const SPRING = { stiffness: 100, damping: 10, mass: 0.05 } as const;

/**
 * Pulls its child toward the pointer while the cursor is over it.
 *
 * Driven by motion values rather than React state. The previous version called
 * `setPosition` on every `mousemove`, so a single pass of the cursor triggered
 * a React render — and a fresh spring config object — per event. Motion values
 * write straight to the DOM without re-rendering.
 */
const MagneticWrapper = ({ className, children }: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMouse = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    x.set(event.clientX - (bounds.left + bounds.width / 2));
    y.set(event.clientY - (bounds.top + bounds.height / 2));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn("relative", className)}
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;
