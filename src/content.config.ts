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
    sections: z.array(z.discriminatedUnion('type', [
      z.object({ type: z.literal('aboutHero') }).strict(),
      z.object({ type: z.literal('statsRibbon') }).strict(),
      z.object({ type: z.literal('philosophyHistory') }).strict(),
      z.object({ type: z.literal('team') }).strict(),
      z.object({
        type: z.literal('process'),
        eyebrow: z.string().min(1),
        headline: z.string().min(1),
        id: z.string().optional(),
        steps: z.array(z.object({
          number: z.string().min(1),
          headline: z.string().min(1),
          subheadline: z.string().min(1),
        }).strict()).min(1),
      }).strict(),
      z.object({
        type: z.literal('callout'),
        eyebrow: z.string().optional(),
        headline: z.string().min(1),
        subheadline: z.string().optional(),
        linkText: z.string().min(1),
        href: z.string().min(1),
        id: z.string().optional(),
      }).strict(),
    ])),
  }),
});

export const collections = { blog, pages };
