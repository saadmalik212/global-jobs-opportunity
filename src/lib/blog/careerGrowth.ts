import { BLOG_POSTS } from "@/lib/blogPosts";

export const CAREER_GROWTH_POSTS = BLOG_POSTS.filter((post) =>
  [
    "best-skills-to-learn-for-remote-work",
    "soft-skills-that-win-remote-job-offers",
    "how-to-negotiate-salary-for-a-remote-job-from-pakistan",
    "how-to-optimize-linkedin-profile-for-remote-jobs",
  "how-to-avoid-remote-work-scams-in-pakistan",
  "top-platforms-to-find-remote-jobs-in-pakistan",
  "receiving-international-payments-for-remote-work-in-pakistan"
  ].includes(post.slug),
);