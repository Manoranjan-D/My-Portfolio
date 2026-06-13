"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { posts, categories, type Category } from "@/lib/data/writing";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function WritingList() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const visible = filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              filter === c
                ? "border-electric-400/50 bg-electric-400/10 text-electric-200"
                : "border-white/10 bg-white/[0.02] text-mist-300 hover:border-white/20 hover:text-white",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/writing/${p.slug}`}
                className="surface group flex h-full flex-col rounded-3xl p-7 transition-colors hover:border-white/15"
              >
                <div className="flex items-center gap-3 text-xs text-mist-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-electric-300">
                    {p.category}
                  </span>
                  <span>{formatDate(p.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-mist-500" />
                  <span>{p.readingTime}</span>
                </div>
                <h3 className="mt-4 text-balance text-xl font-semibold tracking-tight text-mist-50 group-hover:text-white">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-mist-300">
                  {p.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-electric-400">
                  Read article
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
