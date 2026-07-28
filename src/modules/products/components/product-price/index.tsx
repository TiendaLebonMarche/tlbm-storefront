import { clx } from "@medusajs/ui"

import { useProductPrice } from "@lib/hooks/use-product-price"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import { motion } from "framer-motion"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = useProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-brand-gray-light/20 animate-pulse" />
  }

  const savings = selectedPrice.price_type === "sale" && selectedPrice.original_price_number && selectedPrice.calculated_price_number
    ? selectedPrice.original_price_number - selectedPrice.calculated_price_number
    : 0

  const formattedSavings = savings > 0 && selectedPrice.currency_code
    ? convertToLocale({ amount: savings, currency_code: selectedPrice.currency_code })
    : null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-3">
        {selectedPrice.price_type === "sale" && (
          <span
            className="text-base text-brand-gray line-through font-light"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        )}
        <span
          className={clx(
            "text-4xl md:text-5xl font-bold tracking-tight text-[#D4AF37] font-serif",
            {
              "text-[#D4AF37]": selectedPrice.price_type !== "sale",
            }
          )}
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {!variant && "Desde "}
          {selectedPrice.calculated_price}
        </span>
      </div>

      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-2 mt-0.5">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-[9px] font-bold uppercase tracking-wider text-white bg-red-600 px-2.5 py-1"
          >
            -{selectedPrice.percentage_diff}%
          </motion.span>
          {formattedSavings && (
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="text-[10px] font-semibold text-red-600 tracking-wide font-sans bg-red-50 px-2 py-0.5 rounded-sm"
            >
              Ahorras {formattedSavings}
            </motion.span>
          )}
        </div>
      )}
    </div>
  )
}
