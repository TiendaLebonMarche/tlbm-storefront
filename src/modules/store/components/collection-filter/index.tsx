"use client"

import { useRouter, useSearchParams } from "next/navigation"

/**
 * Filtro de colecciones — pills elegantes (diseño 2026, minimalista).
 *
 * Se muestra en /store antes del grid de productos. Cada pill es una
 * colección real de Medusa; al hacer clic filtra por ?collection=<handle>.
 * La pill activa se marca con texto dorado + punto ◆ dorado + borde dorado.
 * Las transiciones son suaves (200-300ms) y el contenedor hace scroll
 * horizontal suave en mobile (sin barra visible).
 */

type Collection = { id: string; title: string; handle: string }

export default function CollectionFilter({
  collections = [],
}: {
  collections?: Collection[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeCollection = searchParams.get("collection")

  const handleClick = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (id) {
      params.set("collection", id)
    } else {
      params.delete("collection")
    }
    params.delete("page") // Reset a página 1
    router.push(`?${params.toString()}`)
  }

  if (collections.length === 0) return null

  return (
    <div className="mb-8">
      {/* Título sutil */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-black/35">
          Categorías
        </span>
        <span aria-hidden="true" className="text-[#D4AF37] text-[8px]">
          ◆
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Pills: scroll horizontal suave en mobile, wrap en desktop */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* "Todo" — limpia el filtro */}
        <button
          onClick={() => handleClick(null)}
          className={`
            group flex-none inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full
            border text-[10px] font-bold uppercase tracking-[0.2em]
            transition-all duration-300 ease-out
            ${!activeCollection
              ? "border-[#D4AF37] bg-[#D4AF37]/8 text-[#B8962E] shadow-[0_2px_16px_rgba(212,175,55,0.18)]"
              : "border-gray-200 text-black/45 hover:border-[#D4AF37]/50 hover:text-[#B8962E] hover:-translate-y-0.5"}
          `}
        >
          {!activeCollection && (
            <span aria-hidden="true" className="text-[7px] text-[#D4AF37]">
              ◆
            </span>
          )}
          Todo
        </button>

        {collections.map((collection) => {
          const isActive = activeCollection === collection.id
          return (
            <button
              key={collection.id}
              onClick={() => handleClick(isActive ? null : collection.id)}
              className={`
                group flex-none inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full
                border text-[10px] font-bold uppercase tracking-[0.2em]
                transition-all duration-300 ease-out
                ${isActive
                  ? "border-[#D4AF37] bg-[#D4AF37]/8 text-[#B8962E] shadow-[0_2px_16px_rgba(212,175,55,0.18)]"
                  : "border-gray-200 text-black/45 hover:border-[#D4AF37]/50 hover:text-[#B8962E] hover:-translate-y-0.5"}
              `}
            >
              {isActive && (
                <span aria-hidden="true" className="text-[7px] text-[#D4AF37]">
                  ◆
                </span>
              )}
              {collection.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
