import { BLOG_POSTS } from "@/lib/blogPosts";

export const INDUSTRY_INSIGHTS_POSTS = BLOG_POSTS.filter((post) =>
  [
    "top-remote-companies-hiring-software-engineers",
    "how-to-receive-international-payments-in-pakistan-2026",
  ].includes(post.slug),
);