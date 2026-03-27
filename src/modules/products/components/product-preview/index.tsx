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
        <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] mb-4 group/img transition-all duration-500">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          {/* Badges - Minimalistas */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-20">
            {isNew && (
              <span className="bg-white text-black text-[9px] uppercase tracking-widest px-3 py-1 border border-black/10">
                Nuevo
              </span>
            )}
            {isLowStock && (
              <span className="bg-black text-white text-[9px] uppercase tracking-widest px-3 py-1">
                Limitado
              </span>
            )}
          </div>
        </div>
      </LocalizedClientLink>

      {/* Content */}
      <div className="flex flex-col text-center items-center font-sans">
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <h3 className="text-[11px] md:text-xs text-black tracking-widest uppercase mb-2 hover:opacity-50 transition-opacity" data-testid="product-title">
            {product.title}
          </h3>
        </LocalizedClientLink>

        <div className="flex flex-col items-center">
          {cheapestPrice && <PreviewPrice price={cheapestPrice as any} />}
        </div>
      </div>
    </div>
  )
}
