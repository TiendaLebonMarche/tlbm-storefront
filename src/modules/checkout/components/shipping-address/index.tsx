import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import React, { useEffect, useMemo, useState } from "react"
import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    "shipping_address.first_name": cart?.shipping_address?.first_name || "",
    "shipping_address.last_name": cart?.shipping_address?.last_name || "",
    "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
    "shipping_address.company": cart?.shipping_address?.company || "",
    "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
    "shipping_address.city": cart?.shipping_address?.city || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
    "shipping_address.province": cart?.shipping_address?.province || "",
    "shipping_address.phone": cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  // check if customer has saved addresses that are in the current region
  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    address &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        "shipping_address.first_name": address?.first_name || "",
        "shipping_address.last_name": address?.last_name || "",
        "shipping_address.address_1": address?.address_1 || "",
        "shipping_address.company": address?.company || "",
        "shipping_address.postal_code": address?.postal_code || "",
        "shipping_address.city": address?.city || "",
        "shipping_address.country_code": address?.country_code || "",
        "shipping_address.province": address?.province || "",
        "shipping_address.phone": address?.phone || "",
      }))

    email &&
      setFormData((prevState: Record<string, any>) => ({
        ...prevState,
        email: email,
      }))
  }

  useEffect(() => {
    // Ensure cart is not null and has a shipping_address before setting form data
    if (cart && cart.shipping_address) {
      setFormAddress(cart?.shipping_address, cart?.email)
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart, customer?.email, customer?.addresses]) // Add cart and customer info as dependencies

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hola ${customer.first_name}, ¿quieres usar una de tus direcciones guardadas?`}
          </p>
          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              Object.keys(formData).reduce((acc, key) => {
                acc[key.replace("shipping_address.", "")] = formData[key]
                return acc
              }, {} as Record<string, unknown>) as unknown as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-6">
        <Input
          label="Nombre y Apellidos *"
          name="shipping_address.first_name"
          autoComplete="name"
          value={formData["shipping_address.first_name"]}
          onChange={handleChange}
          required
          className="rounded-full px-6 py-4"
          data-testid="shipping-first-name-input"
        />
        
        <Input
          label="Correo Electrónico *"
          name="email"
          type="email"
          title="Ingresa un correo válido."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="rounded-full px-6 py-4 border-2 border-brand-gray-light focus:border-brand-black transition-all"
          data-testid="shipping-email-input"
        />

        <Input
          label="WhatsApp / Celular *"
          name="shipping_address.phone"
          autoComplete="tel"
          placeholder="Ej: +57 300 123 4567"
          value={formData["shipping_address.phone"]}
          onChange={handleChange}
          required
          className="rounded-full px-6 py-4 border-2 border-brand-gray-light focus:border-brand-black transition-all"
          data-testid="shipping-phone-input"
        />

        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase tracking-widest text-brand-black mb-2 ml-4">Municipio *</label>
          <select
            name="shipping_address.city"
            value={formData["shipping_address.city"]}
            onChange={handleChange}
            required
            className="w-full h-14 rounded-3xl border-2 border-brand-gray-light px-6 bg-white focus:outline-hidden focus:ring-4 focus:ring-brand-black/10 focus:border-brand-black text-sm transition-all appearance-none text-brand-black font-medium shadow-xs"
            data-testid="shipping-city-select"
          >
            <option value="">Selecciona un municipio</option>
            <option value="Bucaramanga">Bucaramanga</option>
            <option value="Floridablanca">Floridablanca</option>
            <option value="Giron">Girón</option>
            <option value="Piedecuesta">Piedecuesta</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <Input
            label="Dirección Completa (Indispensable para el flete) *"
            name="shipping_address.address_1"
            autoComplete="address-line1"
            value={formData["shipping_address.address_1"]}
            onChange={handleChange}
            required
            className="rounded-full px-6 py-4 border-2 border-brand-gray-light focus:border-brand-black transition-all"
            data-testid="shipping-address-input"
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Observaciones de dirección (Opcional)"
            name="shipping_address.address_2"
            value={formData["shipping_address.address_2"]}
            onChange={handleChange}
            className="rounded-full px-6 py-4 border-2 border-brand-gray-light focus:border-brand-black transition-all bg-brand-gray-light/20/30"
            data-testid="shipping-address-2-input"
          />
        </div>

        {/* Hidden internal fields to satisfy Medusa validation without cluttering the UI */}
        <input type="hidden" name="shipping_address.last_name" value={formData["shipping_address.first_name"]} />
        <input type="hidden" name="shipping_address.country_code" value="co" />
        <input type="hidden" name="shipping_address.postal_code" value="680001" />
        <input type="hidden" name="shipping_address.province" value="Santander" />
      </div>

      <div className="my-8">
        <Checkbox
          label="Usar la misma dirección para facturación"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>
    </>
  )
}

export default ShippingAddress
