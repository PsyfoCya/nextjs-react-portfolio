"use client";

import { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation in the tree answer to
 * `prefers-reduced-motion`.
 *
 * `reducedMotion="user"` keeps opacity transitions but drops transforms for
 * visitors who have asked for less movement, so the reveals still resolve —
 * they just stop sliding. The CSS side of this lives in globals.css.
 */
const Motion = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default Motion;
