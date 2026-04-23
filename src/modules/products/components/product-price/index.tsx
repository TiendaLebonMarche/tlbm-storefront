import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-50 animate-pulse" />
  }

  return (
    <div className="flex items-baseline gap-3">
      {selectedPrice.price_type === "sale" && (
        <span
          className="text-base text-gray-400 line-through font-light"
          data-testid="original-product-price"
          data-value={selectedPrice.original_price_number}
        >
          {selectedPrice.original_price}
        </span>
      )}
      <span
        className={clx(
          "text-2xl md:text-3xl font-semibold tracking-tight text-brand-brown font-sans",
          {
            "text-brand-brown": selectedPrice.price_type !== "sale",
          }
        )}
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {!variant && "Desde "}
        {selectedPrice.calculated_price}
      </span>
      {selectedPrice.price_type === "sale" && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-brand-olive px-2.5 py-1">
          -{selectedPrice.percentage_diff}%
        </span>
      )}
    </div>
  )
}
