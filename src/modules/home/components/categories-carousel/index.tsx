import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import CategoriesCarouselClient from "./categories-carousel-client"

// Imágenes temáticas por handle de categoría raíz (aprobadas 07-ago — Unsplash; reemplazar
// por generadas con IA cuando se recargue fal.ai). Categorías nuevas sin imagen → fallback
// al thumbnail del primer producto publicado → si no hay, gradiente.
const CATEGORY_IMAGES: Record<string, string> = {
  computacion: "/categories/computacion.jpg",
  electronicos: "/categories/electronicos.jpg",
  "moda-accesorios": "/categories/moda.jpg",
  juguetes: "/categories/juguetes.jpg",
  hogar: "/categories/hogar.jpg",
  "camaras-accesorios": "/categories/camaras.jpg",
  drones: "/categories/drones.jpg",
  "deportes-y-aire-libre-bolsas-secas": "/categories/bolsas.jpg",
}

export type CategoryCard = {
  name: string
  handle: string
  image: string
}

async function findFallbackImage(categoryId: string): Promise<string | null> {
  const { response } = await listProducts({
    countryCode: "co",
    queryParams: { category_id: [categoryId], limit: 1, fields: "thumbnail" },
  }).catch(() => ({ response: { products: [] } }))
  const thumb = response.products?.[0]?.thumbnail
  return typeof thumb === "string" && thumb.startsWith("http") ? thumb : null
}

export default async function CategoriesCarousel() {
  const categories = await listCategories({
    fields: "id,name,handle,parent_category_id",
  }).catch(() => [])

  const roots = categories.filter((c: any) => !c.parent_category_id)

  const cards: CategoryCard[] = []
  for (const cat of roots) {
    const handle = cat.handle as string
    const image = CATEGORY_IMAGES[handle] ?? (await findFallbackImage(cat.id as string))
    if (image) {
      cards.push({ name: cat.name as string, handle, image })
    }
  }

  if (cards.length === 0) return null

  return <CategoriesCarouselClient cards={cards} />
}
