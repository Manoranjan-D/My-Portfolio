export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: Category;
  featured?: boolean;
};

export type Category =
  | "Frontend Engineering"
  | "UX Engineering"
  | "AI"
  | "Product Thinking"
  | "Entrepreneurship"
  | "Sustainability";

export const categories: Category[] = [
  "Frontend Engineering",
  "UX Engineering",
  "AI",
  "Product Thinking",
  "Entrepreneurship",
  "Sustainability",
];

export const posts: PostMeta[] = [
  {
    slug: "design-systems-are-products",
    title: "Your Design System Is a Product. Treat It Like One.",
    excerpt:
      "The technical part of a design system is the easy part. Adoption, governance, and trust are where systems live or die — and they're product problems, not engineering ones.",
    date: "2026-05-18",
    readingTime: "7 min",
    category: "UX Engineering",
    featured: true,
  },
  {
    slug: "performance-is-a-feature",
    title: "Performance Is a Feature, Not a Cleanup Task",
    excerpt:
      "Latency is the most universal UX problem there is. Here's how I think about performance budgets, perceived speed, and keeping a data-dense UI fast as it scales.",
    date: "2026-04-02",
    readingTime: "6 min",
    category: "Frontend Engineering",
    featured: true,
  },
  {
    slug: "ai-raises-the-floor",
    title: "AI Raises the Floor. Taste Is Still the Ceiling.",
    excerpt:
      "AI changed how I build, not what I'm responsible for. A field note on using AI as leverage without outsourcing judgement.",
    date: "2026-02-20",
    readingTime: "5 min",
    category: "AI",
    featured: true,
  },
  {
    slug: "from-engineer-to-founder",
    title: "From Engineer to Founder: Why I'm Building Beyond Software",
    excerpt:
      "Why I'm applying a builder's mindset to bio-compostable products and climate tech — and what software taught me about making real things.",
    date: "2026-01-10",
    readingTime: "8 min",
    category: "Entrepreneurship",
  },
  {
    slug: "accessibility-is-the-floor",
    title: "Accessibility Is the Floor, Not the Finish Line",
    excerpt:
      "Treating accessibility as a launch blocker rather than a backlog item changes how you architect components. A practical take from the trenches.",
    date: "2025-11-28",
    readingTime: "6 min",
    category: "UX Engineering",
  },
  {
    slug: "products-that-return-to-the-earth",
    title: "Products That Return to the Earth",
    excerpt:
      "Cradle-to-cradle thinking for builders: what if the end-of-life of a product were a design constraint from day one?",
    date: "2025-10-15",
    readingTime: "5 min",
    category: "Sustainability",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const featuredPosts = posts.filter((p) => p.featured);
