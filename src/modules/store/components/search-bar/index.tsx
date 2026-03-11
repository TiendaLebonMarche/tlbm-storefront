"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback, useEffect } from "react"

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")
  const [isSearching, setIsSearching] = useState(false)

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

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchValue)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue, handleSearch])

  const handleClear = () => {
    setSearchValue("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")
    params.delete("page")
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="w-full mb-12">
      <div className="relative group">
        <input
          type="text"
          placeholder="Buscar en el catálogo..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            setIsSearching(true)
          }}
          className="w-full px-0 py-4 border-b border-gray-100 bg-transparent text-brand-black placeholder-gray-300 outline-none focus:border-brand-gold transition-all font-light text-sm tracking-wide"
        />

        {/* Icono de búsqueda - Minimalista */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-focus-within:text-brand-gold transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0010.5 10.5z"
            />
          </svg>
        </div>

        {/* Botón de limpiar */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 hover:text-brand-black transition-colors p-1"
            title="Limpiar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
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
        <div className="h-1 w-full bg-gray-50 mt-1 overflow-hidden">
          <div className="h-full bg-brand-gold animate-marquee w-1/2" />
        </div>
      )}
    </div>
  )
}

export default SearchBar
