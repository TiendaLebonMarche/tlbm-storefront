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
    <>
      {/* Hero Background */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        {/* Product Section */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="content-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Left: Image Gallery */}
              <div className="flex flex-col gap-6">
                <ImageGallery images={images} />
              </div>

              {/* Right: Product Info */}
              <div className="flex flex-col py-8 gap-y-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                  <span>Tienda</span>
                  <span>•</span>
                  <span>{product.collection?.title || "Exclusivo"}</span>
                </div>

                {/* Title & Badges */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-black italic leading-tight flex-1">
                      {product.title}
                    </h1>
                    <div className="flex flex-col gap-2">
                      {isNew && (
                        <span className="bg-brand-gold text-brand-black px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                          Nuevo
                        </span>
                      )}
                      {isLowStock && (
                        <span className="bg-red-500 text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                          Últimas Unidades
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating Placeholder */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">⭐</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">(28 reseñas)</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 font-light leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                {/* Price Section */}
                <div className="border-t border-b border-gray-200 py-6">
                  <ProductInfo product={product} />
                </div>

                {/* Actions & Stock */}
                <div className="space-y-4">
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

                  {/* Stock Info */}
                  {totalStock === 0 ? (
                    <div className="p-4 bg-gray-100 rounded-lg text-center">
                      <p className="text-sm font-bold text-gray-700">
                        Producto No Disponible
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-xs font-bold text-green-800 uppercase tracking-widest">
                        ✓ {totalStock} en stock - Envío en 24-48h
                      </p>
                    </div>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-700">
                        Envío Gratis
                      </p>
                      <p className="text-[10px] text-gray-600">
                        En compras mayores a $100.000
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">↩</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-700">
                        Retorno Fácil
                      </p>
                      <p className="text-[10px] text-gray-600">
                        30 días sin preguntas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-700">
                        100% Auténtico
                      </p>
                      <p className="text-[10px] text-gray-600">
                        Garantía verificada
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <ProductTabs product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border-t border-gray-200 py-16 md:py-24">
        <div className="content-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-center text-brand-black italic mb-12">
              Preguntas Frecuentes
            </h2>

            <div className="space-y-4">
              {[
                {
                  question: "¿Cuál es el tiempo de envío?",
                  answer:
                    "Procesamos tus pedidos en 24 horas. El envío toma entre 2-5 días hábiles según tu ubicación.",
                },
                {
                  question: "¿Cuál es la política de devoluciones?",
                  answer:
                    "Aceptamos devoluciones hasta 30 días después de la compra. El producto debe estar en condiciones originales.",
                },
                {
                  question: "¿Es 100% auténtico?",
                  answer:
                    "Sí, todos nuestros productos son 100% auténticos y certificados. Trabajamos directamente con proveedores verificados.",
                },
                {
                  question: "¿Ofrecen servicio al cliente?",
                  answer:
                    "Por supuesto. Puedes contactarnos por WhatsApp, email o chat en vivo. Estamos disponibles de Lunes a Viernes.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors group"
                >
                  <summary className="font-bold text-brand-black cursor-pointer flex items-center justify-between select-none">
                    <span>{faq.question}</span>
                    <span className="text-brand-gold group-open:rotate-180 transition-transform">
                      ▸
                    </span>
                  </summary>
                  <p className="text-gray-700 text-sm mt-3 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 border-t border-gray-200 py-16 md:py-24">
        <div className="content-container">
          <div className="mb-12">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Productos similares
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-black italic">
              Te Podría Interesar
            </h2>
          </div>

          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
