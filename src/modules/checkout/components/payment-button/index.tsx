"use client"

import { isManual, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
  disabled?: boolean
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
  disabled = false,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1 ||
    disabled

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripeLike(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} cart={cart} data-testid={dataTestId} />
      )
    default:
      return <Button disabled>Selecciona un método de pago</Button>
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    try {
      const result = await placeOrder()
      if (result && "error" in result && result.error) {
        setErrorMessage(result.error)
        return
      }
    } catch (err: any) {
      // Si el error es una redirección interna, la ignoramos para que Next.js la maneje
      if (err.digest?.includes("NEXT_REDIRECT")) {
        return
      }
      setErrorMessage(err.message || "Error al procesar el pago. Por favor intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          setSubmitting(false)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
        className="w-full pill-button h-14 bg-brand-black hover:bg-brand-black text-white font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl border-none disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Confirmar Compra
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady, cart }: { notReady: boolean, cart: HttpTypes.StoreCart }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    try {
      const result = await placeOrder()
      if (result && "error" in result && result.error) {
        setErrorMessage(result.error)
        return
      }
    } catch (err: any) {
      if (err.message?.includes("NEXT_REDIRECT") || err.digest?.includes("NEXT_REDIRECT")) {
        return
      }
      setErrorMessage(err.message || "Error al completar la compra.")
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
        className="w-full pill-button h-14 bg-brand-black hover:bg-brand-black text-white font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl border-none disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Confirmar Compra
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
