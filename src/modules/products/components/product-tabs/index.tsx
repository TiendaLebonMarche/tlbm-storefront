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
          {product.description ? (
            <ul className="space-y-3">
              {product.description.split("-").filter(line => line.trim().length > 0).map((line, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-brand-brown/30 mt-2 flex-shrink-0" />
                  <p className="text-sm font-light text-gray-600 font-sans leading-relaxed">
                    {line.trim()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 font-light italic">No hay descripción disponible para este producto.</p>
          )}
        </div>
      ),
    },
    {
      label: "Especificaciones",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Envíos y Garantías",
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
  // Build specs from MedusaJS metadata fields
  const specs = [
    { label: "Material", value: product.material },
    { label: "País de origen", value: product.origin_country },
    { label: "Categoría", value: product.type?.value },
    { label: "Colección", value: product.collection?.title },
    { label: "Dimensiones", value: product.length && product.width && product.height ? `${product.length} × ${product.width} × ${product.height} cm` : null },
    { label: "Peso", value: product.weight ? `${product.weight}g` : null },
    { label: "Referencia", value: product.mid_code || product.hs_code },
  ].filter(i => i.value)

  // Extract metadata/tags if available
  const tags = (product as any).tags || []
  const metadata = (product as any).metadata || {}

  return (
    <div className="py-4 space-y-6">
      {/* Specs Grid */}
      {specs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {specs.map((item, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-50 px-0">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-sans">
                {item.label}
              </span>
              <span className="text-sm text-brand-brown font-medium text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 font-light italic">Especificaciones no disponibles.</p>
      )}

      {/* Tags from MedusaJS metadata */}
      {tags.length > 0 && (
        <div className="pt-2">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3 font-sans">Etiquetas</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: any) => (
              <span
                key={tag.id}
                className="text-[10px] text-gray-500 border border-gray-200 px-3 py-1.5 uppercase tracking-wider font-sans"
              >
                {tag.value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metadata key-values */}
      {Object.keys(metadata).length > 0 && (
        <div className="pt-2">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3 font-sans">Información adicional</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b border-gray-50">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-sans capitalize">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="text-sm text-brand-brown font-medium text-right">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Variants info */}
      {product.variants && product.variants.length > 1 && (
        <div className="pt-2">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3 font-sans">Variantes disponibles</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <span
                key={variant.id}
                className="text-[10px] text-gray-500 bg-gray-50 px-3 py-1.5 tracking-wider font-sans"
              >
                {variant.title} {variant.sku ? `· ${variant.sku}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 gap-y-5">
        {[
          {
            icon: <FastDelivery />,
            title: "Envío rápido",
            desc: "Bucaramanga: 24h garantizado. Resto de Colombia: 2–5 días hábiles con rastreo incluido.",
          },
          {
            icon: <Refresh />,
            title: "Derecho de retracto",
            desc: "5 días hábiles para devolver (Ley 1480). El costo del flete de retorno va por cuenta del comprador.",
          },
          {
            icon: <Back />,
            title: "Garantía y soporte",
            desc: "Reembolso protegido ante producto fallido. Soporte directo por WhatsApp, sin bots.",
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex-shrink-0 text-brand-brown/60 mt-0.5">
              {item.icon}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-brown uppercase tracking-wider block font-sans">
                {item.title}
              </span>
              <p className="text-[13px] text-gray-400 font-light leading-relaxed font-sans">
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
