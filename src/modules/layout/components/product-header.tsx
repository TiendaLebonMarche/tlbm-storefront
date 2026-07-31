"use client"

import { Fragment } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchModal from "@modules/layout/components/search-modal"
import ClientLogo from "@modules/layout/components/client-logo"

/**
 * Header de páginas de detalle de producto (desktop ≥md).
 * Estructura en dos filas, con la marquesina oscura arriba (la renderiza ClientHeader):
 *  - Fila 1: logo centrado grande
 *  - Fila 2: nav elegante centrado (separadores ◆ dorados) + lupa/carrito a la derecha
 *
 * El nav es DINÁMICO: recibe las colecciones reales de Medusa (server → Nav → ClientHeader)
 * y muestra las principales + Inicio/Tienda/Ofertas. Si una colección nueva se crea y
 * tiene prioridad, aparece sola (el departamento de Catálogo la asigna al publicar).
 *
 * Fila 2 usa GRID 3 columnas (1fr | auto | 1fr): el nav queda PERFECTAMENTE centrado
 * en el viewport y las acciones en flujo (no absolute) → nunca se desbordan del header
 * al hacer scroll (bug corregido: antes las acciones sobresalían 10px de la barra).
 *
 * En mobile (<md) se mantiene el bloque de Nav (hamburguesa | logo | lupa | carrito)
 * que ya centra el logo — ver ClientHeader.
 *
 * ⚠️ CartButton es un SERVER component (llama retrieveCart): NO se importa aquí.
 * Se recibe como `cartSlot` (ReactNode) pasado desde el server component Nav
 * (patrón de composición de Next.js — evita "Server Functions cannot be called
 * during initial render").
 */

// Handles con prioridad alta (aparecen primero en el nav, aunque tengan pocos productos)
const PRIORITY_HANDLES = [
  "parlantes-y-audio",
  "gaming-y-pc",
  "drones-y-dji",
  "starlink",
  "deportes-y-aire-libre",
  "moda-y-bolsos",
]

type Collection = { id: string; title: string; handle: string }

export default function ProductHeader({
  isScrolled,
  cartSlot,
  collections = [],
}: {
  isScrolled: boolean
  cartSlot?: React.ReactNode
  collections?: Collection[]
}) {
  // Ordenar: primero las de prioridad (en su orden), luego el resto alfabéticamente,
  // y limitar a 6 items para no saturar el nav.
  const navCollections = [...collections]
    .sort((a, b) => {
      const ia = PRIORITY_HANDLES.indexOf(a.handle)
      const ib = PRIORITY_HANDLES.indexOf(b.handle)
      if (ia !== -1 || ib !== -1) {
        if (ia === -1) return 1
        if (ib === -1) return -1
        return ia - ib
      }
      return a.title.localeCompare(b.title)
    })
    .slice(0, 6)

  return (
    <div className="flex flex-col w-full">
      {/* ── Fila 1: logo centrado ── */}
      <div
        className={`flex items-center justify-center transition-all duration-300 ease-out ${
          isScrolled ? "h-[52px]" : "h-[72px] md:h-[80px]"
        }`}
      >
        <ClientLogo />
      </div>

      {/* ── Fila 2: nav centrado (grid 1fr|auto|1fr) + acciones derecha en flujo ── */}
      <div
        className={`grid grid-cols-[1fr_auto_1fr] items-center w-full transition-all duration-300 ease-out ${
          isScrolled ? "py-1" : "py-1.5 md:py-2"
        }`}
      >
        {/* Col 1: spacer simétrico (compensa el ancho de las acciones) */}
        <div />

        {/* Col 2: nav elegante — separadores ◆ dorados, subrayado desde el centro */}
        <nav className="flex items-center">
          <LocalizedClientLink
            href="/"
            className="nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase"
          >
            Inicio
          </LocalizedClientLink>
          <span
            aria-hidden="true"
            className="mx-4 lg:mx-6 text-[8px] leading-none text-[#D4AF37]/70 select-none"
          >
            ◆
          </span>
          <LocalizedClientLink
            href="/store"
            className="nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase"
          >
            Tienda
          </LocalizedClientLink>

          {navCollections.map((collection, i) => (
            <Fragment key={collection.id}>
              <span
                aria-hidden="true"
                className="mx-4 lg:mx-6 text-[8px] leading-none text-[#D4AF37]/70 select-none"
              >
                ◆
              </span>
              <LocalizedClientLink
                href={`/collections/${collection.handle}`}
                className="nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase"
              >
                {collection.title}
              </LocalizedClientLink>
            </Fragment>
          ))}

          <span
            aria-hidden="true"
            className="mx-4 lg:mx-6 text-[8px] leading-none text-[#D4AF37]/70 select-none"
          >
            ◆
          </span>
          <LocalizedClientLink
            href="/store"
            className="nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase"
          >
            Ofertas
          </LocalizedClientLink>
        </nav>

        {/* Col 3: lupa + carrito (sin ThemeToggle — el usuario no lo quiere) */}
        <div className="flex items-center justify-end gap-4 lg:gap-6">
          <SearchModal />
          {cartSlot}
        </div>
      </div>
    </div>
  )
}
