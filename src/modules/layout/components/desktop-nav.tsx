"use client"

import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CollectionsDropdown from "@modules/layout/components/collections-dropdown"
import { HttpTypes } from "@medusajs/types"

/**
 * Nav compacta visible en DESKTOP (híbrido best-practice, 10-ago-2026):
 * nav visible (NN/g: "show navigation on larger screens") + drawer completo
 * (SideMenu) disponible en todas las páginas. La ubicación actual se resalta
 * en dorado (el 95% de sitios falla en esto según Baymard).
 */
const BASE_LINK =
  "nav-link-dark text-[11px] xl:text-[12px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap"
const ACTIVE_LINK = "text-[#D4AF37]"

export default function DesktopNav({
  collections,
}: {
  collections?: HttpTypes.StoreCollection[]
}) {
  const pathname = usePathname() ?? ""

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/co" || pathname === "/"
    if (href === "/store") return pathname.includes("/store")
    if (href === "/collections") return pathname.includes("/collections")
    if (href === "/guias") return pathname.includes("/guias")
    return false
  }

  return (
    <nav className="flex items-center gap-4 xl:gap-7 flex-none" aria-label="Navegación principal">
      <LocalizedClientLink
        href="/"
        className={`${BASE_LINK} ${isActive("/") ? ACTIVE_LINK : ""}`}
      >
        Inicio
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/store"
        className={`${BASE_LINK} ${isActive("/store") ? ACTIVE_LINK : ""}`}
      >
        Tienda
      </LocalizedClientLink>

      <CollectionsDropdown
        collections={collections || []}
        linkClassName={`${BASE_LINK} inline-flex items-center gap-1.5 ${
          isActive("/collections") ? ACTIVE_LINK : ""
        }`}
      />

      {/* Ofertas es acceso directo a /store — no se marca activo (evita doble resaltado) */}
      <LocalizedClientLink href="/store" className={BASE_LINK}>
        Ofertas
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/guias"
        className={`${BASE_LINK} ${isActive("/guias") ? ACTIVE_LINK : ""}`}
      >
        Guías
      </LocalizedClientLink>

      <a
        href="https://wa.me/573027567783"
        target="_blank"
        rel="noopener noreferrer"
        className={BASE_LINK}
      >
        Contacto
      </a>
    </nav>
  )
}
