import type { MetadataRoute } from "next";
import { fetchJobsUncached } from "@/lib/jobs";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600;

// Defensive normalization — strips a trailing slash if SITE_URL ever
// changes, so `${normalizedSiteUrl}${path}` never produces "//about".
const normalizedSiteUrl = SITE_URL.replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/contact", "/terms", "/privacy", "/blog", "/ats-resume"].map(
    (path) => ({
      url: `${normalizedSiteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "hourly" : "monthly",
      priority: path === "" ? 1 : 0.5,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${normalizedSiteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  let jobRoutes: MetadataRoute.Sitemap = [];
  try {
    // Uncached + a high cap — sitemap generation is already cached for 1
    // hour by `revalidate` above, so this only hits Firestore once per
    // hour regardless of traffic, and needs the FULL job list (not
    // capped at 100) so every job is discoverable by Google.
    const jobs = await fetchJobsUncached(2000);
    jobRoutes = jobs.map((job) => ({
      url: `${normalizedSiteUrl}/jobs/${job.slug || job.id}`,
      lastModified: new Date(job.updatedAt || Date.now()),
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch (err) {
    console.error("sitemap: failed to fetch job routes:", err);
  }

  return [...staticRoutes, ...blogRoutes, ...jobRoutes];
}