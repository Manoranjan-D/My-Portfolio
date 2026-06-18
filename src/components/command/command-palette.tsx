"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, X, ArrowUp, Command as CommandIcon, Search, CornerDownLeft,
  Home, Briefcase, User, Layers, Cpu, Leaf, PenLine, Activity, Mail,
  FileDown, Sun, Moon, Copy, ArrowUpRight, MessageSquare,
} from "lucide-react";
import { nav, site, socials } from "@/lib/data/site";
import { caseStudies } from "@/lib/data/case-studies";
import { posts } from "@/lib/data/writing";
import { answer, suggestedQuestions } from "@/lib/data/ask";
import { cn } from "@/lib/utils";

type Mode = "command" | "ask";
type Message = { role: "user" | "assistant"; text: string };

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  keywords: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  run: () => void;
};

const navIcons: Record<string, Item["icon"]> = {
  "/work": Briefcase,
  "/about": User,
  "/ux-engineering": Layers,
  "/ai": Cpu,
  "/entrepreneurship": Leaf,
  "/writing": PenLine,
  "/dashboard": Activity,
};

const greeting: Message = {
  role: "assistant",
  text: "Hi — I'm a small assistant trained on Manoranjan's work. Ask me about his experience, skills, projects, philosophy, or where he's headed. Pick a prompt below or type your own.",
};

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("command");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  // ask-mode state
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [typing, setTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  function openWith(next: Mode) {
    setMode(next);
    setQuery("");
    setSelected(0);
    setOpen(true);
  }

  // ⌘K / Ctrl+K, Esc, and external open events
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setMode("command");
            setQuery("");
            setSelected(0);
          }
          return !o;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpenCommand = () => openWith("command");
    const onOpenAsk = () => openWith("ask");
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpenCommand);
    window.addEventListener("open-ask", onOpenAsk);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpenCommand);
      window.removeEventListener("open-ask", onOpenAsk);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open, mode]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const isDark = resolvedTheme !== "light";

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => {
      router.push(href);
      setOpen(false);
    };
    const navItems: Item[] = [
      { id: "home", label: "Home", group: "Navigation", keywords: "home start landing", icon: Home, run: go("/") },
      ...nav.map((n) => ({
        id: n.href,
        label: n.label,
        group: "Navigation",
        keywords: n.label.toLowerCase(),
        icon: navIcons[n.href] ?? Layers,
        run: go(n.href),
      })),
      { id: "contact", label: "Contact", group: "Navigation", keywords: "contact hire email reach", icon: Mail, run: go("/contact") },
    ];
    const work: Item[] = caseStudies.map((c) => ({
      id: `work-${c.slug}`,
      label: c.title,
      hint: c.category,
      group: "Case Studies",
      keywords: `${c.title} ${c.category} ${c.tags.join(" ")}`.toLowerCase(),
      icon: Briefcase,
      run: go(`/work/${c.slug}`),
    }));
    const writing: Item[] = posts.map((p) => ({
      id: `post-${p.slug}`,
      label: p.title,
      hint: p.category,
      group: "Writing",
      keywords: `${p.title} ${p.category} ${p.excerpt}`.toLowerCase(),
      icon: PenLine,
      run: go(`/writing/${p.slug}`),
    }));
    const actions: Item[] = [
      { id: "ask", label: "Ask Manoranjan…", hint: "AI assistant", group: "Actions", keywords: "ask question ai chat assistant", icon: MessageSquare, run: () => { setMode("ask"); setQuery(""); } },
      { id: "theme", label: isDark ? "Switch to light mode" : "Switch to dark mode", group: "Actions", keywords: "theme dark light toggle appearance", icon: isDark ? Sun : Moon, run: () => setTheme(isDark ? "light" : "dark") },
      { id: "resume", label: "Download résumé", group: "Actions", keywords: "resume cv download pdf", icon: FileDown, run: () => { window.open(site.resumeUrl, "_blank"); setOpen(false); } },
      { id: "copy-email", label: "Copy email address", hint: site.email, group: "Actions", keywords: "copy email contact", icon: Copy, run: () => { navigator.clipboard?.writeText(site.email); setOpen(false); } },
      ...socials.map((s) => ({
        id: `social-${s.label}`,
        label: s.label,
        hint: s.handle,
        group: "Actions",
        keywords: `${s.label} ${s.handle} social link`.toLowerCase(),
        icon: ArrowUpRight,
        run: () => { window.open(s.href, "_blank"); setOpen(false); },
      })),
    ];
    return [...navItems, ...work, ...writing, ...actions];
  }, [router, isDark, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.keywords.includes(q));
  }, [items, query]);

  // scroll the highlighted item into view (selection resets to 0 on query change)
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.run();
    }
  }

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    const { text: reply } = answer(q);
    const delay = 380 + Math.min(reply.length * 4, 700);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, delay);
  }

  // group filtered for display while preserving global index
  let runningIndex = -1;
  const groups = ["Navigation", "Case Studies", "Writing", "Actions"];

  return (
    <>
      {/* Floating trigger — opens in ask mode */}
      <motion.button
        onClick={() => openWith("ask")}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2 }}
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-line/12 bg-ink-800/80 py-2.5 pl-3 pr-4 text-sm text-mist-100 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors hover:border-electric-400/40"
        aria-label="Ask Manoranjan"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-electric-400 to-violet-500">
          <Sparkles size={14} className="text-white" />
        </span>
        <span className="font-medium">Ask Manoranjan</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-line/10 bg-line/5 px-1.5 py-0.5 text-[10px] text-mist-400 sm:flex">
          <CommandIcon size={9} />K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              role="dialog"
              aria-label="Command palette"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="surface-raised relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl shadow-2xl"
            >
              {/* header / input */}
              <div className="flex items-center gap-3 border-b border-line/8 px-4 py-3">
                {mode === "ask" ? (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-electric-400 to-violet-500">
                    <Sparkles size={13} className="text-white" />
                  </span>
                ) : (
                  <Search size={17} className="shrink-0 text-mist-400" />
                )}
                <input
                  ref={inputRef}
                  value={mode === "command" ? query : input}
                  onChange={(e) => (mode === "command" ? (setQuery(e.target.value), setSelected(0)) : setInput(e.target.value))}
                  onKeyDown={mode === "command" ? onListKeyDown : (e) => { if (e.key === "Enter") { e.preventDefault(); send(input); } }}
                  placeholder={mode === "command" ? "Search pages, work, writing, actions…" : "Ask anything about Manoranjan…"}
                  className="flex-1 bg-transparent text-sm text-mist-50 placeholder:text-mist-500 focus:outline-none"
                />
                {mode === "ask" && (
                  <button onClick={() => { setMode("command"); setQuery(""); }} className="rounded-full border border-line/10 px-2 py-1 text-[11px] text-mist-400 hover:text-mist-100">
                    Commands
                  </button>
                )}
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-mist-400 hover:bg-line/8 hover:text-strong">
                  <X size={15} />
                </button>
              </div>

              {/* body */}
              {mode === "command" ? (
                <div ref={listRef} className="flex-1 overflow-y-auto p-2">
                  {filtered.length === 0 && (
                    <p className="px-3 py-8 text-center text-sm text-mist-400">
                      No results. Try “work”, “AI”, “theme”, or just ask a question.
                    </p>
                  )}
                  {groups.map((g) => {
                    const groupItems = filtered.filter((i) => i.group === g);
                    if (groupItems.length === 0) return null;
                    return (
                      <div key={g} className="mb-1">
                        <p className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wider text-mist-500">{g}</p>
                        {groupItems.map((item) => {
                          runningIndex += 1;
                          const idx = runningIndex;
                          const active = idx === selected;
                          return (
                            <button
                              key={item.id}
                              data-index={idx}
                              onMouseEnter={() => setSelected(idx)}
                              onClick={() => item.run()}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                                active ? "bg-line/8 text-strong" : "text-mist-200",
                              )}
                            >
                              <item.icon size={16} className={active ? "text-electric-400" : "text-mist-400"} />
                              <span className="flex-1 truncate">{item.label}</span>
                              {item.hint && <span className="truncate text-xs text-mist-500">{item.hint}</span>}
                              {active && <CornerDownLeft size={13} className="text-mist-500" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div ref={chatRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                    {messages.map((m, i) => (
                      <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                        <div className={cn("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed", m.role === "user" ? "bg-electric-500 text-white" : "bg-line/5 text-mist-100")}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {typing && (
                      <div className="flex justify-start">
                        <div className="flex gap-1 rounded-2xl bg-line/5 px-4 py-3">
                          {[0, 1, 2].map((d) => (
                            <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-mist-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {messages.length <= 1 && (
                    <div className="flex flex-wrap gap-2 px-5 pb-3">
                      {suggestedQuestions.map((q) => (
                        <button key={q} onClick={() => send(q)} className="rounded-full border border-line/10 bg-line/5 px-3 py-1.5 text-xs text-mist-200 transition-colors hover:border-electric-400/40 hover:text-strong">
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 border-t border-line/8 p-3">
                    <button type="button" onClick={() => send(input)} aria-label="Send" disabled={!input.trim()} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-electric-500 text-white transition-colors hover:bg-electric-400 disabled:opacity-40">
                      <ArrowUp size={16} />
                    </button>
                  </div>
                </>
              )}

              {/* footer hint */}
              {mode === "command" && (
                <div className="flex items-center gap-4 border-t border-line/8 px-4 py-2.5 text-[11px] text-mist-500">
                  <span className="flex items-center gap-1"><kbd className="rounded border border-line/10 px-1">↑</kbd><kbd className="rounded border border-line/10 px-1">↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="rounded border border-line/10 px-1"><CornerDownLeft size={10} /></kbd> select</span>
                  <span className="flex items-center gap-1"><kbd className="rounded border border-line/10 px-1">esc</kbd> close</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
