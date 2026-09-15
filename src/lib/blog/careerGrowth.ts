import { BLOG_POSTS } from "@/lib/blogPosts";

export const CAREER_GROWTH_POSTS = BLOG_POSTS.filter((post) =>
  [
    "transitioning-from-freelancing-to-direct-b2b-engineering-retainers",
  "integrating-local-llms-and-ai-assistants-into-remote-developer-workflows",
  "dismantling-cultural-imposter-syndrome-in-us-and-eu-engineering-teams",
  "building-an-inflation-hedged-wealth-portfolio-for-usd-remote-earners",
    "mastering-cross-cultural-collaboration-for-remote-workers",
    "how-to-manage-multiple-freelance-clients-without-burnout",
    "transitioning-from-freelancing-to-full-time-remote-contracts",
    "upskilling-with-ai-tools-for-remote-developers",
    "setting-up-a-frictionless-developer-environment-for-remote-work",
    "financial-planning-and-wealth-building-for-remote-contractors",
    "best-skills-to-learn-for-remote-work",
    "soft-skills-that-win-remote-job-offers",
    "how-to-negotiate-salary-for-a-remote-job-from-pakistan",
    "how-to-optimize-linkedin-profile-for-remote-jobs",
    "how-to-avoid-remote-work-scams-in-pakistan",
    "top-platforms-to-find-remote-jobs-in-pakistan",
    "receiving-international-payments-for-remote-work-in-pakistan",
    "overcoming-imposter-syndrome-in-international-remote-teams",
    "building-long-term-career-growth-in-remote-roles",

  ].includes(post.slug),
);