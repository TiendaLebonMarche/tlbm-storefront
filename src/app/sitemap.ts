import { MetadataRoute } from 'next'
import { listProducts } from '@lib/data/products'
import { listCategories } from '@lib/data/categories'
import { blogPosts } from '@lib/data/blog'

const BASE_URL = "https://www.tiendalebonmarche.com"

/**
 * Generates a valid W3C date string for sitemap
 */
const getValidDate = (date: any): Date => {
    const d = new Date(date)
    return isNaN(d.getTime()) ? new Date() : d
}

/**
 * Sanitizes handles to ensure they exist and don't have leading/trailing slashes
 */
const sanitizeHandle = (handle: string | undefined | null): string => {
    if (!handle) return ""
    return handle.trim().replace(/^\/+|\/+$/g, "")
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all products
    const { response: { products } } = await listProducts({
        countryCode: "co",
        queryParams: { limit: 200 },
    }).catch(() => ({ response: { products: [] } }))

    // Fetch all categories
    const categories = await listCategories().catch(() => [])

    // Static pages
    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: encodeURI(`${BASE_URL}/co`),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: encodeURI(`${BASE_URL}/co/store`),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: encodeURI(`${BASE_URL}/co/quienes-somos`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: encodeURI(`${BASE_URL}/co/blog`),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: encodeURI(`${BASE_URL}/co/legal/terminos`),
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: encodeURI(`${BASE_URL}/co/legal/privacidad`),
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Product pages
    const productEntries: MetadataRoute.Sitemap = products
        .filter(p => !!p.handle)
        .map((product) => ({
            url: encodeURI(`${BASE_URL}/co/productos/${sanitizeHandle(product.handle)}`),
            lastModified: getValidDate(product.updated_at),
            changeFrequency: 'weekly',
            priority: 0.8,
        }))

    // Category pages
    const categoryEntries: MetadataRoute.Sitemap = categories
        .filter(c => !!c.handle)
        .map((category) => ({
            url: encodeURI(`${BASE_URL}/co/categories/${sanitizeHandle(category.handle)}`),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }))

    // Blog entries
    const blogEntries: MetadataRoute.Sitemap = blogPosts
        .filter(post => !!post.handle)
        .map((post) => ({
            url: encodeURI(`${BASE_URL}/co/blog/${sanitizeHandle(post.handle)}`),
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }))

    // Merge and deduplicate by URL
    const allEntries = [
        ...staticEntries,
        ...productEntries,
        ...categoryEntries,
        ...blogEntries,
    ]

    // Final deduplication to be extra safe
    const uniqueEntries = Array.from(new Map(allEntries.map(item => [item.url, item])).values())

    return uniqueEntries
}
