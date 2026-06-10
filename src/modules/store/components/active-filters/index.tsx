"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"

/**
 * Muestra etiquetas ("chips") de los filtros activos actualmente.
 * Cada chip tiene una X para remover ese filtro individualmente.
 */
const ActiveFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters = useMemo(() => {
    const result: { label: string; key: string; value: string | null }[] = []

    const collection = searchParams.get("collection")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const query = searchParams.get("q")

    if (query) {
      result.push({ label: `"${query}"`, key: "q", value: null })
    }
    if (collection) {
      result.push({ label: "Colección seleccionada", key: "collection", value: null })
    }
    if (minPrice || maxPrice) {
      const label = `$${minPrice || "0"} — $${maxPrice || "∞"}`
      result.push({ label, key: "__price", value: null })
    }

    return result
  }, [searchParams])

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (key === "__price") {
      params.delete("minPrice")
      params.delete("maxPrice")
    } else {
      params.delete(key)
    }

    params.delete("page")
    router.push(`?${params.toString()}`)
  }

  const clearAll = () => {
    const params = new URLSearchParams()
    const sortBy = searchParams.get("sortBy")
    if (sortBy) params.set("sortBy", sortBy)
    router.push(`?${params.toString()}`)
  }

  if (filters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-brand-gray-light">
      <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gray font-medium mr-1">
        Filtros:
      </span>
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => removeFilter(f.key)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gray-light/20 border border-brand-gray-light text-[10px] text-brand-black font-medium rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all group"
        >
          {f.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-2.5 h-2.5 text-brand-gray group-hover:text-brand-black transition-colors"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ))}
      <button
        onClick={clearAll}
        className="text-[9px] uppercase tracking-[0.2em] text-brand-gray hover:text-red-500 transition-colors ml-2 underline underline-offset-2"
      >
        Limpiar todo
      </button>
    </div>
  )
}

export default ActiveFilters
