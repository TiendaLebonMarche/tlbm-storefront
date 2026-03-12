import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Calcular disponibilidad
  const totalInventory = product.variants?.reduce(
    (sum, v) => sum + (v.inventory_quantity || 0),
    0
  ) || 0

  const isNew = product.created_at
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const isLowStock = totalInventory < 5 && totalInventory > 0

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-500">
      <LocalizedClientLink href={`/products/${product.handle}`} data-testid="product-wrapper">
        <div className="relative overflow-hidden bg-white aspect-square mb-6 group/img shadow-sm hover:shadow-md transition-shadow duration-500 p-4">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="group-hover/img:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Badges - Minimalistas */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
            {isNew && (
              <span className="bg-white/90 backdrop-blur text-brand-black text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm border border-gray-100">
                Lanzamiento
              </span>
            )}
            {isLowStock && (
              <span className="bg-white/90 backdrop-blur text-red-600 text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm border border-red-50/50">
                Edición Limitada
              </span>
            )}
          </div>

          {/* Hover Reveal CTA */}
          <div className="absolute inset-0 bg-brand-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="bg-white text-brand-black text-[9px] font-bold uppercase tracking-[0.3em] px-8 py-3 translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500 shadow-xl">
              Explorar
            </div>
          </div>
        </div>
      </LocalizedClientLink>

      {/* Content */}
      <div className="flex flex-col flex-1 px-1 text-center items-center">
        <div className="flex justify-center items-center mb-3">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-1.5">
              {product.collection?.title || "Exclusivo"}
            </span>
            <LocalizedClientLink href={`/products/${product.handle}`}>
              <h3 className="text-lg font-serif text-brand-black leading-snug hover:text-brand-gold transition-colors" data-testid="product-title">
                {product.title}
              </h3>
            </LocalizedClientLink>
          </div>
        </div>

        <div className="mt-auto flex flex-col items-center gap-2 pt-4 border-t border-gray-50 w-full">
          {cheapestPrice && <PreviewPrice price={cheapestPrice as any} />}
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">
            {product.type?.value || ""}
          </p>
        </div>
      </div>
    </div>
  )
}
