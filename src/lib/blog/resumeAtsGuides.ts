import { BLOG_POSTS } from "@/lib/blogPosts";

export const RESUME_ATS_POSTS = BLOG_POSTS.filter((post) =>
  [
    "how-to-write-a-resume-that-gets-noticed",
    "how-to-build-an-ats-friendly-resume",
    "how-to-write-a-cover-letter-for-remote-jobs",
    "how-to-improve-linkedin-profile-for-remote-jobs",
    "how-to-create-a-remote-job-portfolio-with-no-experience",
    "how-to-write-a-resume-that-gets-noticed",
   
  ].includes(post.slug),
);