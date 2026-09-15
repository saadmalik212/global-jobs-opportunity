import { BLOG_POSTS } from "@/lib/blogPosts";

export const INTERVIEW_POSTS = BLOG_POSTS.filter((post) =>
  [
    "debugging-production-incidents-in-live-remote-interviews",
  "reverse-engineering-remote-team-culture-during-interviews",
  "structuring-live-code-walkthroughs-for-remote-technical-screenings",
  "mastering-technical-articulation-in-cross-border-remote-interviews",
    "preparing-for-live-pair-programming-in-remote-interviews",
  "answering-culture-fit-questions-for-async-first-companies",
  "building-an-interview-cheat-sheet-for-remote-technical-rounds",
  "handling-salary-expectations-and-tier-rates-in-remote-interviews",
    "how-to-ace-asynchronous-interviews", 
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