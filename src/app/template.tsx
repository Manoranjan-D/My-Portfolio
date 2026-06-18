"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * App Router re-mounts template.tsx on every navigation, so this wrapper
 * animates each route change. Falls back to a plain wrapper when the user
 * prefers reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
