import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // String references so options stay serializable for Turbopack.
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [["rehype-slug"]],
  },
});

export default withMDX(nextConfig);
