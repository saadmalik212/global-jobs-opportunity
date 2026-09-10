"use client";

import Link from "next/link";
import { useState } from "react";
import { CAREER_GROWTH_POSTS } from "@/lib/blog/careerGrowth";
import { INDUSTRY_INSIGHTS_POSTS } from "@/lib/blog/industryInsights";
import { INTERVIEW_POSTS } from "@/lib/blog/interviewPreparation";
import { JOB_TIPS_POSTS } from "@/lib/blog/jobTips";
import { REMOTE_WORK_POSTS } from "@/lib/blog/remoteWork";
import { RESUME_ATS_POSTS } from "@/lib/blog/resumeAtsGuides";

const BLOG_TABS = [
  { id: "job-tips", label: "Job Tips", posts: JOB_TIPS_POSTS },
  { id: "resume-ats", label: "Resume & ATS Guides", posts: RESUME_ATS_POSTS },
  { id: "interview", label: "Interview Preparation", posts: INTERVIEW_POSTS },
  { id: "remote-work", label: "Remote Work", posts: REMOTE_WORK_POSTS },
  { id: "career-growth", label: "Career Growth", posts: CAREER_GROWTH_POSTS },
  { id: "industry-insights", label: "Industry Insights", posts: INDUSTRY_INSIGHTS_POSTS },
] as const;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogTabs() {
  const [activeTab, setActiveTab] = useState(BLOG_TABS[0].id);
  const activeCategory = BLOG_TABS.find((tab) => tab.id === activeTab) ?? BLOG_TABS[0];

  return (
    <div className="blog-layout grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
      <aside className="blog-sidebar lg:sticky lg:top-24" aria-label="Blog categories">
        <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Explore topics
        </p>
        <nav className="blog-tabs flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1" role="tablist">
          {BLOG_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`blog-tab whitespace-nowrap rounded-xl px-3 py-3 text-left text-sm font-semibold transition lg:block lg:w-full ${
                  isActive
                    ? "bg-ink text-white shadow-[0_8px_18px_rgba(23,35,29,0.12)]"
                    : "text-ink/65 hover:bg-surface hover:text-ink"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-2 font-mono text-xs ${isActive ? "text-primary" : "text-muted"}`}>
                  {tab.posts.length}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0" role="tabpanel" aria-label={activeCategory.label}>
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-primary-dark">{activeCategory.label}</p>
            <p className="text-sm text-muted">{activeCategory.posts.length} practical guides</p>
          </div>
          <span className="hidden font-mono text-xs text-muted sm:block">Updated regularly</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {activeCategory.posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_35px_rgba(23,35,29,0.09)]"
            >
              <span className={`blog-card-accent blog-card-accent-${(index % 4) + 1}`} />
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="blog-number font-mono text-xs font-medium">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-mono text-xs text-muted">
                  {formatDate(post.publishedAt)} · {post.readingTime}
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
      </div>
    </div>
  );
}