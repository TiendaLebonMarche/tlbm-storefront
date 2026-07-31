"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchModal from "@modules/layout/components/search-modal"
import ClientLogo from "@modules/layout/components/client-logo"
import CollectionsDropdown from "@modules/layout/components/collections-dropdown"

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
          className="pointer-events-auto h-full flex items-center justify-center"
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

          {/* ── Colecciones: dropdown mega-menú (componente compartido) ── */}
          <span
            aria-hidden="true"
            className="mx-4 lg:mx-6 text-[8px] leading-none text-[#D4AF37]/70 select-none"
          >
            ◆
          </span>
          <CollectionsDropdown collections={collections} />

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
