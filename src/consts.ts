// src/consts.ts
import { withBase } from './utils/paths';

// Site metadata
export const SITE_TITLE = '3rd Person Creative';
export const SITE_DESCRIPTION = 'Brand strategy and design for startups and established businesses. We help you find your difference, sharpen your story, and build a brand that stands apart.';

// Legacy theme blog settings; retained while the blog routes still reference them.
export const BLOG_TITLE = `${SITE_TITLE} Blog`;
export const BLOG_DESCRIPTION = SITE_DESCRIPTION;
export const POSTS_PER_PAGE = 6;
export const BLOG_URL = withBase('/blog');

// Author defaults
export const DEFAULT_AUTHOR = SITE_TITLE;

// 🆕 Blog-related constants
export const BLOG_CATEGORIES = [
  'All posts',
  'Architecture',
  'Materials',
  'Philosophy',
  'Innovation',
  'Interior Design',
  'Urbanism',
  'Wellness'
] as const;

export const BLOG_SOCIAL_SHARE = {
  twitter: true,
  linkedin: true,
  facebook: true,
  email: true
} as const;

export const DEFAULT_BLOG_IMAGE = withBase('/favicon.svg');
