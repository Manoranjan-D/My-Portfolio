import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { dashboard } from "@/lib/data/dashboard";
import { BookOpen, Activity, Target, FlaskConical, Hammer, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Now",
  description:
    "A living dashboard — what Manoranjan is currently learning, building, reading, experimenting with, and tracking.",
};

function Panel({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface rounded-3xl p-6 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-line/5 text-electric-400">
          <Icon size={16} />
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-mist-200">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Now"
        title={
          <>
            A snapshot of{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              right now
            </span>
            .
          </>
        }
        intro="Inspired by the /now movement — a living page of what I'm currently learning, building, reading, and tracking. Less résumé, more pulse."
      >
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/5 px-3 py-1.5 text-xs text-mist-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jade-400" />
          Last updated {dashboard.updated}
        </p>
      </PageHero>

      <Section className="pt-6">
        <Container>
          {/* metrics row */}
          <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {dashboard.metrics.map((m) => (
              <StaggerItem key={m.label}>
                <div className="surface-raised rounded-2xl p-5">
                  <div className="text-3xl font-semibold text-mist-50">{m.value}</div>
                  <div className="mt-1 text-sm text-mist-200">{m.label}</div>
                  <div className="mt-0.5 text-xs text-mist-400">{m.trend}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <Panel title="Currently learning" icon={GraduationCap}>
                <div className="space-y-5">
                  {dashboard.learning.map((l) => (
                    <div key={l.label}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-mist-100">{l.label}</span>
                        <span className="text-xs text-mist-400">{l.detail}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/8">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-electric-400 to-violet-400"
                          style={{ width: `${l.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.05}>
              <Panel title="Current goals" icon={Target}>
                <ul className="space-y-3">
                  {dashboard.goals.map((g) => (
                    <li key={g.label} className="flex items-start gap-2.5 text-sm text-mist-300">
                      <span
                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                          g.done ? "border-jade-400 bg-jade-400/20 text-jade-400" : "border-line/20"
                        }`}
                      >
                        {g.done && "✓"}
                      </span>
                      {g.label}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>

            <Reveal>
              <Panel title="Currently building" icon={Hammer}>
                <div className="space-y-3">
                  {dashboard.building.map((b) => (
                    <div key={b.label} className="rounded-2xl border border-line/8 bg-line/[0.02] p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-mist-100">{b.label}</span>
                        <span className="rounded-full bg-electric-400/10 px-2 py-0.5 text-[10px] text-electric-300">
                          {b.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-mist-400">{b.detail}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.05}>
              <Panel title="Reading list" icon={BookOpen}>
                <ul className="space-y-3">
                  {dashboard.reading.map((r) => (
                    <li key={r.title} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-mist-100">{r.title}</p>
                        <p className="text-xs text-mist-400">{r.author}</p>
                      </div>
                      <span className="shrink-0 text-xs text-mist-400">{r.status}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>

            <Reveal delay={0.1}>
              <Panel title="Experiments" icon={FlaskConical}>
                <ul className="space-y-3">
                  {dashboard.experiments.map((e) => (
                    <li key={e.label}>
                      <p className="text-sm text-mist-100">{e.label}</p>
                      <p className="text-xs text-mist-400">{e.note}</p>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>

            <Reveal className="lg:col-span-3">
              <Panel title="Life metrics · fitness" icon={Activity}>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {dashboard.fitness.map((f) => (
                    <div key={f.label} className="rounded-2xl border border-line/8 bg-line/[0.02] p-4 text-center">
                      <div className="text-2xl font-semibold text-mist-50">{f.value}</div>
                      <div className="mt-1 text-xs text-mist-400">{f.label}</div>
                    </div>
                  ))}
                </div>
              </Panel>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
