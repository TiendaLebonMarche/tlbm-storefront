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

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/store" },
  { label: "Colecciones", href: "/collections" },
  { label: "Ofertas", href: "/store" },
]

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
          {NAV_ITEMS.map((item, i) => (
            <Fragment key={item.label}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="mx-4 lg:mx-6 text-[8px] leading-none text-[#D4AF37]/70 select-none"
                >
                  ◆
                </span>
              )}
              <LocalizedClientLink
                href={item.href}
                className="nav-link-lux text-[11px] font-semibold tracking-[0.22em] uppercase"
              >
                {item.label}
              </LocalizedClientLink>
            </Fragment>
          ))}
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
