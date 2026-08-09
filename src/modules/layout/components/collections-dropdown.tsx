"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * Dropdown "Colecciones" — mega-menú 2026 reutilizable.
 *
 * Al pasar el mouse sobre el ítem se despliega un panel glass (blanco
 * translúcido + blur) con borde dorado sutil, grid de 2 columnas con las
 * colecciones reales de Medusa, hover dorado con flecha animada y footer
 * "Ver todas las colecciones".
 *
 * Se usa en TODOS los headers (producto, desktop normal y mobile) para
 * mantener el mismo comportamiento: en las páginas de producto el nav
 * queda fijo (Inicio | Tienda | Colecciones | Ofertas | Contacto) y las
 * categorías viven dentro de este dropdown.
 *
 * Props:
 *  - collections: lista de colecciones { id, title, handle } (desde server)
 *  - linkClassName: clases del trigger (por defecto nav-link-lux de producto)
 *  - itemClassName: clases de cada item del panel (por defecto producto)
 */

type Collection = { id: string; title: string; handle: string }

export default function CollectionsDropdown({
  collections = [],
  linkClassName = "nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase inline-flex items-center gap-1.5",
  itemClassName = "group flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-[12px] font-semibold uppercase tracking-[0.14em] text-black/60 hover:text-[#B8962E] hover:bg-[#D4AF37]/6 transition-all duration-200",
  panelWidth = "w-[420px] md:w-[460px]",
}: {
  collections?: Collection[]
  linkClassName?: string
  itemClassName?: string
  panelWidth?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <LocalizedClientLink
        href="/collections"
        className={linkClassName}
      >
        Colecciones
        <svg
          width="9"
          height="9"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} text-[#D4AF37]`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </LocalizedClientLink>

      {/* Panel dropdown */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 top-full pt-3
          transition-all duration-300 ease-out
          ${isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"}
        `}
      >
        <div className={`${panelWidth} bg-white border border-[#D4AF37]/15 rounded-2xl shadow-[0_24px_60px_rgba(10,10,15,0.14)] p-5`}>
          {/* Header del panel */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
              Explorar por categoría
            </span>
            <span aria-hidden="true" className="text-[#D4AF37] text-[10px]">
              ◆
            </span>
          </div>

          {/* Grid de colecciones */}
          <div className="grid grid-cols-2 gap-1">
            {collections.length === 0 ? (
              <p className="col-span-2 text-sm text-black/40 py-3">
                Cargando colecciones…
              </p>
            ) : (
              collections.map((collection) => (
                <LocalizedClientLink
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className={itemClassName}
                >
                  {collection.title}
                  <span className="text-[#D4AF37]/50 text-[10px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    →
                  </span>
                </LocalizedClientLink>
              ))
            )}
          </div>

          {/* Footer del panel */}
          <LocalizedClientLink
            href="/collections"
            className="mt-4 pt-4 border-t border-white flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.28em] text-black/50 hover:text-[#B8962E] transition-colors duration-200"
          >
            Ver todas las colecciones
            <span className="text-[#D4AF37]">→</span>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
