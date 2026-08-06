import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"
import type { Metadata } from "next"

// Páginas de cuenta sin valor SEO (guía Google SEO Starter: opt out de páginas
// que no deben aparecer en Search — mismo criterio que /checkout). Añadido 06-ago-2026.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}
