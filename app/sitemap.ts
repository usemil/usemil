import type { MetadataRoute } from 'next';
import { tools } from '@/data/tools'; 

export const dynamic = 'force-static'; // <-- ADD THIS LINE

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://usemil.online';

  // 1. Create the base URL entry
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // 2. Loop through your tools data and only add the available ones
  const availableTools = tools.filter((tool) => tool.available);

  const toolRoutes = availableTools.map((tool) => ({
    url: `${baseUrl}${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Combine and return them all
  return [...routes, ...toolRoutes];
}