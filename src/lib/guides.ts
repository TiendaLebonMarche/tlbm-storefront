import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Guide {
  slug: string
  title: string
  description: string
  date: string
  category: string
  keywords: string[]
  relatedCategories: string[] // categorías Medusa para la marquesina "Lo + vendidos"
  readingTime: string
  content: string
  author: string
  image?: string
}

const GUIDES_DIR = path.join(process.cwd(), "src/content/guias")

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return []

  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".md"))

  const guides = files.map((file) => {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf-8")
    const { data, content } = matter(raw)

    const title = data.title || file.replace(/\.md$/, "").replace(/-/g, " ")
    const slug = data.slug || slugify(title)

    return {
      slug,
      title,
      description: data.description || "",
      date: data.date || "",
      category: data.category || "Guías",
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      relatedCategories: Array.isArray(data.relatedCategories) ? data.relatedCategories : [],
      readingTime: data.readingTime || `${Math.max(1, Math.round(content.split(/\s+/).length / 200))} min`,
      content,
      author: data.author || "Tienda Le Bon Marché",
      image: data.image || undefined,
    } satisfies Guide
  })

  return guides.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getGuideBySlug(slug: string): Guide | null {
  return getAllGuides().find((g) => g.slug === slug) || null
}
