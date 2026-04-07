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
    <div className="group flex flex-col h-full bg-white transition-all duration-700">
      <LocalizedClientLink href={`/productos/${product.handle}`} data-testid="product-wrapper">
        <div className="hover-lift relative overflow-hidden bg-brand-soft aspect-square mb-6 group/img duration-700 rounded-[2rem]">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          {/* Etiquetas con estilo Premium */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-20">
            {isNew && (
              <span className="bg-brand-olive text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm inline-block w-fit">
                Novedad
              </span>
            )}
            {isLowStock && (
              <span className="bg-brand-brown/90 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm inline-block w-fit">
                Últimas uds.
              </span>
            )}
            {product.collection?.title && (
              <span className="bg-white/80 backdrop-blur-md text-brand-brown text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm inline-block w-fit">
                {product.collection.title}
              </span>
            )}
            <span className="bg-[#cca300] text-black text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm inline-block w-fit">
               100% Original
            </span>
          </div>
        </div>
      </LocalizedClientLink>

      {/* Content */}
      <div className="flex flex-col text-left items-start font-sans px-1">
        <LocalizedClientLink href={`/productos/${product.handle}`} className="group/title">
          <h3 className="text-sm md:text-base font-bold text-brand-brown leading-tight mb-2 hover:text-brand-olive transition-colors" data-testid="product-title">
            {product.title}
          </h3>
        </LocalizedClientLink>

        <div className="flex flex-col items-start">
          {cheapestPrice && <PreviewPrice price={cheapestPrice as any} />}
        </div>
      </div>
    </div>
  )
}
