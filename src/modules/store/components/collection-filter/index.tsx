"use client"

import { useRouter, useSearchParams } from "next/navigation"

/**
 * Filtro de colecciones — tabs editoriales (diseño 2026, pulcro y ligero).
 *
 * Se muestra en /store, centrado arriba del grid. En lugar de pills pesadas,
 * cada categoría es texto uppercase pequeño con una línea dorada que crece
 * DESDE EL CENTRO al activarse (mismo lenguaje que el nav luxe del header).
 * Sin cajas, sin fondos: solo tipografía + línea dorada. Muy ordenado.
 *
 * Click → filtra por ?collection=<id>. "Todo" limpia el filtro.
 * Mobile: scroll horizontal suave sin barra; desktop: wrap centrado.
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
    <div className="mb-9 flex flex-col items-center">
      {/* Línea superior sutil (separador editorial) */}
      <div className="w-full flex items-center gap-4 mb-5">
        <div className="flex-1 h-px bg-gray-100" />
        <div className="flex items-center gap-2.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/30">
            Categorías
          </span>
          <span aria-hidden="true" className="text-[#D4AF37] text-[8px]">
            ◆
          </span>
        </div>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Tabs: texto + línea dorada desde el centro */}
      <div className="flex items-center justify-start md:justify-center gap-x-7 gap-y-2 w-full overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0 scrollbar-none [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {/* "Todo" — limpia el filtro */}
        <button
          onClick={() => handleClick(null)}
          data-active={!activeCollection}
          className={`
            filter-tab relative flex-none
            text-[10px] font-semibold uppercase tracking-[0.22em]
            transition-colors duration-300
            ${!activeCollection
              ? "text-black"
              : "text-black/35 hover:text-black/70"}
          `}
        >
          Todo
        </button>

        {collections.map((collection) => {
          const isActive = activeCollection === collection.id
          return (
            <button
              key={collection.id}
              onClick={() => handleClick(isActive ? null : collection.id)}
              data-active={isActive}
              className={`
                filter-tab relative flex-none whitespace-nowrap
                text-[10px] font-semibold uppercase tracking-[0.22em]
                transition-colors duration-300
                ${isActive
                  ? "text-black"
                  : "text-black/35 hover:text-black/70"}
              `}
            >
              {collection.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
