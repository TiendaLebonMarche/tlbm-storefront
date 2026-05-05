import { MetadataRoute } from 'next'
import { listProducts } from '@lib/data/products'
import { listCategories } from '@lib/data/categories'
import { blogPosts } from '@lib/data/blog'

const BASE_URL = "https://www.tiendalebonmarche.com"

/**
 * Generates a clean YYYY-MM-DD date string for sitemap compatibility
 */
const formatDate = (date: any): string => {
  const d = new Date(date)
  return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0]
}

/**
 * Sanitizes handles: trims, removes accidental slashes, and URL-encodes segments
 * to ensure XML compatibility (e.g., handling '&' correctly).
 */
const sanitize = (h: string | null | undefined): string => {
  if (!h) return ""
  return h.trim()
    .replace(/^\/+|\/+$/g, "")
    .split('/')
    .map(part => encodeURIComponent(part))
    .join('/')
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch products for 'co' region
  const { response: { products } } = await listProducts({
    countryCode: "co",
    queryParams: { limit: 200 },
  }).catch(() => ({ response: { products: [] } }))

  // Fetch all categories
  const categories = await listCategories().catch(() => [])

  // 1. Static Core Pages
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/co`, lastModified: formatDate(new Date()), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/co/store`, lastModified: formatDate(new Date()), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/co/quienes-somos`, lastModified: formatDate(new Date()), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/co/blog`, lastModified: formatDate(new Date()), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/co/legal/terminos`, lastModified: formatDate(new Date()), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/co/legal/privacidad`, lastModified: formatDate(new Date()), changeFrequency: 'yearly', priority: 0.3 },
  ]

  // 2. Dynamic Product Pages
  const productEntries: MetadataRoute.Sitemap = products
    .filter(p => !!p.handle)
    .map(p => ({
      url: `${BASE_URL}/co/productos/${sanitize(p.handle)}`,
      lastModified: formatDate(p.updated_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  // 3. Dynamic Category Pages
  const categoryEntries: MetadataRoute.Sitemap = categories
    .filter(c => !!c.handle)
    .map(c => ({
      url: `${BASE_URL}/co/categories/${sanitize(c.handle)}`,
      lastModified: formatDate(new Date()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  // 4. Blog Posts
  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .filter(b => !!b.handle)
    .map(b => ({
      url: `${BASE_URL}/co/blog/${sanitize(b.handle)}`,
      lastModified: formatDate(new Date()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  // Combined unique entries to prevent duplicates and ensure clean XML structure
  const allEntries = [...staticEntries, ...productEntries, ...categoryEntries, ...blogEntries]
  
  // Deduplicate by URL using Map
  const uniqueEntries = Array.from(new Map(allEntries.map(e => [e.url, e])).values())

  return uniqueEntries
}
