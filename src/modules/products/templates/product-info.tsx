import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

interface ProductInfoProps {
  product: HttpTypes.StoreProduct
}

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
          <span className="text-sm text-gray-500 line-through font-medium">
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
        <div className="text-sm text-gray-600 font-light">
          <span className="font-bold text-gray-700">Categoría:</span> {product.type.value}
        </div>
      )}

      {product.collection && (
        <div className="text-sm text-gray-600 font-light">
          <span className="font-bold text-gray-700">Colección:</span> {product.collection.title}
        </div>
      )}

      {product.options && product.options.length > 0 && (
        <div className="text-sm text-gray-600 font-light">
          <span className="font-bold text-gray-700">Variantes:</span> {product.options.length} disponibles
        </div>
      )}
    </div>
  )
}

export default ProductInfo
