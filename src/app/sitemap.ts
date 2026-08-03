import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";
import { blogPosts } from "./blog/posts";

const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/download", priority: 0.95, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/individuals/developers", priority: 0.85, changeFrequency: "monthly" },
  { path: "/individuals/students", priority: 0.85, changeFrequency: "monthly" },
  { path: "/individuals/creators", priority: 0.85, changeFrequency: "monthly" },
  { path: "/individuals/lawyers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/individuals/sales", priority: 0.8, changeFrequency: "monthly" },
  { path: "/individuals/leaders", priority: 0.8, changeFrequency: "monthly" },
  { path: "/individuals/customer-support", priority: 0.8, changeFrequency: "monthly" },
  { path: "/individuals/accessibility", priority: 0.75, changeFrequency: "monthly" },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}