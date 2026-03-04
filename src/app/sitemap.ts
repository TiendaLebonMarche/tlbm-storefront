import { MetadataRoute } from 'next'
import { listProducts } from '@lib/data/products'
import { listCategories } from '@lib/data/categories'
import { getBaseURL } from '@lib/util/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseURL()

    // Fetch all products
    const { response: { products } } = await listProducts({
        countryCode: "us", // Default base to US
        queryParams: { limit: 100 },
    })

    // Fetch all categories
    const categories = await listCategories()

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/products/${product.handle}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/categories/${category.handle}`,
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/store`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...productEntries,
        ...categoryEntries,
    ]
}
