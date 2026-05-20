import { useMemo } from "react"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"

export function useProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  return useMemo(() => {
    if (!product) return { cheapestPrice: null, variantPrice: null }
    return getProductPrice({ product, variantId })
  }, [product, variantId])
}
