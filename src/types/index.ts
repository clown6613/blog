import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'posts'>;

export type CategoryId = 'tech' | 'hobby';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}
