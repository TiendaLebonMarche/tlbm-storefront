import { HttpTypes } from "@medusajs/types"

import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Back from "@modules/common/icons/back"

type ProductSectionsProps = {
  product: HttpTypes.StoreProduct
}

/**
 * Secciones del PDP con jerarquía H3-pregunta (framework AI SEO punto 4) y
 * estilo premium TLBM (rediseño 08-ago-2026 — enjambre de diseño):
 * - eyebrows dorados por bloque (ritmo vertical)
 * - "¿Qué incluye?" como lista de beneficios con checks dorados
 * - spec sheet editorial (dl con divisores, labels uppercase, valores semibold)
 * - datos internos formateados (original true → "Sí"), sin ASIN/origen
 */
export default function ProductSections({ product }: ProductSectionsProps) {
  return (
    <div className="w-full space-y-12">
      {/* ── ¿Qué incluye? (descripción) ── */}
      <section>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          Qué incluye
        </p>
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-black tracking-tight mb-5">
          ¿Qué incluye este producto?
        </h3>
        {product.description ? (
          <ul className="space-y-3.5 max-w-2xl">
            {product.description
              .split("-")
              .filter((line) => line.trim().length > 0)
              .map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-[15px] font-normal text-brand-gray font-sans leading-relaxed">
                    {line.trim()}
                  </p>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-sm text-brand-gray font-light italic">
            No hay descripción disponible para este producto.
          </p>
        )}
      </section>

      {/* ── ¿Cuáles son las especificaciones? ── */}
      <section>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          Especificaciones
        </p>
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-black tracking-tight mb-2">
          ¿Cuáles son las especificaciones?
        </h3>
        <ProductInfoTab product={product} />
      </section>

      {/* ── ¿Cómo llega y puedo devolverlo? ── */}
      <section>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          Envío y devoluciones
        </p>
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-brand-black tracking-tight mb-2">
          ¿Cómo llega y puedo devolverlo?
        </h3>
        <ShippingInfoTab />
      </section>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductSectionsProps) => {
  // Build specs from MedusaJS metadata fields
  const specs = [
    { label: "Material", value: product.material },
    { label: "País de origen", value: product.origin_country },
    { label: "Categoría", value: product.type?.value },
    { label: "Colección", value: product.collection?.title },
    {
      label: "Dimensiones",
      value:
        product.length && product.width && product.height
          ? `${product.length} × ${product.width} × ${product.height} cm`
          : null,
    },
    { label: "Peso", value: product.weight ? `${product.weight}g` : null },
    { label: "Referencia", value: product.mid_code || product.hs_code },
  ].filter((i) => i.value)

  // Extract metadata/tags if available
  const tags = (product as any).tags || []
  // Filtrar tags internos de taxonomía (marca:/tipo:/uso:) — son metadatos SEO,
  // no etiquetas visibles al cliente. Solo mostrar etiquetas descriptivas limpias.
  const publicTags = tags.filter(
    (t: any) =>
      t?.value && !t.value.includes(":") && !["nuevo", "new"].includes(t.value.toLowerCase())
  )
  const metadata = (product as any).metadata || {}

  // Formatear valores crudos de BD para el cliente (rediseño 08-ago):
  // "true"/"false" → "Sí"/"No"; filtrar campos internos de compra.
  const formatValue = (v: string): string => {
    if (v === "true") return "Sí"
    if (v === "false") return "No"
    return v
  }

  return (
    <div className="py-4 space-y-6">
      {/* Specs — tabla editorial con divisores */}
      {specs.length > 0 && (
        <dl className="divide-y divide-black/10 border-b border-black/10">
          {specs.map((item, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between gap-6 py-3.5"
            >
              <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gray">
                {item.label}
              </dt>
              <dd className="text-sm font-semibold text-brand-black text-right">
                {formatValue(String(item.value))}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Metadata key-values — formateados y sin campos internos */}
      {Object.keys(metadata).length > 0 && (
        <div className="pt-1">
          <p className="text-[10px] text-brand-gray uppercase tracking-[0.2em] mb-3 font-sans">
            Información adicional
          </p>
          <dl className="divide-y divide-black/10 border-b border-black/10">
            {Object.entries(metadata)
              .filter(
                ([key]) =>
                  !["video_url", "video", "internal", "origen", "origin", "asin", "proveedor", "supplier"].includes(
                    key.toLowerCase()
                  )
              )
              .map(([key, value]) => (
                <div key={key} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gray capitalize">
                    {key === "sku" ? "SKU" : key.replace(/_/g, " ")}
                  </dt>
                  <dd className="text-sm font-semibold text-brand-black text-right">
                    {formatValue(String(value))}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      )}

      {/* Tags from MedusaJS metadata */}
      {publicTags.length > 0 && (
        <div className="pt-2">
          <p className="text-[10px] text-brand-gray uppercase tracking-[0.2em] mb-3 font-sans">
            Etiquetas
          </p>
          <div className="flex flex-wrap gap-2">
            {publicTags.map((tag: any) => (
              <span
                key={tag.id}
                className="text-[10px] text-brand-gray border border-brand-gray-light px-3 py-1.5 uppercase tracking-wider font-sans"
              >
                {tag.value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Variants info */}
      {product.variants && product.variants.length > 1 && (
        <div className="pt-2">
          <p className="text-[10px] text-brand-gray uppercase tracking-[0.2em] mb-3 font-sans">
            Variantes disponibles
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <span
                key={variant.id}
                className="text-[10px] text-brand-gray bg-brand-gray-light/20 px-3 py-1.5 tracking-wider font-sans"
              >
                {variant.title} {variant.sku ? `· ${variant.sku}` : ""}
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
            <div className="flex-shrink-0 text-[#D4AF37] mt-0.5">{item.icon}</div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-black uppercase tracking-wider block font-sans">
                {item.title}
              </span>
              <p className="text-[15px] font-normal text-brand-gray leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
