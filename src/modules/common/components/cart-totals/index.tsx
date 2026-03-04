"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-3 text-xs uppercase tracking-[0.2em] font-medium text-gray-500">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0} className="text-brand-black">
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Envío Estimado</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0} className="text-brand-black">
            {shipping_subtotal ? convertToLocale({ amount: shipping_subtotal, currency_code }) : "Calculado en el checkout"}
          </span>
        </div>

        {!!discount_subtotal && (
          <div className="flex items-center justify-between text-brand-gold">
            <span>Descuento Exclusivo</span>
            <span
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span>Impuestos</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0} className="text-brand-black font-semibold">
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-100 my-4" />

      <div className="flex items-center justify-between text-brand-black">
        <span className="text-sm font-bold uppercase tracking-[0.3em]">Total</span>
        <span
          className="text-2xl font-serif italic"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
