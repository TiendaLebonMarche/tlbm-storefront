"use client"

import { useEffect, useRef, useState } from "react"
import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"

type InfiniteProductsProps = {
  initialProducts: any[]
  region: HttpTypes.StoreRegion
}

const PRODUCT_LIMIT = 12

export default function InfiniteProducts({ initialProducts, region }: InfiniteProductsProps) {
  const [displayedCount, setDisplayedCount] = useState(PRODUCT_LIMIT)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const productsToShow = initialProducts.slice(0, displayedCount)
  const hasMore = displayedCount < initialProducts.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          setTimeout(() => {
            setDisplayedCount((prev) => prev + PRODUCT_LIMIT)
            setIsLoading(false)
          }, 3000)
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasMore, isLoading])

  return (
    <>
      <div className="mb-8 pb-3 border-b border-gray-100 flex items-center justify-between">
        <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-medium">
          Mostrando {Math.min(displayedCount, initialProducts.length)} de{" "}
          <span className="font-bold text-brand-brown">{initialProducts.length}</span> productos
        </p>
      </div>

      <ul
        className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 mb-8"
        data-testid="products-list"
      >
        {productsToShow.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>

      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="flex justify-center items-center py-8 h-20">
        {isLoading && (
          <div className="flex flex-col items-center animate-pulse">
            <div className="w-6 h-6 border-2 border-brand-brown border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-brown">
              Cargando productos...
            </p>
          </div>
        )}
      </div>
    </>
  )
}
