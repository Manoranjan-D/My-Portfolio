import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { caseStudies, getCaseStudy, type CaseStudySection } from "@/lib/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: cs.title, description: cs.summary };
}

function Block({ section, index }: { section: CaseStudySection; index: number }) {
  return (
    <Reveal>
      <div className="grid gap-5 border-t border-white/8 py-12 md:grid-cols-[12rem_1fr] md:gap-12">
        <div className="flex items-start gap-3">
          <span className="font-mono text-sm text-electric-400">
            {String(index).padStart(2, "0")}
          </span>
          <h2 className="text-lg font-semibold text-mist-50">{section.heading}</h2>
        </div>
        <div>
          <div className="space-y-4">
            {section.body.map((p, i) => (
              <p key={i} className="text-pretty leading-relaxed text-mist-300">
                {p}
              </p>
            ))}
          </div>
          {section.list && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {section.list.map((item) => (
                <li key={item.label} className="surface rounded-2xl p-4">
                  <span className="text-sm font-semibold text-mist-100">{item.label}</span>
                  <p className="mt-1 text-sm leading-relaxed text-mist-400">{item.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const order: CaseStudySection[] = [
    cs.sections.problem,
    cs.sections.context,
    cs.sections.challenges,
    cs.sections.role,
    cs.sections.process,
    cs.sections.architecture,
    cs.sections.design,
    cs.sections.technical,
    cs.sections.results,
    cs.sections.lessons,
  ];

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-mist-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} /> All work
          </Link>
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-mist-400">
              <span>{cs.year}</span>
              <span className="h-1 w-1 rounded-full bg-mist-500" />
              <span>{cs.category}</span>
              <span className="h-1 w-1 rounded-full bg-mist-500" />
              <span>{cs.client}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-mist-50 md:text-6xl">
              {cs.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-300">
              {cs.summary}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* hero band */}
      <Container>
        <Reveal delay={0.1}>
          <div
            className="relative mt-12 h-56 overflow-hidden rounded-3xl md:h-80"
            style={{ backgroundImage: `linear-gradient(120deg, ${cs.cover.from}, ${cs.cover.to})` }}
          >
            <div className="absolute inset-0 grid-noise opacity-25 mix-blend-overlay" />
          </div>
        </Reveal>
      </Container>

      {/* meta + metrics */}
      <Container>
        <div className="mt-14 grid gap-10 border-b border-white/8 pb-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <dl className="grid grid-cols-2 gap-6">
              <Meta label="Role">{cs.role.join(" · ")}</Meta>
              <Meta label="Timeline">{cs.timeline}</Meta>
              <Meta label="Team">{cs.team}</Meta>
              <Meta label="Stack">{cs.stack.join(", ")}</Meta>
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {cs.metrics.map((m) => (
                <div key={m.label} className="surface rounded-2xl p-5">
                  <div className="text-2xl font-semibold text-mist-50">{m.value}</div>
                  <div className="mt-1 text-xs leading-snug text-mist-400">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* sections */}
      <Section className="pt-4">
        <Container>
          {order.map((section, i) => (
            <Block key={section.heading} section={section} index={i + 1} />
          ))}
        </Container>
      </Section>

      {/* next */}
      <Section className="pt-0">
        <Container>
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="surface group flex flex-col items-start justify-between gap-5 rounded-3xl p-8 transition-colors hover:border-white/15 md:flex-row md:items-center md:p-10"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-mist-400">
                  Next case study
                </span>
                <h3 className="mt-2 max-w-xl text-balance text-xl font-semibold text-mist-50 group-hover:text-white md:text-2xl">
                  {next.title}
                </h3>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/5 text-mist-100 transition-colors group-hover:bg-electric-500 group-hover:text-white">
                <ArrowRight size={18} />
              </span>
            </Link>
          </Reveal>
          <div className="mt-6 text-center">
            <Button href="/contact" variant="ghost">
              Have a similar challenge? Let&apos;s talk <ArrowRight size={15} />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-mist-400">{label}</dt>
      <dd className="mt-1.5 text-sm text-mist-100">{children}</dd>
    </div>
  );
}
