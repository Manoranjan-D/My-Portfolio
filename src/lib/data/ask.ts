/**
 * Knowledge base for the "Ask Manoranjan" assistant.
 * Runs fully client-side with keyword intent matching — no external API,
 * so it works offline and ships zero per-request cost. The architecture is
 * built so the same `answer()` contract can be swapped for a streaming LLM
 * endpoint later without touching the UI.
 */

export type Topic = {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
};

export const suggestedQuestions = [
  "What's your experience?",
  "What are your core skills?",
  "Tell me about your projects",
  "What's your engineering philosophy?",
  "Where are you headed in your career?",
];

export const topics: Topic[] = [
  {
    id: "experience",
    keywords: ["experience", "background", "work history", "years", "career so far", "mercedes", "job"],
    question: "What's your experience?",
    answer:
      "I have 4+ years of frontend engineering experience, currently as a Frontend Engineer at Mercedes-Benz R&D India. I work on enterprise-scale applications — design systems used across 20+ apps, security remediation (100+ findings driven to zero), UI modernisation, and performance work that took a heavy dashboard from 4s freezes to sub-second interactions.",
  },
  {
    id: "skills",
    keywords: ["skill", "tech", "stack", "tools", "languages", "framework", "react", "typescript", "angular"],
    question: "What are your core skills?",
    answer:
      "Core stack: React, TypeScript, Next.js, Angular, and Node.js. Beyond syntax, my real strengths are design systems, accessibility (WCAG 2.1 AA as a baseline), performance optimisation, and frontend security. I sit at the seam between design and engineering — turning tokens and intent into resilient, themeable component systems.",
  },
  {
    id: "projects",
    keywords: ["project", "case study", "case studies", "built", "shipped", "portfolio piece", "work"],
    question: "Tell me about your projects",
    answer:
      "Three case studies tell the story best: (1) a design system unifying 20+ enterprise apps, cutting delivery time 40%; (2) a security remediation programme that closed 100+ findings and kept the backlog at zero; and (3) a performance re-architecture taking interaction latency from ~4s to ~0.7s. Head to the Work section for the full write-ups with architecture and metrics.",
  },
  {
    id: "philosophy",
    keywords: ["philosophy", "approach", "believe", "principle", "value", "how do you", "mindset"],
    question: "What's your engineering philosophy?",
    answer:
      "Craftsmanship, ownership, and impact. I believe accessibility is the floor and performance is a feature, not a cleanup task. Motion should explain change, not perform for applause. And elegant code that helps no one is just a hobby — I optimise for the difference a thing makes, not its cleverness.",
  },
  {
    id: "career",
    keywords: ["career", "future", "goal", "direction", "founder", "next", "ambition", "headed", "transition"],
    question: "Where are you headed in your career?",
    answer:
      "My trajectory is Frontend Engineer → Product Engineer → UX Engineer → Technology Founder. I'm increasingly drawn to product thinking and to building beyond software — particularly sustainability and bio-compostable products. The goal is a company where thoughtful engineering, human-centred design, and environmental responsibility are the same decision.",
  },
  {
    id: "ai",
    keywords: ["ai", "artificial intelligence", "llm", "copilot", "gpt", "automation"],
    question: "How do you use AI?",
    answer:
      "As leverage, not a replacement. I use AI for scaffolding, first-pass code review, architecture pressure-testing, docs, research, and rapid prototyping — so my hours go to the 20% that needs judgement. My rule: I never ship what I can't explain. AI accelerates the draft; I own the correctness.",
  },
  {
    id: "sustainability",
    keywords: ["sustainability", "climate", "compostable", "environment", "green", "entrepreneur", "venture", "business"],
    question: "What's the sustainability angle?",
    answer:
      "I'm exploring bio-compostable products and climate technology — applying a builder's systems mindset to physical, climate-positive problems. The same instinct that removes friction from an interface drives me to remove waste from a supply chain. See the Ventures page for the founder narrative.",
  },
  {
    id: "contact",
    keywords: ["contact", "hire", "reach", "email", "available", "connect", "talk", "collaborate", "consult"],
    question: "How can I reach you?",
    answer:
      "I'm open to senior frontend / product engineering roles, consulting, collaborations, speaking, and startup conversations. The Contact page has a tailored path for each — or email hello@manoranjan.dev directly. I read everything.",
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "city", "bangalore", "remote", "timezone"],
    question: "Where are you based?",
    answer:
      "I'm based in Bangalore, India (IST). I work effectively across time zones and am comfortable with remote and hybrid collaboration.",
  },
];

const fallback =
  "Good question — I don't have a canned answer for that one. Try asking about my experience, skills, projects, philosophy, career direction, how I use AI, or how to get in touch. Or just email hello@manoranjan.dev.";

export function answer(query: string): { text: string; topicId?: string } {
  const q = query.toLowerCase();
  let best: { topic: Topic; score: number } | null = null;
  for (const topic of topics) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (q.includes(kw)) score += kw.split(" ").length;
    }
    if (score > 0 && (!best || score > best.score)) best = { topic, score };
  }
  if (best) return { text: best.topic.answer, topicId: best.topic.id };
  return { text: fallback };
}
