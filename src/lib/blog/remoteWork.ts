import { BLOG_POSTS } from "@/lib/blogPosts";

export const REMOTE_WORK_POSTS = BLOG_POSTS.filter((post) =>
  [
    "building-a-home-office-for-remote-work-pakistan",
    "navigating-time-zones-for-remote-work",
    "mastering-asynchronous-communication-in-remote-teams",
  "avoiding-burnout-and-isolation-in-remote-work",
  "time-management-tips-for-remote-workers-in-pakistan",
  "essential-tools-for-remote-work-collaboration",
  "power-and-internet-redundancy-for-remote-workers",
  "tax-compliance-and-legal-filing-for-remote-contractors",
  "remote-work-ergonomics-and-physical-health",
  "career-advancement-and-visibility-in-distributed-teams",
  ].includes(post.slug),
);