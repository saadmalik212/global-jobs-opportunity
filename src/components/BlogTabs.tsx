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

type BlogTabId = (typeof BLOG_TABS)[number]["id"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogTabs() {
  const [activeTab, setActiveTab] = useState<BlogTabId>(BLOG_TABS[0].id);
  const activeCategory = BLOG_TABS.find((tab) => tab.id === activeTab) ?? BLOG_TABS[0];

  return (
    
    <div className="blog-layout grid gap-6 sm:gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:items-start lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="blog-sidebar md:sticky md:top-20 lg:top-24" aria-label="Blog categories">
        <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted sm:mb-3 sm:text-[11px]">
          Explore topics
        </p>
        <nav
          className="blog-tabs grid grid-cols-2 gap-2 md:block md:space-y-1"
          role="tablist"
        >
          {BLOG_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`blog-tab w-full rounded-xl px-3 py-2.5 text-left text-xs font-semibold leading-snug transition sm:text-sm md:py-3 ${
                  isActive
                    ? "bg-ink text-white shadow-[0_8px_18px_rgba(23,35,29,0.12)]"
                    : "text-ink/65 hover:bg-surface hover:text-ink"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-2 font-mono text-[11px] sm:text-xs ${isActive ? "text-primary" : "text-muted"}`}>
                  {tab.posts.length}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0" role="tabpanel" aria-label={activeCategory.label}>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3 sm:mb-5 sm:gap-4 sm:pb-4">
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-dark sm:text-xs">
              {activeCategory.label}
            </p>
            <p className="text-xs text-muted sm:text-sm">{activeCategory.posts.length} practical guides</p>
          </div>
          <span className="hidden font-mono text-xs text-muted sm:block">Updated regularly</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {activeCategory.posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_35px_rgba(23,35,29,0.09)] sm:min-h-[220px] sm:p-6"
            >
              <span className={`blog-card-accent blog-card-accent-${(index % 4) + 1}`} />
              <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
                <span className="blog-number font-mono text-xs font-medium">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-mono text-[11px] text-muted sm:text-xs">
                  {formatDate(post.publishedAt)} · {post.readingTime}
                </p>
              </div>
              <h2 className="mb-2 font-display text-lg font-bold leading-snug text-ink transition group-hover:text-primary-dark sm:mb-3 sm:text-xl">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink/75">{post.description}</p>
              <span className="mt-auto pt-4 text-sm font-semibold text-primary-dark sm:pt-6">
                Read guide <span aria-hidden="true" className="transition group-hover:ml-1">-&gt;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}