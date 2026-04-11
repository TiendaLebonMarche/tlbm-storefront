"use client"

import { useState } from "react"
import { Heading, Text, clx } from "@medusajs/ui"
import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [termsAccepted, setTermsAccepted] = useState(false)

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards &&
    cart?.gift_cards?.length > 0 &&
    cart?.total === 0

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
          Revisión
        </Heading>
      </div>

      {isOpen && previousStepsCompleted && (
        <>
          {/* Terms & Conditions Checkbox */}
          <div className="mb-6 p-4 bg-[#F7F6F2] rounded-xl border border-gray-100">
            <label
              htmlFor="terms-accept-checkbox"
              className="flex items-start gap-3 cursor-pointer group"
            >
              <div className="flex-shrink-0 mt-0.5">
                <input
                  id="terms-accept-checkbox"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 accent-brand-brown cursor-pointer rounded"
                  required
                  aria-required="true"
                />
              </div>
              <span className="text-xs text-brand-gray leading-relaxed group-hover:text-brand-brown transition-colors">
                He leído y acepto los{" "}
                <LocalizedClientLink
                  href="/terminos-y-condiciones"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-brown underline hover:text-brand-olive transition-colors"
                >
                  Términos y Condiciones
                </LocalizedClientLink>
                {" "}y la{" "}
                <LocalizedClientLink
                  href="/politica-de-privacidad"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-brown underline hover:text-brand-olive transition-colors"
                >
                  Política de Privacidad y Tratamiento de Datos
                </LocalizedClientLink>
                {" "}de Tienda Le Bon Marché. Entiendo que tengo derecho al{" "}
                <LocalizedClientLink
                  href="/politica-de-devoluciones"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-brown underline hover:text-brand-olive transition-colors"
                >
                  retracto dentro de 5 días hábiles
                </LocalizedClientLink>
                {" "}tras la entrega.
              </span>
            </label>

            {/* Warning if not checked */}
            {!termsAccepted && (
              <p className="text-[11px] text-brand-gray opacity-60 mt-3 pl-7">
                * Debes aceptar los términos para continuar con la compra.
              </p>
            )}
          </div>

          {/* Legal footnote */}
          <p className="text-[11px] text-brand-gray opacity-50 mb-5 leading-relaxed">
            Esta compra está protegida por la Ley 1480 de 2011 (Estatuto del
            Consumidor de Colombia). Tu información está asegurada con protocolo
            HTTPS/SSL.
          </p>

          {/* Payment button — disabled until terms accepted */}
          <div
            className={clx("transition-opacity duration-300", {
              "opacity-40 pointer-events-none select-none": !termsAccepted,
            })}
          >
            <PaymentButton cart={cart} data-testid="submit-order-button" />
          </div>

          {!termsAccepted && (
            <p
              className="text-xs text-center text-brand-gray mt-3 opacity-50"
              aria-live="polite"
            >
              Acepta los términos para habilitar el botón de compra
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Review
