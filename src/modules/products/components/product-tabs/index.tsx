"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Detalles Exclusivos",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Garantía y Envíos",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[10px]">Material</span>
            <p className="text-gray-700">{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[10px]">País de Origen</span>
            <p className="text-gray-700">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[10px]">Categoría</span>
            <p className="text-gray-700">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[10px]">Peso</span>
            <p className="text-gray-700">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[10px]">Dimensiones</span>
            <p className="text-gray-700">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-3">
          <FastDelivery />
          <div>
            <span className="font-semibold text-brand-black">Envíos Rápidos a todo el País</span>
            <p className="max-w-sm text-gray-500 mt-1">
              Recibe tus artículos originales y exóticos en la puerta de tu casa con nuestra logística prioritaria, cubriendo todo el territorio nacional.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Refresh />
          <div>
            <span className="font-semibold text-brand-black">Cambios sin Complicaciones</span>
            <p className="max-w-sm text-gray-500 mt-1">
              ¿No es lo que esperabas? Te facilitamos el proceso de cambio para que la experiencia premium nunca se detenga.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-3">
          <Back />
          <div>
            <span className="font-semibold text-brand-black">Garantía Ley 1480</span>
            <p className="max-w-sm text-gray-500 mt-1">
              Total tranquilidad. Ofrecemos respaldo de garantía para asegurar que adquieras productos de la más alta calidad y durabilidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
