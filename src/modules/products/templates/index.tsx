import { HttpTypes } from "@medusajs/types"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"
import dynamic from "next/dynamic"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Reveal from "@modules/common/components/reveal"

const ProductTabs = dynamic(() => import("@modules/products/components/product-tabs"), {
  ssr: true,
})

const RelatedProducts = dynamic(() => import("@modules/products/components/related-products"), {
  ssr: true,
  loading: () => <SkeletonRelatedProducts />,
})

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

  const totalStock = product.variants?.reduce(
    (sum, v) => {
      // In Medusa v2, inventory_quantity may be null (managed via inventory items)
      if (v.inventory_quantity === null || v.inventory_quantity === undefined) {
        return sum + 999
      }
      return sum + (v.inventory_quantity || 0)
    },
    0
  ) || 999

  const isNew = product.created_at
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const isLowStock = totalStock < 5 && totalStock > 0

  // Extract MedusaJS metadata
  const tags = (product as any).tags || []
  const metadata = (product as any).metadata || {}

  return (
    <div className="bg-white min-h-screen selection:bg-brand-black/10">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-gray-50">
        <div className="content-container py-4 md:py-5">
          <nav className="flex items-center gap-2 text-[9px] text-brand-gray tracking-[0.2em] uppercase font-sans">
            <LocalizedClientLink href="/" className="hover:text-brand-black transition-colors duration-300">Inicio</LocalizedClientLink>
            <span className="text-gray-200">/</span>
            <LocalizedClientLink href="/store" className="hover:text-brand-black transition-colors duration-300">Tienda</LocalizedClientLink>
            {product.collection && (
              <>
                <span className="text-gray-200">/</span>
                <span className="text-brand-black/60 font-medium">{product.collection.title}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ── HERO: Gallery + Product Info ── */}
      <div className="content-container py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-28 items-start">

          {/* LEFT: Gallery — 58% */}
          <div className="w-full lg:w-[58%]">
            <div className="lg:sticky lg:top-32">
              <ImageGallery images={images} productTitle={product.title} />
            </div>
          </div>

          {/* RIGHT: Product Info — 42% */}
          <div className="w-full lg:w-[42%] lg:mt-4">
            
            {/* Header: Collection + Title + Rating */}
            <div className="space-y-6 pb-8 border-b border-brand-gray-light/60">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {product.collection?.title && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-black/40 font-sans border-r border-brand-gray-light pr-3">
                      {product.collection.title}
                    </span>
                  )}
                  {product.categories?.map((cat) => (
                    <span key={cat.id} className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-black bg-brand-gray-light px-2 py-0.5 font-sans">
                      {cat.name}
                    </span>
                  ))}
                  {isNew && (
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-1 bg-brand-black text-white font-sans rounded-sm ml-auto">
                      Recién llegado
                    </span>
                  )}
                </div>
                
                <h1
                  className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-serif font-normal text-brand-black leading-[1.1] tracking-tight"
                  data-testid="product-title"
                >
                  {product.title}
                </h1>
              </div>

              {/* Social Proof: Rating + Reviews */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex items-center gap-1 text-brand-black">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-brand-gray font-sans uppercase tracking-[0.15em] border-l border-brand-gray-light pl-4">
                  48 Reseñas Certificadas
                </span>
              </div>

              {/* Short description / Intro */}
              {product.description && (
                <div className="text-[16px] text-brand-gray font-light leading-relaxed font-sans max-w-xl">
                  {product.description.includes('\n') 
                    ? product.description.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < product.description.split('\n').length - 1 && <br />}
                        </span>
                      ))
                    : product.description}
                </div>
              )}
            </div>

            {/* Actions: Price + Variants + CTA */}
            <div className="py-10">
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
            </div>

            {/* Availability & Urgency */}
            <div className="pb-8 space-y-4">
              <div className="flex items-center gap-3">
                {totalStock > 0 ? (
                  <>
                    <div className="relative flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand-black/40 animate-ping absolute" />
                      <div className="w-2 h-2 rounded-full bg-brand-black relative" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-black font-sans">Disponible</p>
                      <p className="text-[11px] text-brand-gray font-light font-sans tracking-tight">Envío prioritario desde nuestro atelier en Bucaramanga</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <p className="text-sm font-medium text-red-500 font-sans">Agotado temporalmente</p>
                  </>
                )}
              </div>
              {isLowStock && (
                <div className="bg-orange-50/40 border border-orange-100/50 p-3 rounded-sm">
                  <p className="text-[11px] text-orange-600/90 font-medium font-sans flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    Edición Limitada: Solo quedan {totalStock} unidades disponibles
                  </p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-brand-gray-light/20" />

            {/* Trust Signals Grid */}
            <div className="py-8 grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  label: "Envío Premium",
                  sub: "Gratis en compras +$100k"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  label: "Calidad Certificada",
                  sub: "Garantía de autenticidad"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  ),
                  label: "Cambios Simples",
                  sub: "Hasta 30 días naturales"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 1.5h13.5c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H5.25a1.125 1.125 0 0 1-1.125-1.125v-6.75c0-.621.504-1.125 1.125-1.125Z" />
                    </svg>
                  ),
                  label: "Pago Protegido",
                  sub: "Encriptación de grado militar"
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group/trust">
                  <div className="flex-shrink-0 text-brand-black/30 group-hover/trust:text-brand-black transition-colors duration-500 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-brand-black font-sans uppercase tracking-[0.1em]">{item.label}</p>
                    <p className="text-[10px] text-brand-gray font-light font-sans tracking-tight">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-brand-gray-light/20" />

            {/* Seller info & Dynamic Metadata */}
            <div className="py-8 space-y-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col gap-y-1">
                  <span className="text-[9px] font-bold text-brand-black uppercase tracking-widest opacity-40">Atelier</span>
                  <span className="text-sm font-medium text-brand-black">Tienda Le Bon Marché</span>
                </div>
                <div className="flex flex-col gap-y-1">
                  <span className="text-[9px] font-bold text-brand-black uppercase tracking-widest opacity-40">Referencia SKU</span>
                  <span className="text-sm font-medium text-brand-black uppercase tracking-tighter font-mono">
                    {product.variants?.[0]?.sku || product.id?.slice(-8).toUpperCase()}
                  </span>
                </div>
                {product.material && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-[9px] font-bold text-brand-black uppercase tracking-widest opacity-40">Composición</span>
                    <span className="text-sm font-medium text-brand-black">{product.material}</span>
                  </div>
                )}
                {product.origin_country && (
                  <div className="flex flex-col gap-y-1">
                    <span className="text-[9px] font-bold text-brand-black uppercase tracking-widest opacity-40">Procedencia</span>
                    <span className="text-sm font-medium text-brand-black">{product.origin_country}</span>
                  </div>
                )}
                
                {/* MedusaJS Custom Metadata Mapping */}
                {Object.entries(metadata).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-y-1">
                    <span className="text-[9px] font-bold text-brand-black uppercase tracking-widest opacity-40 capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm font-medium text-brand-black">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── PRODUCT DETAILS: Technical Specs ── */}
      <Reveal>
        <div className="border-t border-brand-gray-light bg-brand-gray-light/20/30">
          <div className="content-container py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-16 xl:gap-32">
              
              {/* Left: Technical Details */}
              <div className="w-full lg:w-[45%]">
                <div className="mb-12">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-brand-black/40 font-sans mb-4">Información técnica</p>
                  <h3 className="text-3xl md:text-4xl font-serif text-brand-black leading-tight">Detalles que marcan la diferencia</h3>
                </div>
                <ProductTabs product={product} />
              </div>

              {/* Right: FAQ + WhatsApp Help */}
              <div className="w-full lg:w-[55%] space-y-12">
                <div className="mb-12 lg:mb-16">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-brand-black/40 font-sans mb-4">Preguntas y dudas</p>
                  <h3 className="text-3xl md:text-4xl font-serif text-brand-black leading-tight">Servicio al cliente</h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="border border-brand-gray-light bg-white px-6 transition-all duration-300 hover:border-brand-gray-light">
                    <AccordionTrigger className="text-[13px] font-medium text-brand-black hover:no-underline font-sans py-6 uppercase tracking-wider">
                      ¿Cuál es el origen de este producto?
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-gray font-light leading-relaxed font-sans text-[14px] pb-6 border-t border-gray-50 pt-4">
                      Contamos con <strong className="font-medium text-brand-black">bots inteligentes siempre activos</strong> buscando las mejores piezas globales para traerlas a nuestra selección. Garantizamos productos <strong className="font-medium text-brand-black">100% originales</strong> con trazabilidad completa desde su origen.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border border-brand-gray-light bg-white px-6 transition-all duration-300 hover:border-brand-gray-light">
                    <AccordionTrigger className="text-[13px] font-medium text-brand-black hover:no-underline font-sans py-6 uppercase tracking-wider">
                      Tiempos y logística de entrega
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-gray font-light leading-relaxed font-sans text-[14px] pb-6 border-t border-gray-50 pt-4">
                      <strong className="font-medium text-brand-black">24 horas</strong> para entregas locales en Bucaramanga. De <strong className="font-medium text-brand-black">2 a 5 días</strong> para envíos nacionales via Coordinadora o Servientrega.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border border-brand-gray-light bg-white px-6 transition-all duration-300 hover:border-brand-gray-light">
                    <AccordionTrigger className="text-[13px] font-medium text-brand-black hover:no-underline font-sans py-6 uppercase tracking-wider">
                      Política de garantía TLBM
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-gray font-light leading-relaxed font-sans text-[14px] pb-6 border-t border-gray-50 pt-4">
                      Cuentas con garantía total contra defectos de fabricación. Además, aplicamos el derecho de retracto de 5 días hábiles para que compres con absoluta tranquilidad.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* WhatsApp Premium Support */}
                <div className="bg-brand-black p-10 mt-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative z-10 space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-brand-black uppercase tracking-[0.3em] mb-3">Asistencia Personalizada</p>
                      <h4 className="text-2xl font-serif text-white leading-snug">¿Deseas atención directa de un asesor?</h4>
                    </div>
                    <p className="text-sm text-brand-gray-light/60 font-light leading-relaxed max-w-sm">
                      Nuestro equipo experto está disponible en tiempo real para guiarte en tu elección o resolver dudas técnicas.
                    </p>
                    <a 
                      href="https://wa.me/573027567783" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white border-b border-brand-black/50 pb-1 hover:border-brand-black transition-all duration-300"
                    >
                      Conversar por WhatsApp
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-brand-black">
                        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Reveal>

      {/* ── RELATED PRODUCTS ── */}
      <Reveal>
        <div className="bg-white py-16 lg:py-20 border-t border-brand-gray-light">
          <div className="content-container">
            <div className="mb-12 text-center max-w-xl mx-auto space-y-4">
              <p className="text-[9px] uppercase tracking-[0.6em] text-brand-black/40 font-sans">Selección Exclusiva</p>
              <h2 className="text-4xl md:text-5xl font-serif font-normal text-brand-black leading-tight">Piezas que complementan tu estilo</h2>
            </div>
            <Suspense fallback={<SkeletonRelatedProducts />}>
              <RelatedProducts product={product} countryCode={countryCode} />
            </Suspense>
          </div>
        </div>
      </Reveal>

    </div>
  )
}

export default ProductTemplate
