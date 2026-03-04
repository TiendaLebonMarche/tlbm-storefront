import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <span
          className="line-through text-xs text-gray-400 mr-2"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <p
        className={clx("text-sm font-medium text-gray-500 mb-3", {
          "text-red-500 font-bold": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </p>
    </>
  )
}
