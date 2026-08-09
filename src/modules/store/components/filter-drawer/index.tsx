"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import SearchBar from "@modules/store/components/search-bar"
import RefinementList from "@modules/store/components/refinement-list"
import FilterPanel from "@modules/store/components/filter-panel"
import type { SortOptions } from "@modules/store/components/refinement-list/sort-products"

interface FilterDrawerProps {
  sortBy: SortOptions
  collections?: Array<{ id: string; title: string }>
}

/**
 * Filtros móviles: botón sticky + drawer lateral (patrón e-commerce).
 * En desktop (medium+) el componente no se renderiza — el sidebar del
 * template toma el relevo.
 */
const FilterDrawer = ({ sortBy, collections = [] }: FilterDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()

  const activeCount = [
    searchParams.get("collection"),
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
    searchParams.get("q"),
    searchParams.get("sortBy"),
  ].filter(Boolean).length

  return (
    <>
      {/* Botón sticky móvil */}
      <div className="medium:hidden sticky top-[68px] z-30 -mx-6 px-6 py-3 bg-white/95 border-b border-brand-gray-light">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-3 py-3.5 border border-brand-black text-brand-black text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-brand-black hover:text-white transition-all"
          aria-label="Abrir filtros"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Filtrar y Ordenar
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-black text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 medium:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[380px] bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-gray-light">
              <h3 className="font-serif text-lg text-brand-black">
                Filtrar y Ordenar
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-brand-gray hover:text-brand-black transition-colors"
                aria-label="Cerrar filtros"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
              <SearchBar />
              <RefinementList sortBy={sortBy} />
              <FilterPanel collections={collections} />
            </div>

            {/* Footer CTA */}
            <div className="px-5 py-4 border-t border-brand-gray-light bg-white">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-brand-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-opacity"
              >
                Ver Productos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FilterDrawer
