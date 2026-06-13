"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, CornerDownRight } from "lucide-react";
import { aiWorkflow } from "@/lib/data/ai";
import { cn } from "@/lib/utils";

export function AiWorkflowExplorer() {
  const [active, setActive] = useState(0);
  const item = aiWorkflow[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col gap-2">
        {aiWorkflow.map((w, i) => (
          <button
            key={w.title}
            onClick={() => setActive(i)}
            className={cn(
              "group rounded-2xl border p-5 text-left transition-all duration-300",
              active === i
                ? "border-electric-400/40 bg-electric-400/[0.06]"
                : "border-white/8 bg-white/[0.02] hover:border-white/15",
            )}
          >
            <div className="flex items-center justify-between">
              <h3
                className={cn(
                  "text-base font-semibold transition-colors",
                  active === i ? "text-mist-50" : "text-mist-200",
                )}
              >
                {w.title}
              </h3>
              <span className="font-mono text-xs text-mist-500">0{i + 1}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{w.body}</p>
          </button>
        ))}
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="surface-raised overflow-hidden rounded-3xl">
          <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-mist-400">
              <Terminal size={12} /> {item.title.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 p-6"
            >
              <div>
                <span className="font-mono text-xs text-electric-400">▸ prompt</span>
                <p className="mt-2 rounded-xl bg-white/[0.03] p-4 font-mono text-sm leading-relaxed text-mist-200">
                  {item.prompt}
                </p>
              </div>
              <div>
                <span className="flex items-center gap-1.5 font-mono text-xs text-jade-400">
                  <CornerDownRight size={12} /> outcome
                </span>
                <p className="mt-2 leading-relaxed text-mist-300">{item.output}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
