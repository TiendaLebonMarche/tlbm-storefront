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
function RevealItem({ children, staggerIndex }: { children: React.ReactNode; staggerIndex: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)
  const stagger = staggerIndex % 6

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <li ref={ref} className={visible ? `product-card-reveal stagger-${stagger}` : "product-card-hidden"}>
      {children}
    </li>
  )
}

export default function InfiniteProducts({
  initialProducts,
  region,
  gridClass = "grid grid-cols-1 min-[380px]:grid-cols-2 small:grid-cols-3 gap-x-4 small:gap-x-10 medium:gap-x-14 gap-y-12 mb-8",
  limit = 12,
}: InfiniteProductsProps) {
  const [displayedCount, setDisplayedCount] = useState(limit)
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <>
      {/* Counter bar */}
      <div className="mb-8 pb-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
        <p className="text-[9px] text-gray-400 dark:text-white/30 uppercase tracking-[0.3em] font-medium">
          Mostrando {Math.min(displayedCount, initialProducts.length)} de{" "}
          <span className="font-bold text-gray-900 dark:text-white">{initialProducts.length}</span> productos
        </p>
        {!hasMore && initialProducts.length > 0 && (
          <span className="text-[9px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">
            Catálogo completo ✓
          </span>
        )}
      </div>

      {/* Product grid */}
      <ul className={gridClass} data-testid="products-list">
        {productsToShow.map((p, index) => (
          <RevealItem key={p.id} staggerIndex={index}>
            <ProductPreview product={p} region={region} />
          </RevealItem>
        ))}
      </ul>

      {/* Load More button */}
      {hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="group inline-flex items-center gap-2.5 px-8 py-4 text-white font-bold text-[10px] uppercase tracking-[.25em] rounded-full btn-shine disabled:opacity-30 hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg hover:shadow-black/20 transition-all duration-200"
            style={{ background: "#0A0A0F", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          >
            {isLoading ? "Cargando…" : `Cargar más (${initialProducts.length - displayedCount})`}
          </button>
        </div>
      )}

      {/* End state */}
      <div className="flex flex-col justify-center items-center py-10 min-h-[80px]">
        {isLoading && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D4AF37]/60">
              Cargando…
            </p>
          </div>
        )}

        {!hasMore && !isLoading && initialProducts.length > 0 && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-gray-200 dark:bg-white/10" />
              <span className="text-[8px] uppercase tracking-[0.5em] text-gray-400 dark:text-white/20 font-bold">Fin</span>
              <div className="h-px w-12 bg-gray-200 dark:bg-white/10" />
            </div>
            <p className="text-[9px] text-gray-400 dark:text-white/20 tracking-[0.15em] font-light">
              Todos los productos cargados
            </p>
          </div>
        )}
      </div>
    </>
  )
}
