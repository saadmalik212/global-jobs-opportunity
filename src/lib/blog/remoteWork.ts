import { BLOG_POSTS } from "@/lib/blogPosts";

export const REMOTE_WORK_POSTS = BLOG_POSTS.filter((post) =>
  [
    "building-a-home-office-for-remote-work-pakistan",
    "navigating-time-zones-for-remote-work",
  ].includes(post.slug),
);