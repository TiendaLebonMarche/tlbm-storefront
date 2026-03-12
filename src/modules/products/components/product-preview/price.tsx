import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
    <div className="flex items-center justify-center gap-2">
      {price.price_type === "sale" && (
        <span
          className="line-through text-xs text-gray-400"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <p
        className={clx("text-sm font-medium text-gray-500", {
          "text-red-500 font-bold": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </p>
    </div>
    </>
  )
}
