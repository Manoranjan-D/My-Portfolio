import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { caseStudies } from "@/lib/data/case-studies";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "In-depth case studies on design systems, security remediation, and performance engineering at enterprise scale.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Case studies, not{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              screenshots
            </span>
            .
          </>
        }
        intro="Each of these is a deep dive into a real, hard problem — the business context, the decisions, the architecture, and the measurable outcomes. The way top product teams document their work."
      />

      <Section className="pt-6">
        <Container>
          <div className="space-y-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.05}>
                <Link
                  href={`/work/${cs.slug}`}
                  className="surface group block overflow-hidden rounded-3xl transition-colors hover:border-line/15"
                >
                  <div
                    className="relative h-40 overflow-hidden md:h-52"
                    style={{ backgroundImage: `linear-gradient(120deg, ${cs.cover.from}, ${cs.cover.to})` }}
                  >
                    <div className="absolute inset-0 grid-noise opacity-25 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-850/90 to-transparent" />
                    <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                      <div className="flex items-center gap-2.5 text-xs text-line/80">
                        <span>{cs.year}</span>
                        <span className="h-1 w-1 rounded-full bg-line/50" />
                        <span>{cs.category}</span>
                      </div>
                      <ArrowUpRight
                        size={22}
                        className="text-line/70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="text-balance text-2xl font-semibold tracking-tight text-mist-50 group-hover:text-strong md:text-3xl">
                      {cs.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-mist-300">
                      {cs.summary}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-xl font-semibold text-mist-50">{m.value}</div>
                          <div className="mt-0.5 text-xs text-mist-400">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
