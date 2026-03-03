import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require('../../site.config.js');

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts()
    const baseUrl = 'https://midirectorioia.com'

    // 1. Blueprints (Posts)
    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified || post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // 2. Categories
    const categoryUrls = siteConfig.blogCategories.map((cat: any) => ({
        url: `${baseUrl}/blog/?cat=${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }))

    // 3. Legal & Static Pages
    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/politica-de-privacidad`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/aviso-legal`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/aviso-afiliados`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
    ]

    return [...staticUrls, ...categoryUrls, ...postUrls]
}
