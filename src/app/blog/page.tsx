import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Career Guides & Job Tips | ${SITE_NAME}`,
  description:
    "Practical guides on finding remote jobs, writing strong applications, and navigating the international job market from Pakistan.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndexPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="mb-2 font-display text-3xl font-bold text-ink">
        Career Guides &amp; Job Tips
      </h1>
      <p className="mb-10 text-ink/70">
        Practical advice for finding and landing your next role — in Pakistan or abroad.
      </p>

      <div className="space-y-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/40 hover:shadow-md"
          >
            <p className="mb-1 font-mono text-xs text-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.readingTime}
            </p>
            <h2 className="mb-2 font-display text-xl font-bold text-ink">{post.title}</h2>
            <p className="text-sm text-ink/75">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}