import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { founderStory, ventures, principles } from "@/lib/data/entrepreneurship";
import { Leaf, Globe, Factory, Rocket, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Beyond Software",
  description:
    "The founder narrative — sustainability, climate innovation, bio-compostable products, and the path from engineer to technology founder.",
};

const icons = { leaf: Leaf, globe: Globe, factory: Factory, rocket: Rocket } as const;

export default function EntrepreneurshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Building beyond software"
        title={
          <>
            Building things that{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              return to the earth
            </span>
            .
          </>
        }
        intro={founderStory.intro}
      />

      {/* narrative */}
      <Section className="pt-8">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {founderStory.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-pretty text-lg leading-relaxed text-mist-200">{p}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ventures */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow="The directions"
            title="Where I'm pointing the next decade"
            description="Early, honest, and evolving. These are the threads I'm pulling on — at the intersection of engineering rigour and genuine impact."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
            {ventures.map((v) => {
              const Icon = icons[v.icon as keyof typeof icons];
              return (
                <StaggerItem key={v.title}>
                  <div className="surface h-full rounded-3xl p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-jade-400/10 text-jade-400">
                        <Icon size={20} />
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist-300">
                        {v.stage}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-mist-50">{v.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist-300">{v.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* principles */}
      <Section className="pt-0">
        <Container>
          <div className="surface-raised rounded-[2rem] p-8 md:p-12">
            <SectionHeading eyebrow="Operating principles" title="How I'll build companies" />
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div>
                    <span className="font-mono text-sm text-jade-400">0{i + 1}</span>
                    <h3 className="mt-3 text-lg font-semibold text-mist-50">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-300">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-jade-400/20 bg-jade-400/[0.04] p-8 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="text-2xl font-semibold text-mist-50">
                  Building in this space too?
                </h2>
                <p className="mt-2 text-mist-300">
                  I&apos;d love to compare notes on sustainability, materials, and climate ventures.
                </p>
              </div>
              <Button href="/contact" variant="accent">
                Start a conversation <ArrowRight size={15} />
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
