import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { uxPrinciples, beforeAfter, uxExamples } from "@/lib/data/ux";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "UX Engineering",
  description:
    "Where engineering and design intersect — accessibility, performance, motion, and design systems, with measurable before/after outcomes.",
};

export default function UXPage() {
  return (
    <>
      <PageHero
        eyebrow="UX Engineering"
        title={
          <>
            Where engineering and{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              design
            </span>{" "}
            intersect.
          </>
        }
        intro="Most engineers ship what the design says. I care about how it feels — the latency, the focus order, the empty state, the easing curve. This is the craft that sits between Figma and production."
      />

      {/* principles */}
      <Section className="pt-8">
        <Container>
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {uxPrinciples.map((p) => (
              <StaggerItem key={p.title}>
                <div className="surface h-full rounded-2xl p-7">
                  <h3 className="text-lg font-semibold text-mist-50">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-300">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* before / after */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow="Before / after"
            title="The work shows up in the numbers"
            description="User-centred engineering isn't abstract. Here's the measurable difference it makes."
          />
          <div className="mt-14 space-y-5">
            {beforeAfter.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.04}>
                <div className="surface grid gap-6 rounded-3xl p-6 md:grid-cols-[1.1fr_1fr_1fr_auto] md:items-center md:p-8">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-mist-400">
                      {b.metric}
                    </span>
                    <h3 className="mt-1.5 text-lg font-semibold text-mist-50">{b.title}</h3>
                  </div>
                  <Compare {...b.before} tone="muted" />
                  <Compare {...b.after} tone="accent" />
                  <div className="rounded-full border border-jade-400/30 bg-jade-400/10 px-4 py-2 text-center text-sm font-semibold text-jade-400">
                    {b.improvement}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* examples */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow="User-centred engineering"
            title="Small details, outsized trust"
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {uxExamples.map((e) => (
              <StaggerItem key={e.title}>
                <div className="surface h-full rounded-2xl p-7">
                  <span className="inline-flex rounded-full border border-electric-400/30 bg-electric-400/10 px-2.5 py-1 text-xs text-electric-300">
                    {e.tag}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-mist-50">{e.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300">{e.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-10 text-sm text-mist-400">
              See this thinking applied end-to-end in the{" "}
              <Link href="/work/performance-modernisation" className="inline-flex items-center gap-1 text-electric-400 hover:text-electric-300">
                performance case study <ArrowRight size={13} />
              </Link>
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function Compare({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: "muted" | "accent";
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <span className="text-xs uppercase tracking-wider text-mist-400">{label}</span>
      <div
        className={`mt-1 text-2xl font-semibold ${tone === "accent" ? "text-mist-50" : "text-mist-400"}`}
      >
        {value}
      </div>
      <p className="mt-1.5 text-xs leading-snug text-mist-400">{note}</p>
    </div>
  );
}
