"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/** Thin gradient bar pinned to the top, tracking document scroll progress. */
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-electric-400 to-violet-500"
    />
  );
}
