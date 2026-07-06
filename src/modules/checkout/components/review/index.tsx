"use client"

import { clx } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()
  const isOpen = searchParams.get("step") === "review"
  const paidByGiftcard = cart?.gift_cards?.length > 0 && cart?.total === 0
  const [termsAccepted, setTermsAccepted] = useState(false)
  const previousStepsCompleted =
    cart?.shipping_address &&
    cart?.shipping_methods?.length > 0 &&
    (cart?.payment_collection?.payment_sessions?.length > 0 || paidByGiftcard)

  return (
    <div className="bg-white checkout-step">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className={clx("text-xl md:text-2xl font-serif italic text-brand-black flex items-center gap-2", {
          "opacity-50 pointer-events-none select-none": !isOpen && !previousStepsCompleted,
        })}>
          Revisar Compra
          {isOpen && previousStepsCompleted && <CheckCircleSolid className="text-brand-black" />}
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <div className="flex items-start gap-x-1 w-full mb-6">
          <div className="w-full">
            <div className="mb-4 pb-4 border-b border-brand-gray-light">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black mb-1">Términos</span>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-brand-gray-light text-brand-black focus:ring-brand-black/30"
                  data-testid="terms-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <span className="text-xs text-brand-gray leading-relaxed group-hover:text-brand-black transition-colors">
                  Acepto los{" "}
                  <a href="/legal/terminos" target="_blank" className="underline font-semibold">Términos y Condiciones</a>
                  {" "}y la{" "}
                  <a href="/legal/privacidad" target="_blank" className="underline font-semibold">Política de Privacidad</a>
                  {" "}de Le Bon Marché.
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-4">
        <PaymentButton cart={cart} data-testid="submit-order-button" disabled={!previousStepsCompleted || !isOpen || !termsAccepted} />
      </div>
    </div>
  )
}

export default Review
