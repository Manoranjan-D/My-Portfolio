"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Users, Lightbulb, Mic, Rocket, ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const inquiries = [
  { id: "role", label: "Professional inquiry", icon: Briefcase, blurb: "Senior frontend, product, or UX engineering roles." },
  { id: "collab", label: "Collaboration", icon: Users, blurb: "Build something together — open source or product." },
  { id: "consult", label: "Consulting", icon: Lightbulb, blurb: "Design systems, performance, or frontend architecture." },
  { id: "speaking", label: "Speaking", icon: Mic, blurb: "Talks on UX engineering, AI workflows, or design systems." },
  { id: "startup", label: "Startup discussion", icon: Rocket, blurb: "Sustainability, climate tech, or founding conversations." },
];

export function ContactExperience() {
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const active = inquiries.find((i) => i.id === selected);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[${active?.label}] from ${form.name || "the portfolio"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${active?.label}\n\n${form.message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* selector */}
      <div className="space-y-3">
        <p className="text-sm text-mist-400">What brings you here?</p>
        {inquiries.map((i) => {
          const isActive = selected === i.id;
          return (
            <button
              key={i.id}
              onClick={() => {
                setSelected(i.id);
                setSent(false);
              }}
              className={cn(
                "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                isActive
                  ? "border-electric-400/50 bg-electric-400/[0.07]"
                  : "border-white/8 bg-white/[0.02] hover:border-white/20",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors",
                  isActive ? "bg-electric-500 text-white" : "bg-white/5 text-mist-300",
                )}
              >
                <i.icon size={18} />
              </span>
              <span>
                <span className={cn("block text-sm font-medium", isActive ? "text-mist-50" : "text-mist-200")}>
                  {i.label}
                </span>
                <span className="block text-xs text-mist-400">{i.blurb}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* form */}
      <div className="surface-raised rounded-3xl p-7 md:p-9">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-72 flex-col items-center justify-center text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-mist-400">
                <ArrowRight size={22} className="-rotate-180 sm:rotate-0" />
              </span>
              <p className="mt-5 max-w-xs text-mist-300">
                Pick a topic and I&apos;ll tailor the conversation. Every message reaches me directly.
              </p>
            </motion.div>
          ) : sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full min-h-72 flex-col items-center justify-center text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-jade-400/15 text-jade-400">
                <Check size={24} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-mist-50">Your email is ready</h3>
              <p className="mt-2 max-w-sm text-sm text-mist-300">
                Your mail client should have opened with everything filled in. If not, write me at{" "}
                <a href={`mailto:${site.email}`} className="text-electric-400">{site.email}</a>.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              onSubmit={submit}
              className="space-y-4"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-electric-400/10 px-3 py-1 text-xs text-electric-300">
                  {active && <active.icon size={12} />} {active?.label}
                </span>
              </div>
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="contact-input"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="contact-input"
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Message">
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="contact-input resize-none"
                  placeholder={`Tell me about your ${active?.label.toLowerCase()}…`}
                />
              </Field>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-electric-500 py-3 text-sm font-medium text-white transition-colors hover:bg-electric-400"
              >
                Send message <ArrowRight size={15} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          border-radius: 0.85rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: var(--color-mist-50);
          transition: border-color .2s, background .2s;
        }
        .contact-input::placeholder { color: var(--color-mist-400); }
        .contact-input:focus {
          outline: none;
          border-color: var(--color-electric-400);
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mist-400">
        {label}
      </span>
      {children}
    </label>
  );
}
