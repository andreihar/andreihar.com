import type { MetadataRoute } from 'next';
import { getAllPostsMeta } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://www.yourwebsite.com';

  const projects = (await getAllPostsMeta('project')).map((meta) => ({
    url: `${baseUrl}/project/${meta.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const posts = (await getAllPostsMeta('blog')).map((meta) => ({
    url: `${baseUrl}/blog/${meta.id}`,
    lastModified: meta.published,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    ...projects,
    ...posts,
  ];
}