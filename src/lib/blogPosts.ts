export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  content: BlogSection[];
}

import { BLOG_POSTS_JOBTIPS } from '@/lib/blogData/jobTips';
import { BLOG_POSTS_RESUMEATS } from '@/lib/blogData/resumeAts';
import { BLOG_POSTS_INTERVIEW } from '@/lib/blogData/interview';
import { BLOG_POSTS_REMOTEWORK } from '@/lib/blogData/remoteWork';
import { BLOG_POSTS_CAREERGROWTH } from '@/lib/blogData/careerGrowth';
import { BLOG_POSTS_INDUSTRYINSIGHTS } from '@/lib/blogData/industryInsights';

export const BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS_JOBTIPS,
  ...BLOG_POSTS_RESUMEATS,
  ...BLOG_POSTS_INTERVIEW,
  ...BLOG_POSTS_REMOTEWORK,
  ...BLOG_POSTS_CAREERGROWTH,
  ...BLOG_POSTS_INDUSTRYINSIGHTS,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
