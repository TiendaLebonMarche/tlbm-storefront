import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { getAllGuides } from "@lib/guides"

// Sitemap XML custom con <image:image> (guía oficial Google 07-ago — Google Imágenes).
// Force static: se genera en BUILD (los .md de guías solo existen en build — bug 04-ago, fix 05-ago).
// Sustituye a sitemap.ts (MetadataRoute no emite image:image).
export const dynamic = "force-static"

const BASE_URL = "https://www.tiendalebonmarche.com"

const formatDate = (date: any): string => {
  const d = new Date(date)
  return isNaN(d.getTime()) ? new Date().toISOString().split("T")[0] : d.toISOString().split("T")[0]
}

const sanitize = (h: string | null | undefined): string => {
  if (!h) return ""
  return h.trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")
}

// Escapa caracteres XML (URLs de Cloudinary pueden contener &)
const xml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")

export async function GET() {
  const { response: { products } } = await listProducts({
    countryCode: "co",
    queryParams: { limit: 10000 },
  }).catch(() => ({ response: { products: [] } }))

  const categories = await listCategories().catch(() => [])

  const staticPages: Array<[string, string, string, string]> = [
    ["/co", formatDate(new Date()), "daily", "1.0"],
    ["/co/store", formatDate(new Date()), "daily", "0.9"],
    ["/co/quienes-somos", formatDate(new Date()), "monthly", "0.7"],
    ["/co/legal/terminos", formatDate(new Date()), "yearly", "0.3"],
    ["/co/legal/privacidad", formatDate(new Date()), "yearly", "0.3"],
  ]

  const productPages = products
    .filter((p: any) => !!p?.handle)
    .map((p: any) => {
      const thumb = typeof p.thumbnail === "string" && p.thumbnail.startsWith("http") ? p.thumbnail : null
      const imageBlock = thumb
        ? `    <image:image>\n      <image:loc>${xml(thumb)}</image:loc>\n      ${p.title ? `      <image:title>${xml(String(p.title).slice(0, 200))}</image:title>\n` : ""}    </image:image>\n`
        : ""
      return `  <url>\n    <loc>${BASE_URL}/co/productos/${sanitize(p.handle)}</loc>\n    <lastmod>${formatDate(p.updated_at)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n${imageBlock}  </url>`
    })

  const categoryPages = categories
    .filter((c: any) => !!c?.handle)
    .map((c: any) => `  <url>\n    <loc>${BASE_URL}/co/categories/${sanitize(c.handle)}</loc>\n    <lastmod>${formatDate(new Date())}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`)

  const guidePages = [
    `  <url>\n    <loc>${BASE_URL}/co/guias</loc>\n    <lastmod>${formatDate(new Date())}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    ...getAllGuides().map((g: any) => `  <url>\n    <loc>${BASE_URL}/co/guias/${sanitize(g.slug)}</loc>\n    <lastmod>${formatDate(g.date)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`),
  ]

  const all = [...staticPages.map(([path, lastmod, freq, prio]) =>
    `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`), ...productPages, ...categoryPages, ...guidePages]

  const xmlDoc = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${all.join("\n")}\n</urlset>`

  return new Response(xmlDoc, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
