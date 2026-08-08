import { HttpTypes } from "@medusajs/types"

import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Back from "@modules/common/icons/back"

type ProductSectionsProps = {
  product: HttpTypes.StoreProduct
}

/**
 * Secciones del PDP con H2 en forma de PREGUNTA (framework AI SEO punto 4:
 * "Every H2 and H3 as a real question, so AI can lift a clean answer from each").
 *
 * A diferencia de las tabs anteriores (solo una sección en el DOM), TODAS las
 * secciones están visibles y en el HTML — la IA y Google leen las 3 respuestas.
 */
export default function ProductSections({ product }: ProductSectionsProps) {
  return (
    <div className="w-full space-y-12">
      {/* ── ¿Qué incluye? (descripción) ── */}
      <section>
        <h2 className="font-serif text-xl md:text-2xl font-bold text-brand-black tracking-tight mb-5">
          ¿Qué incluye este producto?
        </h2>
        {product.description ? (
          <ul className="space-y-4 max-w-2xl">
            {product.description
              .split("-")
              .filter((line) => line.trim().length > 0)
              .map((line, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span className="w-1.5 h-px bg-brand-black/20 mt-2.5 flex-shrink-0 transition-all duration-500 group-hover:w-3 group-hover:bg-brand-black" />
                  <p className="text-[15px] font-light text-brand-gray font-sans leading-relaxed">
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
        <h2 className="font-serif text-xl md:text-2xl font-bold text-brand-black tracking-tight mb-2">
          ¿Cuáles son las especificaciones?
        </h2>
        <ProductInfoTab product={product} />
      </section>

      {/* ── ¿Cómo llega y puedo devolverlo? ── */}
      <section>
        <h2 className="font-serif text-xl md:text-2xl font-bold text-brand-black tracking-tight mb-2">
          ¿Cómo llega y puedo devolverlo?
        </h2>
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

  return (
    <div className="py-4 space-y-6">
      {/* Specs Grid */}
      {specs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {specs.map((item, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-gray-50 px-0">
              <span className="text-xs text-brand-gray uppercase tracking-wider font-sans">
                {item.label}
              </span>
              <span className="text-sm text-brand-black font-medium text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-brand-gray font-light italic">
          Especificaciones no disponibles.
        </p>
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

      {/* Metadata key-values — filtrar campos internos */}
      {Object.keys(metadata).length > 0 && (
        <div className="pt-2">
          <p className="text-[10px] text-brand-gray uppercase tracking-[0.2em] mb-3 font-sans">
            Información adicional
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {Object.entries(metadata)
              .filter(
                ([key]) =>
                  !["video_url", "video", "internal", "origen", "origin", "asin"].includes(key)
              )
              .map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-50">
                  <span className="text-xs text-brand-gray uppercase tracking-wider font-sans capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm text-brand-black font-medium text-right">
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
            <div className="flex-shrink-0 text-brand-black/60 mt-0.5">{item.icon}</div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-brand-black uppercase tracking-wider block font-sans">
                {item.title}
              </span>
              <p className="text-[13px] text-brand-gray font-light leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
