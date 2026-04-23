import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
    (sum, v) => sum + (v.inventory_quantity || 0),
    0
  ) || 0

  const isNew = product.created_at
    ? new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false

  const isLowStock = totalStock < 5 && totalStock > 0

  // Extract MedusaJS metadata
  const tags = (product as any).tags || []
  const metadata = (product as any).metadata || {}

  return (
    <div className="bg-white min-h-screen">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-gray-50">
        <div className="content-container py-4">
          <nav className="flex items-center gap-2 text-[10px] text-gray-400 tracking-[0.15em] uppercase font-sans">
            <LocalizedClientLink href="/" className="hover:text-brand-brown transition-colors duration-300">Inicio</LocalizedClientLink>
            <span className="text-gray-200">/</span>
            <LocalizedClientLink href="/store" className="hover:text-brand-brown transition-colors duration-300">Tienda</LocalizedClientLink>
            {product.collection && (
              <>
                <span className="text-gray-200">/</span>
                <span className="text-brand-brown/60">{product.collection.title}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ── HERO: Gallery + Product Info ── */}
      <div className="content-container py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20">

          {/* LEFT: Gallery — 55% */}
          <div className="w-full lg:w-[55%]">
            <div className="lg:sticky lg:top-24">
              <ImageGallery images={images} />
            </div>
          </div>

          {/* RIGHT: Product Info — 45% */}
          <div className="w-full lg:w-[45%]">
            
            {/* Section 1: Badges + Title + Description */}
            <div className="space-y-5 pb-7">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2">
                {isNew && (
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 bg-brand-olive text-white font-sans">
                    Nuevo
                  </span>
                )}
                {isLowStock && (
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 bg-red-500/90 text-white font-sans">
                    Últimas unidades
                  </span>
                )}
                {product.collection?.title && (
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 border border-gray-200 text-gray-400 font-sans">
                    {product.collection.title}
                  </span>
                )}
                {/* MedusaJS Tags as badges */}
                {tags.slice(0, 3).map((tag: any) => (
                  <span
                    key={tag.id}
                    className="text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 border border-brand-olive/20 text-brand-olive font-sans"
                  >
                    {tag.value}
                  </span>
                ))}
              </div>

              {/* Product Title */}
              <h1
                className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif font-normal text-brand-brown leading-[1.15] tracking-tight"
                data-testid="product-title"
              >
                {product.title}
              </h1>

              {/* Short description */}
              {product.description && (
                <p className="text-[15px] text-gray-400 font-light leading-relaxed font-sans max-w-md">
                  {product.description.split('-')[0]?.trim() || product.description.substring(0, 150)}
                </p>
              )}

              {/* Quick specs inline */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-sans">
                {product.material && (
                  <span>{product.material}</span>
                )}
                {product.origin_country && (
                  <>
                    <span className="text-gray-200">·</span>
                    <span>Origen: {product.origin_country}</span>
                  </>
                )}
                {product.type?.value && (
                  <>
                    <span className="text-gray-200">·</span>
                    <span>{product.type.value}</span>
                  </>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100" />

            {/* Section 2: Price + Options + CTA */}
            <div className="py-7">
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
            <div className="w-full h-px bg-gray-100" />

            {/* Section 3: Stock + Shipping Estimate */}
            <div className="py-5">
              <div className="flex items-center gap-3">
                {totalStock > 0 ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-brand-brown font-sans">En stock</p>
                      <p className="text-[11px] text-gray-400 font-light font-sans">Listo para despacho desde Bucaramanga</p>
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
                <p className="text-[11px] text-orange-500 mt-2 ml-5 font-medium font-sans">
                  ⚡ Solo quedan {totalStock} unidades
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100" />

            {/* Section 4: Trust Signals */}
            <div className="py-6 space-y-4">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  label: "Envío gratuito",
                  sub: "En pedidos superiores a $100.000"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  label: "100% original",
                  sub: "Garantía de autenticidad certificada"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  ),
                  label: "Devoluciones en 30 días",
                  sub: "Sin preguntas, sin complicaciones"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>
                  ),
                  label: "Pago seguro",
                  sub: "Transacciones protegidas y encriptadas"
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group/trust">
                  <div className="flex-shrink-0 text-brand-brown/40 group-hover/trust:text-brand-brown transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-brand-brown font-sans tracking-wide">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-light font-sans">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100" />

            {/* Section 5: Seller info */}
            <div className="py-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
                <span className="font-medium text-brand-brown">Vendido por:</span>
                <span className="font-light">Tienda Le Bon Marché</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
                <span className="font-medium text-brand-brown">SKU:</span>
                <span className="uppercase font-light font-mono text-[11px]">{product.variants?.[0]?.sku || product.id?.slice(-8)}</span>
              </div>
              {product.type?.value && (
                <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
                  <span className="font-medium text-brand-brown">Tipo:</span>
                  <span className="font-light">{product.type.value}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
                  <span className="font-medium text-brand-brown">Peso:</span>
                  <span className="font-light">{product.weight}g</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── PRODUCT DETAILS: Specs + FAQ ── */}
      <div className="border-t border-gray-50">
        <div className="content-container py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            
            {/* Left: Technical Details */}
            <div className="w-full lg:w-1/2">
              <div className="mb-8">
                <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-sans mb-2">Información del producto</p>
                <h3 className="text-2xl font-serif text-brand-brown">Detalles y especificaciones</h3>
              </div>
              <ProductTabs product={product} />
            </div>

            {/* Right: FAQ + Trust */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="mb-8">
                <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-sans mb-2">Preguntas frecuentes</p>
                <h3 className="text-2xl font-serif text-brand-brown">¿Tienes dudas?</h3>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-100">
                  <AccordionTrigger className="text-sm font-medium text-brand-brown hover:no-underline font-sans py-5">
                    ¿El producto es 100% original?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 font-light leading-relaxed font-sans text-[13px]">
                    ¡Totalmente! En <strong className="font-medium text-brand-brown">Tienda Le Bon Marché</strong> trabajamos directamente con distribuidores oficiales globales. Cada artículo se envía con sus sellos, etiquetas y cajas originales de fábrica.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-100">
                  <AccordionTrigger className="text-sm font-medium text-brand-brown hover:no-underline font-sans py-5">
                    ¿Cuáles son los tiempos de entrega?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 font-light leading-relaxed font-sans text-[13px]">
                    <strong className="font-medium text-brand-brown">24 a 48 horas</strong> para Bucaramanga y su área metropolitana. De <strong className="font-medium text-brand-brown">2 a 5 días hábiles</strong> para el resto del país. Todos los envíos viajan asegurados.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-100">
                  <AccordionTrigger className="text-sm font-medium text-brand-brown hover:no-underline font-sans py-5">
                    ¿Qué hago si tengo un inconveniente?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 font-light leading-relaxed font-sans text-[13px]">
                    Tienes <strong className="font-medium text-brand-brown">garantía de satisfacción</strong>. Si notas algo inusual o necesitas ayuda, nuestro equipo en WhatsApp te acompañará en tiempo real para resolver el caso.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-100">
                  <AccordionTrigger className="text-sm font-medium text-brand-brown hover:no-underline font-sans py-5">
                    ¿Qué métodos de pago aceptan?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 font-light leading-relaxed font-sans text-[13px]">
                    Aceptamos <strong className="font-medium text-brand-brown">tarjetas de crédito y débito</strong>, transferencias bancarias, y pagos en efectivo a través de puntos autorizados. Todas las transacciones están protegidas con encriptación SSL.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* WhatsApp CTA */}
              <div className="bg-gray-50 p-6 mt-6">
                <p className="text-xs font-semibold text-brand-brown uppercase tracking-wider mb-2 font-sans">¿Necesitas ayuda?</p>
                <p className="text-[13px] text-gray-400 font-light leading-relaxed mb-4 font-sans">
                  Nuestro equipo está disponible para resolver cualquier duda sobre este producto.
                </p>
                <a 
                  href="https://wa.me/573001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-brown hover:text-brand-olive transition-colors duration-300 font-sans"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.02c-.25.7-1.23 1.29-2.02 1.46-.53.12-1.24.21-3.6-.77-3.02-1.26-4.97-4.32-5.12-4.52-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.2 1.04-2.5.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.25.57.84 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.01 2.1 1.32 2.4 1.47.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.49.22.57.35.07.12.07.7-.18 1.38z" />
                  </svg>
                  Escríbenos por WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS ── */}
      <div className="bg-white py-16 md:py-20 border-t border-gray-50">
        <div className="content-container">
          <div className="mb-12 text-center">
            <p className="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-sans mb-3">Complementa tu compra</p>
            <h2 className="text-3xl md:text-4xl font-serif font-normal text-brand-brown">Productos relacionados</h2>
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
