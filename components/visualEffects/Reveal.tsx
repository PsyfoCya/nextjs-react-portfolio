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
 * Fades and lifts its children the first time they scroll into view.
 *
 * `once: true` matters: re-animating on the way back up turns a scroll through
 * the page into a flicker. `MotionConfig reducedMotion="user"` in the root
 * layout strips the movement for anyone who has asked for that.
 */
const Reveal = ({ children, className, index = 0 }: RevealProps) => (
  <motion.div
    className={cn(className)}
    initial={{ opacity: 0, y: DISTANCE }}
    whileInView={{ opacity: 1, y: 0 }}
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
