"use client"

import { useEffect, useRef } from "react"
import { trackPurchase } from "@lib/util/analytics"
import { HttpTypes } from "@medusajs/types"

type Props = {
  order: HttpTypes.StoreOrder
}

export default function PurchaseTracker({ order }: Props) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true

    const items = (order.items || []).map((item) => ({
      id: item.variant_id || item.id,
      name: item.title || "Producto",
      price: item.unit_price ? item.unit_price / 100 : 0,
      quantity: item.quantity || 1,
      category: (item as any)?.categories?.[0]?.name || undefined,
    }))

    trackPurchase({
      id: order.id,
      total: (order.total || 0) / 100,
      shipping: (order.shipping_total || 0) / 100,
      tax: (order.tax_total || 0) / 100,
      items,
    })
  }, [order])

  return null
}
