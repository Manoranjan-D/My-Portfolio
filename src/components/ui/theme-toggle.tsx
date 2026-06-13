"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // `resolvedTheme` is undefined on the server / first paint; treat that as
  // dark (the default theme). suppressHydrationWarning absorbs the icon swap.
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid h-9 w-9 place-items-center overflow-hidden rounded-full text-mist-200 transition-colors hover:bg-line/8 hover:text-strong",
        className,
      )}
    >
      <span suppressHydrationWarning className="grid place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ y: 12, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid place-items-center"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
