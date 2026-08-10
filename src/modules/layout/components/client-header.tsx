"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TopMarquee from "@modules/common/components/top-marquee"

/*
  Header unificado (10-ago-2026): en TODAS las páginas no-home el patrón es el
  mismo — hamburguesa (SideMenu) a la izquierda, logo centrado, acciones a la
  derecha (lupa + carrito). El nav horizontal desktop se eliminó: el drawer
  trae las colecciones dinámicas de Medusa. El home sigue manejando su propio
  header (HeroOverlay + ScrollHeader) con el mismo patrón.

  En páginas de producto (/productos/...), carrito (/cart) y tienda (/store)
  la barra superior fina se reemplaza por la TopMarquee (etiqueta dorada TLBM
  + banda negra). Colapsa al hacer scroll igual que la barra anterior.
*/

export default function ClientHeader({
  children,
}: {
  children: React.ReactNode
}) {
  const isScrolled = useScrollThreshold(50)
  const pathname = usePathname()

  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  // On the home page, this header renders nothing — the Hero slider
  // component owns the header (floating logo + hamburger, white bar on scroll).
  if (isHome) return null

  // En páginas no-home el header siempre está sobre fondo claro (blanco o glass),
  // por lo que el texto/iconos son siempre oscuros (nunca text-white).
  const textColor = "text-black"

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-100 group/header
        transition-all duration-500 ease-out
        ${isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-gray-100/50"
          : "bg-transparent backdrop-blur-none"
        }
      `}
      data-scrolled={isScrolled}
      data-home={isHome}
    >
      {/* ── TOP BAR ── TODAS las subpáginas: TopMarquee (etiqueta dorada + banda negra).
          Regla Julián 10-ago: el diseño de /store es el diseño por defecto de TODAS
          las subpáginas (existentes y futuras). */}
      <div
        className={`transition-all duration-500 ease-out overflow-hidden
          ${isScrolled ? "h-0 opacity-0 py-0 border-transparent" : "opacity-100"}
        `}
      >
        <TopMarquee />
      </div>

      {/* ── MAIN HEADER ────────────────────────────────────────────── */}
      <header
        id="main-header"
        className={`mx-auto w-full transition-all duration-300 ease-out ${textColor}`}
      >
        <div
          className={`
            max-w-380 mx-auto px-4 md:px-10 lg:px-14
            flex justify-between items-center
            transition-all duration-300 ease-out
            ${isScrolled
              ? "min-h-[56px] md:min-h-[60px] py-2"
              : "min-h-[60px] md:min-h-[72px] py-3"
            }
          `}
        >
          {children}
        </div>
      </header>
    </div>
  )
}
