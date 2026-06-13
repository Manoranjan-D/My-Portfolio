"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, ArrowUp, Command } from "lucide-react";
import { answer, suggestedQuestions } from "@/lib/data/ask";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; text: string };

const greeting: Message = {
  role: "assistant",
  text: "Hi — I'm a small assistant trained on Manoranjan's work. Ask me about his experience, skills, projects, philosophy, or where he's headed. Pick a prompt below or type your own.",
};

export function AskManoranjan() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

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

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
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
          <Command size={9} />K
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
            <div
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label="Ask Manoranjan assistant"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="surface-raised relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-line/8 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-electric-400 to-violet-500">
                    <Sparkles size={13} className="text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-mist-50">Ask Manoranjan</p>
                    <p className="text-[11px] text-mist-400">Trained on his work · answers instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-full text-mist-400 hover:bg-line/5 hover:text-strong"
                >
                  <X size={16} />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-electric-500 text-white"
                          : "bg-line/5 text-mist-100",
                      )}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-2xl bg-line/5 px-4 py-3">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-mist-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 px-5 pb-3">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-line/10 bg-line/5 px-3 py-1.5 text-xs text-mist-200 transition-colors hover:border-electric-400/40 hover:text-strong"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-line/8 p-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Manoranjan…"
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-mist-50 placeholder:text-mist-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={!input.trim()}
                  className="grid h-9 w-9 place-items-center rounded-full bg-electric-500 text-white transition-colors hover:bg-electric-400 disabled:opacity-40"
                >
                  <ArrowUp size={16} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
