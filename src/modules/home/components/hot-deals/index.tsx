import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { ProductCard } from "@/components/ui/product-card-1"
export default async function HotDeals({
  countryCode,
}: {
  countryCode: string
}) {
  try {
    // Obtener productos publicados en MedusaJS
    const { response } = await listProducts({
      countryCode,
      queryParams: {
        limit: 4,
      },
    })

    const products = response?.products || []

    // Mapear productos de MedusaJS al formato esperado
    const deals = products.slice(0, 4).map((product: HttpTypes.StoreProduct) => {
      const firstVariant = product.variants?.[0]
      const priceInfo = getProductPrice({ product })
      const cheapestPrice = priceInfo.cheapestPrice

      // Obtener la imagen del producto
      const image =
        product.images?.[0]?.url ||
        firstVariant?.images?.[0]?.url ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"

      // Calcular el descuento porcentual si hay precio original
      let discount = "-15%" // Descuento por defecto
      if (cheapestPrice?.percentage_diff) {
        const diff = Math.round(Math.abs(parseFloat(cheapestPrice.percentage_diff)))
        discount = `${diff > 0 ? "-" : ""}${diff}%`
      }

      return {
        id: product.id,
        image: image,
        category: product.collection?.title || product.type?.value || "Categoría",
        title: product.title,
        oldPrice: cheapestPrice?.original_price || "$0",
        newPrice: cheapestPrice?.calculated_price || "$0",
        discount: discount,
        badge: "Disponible",
        handle: product.handle,
      }
    })

    return (
      <section className="w-full bg-white pt-20 pb-20 md:pt-28 md:pb-28 border-b border-gray-100">
        <div className="content-container px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
            <div className="max-w-2xl">
              <span className="text-brand-olive font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                ⚡ Algoritmo de Ahorro
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-brand-brown leading-tight">
                Precios de Selección Global
              </h2>
              <p className="text-brand-gray text-sm md:text-base mt-6 font-normal leading-relaxed">
                Nuestros rastreadores han detectado estas ofertas exclusivas en el mercado global. Productos de alta gama traídos directamente a Bucaramanga al mejor precio posible.
              </p>
            </div>
            <LocalizedClientLink
              href="/store"
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-brown border-b border-brand-brown/30 pb-2 hover:text-brand-olive transition-colors whitespace-nowrap"
            >
              Ver Todas las Ofertas →
            </LocalizedClientLink>
          </div>

          <div className="flex flex-col gap-6 w-full">
            {deals.map((deal) => (
              <ProductCard
                key={deal.id}
                imageUrl={deal.image}
                title={deal.title}
                category={deal.category}
                price={deal.newPrice}
                originalPrice={deal.oldPrice}
                discount={deal.discount}
                productUrl={`/productos/${deal.handle}`}
                specifications={[
                  "Envío asegurado a todo Colombia",
                  "Curaduría Le Bon Marché",
                  "Garantía de autenticidad",
                  "Soporte exclusivo"
                ]}
              />
            ))}
          </div>

          {/* CTA Bottom */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-sm mb-4">
              ¿No encontraste lo que buscabas?
            </p>
            <LocalizedClientLink
              href="/store"
              className="inline-block px-10 py-4 bg-brand-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-white transition-all duration-300"
            >
              Explorar Catálogo Completo
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error loading hot deals:", error)
    return null
  }
}
