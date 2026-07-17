import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

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

  const isNew = product.created_at
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const productTags = (product as any).tags as Array<{id: string; value: string}> | null
  const customBadge = productTags?.find(
    (t: any) => t.value?.toLowerCase().startsWith("producto")
  )?.value || null

  const category =
    product.collection?.title ||
    (product as any).categories?.[0]?.name ||
    null

  return (
    <LocalizedClientLink
      href={`/productos/${product.handle}`}
      data-testid="product-wrapper"
      className="group flex flex-col h-full no-underline text-inherit cursor-pointer"
    >
      {/* Image block — rectangular proporción Nest & Field */}
      <div className="relative w-full overflow-hidden rounded-none" style={{ aspectRatio: "0.873/1", background: "#F2F2F2" }}>
        {product.thumbnail || (product.images && product.images[0]?.url) ? (
          <Image
            src={product.thumbnail || (product.images && product.images[0]?.url) || ""}
            alt={product.title || "Producto Le Bon Marché"}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-contain p-2 md:p-3 transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-[9px] font-bold uppercase tracking-widest">
            Sin imagen
          </div>
        )}

        {/* Hover scale + gold overlay sutil */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Badges */}
        {(isNew || customBadge) && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {customBadge && (
              <span className="bg-pink-600 text-white text-[7px] font-bold uppercase tracking-[0.2em] px-2 py-1">
                {customBadge}
              </span>
            )}
            {isNew && (
              <span className="bg-[#0A0A0F] text-white text-[7px] font-bold uppercase tracking-[0.2em] px-2 py-1">
                Nuevo
              </span>
            )}
          </div>
        )}
      </div>

      {/* Info block — estilo Nest & Field */}
      <div className="pt-4 pb-2 flex flex-col gap-[3px]">
        {/* Category/Collection */}
        {category && (
          <span className="text-[13px] font-medium tracking-[-0.42px] leading-snug" style={{ color: "#666" }}>
            {category}
          </span>
        )}

        {/* Title */}
        <h3
          className="text-[17px] md:text-[18px] font-semibold tracking-[-0.9px] leading-tight text-[#101010] group-hover:opacity-80 transition-opacity duration-300 line-clamp-2"
        >
          {product.title}
        </h3>

        {/* Price */}
        <div className="mt-0.5">
          {cheapestPrice && (
            <span className="text-[14px] font-semibold tracking-[-0.42px] text-[#101010]">
              {cheapestPrice.calculated_price}
            </span>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
