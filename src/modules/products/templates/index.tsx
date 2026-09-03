import { HttpTypes } from "@medusajs/types"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"
import dynamic from "next/dynamic"
import { WhatsAppHelpButton, WhatsAppCTABuy } from "@modules/products/components/whatsapp-product-buttons"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Reveal from "@modules/common/components/reveal"
import CollapsibleDescription from "@modules/products/components/collapsible-description"
import ProductVideo from "@modules/products/components/product-video"

import ProductSections from "@modules/products/components/product-sections"

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

  const isNew = product.created_at
    // Date.now en server component: 1x/request (ISR/dynamic)
    // eslint-disable-next-line react-hooks/purity -- server component, 1x/request
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  // Extract MedusaJS metadata
  const tags = (product as any).tags || []
  const metadata = (product as any).metadata || {}

  // Tag badge — busca tag que empiece con "Producto"
  const tagBadge = (tags as Array<{id: string; value: string}>)
    ?.find((t: any) => t.value?.toLowerCase().startsWith("producto"))
    ?.value || null

  return (
    <div className="bg-white min-h-screen selection:bg-brand-black/10">

      {/* ── HERO: Gallery + Product Info ── */}
      <div className="content-container pt-6 pb-16 md:py-8 lg:pt-8 lg:pb-12">
        <div className="flex flex-col lg:flex-row gap-[clamp(1.5rem,5vw,3rem)] lg:gap-[clamp(3rem,6vw,7rem)] xl:gap-[clamp(4rem,7vw,7rem)] items-start">

          {/* LEFT: Gallery — 58% */}
          <div className="w-full lg:w-[58%]">
            <div className="lg:sticky lg:top-32 relative">
              <ImageGallery images={images} productTitle={product.title} layoutId={`product-image-${product.handle}`} />
            </div>
          </div>

          {/* RIGHT: Product Info — 42% */}
          <div className="w-full lg:w-[42%] lg:mt-4">
            
            {/* Header: Collection + Title + Rating */}
            <div className="space-y-6 pb-8 border-b border-white">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {product.collection?.title && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-black/40 font-sans pr-3">
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
                  className="text-[clamp(1.75rem,5vw,3.5rem)] md:text-[clamp(2.25rem,4vw,3rem)] lg:text-[clamp(2.5rem,4vw,3rem)] xl:text-[clamp(3.5rem,4.5vw,4.5rem)] font-serif font-normal text-brand-black leading-[1.1] tracking-tight"
                  data-testid="product-title"
                >
                  {product.title}
                </h1>
              </div>

              {/* Short description / Intro — collapsible en mobile */}
              {product.description && (
                <CollapsibleDescription description={product.description} />
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

            {/* Divider */}
            <div className="w-full h-px bg-white" />

            {/* Trust Signals Grid */}
            <div className="py-8 grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  label: "Envíos en Bucaramanga",
                  sub: "Costo: $5.000"
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
                  label: "Recoge en Tienda",
                  sub: "Bodega Bucaramanga"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 1.5h13.5c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H5.25a1.125 1.125 0 0 1-1.125-1.125v-6.75c0-.621.504-1.125 1.125-1.125Z" />
                    </svg>
                  ),
                  label: "Pago Protegido",
                  sub: "Datos cifrados con SSL"
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group/trust">
                  <div className="flex-shrink-0 text-brand-black/30 group-hover/trust:text-brand-black transition-colors duration-200 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-brand-black font-sans uppercase tracking-[0.1em]">{item.label}</p>
                    <p className="text-[10px] text-brand-gray font-light font-sans tracking-tight">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA Botón 1: ¿Dudas? Pregúntanos */}
            <div className="flex justify-start">
              <WhatsAppHelpButton />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white" />

            {/* Seller info & Dynamic Metadata */}
            <div className="py-8 space-y-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col gap-y-1">
                  <span className="text-[9px] font-bold text-brand-black uppercase tracking-widest opacity-40">Vendedor</span>
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
                
                {/* MedusaJS Custom Metadata Mapping — excluir video_url */}
                {Object.entries(metadata || {})
                  .filter(([key]) => !['video_url', 'video'].includes(key))
                  .slice(0, 4).map(([key, value]) => (
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

      {/* ── VIDEO DEL PRODUCTO (si tiene video_url en metadata) ── */}
      {metadata?.video_url && (
        <Reveal>
          <ProductVideo videoUrl={metadata.video_url as string} title={product.title} />
        </Reveal>
      )}

      {/* ── PRODUCT DETAILS: Technical Specs ── */}
      <Reveal>
        <div className="bg-white">
          <div className="content-container py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 xl:gap-x-16">
              
              {/* Left: Technical Details */}
              <div className="lg:col-span-7">
                <div className="mb-12">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-sans mb-4">Información técnica</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-brand-black leading-[1.15] tracking-[-0.015em] text-balance">Detalles que marcan <span className="bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">la diferencia</span></h2>
                </div>
                <ProductSections product={product} />

                {/* WhatsApp CTA Botón 2: Compra por WhatsApp */}
                <div className="mt-8">
                  <WhatsAppCTABuy />
                </div>

                {/* Trust badges — señal de confianza bajo el CTA (enjambre diseño 08-ago) */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Reembolso protegido", "Garantía y soporte", "Envío rápido"].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-2.5"
                    >
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-[10px] font-semibold text-brand-gray uppercase tracking-wider">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: FAQ + WhatsApp Help */}
              <div className="lg:col-span-5 flex flex-col space-y-12">
                <div className="mb-12 lg:mb-16">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-sans mb-4">Preguntas y dudas</p>
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold text-brand-black leading-[1.15] tracking-[-0.015em] text-balance">Servicio al <span className="bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">cliente</span></h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-0 divide-y divide-black/10 border-y border-black/10">
                  <AccordionItem value="item-1" className="py-1">
                    <AccordionTrigger className="text-[15px] font-semibold text-brand-black hover:no-underline font-sans py-5 tracking-wide [&>svg]:text-gold [&>svg]:w-4 [&>svg]:h-4">
                      ¿Cuál es el origen de este producto?
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-gray font-normal leading-relaxed font-sans text-[15px] pb-5 pt-1">
                      Contamos con <strong className="font-medium text-brand-black">bots inteligentes siempre activos</strong> buscando las mejores piezas globales para traerlas a nuestra selección. Garantizamos productos <strong className="font-medium text-brand-black">100% originales</strong> con trazabilidad completa desde su origen.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="py-1">
                    <AccordionTrigger className="text-[15px] font-semibold text-brand-black hover:no-underline font-sans py-5 tracking-wide [&>svg]:text-gold [&>svg]:w-4 [&>svg]:h-4">
                      ¿Cuánto tarda la entrega?
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-gray font-normal leading-relaxed font-sans text-[15px] pb-5 pt-1">
                      <strong className="font-medium text-brand-black">24 horas</strong> para entregas locales en Bucaramanga. De <strong className="font-medium text-brand-black">2 a 5 días</strong> para envíos nacionales via Coordinadora o Servientrega.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="py-1">
                    <AccordionTrigger className="text-[15px] font-semibold text-brand-black hover:no-underline font-sans py-5 tracking-wide [&>svg]:text-gold [&>svg]:w-4 [&>svg]:h-4">
                      ¿Tiene garantía?
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-gray font-normal leading-relaxed font-sans text-[15px] pb-5 pt-1">
                      Cuentas con garantía total contra defectos de fabricación. Además, aplicamos el derecho de retracto de 5 días hábiles para que compres con absoluta tranquilidad.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* WhatsApp Premium Support */}
                <div className="bg-brand-black p-8 xl:p-10 mt-auto relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full -ml-24 -mb-24 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative z-10 space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] mb-3">Asistencia Personalizada</p>
                      <h4 className="text-2xl font-serif text-white leading-snug">¿Deseas atención directa de un asesor?</h4>
                    </div>
                    <p className="text-sm text-white/50 font-light leading-relaxed max-w-sm">
                      Nuestro equipo experto está disponible en tiempo real para guiarte en tu elección o resolver dudas técnicas.
                    </p>
                    <a 
                      href="https://wa.me/573027567783?text=Holaa%2C%20vi%20un%20producto%20en%20Tienda%20Le%20Bon%20March%C3%A9%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20detalles%20antes%20de%20comprar." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative overflow-hidden inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-gold text-gold font-semibold text-sm transition-all duration-300 hover:bg-gold hover:text-brand-black active:scale-95"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 relative z-10">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="relative z-10">Conversar por WhatsApp</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
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
