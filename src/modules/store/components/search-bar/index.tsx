"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback, useEffect } from "react"

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")
  const [isSearching, setIsSearching] = useState(false)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue])

  const handleSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("q", value)
      params.delete("page") // Reset a página 1
    } else {
      params.delete("q")
    }

    router.push(`?${params.toString()}`)
    setIsSearching(false)
  }, [searchParams, router])

  const handleClear = () => {
    setSearchValue("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")
    params.delete("page")
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="w-full mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            setIsSearching(true)
          }}
          className="w-full px-5 py-4 border border-gray-200 rounded-lg bg-white text-brand-black placeholder-gray-400 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all font-light"
        />
        
        {/* Icono de búsqueda */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.5 10.5z"
          />
        </svg>

        {/* Botón de limpiar */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
            title="Limpiar búsqueda"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Indicador de búsqueda */}
      {isSearching && (
        <p className="text-xs text-gray-500 mt-2 ml-1">Buscando...</p>
      )}
    </div>
  )
}

export default SearchBar
