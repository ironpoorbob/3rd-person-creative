import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { colorModes } from './types/section';

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
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    sections: z.array(z.discriminatedUnion('type', [
      z.object({
        type: z.literal('pageIntro'),
        props: z.object({
          eyebrow: z.string().min(1),
          headline: z.string().min(1),
          headlineEmphasis: z.string().optional(),
          subheadline: z.string().min(1),
          description: z.string().min(1),
          tagline: z.string().min(1),
          services: z.array(z.string().min(1)).min(1),
          linkText: z.string().min(1),
          href: z.string().min(1),
          id: z.string().optional(),
          colorMode: z.enum(colorModes).optional(),
        }).strict(),
      }).strict(),
      z.object({ type: z.literal('aboutHero'), props: z.object({}).strict().default({}) }).strict(),
      z.object({ type: z.literal('statsRibbon'), props: z.object({}).strict().default({}) }).strict(),
      z.object({ type: z.literal('philosophyHistory'), props: z.object({}).strict().default({}) }).strict(),
      z.object({ type: z.literal('team'), props: z.object({}).strict().default({}) }).strict(),
      z.object({
        type: z.literal('people'),
        props: z.object({
          colorMode: z.enum(colorModes).optional(),
          eyebrow: z.string().min(1),
          headline: z.string().min(1),
          id: z.string().optional(),
          subsections: z.array(z.object({
            name: z.string().min(1),
            role: z.string().min(1),
            biography: z.string().min(1),
            photos: z.array(z.object({
              src: image(),
              alt: z.string().min(1),
            }).strict()).length(2),
          }).strict()).min(1),
        }).strict(),
      }).strict(),
      z.object({
        type: z.literal('services'),
        props: z.object({
          colorMode: z.enum(colorModes).optional(),
          eyebrow: z.string().min(1),
          headline: z.string().min(1),
          id: z.string().optional(),
          subsections: z.array(z.object({
            headline: z.string().min(1),
            tagline: z.string().min(1),
            description: z.string().min(1),
            services: z.array(z.string().min(1)).min(1),
          }).strict()).min(1),
        }).strict(),
      }).strict(),
      z.object({
        type: z.literal('process'),
        props: z.object({
          colorMode: z.enum(colorModes).optional(),
          eyebrow: z.string().min(1),
          headline: z.string().min(1),
          id: z.string().optional(),
          subsections: z.array(z.object({
            number: z.string().min(1),
            headline: z.string().min(1),
            subheadline: z.string().min(1),
          }).strict()).min(1),
        }).strict(),
      }).strict(),
      z.object({
        type: z.literal('callout'),
        props: z.object({
          colorMode: z.enum(colorModes).optional(),
          eyebrow: z.string().optional(),
          headline: z.string().min(1),
          subheadline: z.string().optional(),
          linkText: z.string().min(1),
          href: z.string().min(1),
          id: z.string().optional(),
        }).strict(),
      }).strict(),
    ])),
  }),
});

export const collections = { blog, pages };
