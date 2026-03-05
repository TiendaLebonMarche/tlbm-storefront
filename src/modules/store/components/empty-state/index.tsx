"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface EmptyStateProps {
  query?: string
  filters?: boolean
}

const EmptyState = ({ query, filters = false }: EmptyStateProps) => {
  return (
    <div className="py-24 text-center">
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16 mx-auto text-gray-400 opacity-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 1114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </div>

      {query ? (
        <>
          <h3 className="text-2xl font-serif text-brand-black mb-2 italic">
            Sin resultados
          </h3>
          <p className="text-gray-600 font-light mb-2">
            No encontramos productos que coincidan con "<strong>{query}</strong>"
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Intenta con otros términos de búsqueda o navega nuestro catálogo completo
          </p>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-serif text-brand-black mb-2 italic">
            No hay productos disponibles
          </h3>
          <p className="text-gray-600 font-light mb-8">
            {filters
              ? "Intenta ajustar tus filtros"
              : "Vuelve más tarde para descubrir más"}
          </p>
        </>
      )}

      <LocalizedClientLink
        href="/store"
        className="inline-block px-8 py-3 border border-brand-black text-brand-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-black hover:text-white transition-all"
      >
        Ver Catálogo Completo
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyState
