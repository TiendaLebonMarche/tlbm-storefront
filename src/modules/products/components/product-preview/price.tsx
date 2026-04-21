import { clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) return null

  return (
    <div className="flex items-center gap-2">
      {price.price_type === "sale" && (
        <span
          className="line-through text-[10px] text-gray-400 font-medium"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <span
        className={clx(
          "text-sm font-black text-brand-brown tracking-tight",
          { "text-red-600": price.price_type === "sale" }
        )}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </div>
  )
}
