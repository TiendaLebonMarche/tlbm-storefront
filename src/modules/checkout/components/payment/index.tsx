"use client"

import { RadioGroup } from "@headlessui/react"
import { isManual, isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    const provider = method.startsWith("manual_") ? "pp_system_default" : method
    if (isStripeLike(provider)) {
      await initiatePaymentSession(cart, { provider_id: provider })
    }
  }

  const paidByGiftcard = cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0
  const paymentReady = (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => router.push(pathname + "?" + createQueryString("step", "payment"), { scroll: false })

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const provider = selectedPaymentMethod.startsWith("manual_") ? "pp_system_default" : selectedPaymentMethod
      const checkActiveSession = activeSession?.provider_id === provider
      if (!checkActiveSession) {
        await initiatePaymentSession(cart, { provider_id: provider })
      }
      // For manual/efectivo methods, go to review immediately
      if (isManual(selectedPaymentMethod)) {
        return router.push(pathname + "?" + createQueryString("step", "review"), { scroll: false })
      }
      // For Stripe, wait for card element to be complete
      if (isStripeLike(selectedPaymentMethod) && !cardComplete) {
        setError("Por favor completa los datos de la tarjeta antes de continuar.")
        return
      }
      return router.push(pathname + "?" + createQueryString("step", "review"), { scroll: false })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => setError(null), [isOpen])

  return (
    <div className="bg-white checkout-step">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className={clx("text-xl md:text-2xl font-serif italic text-brand-black flex items-center gap-2", {
          "opacity-50 pointer-events-none select-none": !isOpen && !paymentReady,
        })}>
          Método de Pago
          {!isOpen && paymentReady && <CheckCircleSolid className="text-brand-black" />}
        </h2>
        {!isOpen && paymentReady && (
          <button onClick={handleEdit} className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black underline hover:text-brand-black/60 transition-colors" data-testid="edit-payment-button">
            Editar
          </button>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              <RadioGroup value={selectedPaymentMethod} onChange={(value: string) => setPaymentMethod(value)}>
                {[
                  { id: "manual_efectivo", title: "1. Efectivo" },
                  { id: "manual_transferencia", title: "2. Transferencia (Nequi/Daviplata/BreB)" }
                ].map((paymentMethod) => (
                  <div key={paymentMethod.id} className={clx(
                    "flex items-center justify-between py-5 border-2 rounded-3xl px-8 mb-4 hover:border-brand-black transition-all cursor-pointer",
                    { "border-brand-black bg-brand-gray-light/20": selectedPaymentMethod === paymentMethod.id,
                      "border-brand-gray-light": selectedPaymentMethod !== paymentMethod.id }
                  )}
                  onClick={() => setPaymentMethod(paymentMethod.id)}>
                    <div className="flex items-center gap-x-4">
                      <MedusaRadio checked={selectedPaymentMethod === paymentMethod.id} />
                      <span className="text-base font-bold text-brand-black">{paymentMethod.title}</span>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              {selectedPaymentMethod === "manual_transferencia" && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50/30 border border-green-200/50 rounded-3xl p-6 mb-6 shadow-sm">
                  <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="text-lg">💚</span> Datos para Transferencia
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4 border border-green-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl flex-shrink-0">
                        💚
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Daviplata</p>
                        <p className="text-lg font-bold text-gray-900 font-mono tracking-wider">310 448 9218</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-green-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">
                        🔵
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Llave Bre-B</p>
                        <p className="text-lg font-bold text-gray-900 font-mono tracking-wider">310 448 9218</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-200/50">
                    <p className="text-xs text-emerald-700/70 leading-relaxed">
                      Una vez realizado el pago, comparte el comprobante con nosotros y confirmaremos tu pedido. 
                      El pedido se procesará una vez recibamos la confirmación del pago.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black mb-2">Método de pago</span>
              <span className="text-sm text-brand-gray" data-testid="payment-method-summary">Tarjeta de Regalo</span>
            </div>
          )}

          <ErrorMessage error={error} data-testid="payment-method-error-message" />

          <Button size="large" className="mt-6 pill-button bg-brand-black hover:bg-brand-navy text-white w-full sm:w-auto"
            onClick={handleSubmit} isLoading={isLoading}
            disabled={(!selectedPaymentMethod && !paidByGiftcard)}
            data-testid="submit-payment-button">
            {selectedPaymentMethod === "manual_efectivo" || selectedPaymentMethod === "manual_transferencia" ? "Revisar Compra" : "Continuar"}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex flex-col small:flex-row items-start gap-y-6 lg:gap-x-12 w-full bg-brand-gray-light/10 p-6 rounded-3xl border border-brand-gray-light/20">
              <div className="flex flex-col w-full small:w-1/2" data-testid="payment-method-summary">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black mb-2">Método de pago</span>
                <span className="text-lg font-serif italic text-brand-black">
                  {selectedPaymentMethod === "manual_efectivo" ? "1. Efectivo" : 
                   selectedPaymentMethod === "manual_transferencia" ? "2. Transferencia (Nequi/Daviplata/BreB)" : paymentInfoMap[activeSession?.provider_id]?.title || activeSession?.provider_id}
                </span>
              </div>
              <div className="flex flex-col w-full small:w-1/2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black mb-2">Detalles del pago</span>
                <div className="flex gap-4 text-sm text-brand-gray items-center" data-testid="payment-details-summary">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-black/10 text-brand-black">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || <CreditCard />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-brand-black">{isStripeLike(selectedPaymentMethod) && cardBrand ? cardBrand : "Pago Pendiente"}</span>
                    <span className="text-xs text-brand-gray">{isStripeLike(selectedPaymentMethod) ? "Procesado por Stripe" : "Verificar con el vendedor"}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black mb-2">Método de pago</span>
              <span className="text-sm text-brand-gray" data-testid="payment-method-summary">Tarjeta de Regalo</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="h-px bg-brand-gray-light mt-8" />
    </div>
  )
}

export default Payment
