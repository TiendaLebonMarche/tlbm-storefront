import { MetadataRoute } from 'next'
import { getBaseURL } from '@lib/util/env'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = getBaseURL()

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/cart', '/checkout', '/account', '/admin'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
