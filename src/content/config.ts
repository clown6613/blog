import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1).max(200),
    pubDate: z.date(),
    published: z.boolean(),
    category: z.enum(['tech', 'hobby']),
    description: z.string().max(300).optional(),
    tags: z.array(z.string().max(50)).max(10).optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
