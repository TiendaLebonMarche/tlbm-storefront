"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button, clx, Heading, Text } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useMemo } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
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

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)
    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
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
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Envíos
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid />
          )}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-brand-brown underline hover:text-brand-olive font-bold text-sm"
                data-testid="edit-delivery-button"
              >
                Editar
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <div className="pb-8">
          <div className="grid">
            <div className="flex flex-col">
              <span className="font-medium txt-medium text-ui-fg-base mb-4">
                Elige tu método de entrega preferido
              </span>
            </div>
            <div data-testid="delivery-options-container">
              <div className="pb-8 md:pt-0 pt-2">
                <RadioGroup
                  value={shippingMethodId}
                  onChange={(v) => {
                    if (v) {
                      const method = availableShippingMethods?.find(m => m.id === v)
                      const isPickup = (method as any)?.service_zone?.fulfillment_set?.type === "pickup"
                      return handleSetShippingMethod(v, isPickup ? "pickup" : "shipping")
                    }
                  }}
                >
                  {availableShippingMethods?.map((option: any) => {
                    const isDisabled =
                      option.price_type === "calculated" &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== "number"

                    const isPickup = option.name.toLowerCase().includes("tienda") || 
                                     option.name.toLowerCase().includes("pickup") ||
                                     option.service_zone?.fulfillment_set?.type === "pickup"
                    
                    const isBucaramanga = option.name.toLowerCase().includes("bucaramanga") || 
                                          !isPickup
                    
                    const displayName = isPickup ? "Recogida en Tienda" : "Envío en Bucaramanga"
                    const subLabel = isPickup ? "Gratis - Retiro local" : "Domicilio express"
                    
                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "flex items-center justify-between text-small-regular cursor-pointer py-6 border-2 rounded-3xl px-8 mb-4 hover:border-brand-olive transition-all shadow-sm",
                          {
                            "border-brand-olive bg-brand-soft/30 ring-2 ring-brand-olive/20":
                              option.id === shippingMethodId,
                            "border-gray-100 bg-white": option.id !== shippingMethodId,
                            "opacity-50 cursor-not-allowed":
                              isDisabled,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <MedusaRadio
                            checked={option.id === shippingMethodId}
                          />
                          <div className="flex flex-col text-left">
                            <span className="text-base font-bold text-brand-brown">
                              {displayName}
                            </span>
                            <span className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">
                              {subLabel}
                            </span>
                          </div>
                        </div>
                        <span className="justify-self-end text-ui-fg-base font-bold">
                          {option.amount !== undefined && option.amount !== null ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices && option.price_type === "calculated" ? (
                            <Loader />
                          ) : (
                            "Gratis"
                          )}
                        </span>
                      </Radio>
                    )
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              size="large"
              className="mt-6 pill-button bg-brand-brown hover:bg-brand-olive text-white w-full sm:w-auto"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!shippingMethodId}
              data-testid="submit-delivery-option-button"
            >
              Continuar al Pago
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col w-full bg-brand-soft/5 p-4 rounded-2xl border border-brand-soft/20">
                <Text className="txt-medium-plus text-ui-fg-base mb-1 font-bold">
                  Método Escogido
                </Text>
                <Text className="txt-medium text-brand-brown">
                  {cart.shipping_methods!.at(-1)!.name.toLowerCase().includes("tienda") ? "Recogida en Tienda" : "Envío en Bucaramanga"}{" "}
                  ({convertToLocale({
                    amount: cart.shipping_methods!.at(-1)!.amount!,
                    currency_code: cart?.currency_code,
                  })})
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Shipping
