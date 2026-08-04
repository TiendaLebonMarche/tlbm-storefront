import { listProducts } from "@lib/data/products"
import { ProductMostSold } from "@/components/ui/product-card-3"
import { convertToLocale } from "@lib/util/money"
import { getRegion } from "@lib/data/regions"

/**
 * Marquesina "Lo + vendidos" filtrada por categorías — se muestra debajo de cada guía,
 * relacionada con el tema (ej: guía de parlantes → marquesina de parlantes).
 */
export default async function RelatedMostSold({
  countryCode,
  categories,
  title = "Lo + vendidos del tema",
  subtitle = "Productos originales relacionados con esta guía.",
}: {
  countryCode: string
  categories: string[]
  title?: string
  subtitle?: string
}) {
  const region = await getRegion(countryCode)

  if (!region || categories.length === 0) return null

  const data = await listProducts({
    countryCode,
    queryParams: {
      limit: 50,
      fields:
        "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+thumbnail,*images,+metadata,+tags,*categories,",
    },
  }).catch(() => null)

  const products = data?.response?.products

  if (!products || products.length === 0) return null

  // Filtrar por categorías relacionadas (match por handle de categoría)
  const catSet = new Set(categories)
  const related = products.filter((p) => {
    const cats = (p as any).categories || []
    return cats.some((c: any) => catSet.has(c.handle) || catSet.has(c.name?.toLowerCase()))
  })

  // Si no hay suficientes relacionados, complementar con el resto del catálogo
  const pool = related.length >= 4 ? related : [...related, ...products.filter((p) => !related.includes(p))]
  const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10)

  const items = shuffled.map((p) => {
    const variant = p.variants?.[0]
    const calculatedPrice = variant?.calculated_price as any

    const image = p.thumbnail || (p.images && p.images[0]?.url) || ""

    const formattedPrice = calculatedPrice
      ? convertToLocale({
          amount: calculatedPrice.calculated_amount,
          currency_code: region.currency_code,
          locale: "es-CO",
        })
      : "Contactar"

    return {
      id: p.id as string,
      name: p.title as string,
      handle: p.handle as string,
      category: (p as any).categories?.[0]?.name || "Original",
      imageSrc: image,
      price: formattedPrice,
    }
  })

  if (items.length < 4) return null

  return <ProductMostSold title={title} subtitle={subtitle} items={items} />
}
