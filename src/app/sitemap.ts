import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { caseStudies } from "@/lib/data/case-studies";
import { posts } from "@/lib/data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/about",
    "/ux-engineering",
    "/ai",
    "/entrepreneurship",
    "/writing",
    "/dashboard",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const work = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const writing = posts.map((p) => ({
    url: `${site.url}/writing/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...work, ...writing];
}
