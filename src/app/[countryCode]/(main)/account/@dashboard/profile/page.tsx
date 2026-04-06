import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Perfil",
  description: "Vea y edite su perfil de Le Bon March\u00e9.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Perfil</h1>
        <p className="text-base-regular">
          Consulta y actualiza tu informaci\u00f3n de perfil, incluyendo tu nombre, correo
          electr\u00f3nico y n\u00famero de tel\u00e9fono. Tambi\u00e9n puedes actualizar tu direcci\u00f3n de facturaci\u00f3n, o cambiar
          tu contrase\u00f1a.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        {/* <ProfilePassword customer={customer} />
        <Divider /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
;``
