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
      label: "Descripción",
      component: (
        <div className="py-4">
          <ul className="space-y-4">
            {product.description?.split("-").filter(line => line.trim().length > 0).map((line, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-sm font-light text-brand-black/80 font-sans leading-relaxed">
                  {line.trim()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: "Especificaciones Técnicas",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Envíos, Retracto y Garantías",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full border-t border-black/10 mt-8">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="small"
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
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
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
    <div className="py-4">
      <div className="grid grid-cols-1 gap-y-6">
        {[
          {
            icon: <FastDelivery />,
            title: "Modelo Fast-Track & Nacional",
            desc: "Bucaramanga AM: Entrega garantizada en 24h. Resto de Colombia: Depende de transportadoras externas (2 a 5 días hábiles). Rastreo incluido."
          },
          {
            icon: <Refresh />,
            title: "Derecho de Retracto (Ley 1480/2011)",
            desc: "Tienes 5 días hábiles tras recibir el producto para devolverlo si cambias de opinión. El costo del flete de retorno corre por cuenta del comprador."
          },
          {
            icon: <Back />,
            title: "Garantías & Reversión de Pago",
            desc: "Reembolso protegido y reversión de pago por ley ante producto fallido. Ofrecemos soporte directo por WhatsApp, sin robots para tus quejas."
          }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-x-6">
            <div className="flex-shrink-0 text-brand-olive p-3 bg-brand-olive/10 rounded-full">
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
