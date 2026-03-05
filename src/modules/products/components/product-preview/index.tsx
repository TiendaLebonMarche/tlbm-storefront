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
    <div className="group text-center h-full flex flex-col">
      <LocalizedClientLink href={`/products/${product.handle}`} data-testid="product-wrapper">
        <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4 group/img">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          {/* Overlay de hover */}
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-brand-gold text-brand-black text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-md">
                Nuevo
              </span>
            )}
            {isLowStock && (
              <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-md">
                Últimas
              </span>
            )}
            {totalInventory === 0 && (
              <span className="bg-gray-600 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm shadow-md">
                Agotado
              </span>
            )}
          </div>

          {/* Stock en esquina inferior */}
          {totalInventory > 0 && !isLowStock && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1.5 rounded-sm">
              <p className="text-[9px] font-bold text-brand-black">
                {totalInventory} en stock
              </p>
            </div>
          )}
        </div>
      </LocalizedClientLink>

      {/* Categoría */}
      <span className="text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-sm mb-2 inline-block bg-gray-100 text-gray-700 group-hover:bg-brand-gold group-hover:text-white transition-colors">
        {product.collection?.title || "Exclusivo"}
      </span>

      {/* Tipo */}
      <p className="text-[9px] text-gray-500 mb-2 uppercase tracking-wide">
        {product.type?.value || "Luxury"}
      </p>

      {/* Título */}
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <h3 className="text-base font-serif text-brand-black mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors" data-testid="product-title">
          {product.title}
        </h3>
      </LocalizedClientLink>

      {/* Precio */}
      {cheapestPrice && <PreviewPrice price={cheapestPrice as any} />}

      {/* CTA - Flex grow para que el botón esté al final */}
      <div className="mt-auto pt-4">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className={`w-full inline-block py-3 px-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-sm ${
            totalInventory === 0
              ? "border border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed opacity-50"
              : "border border-brand-black text-brand-black hover:bg-brand-black hover:text-white hover:border-brand-black"
          }`}
        >
          {totalInventory === 0 ? "Agotado" : "Ver Detalles"}
        </LocalizedClientLink>
      </div>
    </div>
  )
}
