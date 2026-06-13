import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { ContactExperience } from "@/components/sections/contact-experience";
import { site, socials } from "@/lib/data/site";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out about roles, collaboration, consulting, speaking, or startup conversations. Every message reaches Manoranjan directly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="font-[family-name:var(--font-display)] font-normal italic text-gradient-accent">
              worth remembering
            </span>
            .
          </>
        }
        intro="No generic contact form. Tell me what brings you here, and I'll meet you there. I read and reply to everything personally."
      />

      <Section className="pt-6">
        <Container>
          <Reveal>
            <ContactExperience />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line/8 p-7 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-mist-400">Prefer something direct?</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-block text-xl font-semibold text-mist-50 hover:text-electric-400"
                >
                  {site.email}
                </a>
                <p className="mt-1 text-sm text-mist-400">Based in {site.location} · replies within a day or two</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-line/10 bg-line/[0.02] px-4 py-2 text-sm text-mist-200 transition-colors hover:border-line/25 hover:text-strong"
                  >
                    {s.label}
                    <ArrowUpRight size={13} className="text-mist-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
