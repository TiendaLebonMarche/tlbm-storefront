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
    <div className="bg-transparent">
      <div className="flex items-center justify-between mb-8 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="font-bold text-[11px] uppercase tracking-[0.25em] text-brand-black group-hover:text-brand-gold transition-colors">
          Refinar Búsqueda
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className={`w-3 h-3 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-700">
          {/* Colecciones */}
          {collections.length > 0 && (
            <div className="mb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
                Colecciones
              </h4>
              <div className="space-y-4">
                {collections.map((col) => (
                  <label key={col.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
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
                        className="peer appearance-none w-3.5 h-3.5 border border-gray-300 rounded-full checked:border-brand-gold transition-all"
                      />
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-brand-gold scale-0 peer-checked:scale-100 transition-transform duration-300" />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-brand-black transition-colors font-light">
                      {col.title}
                    </span>
                  </label>
                ))}
                {selectedCollection && (
                  <button
                    onClick={() => handleFilterChange("collection", null)}
                    className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold mt-4 hover:tracking-[0.3em] transition-all"
                  >
                    — Limpiar selección
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Rango de Precio */}
          <div className="mb-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
              Inversión
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">$</span>
                <input
                  type="number"
                  placeholder="Mín"
                  value={minPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("minPrice", e.target.value || null)
                  }
                  className="w-full pl-6 pr-3 py-2.5 border-b border-gray-100 bg-transparent text-xs outline-none focus:border-brand-gold transition-colors font-light"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-400">$</span>
                <input
                  type="number"
                  placeholder="Máx"
                  value={maxPrice || ""}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value || null)
                  }
                  className="w-full pl-6 pr-3 py-2.5 border-b border-gray-100 bg-transparent text-xs outline-none focus:border-brand-gold transition-colors font-light"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full py-4 text-brand-black text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-brand-black hover:text-white transition-all border border-brand-black"
            >
              Reiniciar Filtros
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterPanel
