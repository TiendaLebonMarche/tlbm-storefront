"use client"

import { useEffect } from "react"
import { trackBeginCheckout } from "@lib/util/analytics"
import { HttpTypes } from "@medusajs/types"

type Props = {
  cart: HttpTypes.StoreCart | null
}

export default function CheckoutTracker({ cart }: Props) {
  useEffect(() => {
    if (!cart) return

    const items = (cart.items || []).map((item) => ({
      id: item.variant_id || item.id,
      name: item.title || "Producto",
      price: item.unit_price ? item.unit_price / 100 : 0,
      quantity: item.quantity || 1,
      category: (item as any)?.categories?.[0]?.name || undefined,
    }))

    trackBeginCheckout({
      total: (cart.subtotal || 0) / 100,
      items,
    })
  }, [cart])

  return null
}
