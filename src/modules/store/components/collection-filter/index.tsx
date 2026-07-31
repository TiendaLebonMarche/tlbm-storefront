"use client"

import { useRouter, useSearchParams } from "next/navigation"

/**
 * Filtro de colecciones — pills elegantes (diseño 2026, minimalista, CENTRADO).
 *
 * Se muestra en /store, centrado arriba del grid (antes del contador
 * "Mostrando X de Y productos"). Cada pill es una colección real de Medusa;
 * al hacer clic filtra por ?collection=<id>.
 *
 * Diseño: centrado, ligero, llamativo. Pill activa = texto dorado + punto ◆
 * dorado + borde dorado sutil. Hover = eleva 1px y tiñe dorado. En mobile
 * hace scroll horizontal suave sin barra; en desktop hace wrap centrado.
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
    <div className="mb-10 flex flex-col items-center">
      {/* Título sutil centrado */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-black/35">
          Categorías
        </span>
        <span aria-hidden="true" className="text-[#D4AF37] text-[8px]">
          ◆
        </span>
      </div>

      {/* Pills: scroll horizontal suave en mobile, wrap centrado en desktop */}
      <div className="flex items-center justify-start md:justify-center gap-2.5 w-full overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* "Todo" — limpia el filtro */}
        <button
          onClick={() => handleClick(null)}
          className={`
            group flex-none inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full
            border text-[10px] font-bold uppercase tracking-[0.2em]
            transition-all duration-300 ease-out
            ${!activeCollection
              ? "border-[#D4AF37]/60 bg-[#D4AF37]/8 text-[#B8962E]"
              : "border-gray-200/80 text-black/40 hover:border-[#D4AF37]/50 hover:text-[#B8962E] hover:-translate-y-0.5"}
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
                  ? "border-[#D4AF37]/60 bg-[#D4AF37]/8 text-[#B8962E]"
                  : "border-gray-200/80 text-black/40 hover:border-[#D4AF37]/50 hover:text-[#B8962E] hover:-translate-y-0.5"}
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
