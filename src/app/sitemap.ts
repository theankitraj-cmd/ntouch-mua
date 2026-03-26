import { MetadataRoute } from 'next'
import { locations } from '../lib/locations'
import { portfolioData } from '../lib/portfolio-categories'

export default function sitemap(): MetadataRoute.Sitemap {
  const locationRoutes = Object.keys(locations).map((area) => ({
    url: `https://ntouchmua.com/locations/${area}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const portfolioRoutes = Object.keys(portfolioData).map((cat) => ({
    url: `https://ntouchmua.com/portfolio/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: 'https://ntouchmua.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://ntouchmua.com/review',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...locationRoutes,
    ...portfolioRoutes,
  ]
}
