// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Bdel hada b l-domain dyalk l-7a9i9i melli t-lo7o
  const baseUrl = 'https://mehdy-bentaleb.vercel.app/'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1, // Homepage 3ndha top priority
    },
    {
      url: `${baseUrl}/market-insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8, // L-page dyal SEO insights
    },
  ];
}