import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/lib/blogPosts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: `Post not found — ${SITE_NAME}` };

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/blog" className="mb-6 inline-block text-sm text-muted hover:text-primary">
        ← Back to all guides
      </Link>

      <p className="mb-2 font-mono text-xs text-muted">
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {post.readingTime}
      </p>
      <h1 className="mb-6 font-display text-3xl font-bold leading-tight text-ink">
        {post.title}
      </h1>

      <div className="space-y-5">
        {post.content.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="mb-2 font-display text-lg font-bold text-ink">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="mb-2 text-sm leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary-light p-5 text-center">
        <p className="mb-3 text-sm font-medium text-primary-dark">
          Ready to start applying? Browse verified remote and on-site openings, updated daily.
        </p>
        <Link
          href="/?remote=true#jobs"
          className="inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Browse Remote Jobs
        </Link>
      </div>
    </article>
  );
}