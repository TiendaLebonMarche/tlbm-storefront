import { MetadataRoute } from 'next'
import { listProducts } from '@lib/data/products'
import { listCategories } from '@lib/data/categories'
import { getBaseURL } from '@lib/util/env'
import { blogPosts } from '@lib/data/blog'

const BASE_URL = "https://www.tiendalebonmarche.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseURL()

    // Fetch all products
    const { response: { products } } = await listProducts({
        countryCode: "co",
        queryParams: { limit: 200 },
    }).catch(() => ({ response: { products: [] } }))

    // Fetch all categories
    const categories = await listCategories().catch(() => [])

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${BASE_URL}/co/productos/${product.handle}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${BASE_URL}/co/categories/${category.handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${BASE_URL}/co/blog/${post.handle}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    return [
        {
            url: `${BASE_URL}/co`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/co/store`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/co/quienes-somos`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/co/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/co/legal/terminos`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/co/legal/privacidad`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        ...productEntries,
        ...categoryEntries,
        ...blogEntries,
    ]
}
