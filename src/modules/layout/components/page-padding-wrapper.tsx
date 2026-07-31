"use client"

import { usePathname } from "next/navigation"
import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"

/**
 * Agrega padding superior a las páginas que no son el Home
 * para evitar que el header fijo cubra el contenido.
 *
 * El padding es DINÁMICO: al hacer scroll la marquesina colapsa (h-0) y el
 * header se encoge, así que el padding se reduce para no dejar un hueco
 * blanco exagerado entre header y contenido.
 *
 * Medidas reales (verificadas con Playwright, Jul 2026):
 * - Producto top: marquesina 31 + logo 80 + fila2 60 = 171px → pt-44 (176px)
 * - Producto scrolled: logo 52 + fila2 54 = 106px → pt-28 (112px)
 * - Producto mobile: marquesina 30 + nav 72 = 102px → pt-28 (112px)
 * - Resto top: topbar 32 + header 72 = 104px → pt-36 (144px) lg
 * - Resto scrolled: header 60px → pt-24 (96px)
 */
export default function PagePaddingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isScrolled = useScrollThreshold(50)

  // Lista de rutas que NO deben tener padding (normalmente solo el home)
  // Nota: countryCode es dinámico, revisamos si la ruta es solo /{countryCode} o /
  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  // Páginas de producto: header más alto (marquesina oscura + logo centrado + nav)
  const isProductPage = pathname?.includes("/productos/") ?? false

  const topPadding = !isHome
    ? isProductPage
      ? isScrolled
        ? "pt-28" // 112px ≥ 106px header scrolled
        : "pt-28 md:pt-44 lg:pt-44" // 176px ≥ 171px header top (md y lg)
      : isScrolled
        ? "pt-24 md:pt-24" // 96px ≥ 60px header scrolled
        : "pt-28 md:pt-32 lg:pt-36" // 112/128/144px ≥ 104px header top
    : ""

  return (
    <main className={`relative transition-all duration-300 overflow-x-hidden w-full ${topPadding}`}>
      {children}
    </main>
  )
}
