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
  const { cheapestPrice } = getProductPrice({ product })

  const totalInventory =
    product.variants?.reduce(
      (sum, v) => sum + (v.inventory_quantity || 0),
      0
    ) || 0

  const isNew = product.created_at
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const isLowStock = totalInventory < 5 && totalInventory > 0

  const category =
    product.collection?.title ||
    (product as any).categories?.[0]?.name ||
    null

  return (
    <article className="group flex flex-col h-full">
      {/* Image block — seamless white background */}
      <LocalizedClientLink
        href={`/productos/${product.handle}`}
        data-testid="product-wrapper"
        className="block relative overflow-hidden aspect-[4/5] bg-white"
      >
        {/* Subtle border instead of bg color mismatch */}
        <div className="absolute inset-0 border border-gray-100/60 z-10 pointer-events-none" />
        
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />

        {/* Elegant hover overlay */}
        <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        {/* CTA pill on hover */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 pointer-events-none">
          <span className="bg-brand-brown text-white text-[8px] font-semibold uppercase tracking-[0.3em] px-6 py-2.5 whitespace-nowrap">
            Ver Producto
          </span>
        </div>

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-20">
          {isNew && (
            <span className="bg-brand-olive text-white text-[7px] font-bold uppercase tracking-[0.25em] px-2.5 py-1">
              Nuevo
            </span>
          )}
          {isLowStock && (
            <span className="bg-brand-brown text-white text-[7px] font-bold uppercase tracking-[0.25em] px-2.5 py-1">
              Últimas uds.
            </span>
          )}
        </div>

        {/* Authentic badge top-right */}
        <div className="absolute top-3 right-3 pointer-events-none z-20">
          <span className="text-brand-brown/40 text-[7px] font-bold uppercase tracking-[0.15em] px-2 py-1">
            Original
          </span>
        </div>
      </LocalizedClientLink>

      {/* Info block */}
      <div className="flex flex-col pt-4 pb-1 px-0 flex-1">
        {/* Category + Price row */}
        <div className="flex items-center justify-between mb-2 gap-2">
          {category ? (
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-brand-olive truncate">
              {category}
            </span>
          ) : (
            <span />
          )}
          <div className="flex-shrink-0">
            {cheapestPrice && <PreviewPrice price={cheapestPrice as any} />}
          </div>
        </div>

        {/* Title */}
        <LocalizedClientLink href={`/productos/${product.handle}`}>
          <h3
            className="text-sm font-semibold text-brand-brown leading-snug line-clamp-2 hover:text-brand-olive transition-colors duration-300 font-sans"
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </LocalizedClientLink>
      </div>
    </article>
  )
}
