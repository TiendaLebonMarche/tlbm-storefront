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
 * Medidas reales (verificadas con Playwright, Jul 2026; marquesina rediseñada 07-ago):
 * - Producto top: marquesina 46 + logo 80 + fila2 60 = 186px → pt-52 (208px)
 * - Producto scrolled: logo 52 + fila2 54 = 106px → pt-28 (112px)
 * - Producto mobile: marquesina 36 + nav 68 = 104px → pt-28 (112px)
 * - Resto top: marquesina 46 + header 72 = 118px → pt-36 (144px) md/lg
 * - Resto scrolled: header 60px → pt-24 (96px)
 */
export default function PagePaddingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isScrolled = useScrollThreshold(50)

  // Lista de rutas que NO deben tener padding (normalmente solo el home)
  // Nota: countryCode es dinámico, revisamos si la ruta es solo /{countryCode} o /
  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  // Páginas de producto: header más alto (marquesina + logo centrado + nav)
  const isProductPage = pathname?.includes("/productos/") ?? false

  const topPadding = !isHome
    ? isProductPage
      ? isScrolled
        ? "pt-28" // 112px ≥ 106px header scrolled
        : "pt-28 md:pt-52 lg:pt-52" // mobile 112 ≥ 104 · md/lg 208 ≥ 186 header top
      : isScrolled
        ? "pt-24 md:pt-24" // 96px ≥ 60px header scrolled
        : "pt-28 md:pt-36 lg:pt-36" // mobile 112 ≥ 104 · md/lg 144 ≥ 118 header top
    : ""

  return (
    <main className={`relative transition-all duration-300 overflow-x-hidden w-full ${topPadding}`}>
      {children}
    </main>
  )
}
