import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

// ── Category color mapping ──────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  "tecnología": "#2563EB",
  "tecnologia": "#2563EB",
  "audio": "#7C3AED",
  "audio premium": "#7C3AED",
  "accesorios": "#D97706",
  "accesorios originales": "#D97706",
  "oficina": "#059669",
  "oficina premium": "#059669",
  "gaming": "#DC2626",
  "hogar": "#C026D3",
  "deportes": "#EA580C",
  "viaje": "#0891B2",
  "moda": "#DB2777",
  "electrónica": "#1D4ED8",
  "electronica": "#1D4ED8",
  "original": "#6366F1",
}

function getCategoryColor(category: string): string {
  const key = category.toLowerCase().trim()
  return CATEGORY_COLORS[key] || "#6366F1"
}

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
    // Date.now en server component: 1x/request (ISR/dynamic)
    // eslint-disable-next-line react-hooks/purity -- server component, 1x/request
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const productTags = (product as any).tags as Array<{id: string; value: string}> | null
  const customBadge = productTags?.find(
    (t: any) => t.value?.toLowerCase().startsWith("producto")
  )?.value || null

  // Stock bajo (metadata.stock_unidades, ej. "1") → etiqueta de urgencia REAL
  const stockUnits = Number((product as any).metadata?.stock_unidades ?? 0)
  const lowStockText =
    stockUnits === 1
      ? "¡Última unidad!"
      : stockUnits >= 2 && stockUnits <= 5
        ? `¡Últimas ${stockUnits}!`
        : null

  const category =
    product.collection?.title ||
    (product as any).categories?.[0]?.name ||
    null

  const categoryColor = category ? getCategoryColor(category) : undefined

  return (
    <LocalizedClientLink
      href={`/productos/${product.handle}`}
      data-testid="product-wrapper"
      className="group flex flex-col h-full no-underline text-inherit cursor-pointer"
    >
      {/* Image block — rectangular, fondo blanco */}
      <div className="relative w-full overflow-hidden rounded-none" style={{ aspectRatio: "0.873/1", background: "#FFFFFF" }}>
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
        {(isNew || customBadge || lowStockText) && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {lowStockText && (
              <span className="bg-orange-600 text-white text-[7px] font-bold uppercase tracking-[0.2em] px-2 py-1">
                {lowStockText}
              </span>
            )}
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

      {/* Info block — centrado, estilo e-commerce premium */}
      <div className="pt-5 pb-2 flex flex-col items-center text-center gap-[2px]">
        {/* Category/Collection — color único por categoría */}
        {category && (
          <span
            className="text-[11px] font-semibold tracking-[0.08em] leading-snug uppercase mb-1"
            style={{ color: categoryColor }}
          >
            {category}
          </span>
        )}

        {/* Title — centrado */}
        <h3
          className="text-[15px] md:text-[16px] font-semibold tracking-[-0.4px] leading-snug text-[#101010] group-hover:opacity-80 transition-opacity duration-300 line-clamp-2 max-w-[95%]"
        >
          {product.title}
        </h3>

        {/* Price — destacado en dorado, más grande */}
        <div className="mt-1.5">
          {cheapestPrice && (
            <span className="text-[17px] md:text-[19px] font-bold tracking-[-0.3px] text-[#D4AF37] drop-shadow-sm">
              {cheapestPrice.calculated_price}
            </span>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
