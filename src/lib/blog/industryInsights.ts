import { BLOG_POSTS } from "@/lib/blogPosts";

export const INDUSTRY_INSIGHTS_POSTS = BLOG_POSTS.filter((post) =>
  [
    "top-remote-companies-hiring-software-engineers",
    "how-to-receive-international-payments-in-pakistan-2026",
    "global-tech-salary-trends-for-remote-developers",
  "understanding-employer-of-record-vs-direct-contracting",
  "how-ai-is-reshaping-remote-software-engineering",
  "why-global-tech-companies-hire-developers-from-pakistan",
  ].includes(post.slug),
);