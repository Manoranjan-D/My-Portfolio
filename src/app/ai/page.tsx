import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AiWorkflowExplorer } from "@/components/sections/ai-workflow-explorer";
import { aiPhilosophy } from "@/lib/data/ai";

export const metadata: Metadata = {
  title: "Building with AI",
  description:
    "How Manoranjan uses modern AI as leverage across his engineering workflow — code generation, review, architecture, docs, research, and rapid prototyping.",
};

export default function AiPage() {
  return (
    <>
      <PageHero
        eyebrow="Building with AI"
        title={
          <>
            AI raises the floor.{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              Taste
            </span>{" "}
            is still the ceiling.
          </>
        }
        intro="I treat AI as the most capable junior teammate I've ever had — fast, tireless, occasionally wrong. It removes drudgery so my hours go to architecture and judgement. Here's exactly where it fits in my workflow."
      />

      <Section className="pt-8">
        <Container>
          <SectionHeading
            eyebrow="The workflow"
            title="Six places AI earns its keep"
            description="Tap through to see a real prompt and the outcome I'd expect from each."
          />
          <div className="mt-14">
            <AiWorkflowExplorer />
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <SectionHeading eyebrow="Philosophy" title="How I keep AI honest" />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {aiPhilosophy.map((p) => (
              <StaggerItem key={p.title}>
                <div className="surface h-full rounded-2xl p-7">
                  <h3 className="text-lg font-semibold text-mist-50">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist-300">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <div className="surface-raised mt-10 rounded-3xl p-8 md:p-10">
              <p className="text-balance text-xl font-medium leading-relaxed text-mist-100 md:text-2xl md:leading-relaxed">
                &ldquo;The differentiator was never typing speed. It&apos;s knowing what&apos;s
                worth building, and recognising when the machine is confidently wrong.&rdquo;
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
