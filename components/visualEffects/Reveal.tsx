"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Position in a group, used to stagger siblings. */
  index?: number;
}

/** Short and small on purpose — this should register, not announce itself. */
const DISTANCE = 12;
const DURATION = 0.4;
const STAGGER = 0.06;

/** Past four or five, a stagger stops reading as rhythm and starts as lag. */
const MAX_STAGGER_STEPS = 5;

/**
 * Lifts its children the first time they scroll into view.
 *
 * Deliberately does NOT animate opacity. framer-motion serialises `initial`
 * into the server-rendered markup, so `initial={{ opacity: 0 }}` shipped the
 * whole About grid and every case-study card as invisible HTML that stayed
 * invisible until hydration — which is both where the "pop in" came from and
 * why the page felt slow, and it disqualified all of that content as an LCP
 * candidate. Transform-only keeps the text readable in the HTML, and moves on
 * the compositor rather than repainting.
 *
 * `once: true` matters too: re-animating on the way back up turns a scroll
 * through the page into a flicker. `MotionConfig reducedMotion="user"` in the
 * root layout strips the movement for anyone who has asked for that.
 */
const Reveal = ({ children, className, index = 0 }: RevealProps) => (
  <motion.div
    className={cn(className)}
    initial={{ y: DISTANCE }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: "-8%" }}
    transition={{
      duration: DURATION,
      ease: [0.22, 1, 0.36, 1],
      delay: Math.min(index, MAX_STAGGER_STEPS) * STAGGER,
    }}
  >
    {children}
  </motion.div>
);

export default Reveal;
