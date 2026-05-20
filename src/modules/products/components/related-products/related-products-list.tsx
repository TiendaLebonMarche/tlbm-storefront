"use client"

import React, { useState, useEffect, useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "../product-preview"
import Reveal from "@modules/common/components/reveal"

type RelatedProductsListProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

const RelatedProductsList: React.FC<RelatedProductsListProps> = ({ products, region }) => {
  const [displayedCount, setDisplayedCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const productsToShow = products.slice(0, displayedCount)
  const hasMore = displayedCount < products.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          // Small delay for luxury "feel"
          setTimeout(() => {
            setDisplayedCount((prev) => prev + 4)
            setIsLoading(false)
          }, 1000)
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    )

    const currentTarget = observerTarget.current

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [hasMore, isLoading])

  return (
    <div className="product-page-constraint">
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-12">
        {productsToShow.map((product, i) => (
          <li key={product.id}>
            <Reveal delay={(i % 4) * 100}>
              <ProductPreview region={region} product={product} />
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Loading Indicator / Observer Target */}
      <div ref={observerTarget} className="flex flex-col items-center justify-center py-12 mt-8 border-t border-gray-50">
        {isLoading ? (
          <div className="flex flex-col items-center animate-in fade-in duration-500">
             <div className="w-5 h-5 border-2 border-brand-brown/20 border-t-brand-brown rounded-full animate-spin mb-4" />
             <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-brown/40">
               Cargando selección...
             </p>
          </div>
        ) : hasMore ? (
          <div className="h-4 w-px bg-gray-100" />
        ) : (
          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-brown/20">
            Has llegado al final de la colección
          </p>
        )}
      </div>
    </div>
  )
}

export default RelatedProductsList
