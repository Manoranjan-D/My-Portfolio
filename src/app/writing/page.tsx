import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { WritingList } from "@/components/sections/writing-list";
import { featuredPosts } from "@/lib/data/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on frontend engineering, UX engineering, AI, product thinking, entrepreneurship, and sustainability.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function WritingPage() {
  const [hero, ...rest] = featuredPosts;

  return (
    <>
      <PageHero
        eyebrow="Writing"
        title={
          <>
            Notes on building{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              things that matter
            </span>
            .
          </>
        }
        intro="Essays at the intersection of engineering, design, product, and the future I'm trying to build. Written to clarify my own thinking — and hopefully yours."
      />

      {/* featured */}
      <Section className="pt-6">
        <Container>
          {hero && (
            <Reveal>
              <Link
                href={`/writing/${hero.slug}`}
                className="surface-raised group block overflow-hidden rounded-3xl"
              >
                <div className="grid md:grid-cols-[1fr_0.9fr]">
                  <div className="relative min-h-48 overflow-hidden bg-gradient-to-br from-electric-500 to-violet-500 md:min-h-full">
                    <div className="absolute inset-0 grid-noise opacity-25 mix-blend-overlay" />
                    <span className="absolute left-6 top-6 rounded-full bg-ink-950/40 px-3 py-1 text-xs text-white backdrop-blur">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 text-xs text-mist-400">
                      <span className="text-electric-300">{hero.category}</span>
                      <span>{formatDate(hero.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-mist-500" />
                      <span>{hero.readingTime}</span>
                    </div>
                    <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-mist-50 group-hover:text-white md:text-3xl">
                      {hero.title}
                    </h2>
                    <p className="mt-4 text-pretty leading-relaxed text-mist-300">
                      {hero.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-electric-400">
                      Read article <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <Link
                    href={`/writing/${p.slug}`}
                    className="surface group flex h-full flex-col rounded-3xl p-7 transition-colors hover:border-white/15"
                  >
                    <div className="flex items-center gap-3 text-xs text-mist-400">
                      <span className="text-electric-300">{p.category}</span>
                      <span>{p.readingTime}</span>
                    </div>
                    <h3 className="mt-3 text-balance text-xl font-semibold text-mist-50 group-hover:text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mist-300">
                      {p.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* all posts + filter */}
      <Section className="pt-0">
        <Container>
          <SectionHeading eyebrow="All writing" title="Browse by category" />
          <div className="mt-12">
            <WritingList />
          </div>
        </Container>
      </Section>
    </>
  );
}
