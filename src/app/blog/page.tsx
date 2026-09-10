import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import BlogTabs from "@/components/BlogTabs";

export const metadata: Metadata = {
  title: `Career Guides & Job Tips | ${SITE_NAME}`,
  description:
    "Practical guides on finding remote jobs, writing strong applications, and navigating the international job market from Pakistan.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndexPage() {
  return (
    <section className="blog-page mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="blog-intro mb-10 sm:mb-12">
        <p className="blog-kicker mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em]">
          Career resources
        </p>
        <h1 className="mb-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          Career Guides &amp; Job Tips
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink/70">
          Practical advice for finding and landing your next role — in Pakistan or abroad.
        </p>
      </div>

      <BlogTabs />
    </section>
  );
}