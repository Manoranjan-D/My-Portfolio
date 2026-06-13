import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { posts, getPost } from "@/lib/data/writing";

const loaders: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "design-systems-are-products": () => import("@/content/writing/design-systems-are-products.mdx"),
  "performance-is-a-feature": () => import("@/content/writing/performance-is-a-feature.mdx"),
  "ai-raises-the-floor": () => import("@/content/writing/ai-raises-the-floor.mdx"),
  "from-engineer-to-founder": () => import("@/content/writing/from-engineer-to-founder.mdx"),
  "accessibility-is-the-floor": () => import("@/content/writing/accessibility-is-the-floor.mdx"),
  "products-that-return-to-the-earth": () => import("@/content/writing/products-that-return-to-the-earth.mdx"),
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const loader = loaders[slug];
  if (!post || !loader) notFound();

  const { default: Content } = await loader();

  return (
    <article>
      <section className="relative overflow-hidden pt-32 pb-6 md:pt-40">
        <Container>
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 text-sm text-mist-400 transition-colors hover:text-strong"
          >
            <ArrowLeft size={14} /> All writing
          </Link>
          <Reveal>
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="flex items-center gap-3 text-xs text-mist-400">
                <span className="rounded-full border border-line/10 bg-line/5 px-2.5 py-0.5 text-electric-300">
                  {post.category}
                </span>
                <span>{formatDate(post.date)}</span>
                <span className="h-1 w-1 rounded-full bg-mist-500" />
                <span>{post.readingTime}</span>
              </div>
              <h1 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-mist-50 md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-mist-300">
                {post.excerpt}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container>
        <div className="mx-auto max-w-2xl border-t border-line/8 pt-10">
          <Content />
        </div>
      </Container>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="surface flex flex-col items-start justify-between gap-5 rounded-3xl p-8 sm:flex-row sm:items-center">
                <div>
                  <p className="text-lg font-semibold text-mist-50">Enjoyed this?</p>
                  <p className="mt-1 text-sm text-mist-300">Let&apos;s talk shop — or work together.</p>
                </div>
                <div className="flex gap-3">
                  <Button href="/writing" variant="outline" size="sm">
                    More writing
                  </Button>
                  <Button href="/contact" variant="accent" size="sm">
                    Get in touch
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </article>
  );
}
