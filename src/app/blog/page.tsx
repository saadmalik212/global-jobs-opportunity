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

      <div className="blog-grid grid gap-5 md:grid-cols-2">
        {BLOG_POSTS.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_35px_rgba(23,35,29,0.09)]"
          >
            <span className={`blog-card-accent blog-card-accent-${(index % 4) + 1}`} />
            <div className="mb-6 flex items-center justify-between gap-3">
              <span className="blog-number font-mono text-xs font-medium">0{index + 1}</span>
              <p className="font-mono text-xs text-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              · {post.readingTime}
              </p>
            </div>
            <h2 className="mb-3 font-display text-xl font-bold leading-snug text-ink transition group-hover:text-primary-dark">
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed text-ink/75">{post.description}</p>
            <span className="mt-auto pt-6 text-sm font-semibold text-primary-dark">
              Read guide <span aria-hidden="true" className="transition group-hover:ml-1">-&gt;</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}