import { BLOG_POSTS } from "@/lib/blogPosts";

export const INTERVIEW_POSTS = BLOG_POSTS.filter((post) =>
  ["how-to-ace-asynchronous-interviews", "how-to-prepare-for-a-remote-job-interview"].includes(
    post.slug,
  ),
);