import type { MetadataRoute } from "next";
import { fetchJobs } from "@/lib/jobs";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/contact", "/terms", "/privacy", "/blog", "/ats-resume"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "hourly" : "monthly",
      priority: path === "" ? 1 : 0.5,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  let jobRoutes: MetadataRoute.Sitemap = [];
  try {
    const jobs = await fetchJobs();
    jobRoutes = jobs.map((job) => ({
      url: `${SITE_URL}/jobs/${job.id}`,
      lastModified: new Date(job.updatedAt),
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch {
    // If Firestore is unreachable at build time, still return the static routes.
  }

  return [...staticRoutes, ...blogRoutes, ...jobRoutes];
}