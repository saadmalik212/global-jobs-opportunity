import { BLOG_POSTS } from "@/lib/blogPosts";

export const REMOTE_WORK_POSTS = BLOG_POSTS.filter((post) =>
  [
    "building-a-home-office-for-remote-work-pakistan",
    "navigating-time-zones-for-remote-work",
    "mastering-asynchronous-communication-in-remote-teams",
  "avoiding-burnout-and-isolation-in-remote-work",
  "time-management-tips-for-remote-workers-in-pakistan",
  "essential-tools-for-remote-work-collaboration",
  ].includes(post.slug),
);