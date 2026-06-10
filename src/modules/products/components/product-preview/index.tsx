import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  const totalInventory =
    product.variants?.reduce(
      (sum, v) => {
        // In Medusa v2, inventory_quantity may be null (managed via inventory items)
        if (v.inventory_quantity === null || v.inventory_quantity === undefined) {
          return sum + 999 // Available (stock managed separately)
        }
        return sum + (v.inventory_quantity || 0)
      },
      0
    ) || 999

  const isNew = product.created_at
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const isLowStock = totalInventory < 5 && totalInventory > 0

  // Custom badge from product metadata (set in admin panel)
  const customBadge = (product as any).metadata?.badge || null

  const category =
    product.collection?.title ||
    (product as any).categories?.[0]?.name ||
    null

  return (
    <article className="group flex flex-col h-full">
      {/* Image block — seamless background */}
      <LocalizedClientLink
        href={`/productos/${product.handle}`}
        data-testid="product-wrapper"
        className="block relative overflow-hidden aspect-square bg-transparent"
      >
        {/* Subtle border instead of bg color mismatch */}
        <div className="absolute inset-0 border border-gray-100/60 z-10 pointer-events-none" />
        
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          alt={product.title || "Producto Le Bon Marché"}
        />

        {/* Elegant white hover overlay */}
        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        {/* CTA pill on hover */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 ease-out z-20 pointer-events-none">
          <span className="bg-brand-brown text-white text-[8px] font-semibold uppercase tracking-[0.3em] px-4 md:px-6 py-2 md:py-2.5 whitespace-nowrap">
            Ver Producto
          </span>
        </div>
      </LocalizedClientLink>

      {/* Info block */}
      <div className="flex flex-col items-center text-center pt-3 md:pt-4 pb-1 px-1 md:px-0 flex-1">
        {/* Badges / Labels centered */}
        {(isNew || isLowStock || customBadge) && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-2">
            {customBadge && (
              <span className="bg-brand-black text-white text-[6px] md:text-[7px] font-bold uppercase tracking-[0.25em] px-2 py-1">
                {customBadge}
              </span>
            )}
            {isNew && (
              <span className="bg-brand-olive text-white text-[6px] md:text-[7px] font-bold uppercase tracking-[0.25em] px-2 py-1">
                Nuevo
              </span>
            )}
            {isLowStock && (
              <span className="bg-brand-brown text-white text-[6px] md:text-[7px] font-bold uppercase tracking-[0.25em] px-2 py-1">
                Últimas uds.
              </span>
            )}
          </div>
        )}

        {/* Category */}
        {category && (
          <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.25em] text-brand-olive truncate mb-1">
            {category}
          </span>
        )}

        {/* Title */}
        <LocalizedClientLink href={`/productos/${product.handle}`} className="mb-1.5">
          <h3
            className="text-xs md:text-sm font-semibold text-brand-brown leading-snug line-clamp-2 hover:text-brand-olive transition-colors duration-300 font-sans"
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </LocalizedClientLink>

        {/* Price */}
        <div className="mt-auto flex justify-center">
          {cheapestPrice && <PreviewPrice price={cheapestPrice as any} />}
        </div>
      </div>
    </article>
  )
}
