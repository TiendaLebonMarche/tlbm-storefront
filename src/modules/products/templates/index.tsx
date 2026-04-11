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

  return (
    <div className="bg-white min-h-screen">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-gray-100">
        <div className="content-container py-3">
          <nav className="flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase font-sans">
            <LocalizedClientLink href="/" className="hover:text-black transition-colors">Inicio</LocalizedClientLink>
            <span>/</span>
            <LocalizedClientLink href="/store" className="hover:text-black transition-colors">Tienda</LocalizedClientLink>
            {product.collection && (
              <>
                <span>/</span>
                <span className="text-black">{product.collection.title}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ── HERO SECTION: Galería + Info (layout Amazon clásico) ── */}
      <div className="content-container py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">

          {/* COLUMNA IZQUIERDA: Galería — 55% */}
          <div className="w-full lg:w-[55%]">
            <div className="lg:sticky lg:top-[5.5rem]">
              <ImageGallery images={images} />
            </div>
          </div>

          {/* COLUMNA DERECHA: Info + CTA — 45% */}
          <div className="w-full lg:w-[45%] space-y-0">

            {/* BLOQUE 1: Badges + Título */}
            <div className="pb-5 border-b border-gray-100 space-y-4">
              <div className="flex flex-wrap gap-2">
                {isNew && (
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] px-3 py-1 bg-brand-olive text-white rounded-sm shadow-sm">
                    Nuevo
                  </span>
                )}
                {isLowStock && (
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] px-3 py-1 bg-brand-brown text-white rounded-sm shadow-sm">
                    Últimas unidades
                  </span>
                )}
                {product.collection?.title && (
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] px-3 py-1 border border-brand-brown/10 text-brand-brown/60 rounded-sm">
                    {product.collection.title}
                  </span>
                )}
              </div>

              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-black leading-tight"
                data-testid="product-title"
              >
                {product.title}
              </h1>

              {/* Descripción corta */}
              {product.description && (
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* BLOQUE 2: Precio + Opciones + CTA ── el núcleo Amazon */}
            <div className="py-5 border-b border-gray-100">
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

            {/* BLOQUE 3: Stock Status */}
            <div className="py-4 border-b border-gray-100">
              {totalStock > 0 ? (
                <p className="text-sm font-light">
                  <span className="text-green-600 font-medium">En stock</span>
                  <span className="text-gray-400"> — Listo para despacho desde Bucaramanga</span>
                </p>
              ) : (
                <p className="text-sm font-light text-red-500">Agotado temporalmente</p>
              )}
              {isLowStock && (
                <p className="text-xs text-orange-500 mt-1 font-medium">
                  ⚠ Quedan pocas unidades disponibles
                </p>
              )}
            </div>

            {/* BLOQUE 4: Garantías y beneficios (Amazon Prime style) */}
            <div className="py-5 border-b border-gray-100 space-y-3">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  ),
                  label: "Envío gratuito a Colombia",
                  sub: "en pedidos superiores a $100.000"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  label: "Garantía de autenticidad",
                  sub: "100% original, certificado"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  ),
                  label: "Cumplimiento Legal y Retracto",
                  sub: "Protección Ley 1480 de 2011"
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-black mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-xs font-medium text-black">{item.label}</p>
                    <p className="text-[11px] text-gray-400 font-light">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BLOQUE 5: Vendido por */}
            <div className="py-4 space-y-1">
              <div className="flex gap-2 text-xs text-gray-500">
                <span className="font-medium text-black">Vendido por:</span>
                <span>Tienda Le Bon Marché</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-500">
                <span className="font-medium text-black">SKU:</span>
                <span className="uppercase">{product.id?.slice(-8)}</span>
              </div>
              {product.type?.value && (
                <div className="flex gap-2 text-xs text-gray-500">
                  <span className="font-medium text-black">Categoría:</span>
                  <span>{product.type.value}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── SPECS & FAQ (ancho completo, debajo del fold) ── */}
      <div className="border-t border-gray-100 bg-white">
        <div className="content-container py-10 lg:py-12 flex flex-col lg:flex-row gap-16">
          
          {/* Columna Especificaciones Técnicas */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl font-serif text-black mb-6">Detalles Técnicos</h3>
            <ProductTabs product={product} />
          </div>

          {/* Columna FAQ y Confianza */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-xl font-serif text-black mb-6">Preguntas Frecuentes (FAQ)</h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm font-medium text-black hover:no-underline">
                  ¿El producto es 100% original?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 font-light leading-relaxed">
                  ¡Totalmente! En <strong>Tienda Le Bon Marché</strong> trabajamos directamente con distribuidores oficiales globales. Cada artículo se envía con sus sellos, etiquetas y cajas originales de fábrica para garantizar la máxima calidad y autenticidad.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm font-medium text-black hover:no-underline">
                  ¿Cuáles son los tiempos de entrega?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 font-light leading-relaxed">
                  Manejamos tiempos rápidos: <strong>24 a 48 horas</strong> para Bucaramanga y su área metropolitana, y de <strong>2 a 5 días hábiles</strong> para el resto del país. Todos nuestros envíos viajan asegurados para tu tranquilidad.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm font-medium text-black hover:no-underline">
                  ¿Qué hago si ocurre algún inconveniente?
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 font-light leading-relaxed">
                  Estás respaldado. Tienes <strong>garantía de satisfacción</strong>. Si notas algo inusual o necesitas ayuda técnica, nuestro equipo en WhatsApp te acompañará en tiempo real para resolver el caso sin dudarlo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm font-medium text-black hover:no-underline">
                  Políticas de Garantía y Retracto
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 font-light leading-relaxed">
                  Cuentas con derecho de retracto dentro de los <strong>5 días hábiles</strong> posteriores a la entrega (Ley 1480 de 2011).
                  Además, te protegemos con garantía por defectos de fabricación (12 meses en tecnología, 3 meses en accesorios). <LocalizedClientLink href="/politica-de-devoluciones" className="text-brand-olive underline hover:opacity-80 transition-opacity">Ver proceso detallado</LocalizedClientLink>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>

      {/* ── PRODUCTOS RELACIONADOS ── */}
      <div className="bg-white py-12 md:py-16 border-t border-gray-100">
        <div className="content-container">
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans mb-3">También te puede interesar</p>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-black">Productos relacionados</h2>
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
