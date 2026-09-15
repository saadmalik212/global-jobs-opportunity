import { BLOG_POSTS } from "@/lib/blogPosts";

export const REMOTE_WORK_POSTS = BLOG_POSTS.filter((post) =>
  [
    "architecting-fail-safe-power-and-dual-wan-internet-infrastructure",
  "structuring-asynchronous-internal-wikis-to-eliminate-meeting-overhead",
  "engineering-a-sustainable-remote-workplace-ergonomics-and-movement-routine",
  "navigating-performance-reviews-and-promotions-in-asynchronous-engineering-orgs",
    "designing-zero-downtime-power-and-internet-redundancy-for-remote-work",
  "managing-foreign-exchange-risk-and-international-invoicing-for-remote-contractors",
  "building-an-async-knowledge-base-and-documentation-culture",
  "navigating-promotions-and-career-advancement-in-fully-remote-teams",
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