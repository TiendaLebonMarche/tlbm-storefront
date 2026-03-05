"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

interface FilterProps {
  collections?: Array<{ id: string; title: string }>
}

const FilterPanel = ({ collections = [] }: FilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(true)

  const selectedCollection = searchParams.get("collection")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    params.delete("page") // Reset a página 1
    router.push(`?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    // Mantener q y sortBy si existen
    const query = searchParams.get("q")
    const sortBy = searchParams.get("sortBy")
    
    if (query) params.set("q", query)
    if (sortBy) params.set("sortBy", sortBy)
    
    router.push(`?${params.toString()}`)
  }

  const hasActiveFilters =
    selectedCollection || minPrice || maxPrice

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white">
      <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="font-bold text-sm uppercase tracking-widest text-brand-black">
          Filtros
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      {isOpen && (
        <>
          {/* Colecciones */}
          {collections.length > 0 && (
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">
                Colección
              </h4>
              <div className="space-y-2">
                {collections.map((col) => (
                  <label key={col.id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="collection"
                      value={col.id}
                      checked={selectedCollection === col.id}
                      onChange={(e) =>
                        handleFilterChange(
                          "collection",
                          e.target.checked ? col.id : null
                        )
                      }
                      className="w-4 h-4 accent-brand-gold rounded"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-brand-gold transition-colors">
                      {col.title}
                    </span>
                  </label>
                ))}
                <button
                  onClick={() => handleFilterChange("collection", null)}
                  className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mt-2 hover:underline"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}

          {/* Rango de Precio */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">
              Rango de Precio
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-gray-600 mb-1 block">Desde</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value || null)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="text-[11px] text-gray-600 mb-1 block">Hasta</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value || null)
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-brand-gold"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full py-2 px-3 border border-brand-black text-brand-black text-[10px] font-bold uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all rounded"
            >
              Limpiar Filtros
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default FilterPanel
