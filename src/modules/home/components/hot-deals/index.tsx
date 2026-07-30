import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import InfiniteProducts from "@modules/store/components/infinite-products"

export default async function HotDeals({
  countryCode,
}: {
  countryCode: string
}) {
  try {
    const region = await getRegion(countryCode)
    if (!region) return null

    // Obtener muchos productos para el scroll infinito local
    const { response } = await listProducts({
      countryCode,
      queryParams: {
        limit: 100, // Sufficient for infinite scroll
      },
    }).catch(() => ({ response: { products: [] } }))

    const products = response?.products || []

    // Orden aleatorio para mostrar productos diferentes cada visita
    const shuffled = [...products].sort(() => 0.5 - Math.random())

    if (shuffled.length === 0) return null

    return (
      <section className="w-full bg-white py-16 md:py-24">
        <div className="content-container px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-10">
            <div className="max-w-2xl">
              <span className="text-brand-black font-bold uppercase tracking-[0.25em] text-[10px] mb-6 block">
                ⚡ Selección Curada
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black tracking-tighter text-brand-black leading-[0.9]">
                Precios de Selección Global
              </h2>
              <p className="text-brand-gray text-sm md:text-base mt-6 font-normal leading-relaxed">
                Piezas originales y exclusivas, detectadas globalmente y traídas a Bucaramanga. Nuestro compromiso con el diseño y el mejor precio posible.
              </p>
            </div>
            <LocalizedClientLink
              href="/store"
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-black border-b border-brand-black/30 pb-2 hover:text-brand-black transition-colors whitespace-nowrap"
            >
              Ver Catálogo Completo →
            </LocalizedClientLink>
          </div>

          <div className="w-full">
            {/* Responsive grid: 2 cols mobile, 3 cols small/medium/large desktop */}
            <InfiniteProducts 
              initialProducts={shuffled} 
              region={region} 
              gridClass="grid grid-cols-2 small:grid-cols-3 gap-x-4 small:gap-x-10 medium:gap-x-14 gap-y-12 mb-8"
              limit={9}
            />
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error loading hot deals:", error)
    return null
  }
}
