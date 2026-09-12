import { BLOG_POSTS } from "@/lib/blogPosts";

export const INTERVIEW_POSTS = BLOG_POSTS.filter((post) =>
  ["how-to-ace-asynchronous-interviews", 
    "how-to-prepare-for-a-remote-job-interview",
    "how-to-prepare-for-remote-technical-interviews",
  "mastering-behavioral-interviews-for-remote-jobs",
  "top-questions-to-ask-in-a-remote-job-interview",
  "how-to-follow-up-after-a-remote-job-interview",
  "handling-salary-expectations-in-remote-interviews",
  "cracking-system-design-interviews-for-remote-roles",
  "demonstrating-soft-skills-in-one-way-video-interviews",
  "recovering-from-interview-mistakes-in-real-time",

].includes(
    post.slug,
  ),
);