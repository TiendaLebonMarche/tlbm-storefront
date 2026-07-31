"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchModal from "@modules/layout/components/search-modal"
import ThemeToggle from "@modules/layout/components/theme-toggle"
import ClientLogo from "@modules/layout/components/client-logo"

/**
 * Header de páginas de detalle de producto (desktop ≥md).
 * Estructura en dos filas, con la marquesina oscura arriba (la renderiza ClientHeader):
 *  - Fila 1: logo centrado grande
 *  - Fila 2: nav centrado (Inicio, Tienda, Colecciones, Ofertas) + lupa/carrito a la derecha
 *
 * En mobile (<md) se mantiene el bloque de Nav (hamburguesa | logo | carrito) que ya
 * centra el logo — ver ClientHeader.
 *
 * ⚠️ CartButton es un SERVER component (llama retrieveCart): NO se importa aquí.
 * Se recibe como `cartSlot` (ReactNode) pasado desde el server component Nav
 * (patrón de composición de Next.js — evita "Server Functions cannot be called
 * during initial render").
 */
export default function ProductHeader({
  isScrolled,
  cartSlot,
}: {
  isScrolled: boolean
  cartSlot?: React.ReactNode
}) {
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

      {/* ── Fila 2: nav centrado + acciones derecha ── */}
      <div
        className={`relative flex items-center justify-center transition-all duration-300 ease-out ${
          isScrolled ? "py-1" : "py-1.5 md:py-2"
        }`}
      >
        {/* Nav centrado en el viewport (no como grupo con acciones) */}
        <nav className="flex items-center gap-6 lg:gap-8">
          <LocalizedClientLink
            href="/"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Inicio
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Tienda
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/collections"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Colecciones
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Ofertas
          </LocalizedClientLink>
        </nav>

        {/* Acciones ancladas a la derecha, centradas verticalmente con el nav */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4 lg:gap-6">
          <SearchModal />
          <ThemeToggle />
          {cartSlot}
        </div>
      </div>
    </div>
  )
}
