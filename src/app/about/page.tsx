import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { journey, values } from "@/lib/data/about";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "The journey of Manoranjan D — from first lines of code to enterprise engineering, product thinking, and building beyond software.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            From curiosity about the web to{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              building the future
            </span>
            .
          </>
        }
        intro="I'm Manoranjan — a frontend engineer in Bangalore who cares less about frameworks and more about the experiences and outcomes they enable. This is the story of how I got here, and where I'm going."
      />

      {/* TIMELINE */}
      <Section className="pt-8">
        <Container>
          <SectionHeading eyebrow="My journey" title="A path, not a list of jobs" />
          <div className="relative mt-16">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-electric-400/40 via-white/10 to-transparent md:left-[8.5rem] md:block" />
            <div className="space-y-12">
              {journey.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.04}>
                  <div className="grid gap-4 md:grid-cols-[8.5rem_1fr] md:gap-10">
                    <div className="flex items-center gap-3 md:block">
                      <span className="text-lg font-semibold text-electric-400 md:text-2xl">
                        {item.year}
                      </span>
                    </div>
                    <div className="relative md:pl-10">
                      <span className="absolute -left-[5px] top-2 hidden h-2.5 w-2.5 rounded-full bg-electric-400 ring-4 ring-ink-900 md:block" />
                      <span className="text-xs font-medium uppercase tracking-wider text-mist-400">
                        {item.tag}
                      </span>
                      <h3 className="mt-1.5 text-xl font-semibold text-mist-50">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-2xl text-pretty leading-relaxed text-mist-300">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* VALUES */}
      <Section className="pt-0">
        <Container>
          <SectionHeading
            eyebrow="Core values"
            title="The principles I don't compromise on"
            description="These aren't poster slogans. They're the filters I run every decision through — in code, in product, and in business."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="surface h-full rounded-2xl p-7">
                  <h3 className="text-lg font-semibold text-mist-50">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-300">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <Reveal>
            <div className="surface-raised flex flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center md:p-10">
              <div>
                <h2 className="text-2xl font-semibold text-mist-50">
                  Want the deeper dives?
                </h2>
                <p className="mt-2 text-mist-300">
                  See the work behind the story, or skip ahead to where I&apos;m headed.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/work" variant="accent">
                  View Case Studies <ArrowRight size={15} />
                </Button>
                <Button href="/entrepreneurship" variant="outline">
                  The founder story
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
