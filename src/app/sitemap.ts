import type { MetadataRoute } from "next";
import { caseStudyOrder } from "@/data/case-studies";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return ["", "/about", "/cv", ...caseStudyOrder.map(slug => `/work/${slug}`)].map(path => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
