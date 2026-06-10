"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import MedusaRadio from "@modules/common/components/radio"
import Divider from "@modules/common/components/divider"
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

    const actualProviderId = method.startsWith("manual_") ? "pp_efectivo-payment_efectivo" : method

    if (isStripeLike(actualProviderId)) {
      await initiatePaymentSession(cart, {
        provider_id: actualProviderId,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const actualProviderId = selectedPaymentMethod.startsWith("manual_") ? "pp_efectivo-payment_efectivo" : selectedPaymentMethod

      const shouldInputCard =
        isStripeLike(actualProviderId) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === actualProviderId

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: actualProviderId,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Método de Pago
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-brand-black underline hover:text-brand-black font-bold text-sm"
              data-testid="edit-payment-button"
            >
              Editar
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.flatMap((paymentMethod) => {
                  if (paymentMethod.id === "pp_system_default" || paymentMethod.id?.includes("efectivo")) {
                    return [
                      { ...paymentMethod, id: "manual_efectivo", title: "1. Efectivo" },
                      { ...paymentMethod, id: "manual_transferencia", title: "2. Transferencia (Nequi/Daviplata/BreB)" }
                    ]
                  }
                  return [paymentMethod]
                }).map((paymentMethod) => (
                  <div key={paymentMethod.id} className={clx(
                    "flex items-center justify-between py-5 border-2 rounded-3xl px-8 mb-4 hover:border-brand-black transition-all cursor-pointer",
                    {
                      "border-brand-black bg-brand-gray-light/20":
                        selectedPaymentMethod === paymentMethod.id,
                      "border-brand-gray-light": selectedPaymentMethod !== paymentMethod.id,
                    }
                  )}
                  onClick={() => setPaymentMethod(paymentMethod.id)}
                  >
                    <div className="flex items-center gap-x-4">
                      <MedusaRadio
                        checked={selectedPaymentMethod === paymentMethod.id}
                      />
                      <span className="text-base font-bold text-brand-black">
                        {paymentMethod.title}
                      </span>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              {selectedPaymentMethod === "manual_transferencia" && (
                <div className="bg-brand-gray-light/10 border border-brand-soft/30 rounded-3xl p-6 mb-6">
                  <p className="text-sm font-bold text-brand-black uppercase tracking-widest mb-3">
                    📋 Datos para Transferencia
                  </p>
                  <div className="space-y-2 text-brand-black text-sm">
                    <p className="flex justify-between">
                      <span className="font-semibold">💚 Daviplata:</span>
                      <span className="font-mono">3104489218</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">🔗 Llave Bre-B:</span>
                      <span className="font-mono">@3104489218</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold">🏦 Llave Bre-B 2:</span>
                      <span className="font-mono">@Plenti31059</span>
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-soft/30">
                    <p className="text-xs text-brand-gray">
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
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Método de pago
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Tarjeta de Regalo
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6 pill-button bg-brand-black hover:bg-brand-black text-white w-full sm:w-auto"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {selectedPaymentMethod === "manual_efectivo" || selectedPaymentMethod === "manual_transferencia"
              ? "Revisar Compra"
              : "Continuar"}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex flex-col small:flex-row items-start gap-y-6 lg:gap-x-12 w-full bg-brand-gray-light/10 p-6 rounded-3xl border border-brand-soft/20">
              <div className="flex flex-col w-full small:w-1/2" data-testid="payment-method-summary">
                <Text className="txt-medium-plus text-ui-fg-base mb-2 font-bold uppercase tracking-widest text-[10px]">
                  Método de pago
                </Text>
                <Text className="txt-medium text-brand-black font-serif italic text-lg leading-tight">
                  {selectedPaymentMethod === "manual_efectivo" ? "1. Efectivo" : 
                   selectedPaymentMethod === "manual_transferencia" ? "2. Transferencia (Nequi/Daviplata/BreB)" :
                   paymentInfoMap[activeSession?.provider_id]?.title || activeSession?.provider_id}
                </Text>
              </div>
              <div className="flex flex-col w-full small:w-1/2">
                <Text className="txt-medium-plus text-ui-fg-base mb-2 font-bold uppercase tracking-widest text-[10px]">
                  Detalles del pago
                </Text>
                <div
                  className="flex gap-4 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-black/10 text-brand-black">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Text className="font-bold text-brand-black">
                      {isStripeLike(selectedPaymentMethod) && cardBrand
                        ? cardBrand
                        : "Pago Pendiente"}
                    </Text>
                    <Text className="text-xs text-brand-gray">
                      {isStripeLike(selectedPaymentMethod) ? "Procesado por Stripe" : "Verificar con el vendedor"}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Método de pago
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Tarjeta de Regalo
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment
