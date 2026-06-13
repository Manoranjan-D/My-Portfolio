import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading, Eyebrow, Badge } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { HeroVisual } from "@/components/home/hero-visual";
import { site } from "@/lib/data/site";
import { caseStudies } from "@/lib/data/case-studies";
import { impactStats } from "@/lib/data/impact";

const capabilities = [
  { title: "Frontend Engineering", body: "React, Next.js, TypeScript & Angular at enterprise scale — robust, typed, and built to last." },
  { title: "Design Systems", body: "Token-driven, accessible component libraries that let whole orgs ship faster and more consistently." },
  { title: "UX Engineering", body: "The seam between design and code — accessibility, motion, and performance as first-class concerns." },
  { title: "Performance & Security", body: "Sub-second interactions and a zero-CVE backlog, enforced by the pipeline, not heroics." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <Badge className="mb-6">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-jade-400" />
                  Available for senior &amp; product engineering roles
                </Badge>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-mist-50 sm:text-6xl md:text-7xl">
                  Engineering{" "}
                  <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
                    Experiences
                  </span>
                  , Not Just Interfaces.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-mist-300">
                  Senior Frontend Engineer building scalable products, exceptional
                  user experiences, and future-focused digital solutions — at the
                  intersection of design, engineering, and product.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href="/work" variant="accent" size="lg">
                    View Case Studies <ArrowRight size={16} />
                  </Button>
                  <Button href={site.resumeUrl} variant="outline" size="lg">
                    Download Resume
                  </Button>
                  <Button href="/contact" variant="ghost" size="lg">
                    Let&apos;s Connect
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.28}>
                <p className="mt-8 text-sm text-mist-400">
                  Currently <span className="text-mist-200">Frontend Engineer</span> at
                  Mercedes-Benz R&amp;D India · {site.location}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="hidden lg:block">
              <HeroVisual />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------- IMPACT STRIP ---------------- */}
      <section className="border-y border-line/8 bg-ink-850/40 py-14 backdrop-blur">
        <Container>
          <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {impactStats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-4xl font-semibold tracking-tight text-mist-50 md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-mist-200">{s.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-mist-400">{s.sub}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ---------------- POSITIONING ---------------- */}
      <Section>
        <Container>
          <Reveal>
            <p className="mx-auto max-w-4xl text-balance text-center text-2xl font-medium leading-relaxed text-mist-200 sm:text-3xl md:text-4xl md:leading-[1.25]">
              Not just a frontend developer. A{" "}
              <span className="text-gradient-accent">product-minded engineer</span>{" "}
              who builds impactful digital experiences — and is building the
              future businesses behind them.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- CAPABILITIES ---------------- */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow="What I do"
            title="A rare blend of design sensibility and engineering depth"
            description="I operate where most engineers don't — fluent in the language of designers, owner of systems, and accountable for outcomes."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <StaggerItem key={c.title}>
                <div className="surface group h-full rounded-2xl p-6 transition-colors hover:border-line/15">
                  <span className="font-mono text-xs text-electric-400">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold text-mist-50">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------- FEATURED WORK ---------------- */}
      <Section className="pt-0">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              title="Case studies, not screenshots"
              description="Deep dives into the problems, decisions, and measurable outcomes behind the work."
            />
            <Link
              href="/work"
              className="hidden shrink-0 items-center gap-1.5 text-sm text-mist-200 hover:text-strong sm:inline-flex"
            >
              All work <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-14 space-y-5">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.05}>
                <Link
                  href={`/work/${cs.slug}`}
                  className="surface group block overflow-hidden rounded-3xl p-1.5 transition-colors hover:border-line/15"
                >
                  <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-stretch">
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 text-xs text-mist-400">
                        <span>{cs.year}</span>
                        <span className="h-1 w-1 rounded-full bg-mist-500" />
                        <span>{cs.category}</span>
                      </div>
                      <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-mist-50 group-hover:text-strong md:text-3xl">
                        {cs.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-mist-300">
                        {cs.summary}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {cs.metrics.slice(0, 3).map((m) => (
                          <span
                            key={m.label}
                            className="rounded-full border border-line/10 bg-line/5 px-3 py-1 text-xs text-mist-200"
                          >
                            <span className="font-semibold text-mist-50">{m.value}</span> {m.label}
                          </span>
                        ))}
                      </div>
                      <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-electric-400">
                        Read case study
                        <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                    <div
                      className="relative min-h-44 overflow-hidden rounded-2xl"
                      style={{ backgroundImage: `linear-gradient(135deg, ${cs.cover.from}, ${cs.cover.to})` }}
                    >
                      <div className="absolute inset-0 grid-noise opacity-30 mix-blend-overlay" />
                      <div className="absolute inset-0 bg-ink-950/20" />
                      <span className="absolute bottom-4 right-5 font-mono text-6xl font-bold text-line/15">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- AI + VENTURES TEASER ---------------- */}
      <Section className="pt-0">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <Link href="/ai" className="surface group flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 transition-colors hover:border-electric-400/30">
                <div>
                  <Eyebrow>Building with AI</Eyebrow>
                  <h3 className="mt-5 text-2xl font-semibold text-mist-50 md:text-3xl">
                    AI as leverage, not a crutch
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-mist-300">
                    How modern AI accelerates my workflow — code generation, review,
                    architecture, and rapid prototyping — without ever outsourcing judgement.
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-electric-400">
                  Explore the workflow <ArrowRight size={15} />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <Link href="/entrepreneurship" className="surface group flex h-full flex-col justify-between overflow-hidden rounded-3xl p-8 transition-colors hover:border-jade-400/30">
                <div>
                  <Eyebrow>Building beyond software</Eyebrow>
                  <h3 className="mt-5 text-2xl font-semibold text-mist-50 md:text-3xl">
                    From engineer to founder
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-mist-300">
                    Applying a builder&apos;s systems mindset to sustainability,
                    climate innovation, and bio-compostable products.
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-jade-400">
                  Read the founder story <ArrowRight size={15} />
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="surface-raised relative overflow-hidden rounded-[2rem] px-8 py-16 text-center md:py-24">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-400/60 to-transparent" />
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-electric-500/10 blur-3xl" />
              <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/5 px-3 py-1 text-xs text-mist-200">
                <Sparkles size={12} className="text-electric-400" /> Let&apos;s build something memorable
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-mist-50 sm:text-4xl md:text-5xl">
                Have a hard problem worth solving well?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-mist-300">
                Roles, consulting, collaborations, speaking, or a startup idea —
                I&apos;d love to hear what you&apos;re building.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="/contact" variant="accent" size="lg">
                  Start a conversation <ArrowRight size={16} />
                </Button>
                <Button href="/about" variant="outline" size="lg">
                  Read my story
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
