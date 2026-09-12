import { BLOG_POSTS } from "@/lib/blogPosts";

export const JOB_TIPS_POSTS = BLOG_POSTS.filter((post) =>
  [
    "how-to-get-a-remote-job-from-pakistan-2026",
    "how-to-spot-a-legitimate-job-posting",
    "how-to-find-legitimate-work-from-home-jobs-in-pakistan",
    "how-to-track-job-applications-and-follow-ups",
    "best-entry-level-remote-jobs-to-start-your-career",
    "how-to-tailor-resume-for-international-remote-jobs",
  "how-to-ace-remote-job-interviews-from-pakistan",
  "how-to-write-cover-letters-for-remote-jobs",
  "preparing-your-home-setup-for-global-remote-jobs",
  "optimizing-linkedin-profile-for-international-remote-recruiting",
  "building-a-remote-work-portfolio-that-proves-trust",
  "managing-time-zone-overlaps-and-async-workflows",
  "cold-outreach-strategies-for-unadvertised-remote-roles",
  ].includes(post.slug),
);