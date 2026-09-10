import { BLOG_POSTS } from "@/lib/blogPosts";

export const JOB_TIPS_POSTS = BLOG_POSTS.filter((post) =>
  [
    "how-to-get-a-remote-job-from-pakistan-2026",
    "how-to-spot-a-legitimate-job-posting",
    "how-to-find-legitimate-work-from-home-jobs-in-pakistan",
    "how-to-track-job-applications-and-follow-ups",
    "best-entry-level-remote-jobs-to-start-your-career",
  ].includes(post.slug),
);