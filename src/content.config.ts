import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ 
    base: './src/content/blog', 
    pattern: '**/*.{md,mdx}' 
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      tags: z.array(z.string()).optional(),
      author: z.string().optional(),
      featured: z.boolean().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.md',
  }),
  schema: z.object({
    title: z.string().min(1),
    process: z.object({
      eyebrow: z.string().min(1),
      headline: z.string().min(1),
      id: z.string().optional(),
      steps: z.array(z.object({
        number: z.string().min(1),
        headline: z.string().min(1),
        subheadline: z.string().min(1),
      })).min(1),
    }).optional(),
    callout: z.object({
      eyebrow: z.string().optional(),
      headline: z.string().min(1),
      subheadline: z.string().optional(),
      linkText: z.string().min(1),
      href: z.string().min(1),
      id: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { blog, pages };
