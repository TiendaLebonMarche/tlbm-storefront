"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Revisión y Términos
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-3 w-full mb-6 max-w-2xl bg-gray-50 border border-gray-100 p-4 rounded-md">
            <input
              type="checkbox"
              id="terms-checkbox"
              className="mt-1 w-5 h-5 accent-brand-olive border-gray-300 rounded text-brand-olive focus:ring-brand-olive cursor-pointer"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms-checkbox" className="text-sm font-medium text-brand-brown cursor-pointer">
              He leído y acepto los <a href="/legal/terminos" target="_blank" className="underline hover:text-brand-olive font-bold">Términos y Condiciones</a> (incluyendo Derecho de Retracto, Reversión del Pago y Políticas de Envío Fast-Track), así como la <a href="/legal/privacidad" target="_blank" className="underline hover:text-brand-olive font-bold">Política de Privacidad y Tratamiento de Datos (Habeas Data)</a> con nuestra IA de arbitraje.
            </label>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" disabled={!acceptedTerms} />
        </>
      )}
    </div>
  )
}

export default Review
