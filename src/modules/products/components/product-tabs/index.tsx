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
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {product.material && (
          <div className="border-l-2 border-brand-gold pl-4">
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[11px]">
              Material
            </span>
            <p className="text-gray-700 mt-1">{product.material}</p>
          </div>
        )}
        {product.origin_country && (
          <div className="border-l-2 border-brand-gold pl-4">
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[11px]">
              País de Origen
            </span>
            <p className="text-gray-700 mt-1">{product.origin_country}</p>
          </div>
        )}
        {product.type && (
          <div className="border-l-2 border-brand-gold pl-4">
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[11px]">
              Categoría
            </span>
            <p className="text-gray-700 mt-1">{product.type.value}</p>
          </div>
        )}
        {product.weight && (
          <div className="border-l-2 border-brand-gold pl-4">
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[11px]">
              Peso
            </span>
            <p className="text-gray-700 mt-1">{product.weight} g</p>
          </div>
        )}
        {product.length && product.width && product.height && (
          <div className="border-l-2 border-brand-gold pl-4">
            <span className="font-semibold text-brand-gold uppercase tracking-widest text-[11px]">
              Dimensiones
            </span>
            <p className="text-gray-700 mt-1">
              {product.length} x {product.width} x {product.height} cm
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
          <div className="flex-shrink-0">
            <FastDelivery />
          </div>
          <div>
            <span className="font-semibold text-brand-black block mb-2">
              Envíos Rápidos a todo el País
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">
              Recibe tus artículos originales y exóticos en la puerta de tu casa con nuestra logística prioritaria, cubriendo todo el territorio nacional.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
          <div className="flex-shrink-0">
            <Refresh />
          </div>
          <div>
            <span className="font-semibold text-brand-black block mb-2">
              Cambios sin Complicaciones
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">
              ¿No es lo que esperabas? Te facilitamos el proceso de cambio para que la experiencia premium nunca se detenga.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="flex-shrink-0">
            <Back />
          </div>
          <div>
            <span className="font-semibold text-brand-black block mb-2">
              Garantía Ley 1480
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">
              Total tranquilidad. Ofrecemos respaldo de garantía para asegurar que adquieras productos de la más alta calidad y durabilidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
