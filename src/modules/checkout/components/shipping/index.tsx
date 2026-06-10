"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Shipping: React.FC<{
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}> = ({ cart, availableShippingMethods }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const isOpen = searchParams.get("step") === "delivery"

  useEffect(() => {
    setIsLoadingPrices(true)
    if (availableShippingMethods?.length) {
      const promises = availableShippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))
      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[(p as any).value?.id || ""] = (p as any).value?.amount!))
          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      } else {
        setIsLoadingPrices(false)
      }
    }
  }, [availableShippingMethods, cart.id])

  const handleEdit = () => router.push(pathname + "?step=delivery", { scroll: false })
  const handleSubmit = () => router.push(pathname + "?step=payment", { scroll: false })

  const handleSetShippingMethod = async (id: string) => {
    setError(null)
    setIsLoading(true)
    setShippingMethodId(id)
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => { setError(err.message) })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => setError(null), [isOpen])

  return (
    <div className="bg-white checkout-step">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className={clx("text-xl md:text-2xl font-serif italic text-brand-black flex items-center gap-2", {
          "opacity-50 pointer-events-none select-none": !isOpen && cart.shipping_methods?.length === 0,
        })}>
          Envíos
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && <CheckCircleSolid className="text-brand-black" />}
        </h2>
        {!isOpen && cart?.shipping_address && cart?.billing_address && cart?.email && (
          <button onClick={handleEdit} className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black underline hover:text-brand-black/60 transition-colors" data-testid="edit-delivery-button">
            Editar
          </button>
        )}
      </div>
      {isOpen ? (
        <div className="pb-8">
          <div className="grid">
            <span className="text-sm text-brand-gray font-medium mb-4">
              Elige tu método de entrega preferido
            </span>
            <div data-testid="delivery-options-container" className="pb-8">
              <RadioGroup value={shippingMethodId} onChange={(v) => v && handleSetShippingMethod(v)}>
                {availableShippingMethods?.map((option: any) => {
                  const isDisabled = option.price_type === "calculated" && !isLoadingPrices && typeof calculatedPricesMap[option.id] !== "number"
                  const isPickup = option.name.toLowerCase().includes("tienda") || option.name.toLowerCase().includes("pickup")
                  const displayName = isPickup ? "Recogida en Tienda" : "Envío en Bucaramanga"
                  const subLabel = isPickup ? "Gratis - Retiro local" : "Domicilio express"

                  return (
                    <Radio
                      key={option.id}
                      value={option.id}
                      data-testid="delivery-option-radio"
                      disabled={isDisabled}
                      className={clx(
                        "flex items-center justify-between cursor-pointer py-6 border-2 rounded-3xl px-8 mb-4 hover:border-brand-black transition-all shadow-sm text-xs",
                        {
                          "border-brand-black bg-brand-gray-light/30": option.id === shippingMethodId,
                          "border-brand-gray-light bg-white": option.id !== shippingMethodId,
                          "opacity-50 cursor-not-allowed": isDisabled,
                        }
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                        <MedusaRadio checked={option.id === shippingMethodId} />
                        <div className="flex flex-col text-left">
                          <span className="text-base font-bold text-brand-black">{displayName}</span>
                          <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">{subLabel}</span>
                        </div>
                      </div>
                      <span className="justify-self-end font-bold text-brand-black text-sm">
                        {option.amount !== undefined && option.amount !== null ? (
                          convertToLocale({ amount: option.amount!, currency_code: cart?.currency_code })
                        ) : calculatedPricesMap[option.id] ? (
                          convertToLocale({ amount: calculatedPricesMap[option.id], currency_code: cart?.currency_code })
                        ) : isLoadingPrices && option.price_type === "calculated" ? (
                          <Loader />
                        ) : ("Gratis")}
                      </span>
                    </Radio>
                  )
                })}
              </RadioGroup>
            </div>
          </div>
          <div>
            <ErrorMessage error={error} data-testid="delivery-option-error-message" />
            <Button size="large" className="mt-6 pill-button bg-brand-black hover:bg-brand-navy text-white w-full sm:w-auto" onClick={handleSubmit} isLoading={isLoading} disabled={!shippingMethodId} data-testid="submit-delivery-option-button">
              Continuar al Pago
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-xs">
          {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
            <div className="flex flex-col w-full bg-brand-gray-light/10 p-4 rounded-2xl border border-brand-gray-light/30">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black mb-2">Método Escogido</span>
              <span className="text-sm text-brand-gray">
                {cart.shipping_methods!.at(-1)!.name.toLowerCase().includes("tienda") ? "Recogida en Tienda" : "Envío en Bucaramanga"}{" "}
                ({convertToLocale({ amount: cart.shipping_methods!.at(-1)!.amount!, currency_code: cart?.currency_code })})
              </span>
            </div>
          )}
        </div>
      )}
      <div className="h-px bg-brand-gray-light mt-8" />
    </div>
  )
}

export default Shipping
