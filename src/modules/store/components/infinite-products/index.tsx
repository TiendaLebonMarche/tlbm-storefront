"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"

type InfiniteProductsProps = {
  initialProducts: any[]
  region: HttpTypes.StoreRegion
  gridClass?: string
  limit?: number
}

/** Per-item reveal wrapper using IntersectionObserver */
function RevealItem({
  children,
  staggerIndex,
}: {
  children: React.ReactNode
  staggerIndex: number
}) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)
  const stagger = staggerIndex % 6 // cycles 0-5

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <li
      ref={ref}
      className={
        visible
          ? `product-card-reveal stagger-${stagger}`
          : "product-card-hidden"
      }
    >
      {children}
    </li>
  )
}

export default function InfiniteProducts({
  initialProducts,
  region,
  gridClass = "grid grid-cols-2 small:grid-cols-3 gap-x-4 small:gap-x-10 medium:gap-x-14 gap-y-12 mb-8",
  limit = 12,
}: InfiniteProductsProps) {
  const [displayedCount, setDisplayedCount] = useState(limit)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const productsToShow = initialProducts.slice(0, displayedCount)
  const hasMore = displayedCount < initialProducts.length

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    setTimeout(() => {
      setDisplayedCount((prev) => prev + limit)
      setIsLoading(false)
    }, 800)
  }, [isLoading, hasMore, limit])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      { threshold: 0.1, rootMargin: "200px" }
    )

    const target = observerTarget.current
    if (target) observer.observe(target)
    return () => { if (target) observer.unobserve(target) }
  }, [loadMore])

  return (
    <>
      {/* Counter bar */}
      <div className="mb-8 pb-3 border-b border-brand-gray-light flex items-center justify-between">
        <p className="text-[9px] text-brand-gray uppercase tracking-[0.3em] font-medium">
          Mostrando {Math.min(displayedCount, initialProducts.length)} de{" "}
          <span className="font-bold text-brand-black">{initialProducts.length}</span> productos
        </p>
        {!hasMore && initialProducts.length > 0 && (
          <span className="text-[9px] text-brand-black uppercase tracking-[0.2em] font-bold">
            Catálogo completo ✓
          </span>
        )}
      </div>

      {/* Product grid with per-item scroll reveal */}
      <ul className={gridClass} data-testid="products-list">
        {productsToShow.map((p, index) => (
          <RevealItem key={p.id} staggerIndex={index}>
            <ProductPreview product={p} region={region} />
          </RevealItem>
        ))}
      </ul>

      {/* Intersection observer sentinel */}
      <div ref={observerTarget} className="flex flex-col justify-center items-center py-10 min-h-[80px]">
        {isLoading && (
          <div className="flex flex-col items-center gap-3">
            {/* Branded spinner */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-2 border-brand-black/10" />
              <div className="absolute inset-0 rounded-full border-2 border-t-brand-brown border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-black/60">
              Cargando Selección…
            </p>
          </div>
        )}

        {!hasMore && !isLoading && initialProducts.length > 0 && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-brand-black/15" />
              <span className="text-[8px] uppercase tracking-[0.5em] text-brand-black/30 font-bold">
                Fin de la Selección
              </span>
              <div className="h-px w-12 bg-brand-black/15" />
            </div>
            <p className="text-[9px] text-brand-gray tracking-[0.15em] font-light">
              Has visto todos los productos disponibles
            </p>
          </div>
        )}
      </div>
    </>
  )
}
