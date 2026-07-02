import { MetadataRoute } from 'next'
import { getBaseURL } from '@lib/util/env'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseURL()

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/cart', '/checkout', '/account', '/api', '/api/'],
            },
            // AI crawlers — allow full indexing for AI discoverability
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/checkout', '/account', '/api', '/api/'],
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
                disallow: ['/checkout', '/account', '/api', '/api/'],
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
                disallow: ['/checkout', '/account', '/api', '/api/'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/checkout', '/account', '/api', '/api/'],
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/checkout', '/account', '/api', '/api/'],
            },
            {
                userAgent: 'cohere-ai',
                allow: '/',
                disallow: ['/checkout', '/account', '/api', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
