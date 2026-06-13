import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/primitives";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-mist-50 sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-300">
              {intro}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={0.18}>{children}</Reveal>}
      </Container>
    </section>
  );
}
