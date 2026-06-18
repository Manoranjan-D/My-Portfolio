"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search, Command } from "lucide-react";
import { nav, site } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex w-full max-w-6xl items-center gap-6 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled
            ? "border-line/10 bg-ink-900/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-electric-400 to-violet-500 text-sm font-bold text-white">
            M
          </span>
          <span className="text-sm font-semibold tracking-tight text-mist-50">
            Manoranjan<span className="text-electric-400">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors",
                    active ? "text-strong" : "text-mist-300 hover:text-strong",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-line/8"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden h-9 items-center gap-2 rounded-full border border-line/10 bg-line/[0.03] pl-3 pr-2 text-mist-400 transition-colors hover:border-line/20 hover:text-mist-100 xl:flex"
          >
            <Search size={14} />
            <kbd className="flex items-center gap-0.5 rounded border border-line/10 bg-line/5 px-1.5 py-0.5 text-[10px]">
              <Command size={9} />K
            </kbd>
          </button>
          <ThemeToggle />
          <Button href="/contact" size="sm" variant="accent" className="hidden sm:inline-flex">
            Let&apos;s Connect
          </Button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full text-mist-200 hover:bg-line/5 xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-20 mx-auto max-w-6xl rounded-3xl border border-line/10 bg-ink-850/95 p-4 backdrop-blur-xl xl:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block rounded-2xl px-4 py-3 text-base text-mist-100 hover:bg-line/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/contact" variant="accent" className="mt-3 w-full" onClick={close}>
              Let&apos;s Connect
            </Button>
            <p className="mt-3 px-4 text-xs text-mist-400">{site.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
