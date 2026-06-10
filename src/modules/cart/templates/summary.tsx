"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-3xl md:text-4xl font-serif text-brand-black italic mb-2">
        Resumen de Compra
      </h2>
      <DiscountCode cart={cart} />
      <Divider className="my-2" />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="mt-4"
      >
        <Button className="w-full pill-button h-14 bg-brand-black hover:bg-brand-black text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-xl border-none">
          Finalizar Pedido
        </Button>
      </LocalizedClientLink>
      <p className="text-[10px] text-center text-brand-gray uppercase tracking-widest mt-2">
        Pago seguro & Garantía Le Bon Marché
      </p>
    </div>
  )
}

export default Summary
