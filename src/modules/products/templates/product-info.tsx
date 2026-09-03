import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

interface ProductInfoProps {
  product: HttpTypes.StoreProduct
}

// ¿El producto está marcado como "Ideal para regalar"? (metadata en Medusa:
// gift_eligible = "true" → badge + mensaje personalizado visibles en el PDP.)
const isGiftEligible = (product: HttpTypes.StoreProduct) =>
  product.metadata?.gift_eligible === "true"

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Calcular descuento si existe
  const hasDiscount =
    cheapestPrice && 
    cheapestPrice.original_price_number &&
    cheapestPrice.calculated_price_number &&
    cheapestPrice.original_price_number > cheapestPrice.calculated_price_number

  return (
    <div className="space-y-4">
      {/* Precios */}
      <div className="flex items-baseline gap-4">
        {hasDiscount && cheapestPrice?.original_price && (
          <span className="text-sm text-brand-gray line-through font-medium">
            {cheapestPrice.original_price}
          </span>
        )}
        <span className="text-3xl md:text-4xl font-bold text-brand-black">
          {cheapestPrice?.calculated_price || "No disponible"}
        </span>
        {hasDiscount && cheapestPrice?.percentage_diff && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[11px] font-bold">
            {cheapestPrice.percentage_diff}
          </span>
        )}
      </div>

      {/* Especificaciones rápidas */}
      {product.type && (
        <div className="text-sm text-brand-gray font-light">
          <span className="font-bold text-gray-700">Categoría:</span> {product.type.value}
        </div>
      )}

      {product.collection && (
        <div className="text-sm text-brand-gray font-light">
          <span className="font-bold text-gray-700">Colección:</span> {product.collection.title}
        </div>
      )}

      {product.options && product.options.length > 0 && (
        <div className="text-sm text-brand-gray font-light">
          <span className="font-bold text-gray-700">Variantes:</span> {product.options.length} disponibles
        </div>
      )}

      {/* Modo regalo — paquete de escenografía (03-sep-2026): badge + mensaje
          personalizado cuando el producto tiene metadata.gift_eligible="true"
          (los packs Amor y Amistad / Navidad lo activan desde el CMS). */}
      {isGiftEligible(product) && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border-[1.5px] border-dashed border-[var(--gold)]/60 bg-[var(--gold-light)]/10 px-4 py-3">
          <span className="text-2xl" aria-hidden="true">
            🎁
          </span>
          <div>
            <p className="text-sm font-bold text-[var(--gold-dark)]">
              Ideal para regalar · con mensaje personalizado
            </p>
            <p className="text-xs text-[var(--muted)]">
              Lo escribes tú — lo imprimimos en una tarjeta y va dentro de la caja. Sin costo.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductInfo
