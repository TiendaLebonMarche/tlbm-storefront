import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Calcular stock total
  const totalStock = product.variants?.reduce(
    (sum, v) => sum + (v.inventory_quantity || 0),
    0
  ) || 0

  const isNew = product.created_at
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const isLowStock = totalStock < 5 && totalStock > 0

  return (
    <div className="bg-white">
      {/* Product Section */}
      <div className="py-12 md:py-20 lg:py-24">
        <div className="content-container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left: Image Gallery - More sticky space */}
            <div className="w-full lg:w-3/5">
              <div className="lg:sticky lg:top-32">
                <ImageGallery images={images} />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-2/5 flex flex-col gap-y-12">
              <div className="space-y-8">
                {/* Breadcrumb - Minimalist */}
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                  <LocalizedClientLink href="/store" className="hover:text-brand-gold transition-colors">Boutique</LocalizedClientLink>
                  <span className="text-gray-200">/</span>
                  <span className="text-brand-gold">{product.collection?.title || "Exclusivo"}</span>
                </div>

                {/* Title & Badges */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    {isNew && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-brand-gold text-brand-gold">
                        Lanzamiento
                      </span>
                    )}
                    {isLowStock && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-red-200 text-red-600">
                        Edición Limitada
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-black leading-[1.1]" data-testid="product-title">
                    {product.title}
                  </h1>

                  {/* Rating - Subtle */}
                  <div className="flex items-center gap-4 py-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">28 valoraciones</span>
                  </div>
                </div>

                {/* Description - Editorial font sizing */}
                <p className="text-gray-500 font-light leading-relaxed text-base">
                  {product.description}
                </p>
              </div>

              {/* Price & Primary Actions */}
              <div className="space-y-10">
                <div className="pt-8 border-t border-gray-100">
                  <ProductInfo product={product} />
                </div>

                <Suspense
                  fallback={
                    <ProductActions
                      disabled={true}
                      product={product}
                      region={region}
                    />
                  }
                >
                  <ProductActionsWrapper id={product.id} region={region} />
                </Suspense>

                {/* Status Indicator */}
                {totalStock > 0 ? (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Disponible para despacho inmediato
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-red-500">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Agotado temporalmente
                    </span>
                  </div>
                )}
              </div>

              {/* Features Accordion - Minimalist */}
              <div className="pt-12">
                <ProductTabs product={product} />
              </div>

              {/* Trust Section - Clean Column */}
              <div className="grid grid-cols-1 gap-8 py-12 border-t border-gray-100">
                {[
                  { icon: "✧", title: "Certificado de Autenticidad", desc: "Garantía de origen para cada pieza." },
                  { icon: "📦", title: "Envío Prioritario", desc: "Entrega asegurada en 24-48 horas." },
                  { icon: "↩", title: "Garantía de Satisfacción", desc: "Retorno sin complicaciones por 30 días." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <span className="text-brand-gold text-lg select-none">{item.icon}</span>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-black">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 font-light leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Clean & Centered */}
      <div className="bg-[#fafafa] py-24 md:py-32">
        <div className="content-container max-w-3xl">
          <div className="text-center mb-20 space-y-4">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">Asistencia</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-black italic">Información Útil</h2>
          </div>

          <div className="space-y-0 divide-y divide-gray-200/60 border-y border-gray-200/60">
            {[
              {
                q: "¿Cómo es el proceso de envío?",
                a: "Cada pieza es embalada con estándares de galería y despachada por servicios prioritarios para asegurar su integridad."
              },
              {
                q: "¿Ofrecen certificados de garantía?",
                a: "Sí, todos nuestros productos de catálogo incluyen documentación de autenticidad y garantía de fábrica verificada."
              },
              {
                q: "¿Puedo solicitar una asesoría personalizada?",
                a: "Nuestros curadores están disponibles vía WhatsApp para brindarle detalles adicionales sobre cualquier pieza de nuestra colección."
              }
            ].map((faq, idx) => (
              <details key={idx} className="group py-8 transition-all">
                <summary className="font-bold text-sm text-brand-black uppercase tracking-widest cursor-pointer flex items-center justify-between select-none list-none">
                  {faq.q}
                  <span className="text-brand-gold group-open:rotate-180 transition-transform duration-500 text-xs">▿</span>
                </summary>
                <div className="overflow-hidden group-open:animate-in group-open:fade-in group-open:slide-in-from-top-2">
                  <p className="text-gray-500 text-sm mt-6 font-light leading-relaxed max-w-2xl">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products - Editorial Intro */}
      <div className="bg-white py-24 md:py-32 overflow-hidden">
        <div className="content-container">
          <div className="mb-20 text-center">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Complementos</span>
            <h2 className="text-5xl md:text-6xl font-serif text-brand-black italic leading-tight">También le <br /> <span className="not-italic">podría interesar</span></h2>
          </div>

          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
