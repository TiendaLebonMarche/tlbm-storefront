import React from "react"
import { CreditCard } from "@medusajs/icons"

import Ideal from "@modules/common/icons/ideal"
import Bancontact from "@modules/common/icons/bancontact"
import PayPal from "@modules/common/icons/paypal"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_medusa-payments_default": {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Efectivo - Transferencia: Nequi/Daviplata/BreB",
    icon: <CreditCard />,
  },
  manual_efectivo: {
    title: "1. Efectivo",
    icon: <CreditCard />,
  },
  manual_transferencia: {
    title: "2. Transferencia (Nequi/Daviplata/BreB)",
    icon: <CreditCard />,
  },
  "pp_efectivo-payment_efectivo": {
    title: "Efectivo - Transferencia: Nequi/Daviplata/BreB",
    icon: <CreditCard />,
  },
  // Add more payment providers here
}

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  )
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("manual_") || providerId?.startsWith("pp_system_default") || providerId?.startsWith("pp_efectivo-payment_efectivo")
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]

export const NAV_LINKS = [
  { href: "/ofertas", label: "Ofertas" },
  { href: "/tecnologia", label: "Tecnología" },
  { href: "/sonido", label: "Sonido" },
  { href: "/hogar", label: "Hogar" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/blog", label: "Blog" },
]

export const MORE_LINKS = [
  { href: "/accesorios", label: "Accesorios" },
  { href: "/marcas", label: "Marcas" },
  { href: "/mascotas", label: "Mascotas" },
  { href: "/personal", label: "Personal" },
]
