import type { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://guna.dev/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://guna.dev/',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: 'https://guna.dev/blog',
      lastModified: posts[0]?.publishedAt ? new Date(posts[0].publishedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
