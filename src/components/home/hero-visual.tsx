"use client";

import { motion } from "motion/react";
import { Activity, GitBranch, ShieldCheck, Zap } from "lucide-react";

/**
 * A live-feeling "engineering dashboard" — floating cards, an animated
 * deploy pipeline, and a pulsing metrics readout. Purely decorative, but
 * it signals product/systems thinking rather than a logo wall.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-lg select-none lg:h-[520px]">
      {/* glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/15 blur-3xl" />

      {/* core panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="surface-raised absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-jade-400" />
            <span className="text-xs font-medium text-mist-200">Production</span>
          </div>
          <span className="font-mono text-[10px] text-mist-400">build · 4.2s</span>
        </div>

        <div className="mt-4 space-y-2.5">
          {[
            { icon: Zap, label: "Performance", val: 92, color: "bg-jade-400" },
            { icon: ShieldCheck, label: "Accessibility", val: 98, color: "bg-electric-400" },
            { icon: Activity, label: "Best Practices", val: 96, color: "bg-violet-400" },
          ].map((row, i) => (
            <div key={row.label} className="flex items-center gap-3">
              <row.icon size={14} className="text-mist-400" />
              <span className="w-24 text-xs text-mist-300">{row.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/8">
                <motion.div
                  className={`h-full rounded-full ${row.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${row.val}%` }}
                  transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="w-7 text-right font-mono text-[11px] text-mist-200">{row.val}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-line/8 bg-line/[0.03] px-3 py-2">
          <GitBranch size={13} className="text-electric-400" />
          <span className="font-mono text-[11px] text-mist-300">deploy</span>
          <div className="ml-auto flex items-center gap-1">
            {[0, 1, 2, 3].map((d) => (
              <motion.span
                key={d}
                className="h-1.5 w-1.5 rounded-full bg-electric-400"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: d * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* floating chips */}
      <FloatChip className="left-0 top-8" delay={0.5} label="20+ apps unified" dot="bg-electric-400" />
      <FloatChip className="right-0 top-24" delay={0.7} label="0 critical CVEs" dot="bg-jade-400" />
      <FloatChip className="bottom-10 left-4" delay={0.9} label="40% faster delivery" dot="bg-violet-400" />
    </div>
  );
}

function FloatChip({
  className,
  label,
  dot,
  delay,
}: {
  className: string;
  label: string;
  dot: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`surface absolute flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-mist-100 backdrop-blur-xl ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </motion.div>
  );
}
