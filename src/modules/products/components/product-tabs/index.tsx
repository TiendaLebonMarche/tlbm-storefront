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
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {[
          { label: "Material", value: product.material },
          { label: "Origen", value: product.origin_country },
          { label: "Categoría", value: product.type?.value },
          { label: "Dimensiones", value: product.length && `${product.length}x${product.width}x${product.height} cm` },
          { label: "Peso", value: product.weight && `${product.weight}g` }
        ].filter(i => i.value).map((item, i) => (
          <div key={i} className="space-y-2 border-b border-gray-50 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/80 block">
              {item.label}
            </span>
            <p className="text-sm text-brand-black/70 font-light">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-y-10">
        {[
          {
            icon: <FastDelivery />,
            title: "Logística Prioritaria",
            desc: "Despachos asegurados con tracking en tiempo real para todo el territorio nacional."
          },
          {
            icon: <Refresh />,
            title: "Políticas de Retorno",
            desc: "Garantizamos su satisfacción total. Si la pieza no cumple sus expectativas, dispone de 30 días para trámites de cambio."
          },
          {
            icon: <Back />,
            title: "Garantía de Calidad",
            desc: "Todas nuestras piezas cumplen con los estándares de calidad de la Ley 1480 y respaldo directo de fábrica."
          }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-x-6">
            <div className="flex-shrink-0 text-brand-black p-3 bg-gray-50/50 rounded-full">
              {item.icon}
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-brand-black uppercase tracking-widest block">
                {item.title}
              </span>
              <p className="text-sm text-gray-500 font-light leading-relaxed max-w-lg">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductTabs
