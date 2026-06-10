import { Radio as RadioGroupOption } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React, { useContext, useMemo, type JSX } from "react"

import Radio from "@modules/common/components/radio"

import { isManual } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import PaymentTest from "../payment-test"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
  children?: React.ReactNode
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "flex flex-col gap-y-2 cursor-pointer py-4 border-2 rounded-3xl px-8 mb-2 hover:border-brand-black transition-all text-xs",
        {
          "border-brand-black bg-brand-gray-light/20": selectedPaymentOptionId === paymentProviderId,
          "border-brand-gray-light": selectedPaymentOptionId !== paymentProviderId,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Radio checked={selectedPaymentOptionId === paymentProviderId} />
          <span className="text-sm font-bold text-brand-black">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </span>
          {isManual(paymentProviderId) && <PaymentTest className="hidden small:block" />}
        </div>
        <span className="justify-self-end text-brand-gray">{paymentInfoMap[paymentProviderId]?.icon}</span>
      </div>
      {isManual(paymentProviderId) && <PaymentTest className="small:hidden text-[10px]" />}
      {children}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setCardBrand: (brand: string) => void
  setError: (error: string | null) => void
  setCardComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  const useOptions: StripeCardElementOptions = useMemo(() => ({
    style: {
      base: {
        fontFamily: "Inter, sans-serif",
        color: "#000000",
        "::placeholder": { color: "#8A8D96" },
      },
    },
    classes: {
      base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 border border-brand-gray-light rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-brand-black/20 focus:border-brand-black transition-all duration-300",
    },
  }), [])

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId && (stripeReady ? (
        <div className="my-4 transition-all duration-150 ease-in-out">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-black mb-1 block">
            Enter your card details:
          </span>
          <CardElement
            options={useOptions as StripeCardElementOptions}
            onChange={(e) => {
              setCardBrand(e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1))
              setError(e.error?.message || null)
              setCardComplete(e.complete)
            }}
          />
        </div>
      ) : (
        <SkeletonCardDetails />
      ))}
    </PaymentContainer>
  )
}
