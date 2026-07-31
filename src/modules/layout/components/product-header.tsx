"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchModal from "@modules/layout/components/search-modal"
import ClientLogo from "@modules/layout/components/client-logo"

/**
 * Header de páginas de detalle de producto (desktop ≥md).
 * Estructura en dos filas, con la marquesina oscura arriba (la renderiza ClientHeader):
 *  - Fila 1: logo centrado grande → redirige al index (/)
 *  - Fila 2: nav elegante centrado (separadores ◆ dorados):
 *      Inicio · Tienda · Colecciones (mega-menú dropdown) · Ofertas · Contacto
 *
 * El nav NO lista colecciones directas (regla del usuario, Jul 2026): solo los
 * 5 ítems fijos. Las colecciones reales de Medusa viven dentro del dropdown
 * "Colecciones" — un panel 2026 elegante (glass, dorado, grid, hover animado).
 *
 * Fila 2 usa GRID 3 columnas (1fr | auto | 1fr): el nav queda PERFECTAMENTE centrado
 * en el viewport y las acciones en flujo (no absolute) → nunca se desbordan del header
 * al hacer scroll.
 *
 * En mobile (<md) se mantiene el bloque de Nav (hamburguesa | logo | lupa | carrito)
 * que ya centra el logo — ver ClientHeader.
 *
 * ⚠️ CartButton es un SERVER component (llama retrieveCart): NO se importa aquí.
 * Se recibe como `cartSlot` (ReactNode) pasado desde el server component Nav.
 */

const CONTACT_HREF = "https://wa.me/573027567783"

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
  const [isCollectionsOpen, setCollectionsOpen] = useState(false)

  return (
    <div className="flex flex-col w-full">
      {/* ── Fila 1: logo centrado → index ── */}
      <div
        className={`flex items-center justify-center transition-all duration-300 ease-out ${
          isScrolled ? "h-[52px]" : "h-[72px] md:h-[80px]"
        }`}
      >
        <LocalizedClientLink
          href="/"
          aria-label="Ir al inicio"
          className="pointer-events-auto"
        >
          <ClientLogo />
        </LocalizedClientLink>
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

          {/* ── Colecciones: dropdown mega-menú ── */}
          <span
            aria-hidden="true"
            className="mx-4 lg:mx-6 text-[8px] leading-none text-[#D4AF37]/70 select-none"
          >
            ◆
          </span>
          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <LocalizedClientLink
              href="/collections"
              className="nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase inline-flex items-center gap-1.5"
            >
              Colecciones
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-300 ${isCollectionsOpen ? "rotate-180" : ""} text-[#D4AF37]`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </LocalizedClientLink>

            {/* Panel dropdown */}
            <div
              className={`
                absolute left-1/2 -translate-x-1/2 top-full pt-3
                transition-all duration-300 ease-out
                ${isCollectionsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"}
              `}
            >
              <div className="w-[420px] md:w-[460px] bg-white/95 backdrop-blur-xl border border-[#D4AF37]/15 rounded-2xl shadow-[0_24px_60px_rgba(10,10,15,0.14)] p-5">
                {/* Header del panel */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#FAFAF9]">
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
                        className="group flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-[12px] font-semibold uppercase tracking-[0.14em] text-black/60 hover:text-[#B8962E] hover:bg-[#D4AF37]/6 transition-all duration-200"
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
                  className="mt-4 pt-4 border-t border-[#FAFAF9] flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.28em] text-black/50 hover:text-[#B8962E] transition-colors duration-200"
                >
                  Ver todas las colecciones
                  <span className="text-[#D4AF37]">→</span>
                </LocalizedClientLink>
              </div>
            </div>
          </div>

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

          <span
            aria-hidden="true"
            className="mx-4 lg:mx-6 text-[8px] leading-none text-[#D4AF37]/70 select-none"
          >
            ◆
          </span>
          <a
            href={CONTACT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase"
          >
            Contacto
          </a>
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
