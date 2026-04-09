import { listProducts } from "@lib/data/products"
import { ProductMostSold } from "@/components/ui/product-card-3"
import { convertToLocale } from "@lib/util/money"
import { getRegion } from "@lib/data/regions"

export default async function MostSoldSection({ countryCode }: { countryCode: string }) {
  const region = await getRegion(countryCode)

  if (!region) return null

  // Fetch products safely
  const data = await listProducts({
    countryCode,
    queryParams: { limit: 50 } // Fetch more to shuffle
  }).catch(() => null)

  const products = data?.response?.products

  if (!products || products.length === 0) return null

  // Shuffle and pick 8
  const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, 10)

  const items = shuffled.map((p) => {
    const variant = p.variants?.[0]
    const calculatedPrice = variant?.calculated_price as any
    
    // Fallback image
    const image = p.thumbnail || (p.images && p.images[0]?.url) || ""
    
    // Format price
    const formattedPrice = calculatedPrice 
      ? convertToLocale({
          amount: calculatedPrice.calculated_amount,
          currency_code: region.currency_code,
          locale: "es-CO" // Colombian style as per brand
        })
      : "Contactar"

    return {
      id: p.id as string,
      name: p.title as string,
      handle: p.handle as string,
      category: p.categories?.[0]?.name || "Original",
      imageSrc: image,
      price: formattedPrice
    }
  })

  return (
    <ProductMostSold
      title="Lo + vendidos"
      subtitle="Productos originales y exóticos en Bucaramanga."
      items={items}
    />
  )
}
