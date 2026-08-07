"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TopMarquee from "@modules/common/components/top-marquee"
import ProductHeader from "@modules/layout/components/product-header"

/*
  This header is intentionally hidden on the home page (/) because the Hero
  slider component handles its own overlay header + scroll-to-white-bar.

  On every other page it behaves as a normal sticky header with glass effect.

  On product pages (/productos/...) the thin top bar is replaced by the
  TopMarquee (etiqueta dorada TLBM + banda negra) — el mismo diseño en todas
  las páginas. Colapsa al hacer scroll igual que la barra anterior.
*/

export default function ClientHeader({
  children,
  cartSlot,
  collections = [],
}: {
  children: React.ReactNode
  cartSlot?: React.ReactNode
  collections?: Array<{ id: string; title: string; handle: string }>
}) {
  const isScrolled = useScrollThreshold(50)
  const pathname = usePathname()

  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  // Páginas de detalle de producto → marquesina oscura en vez de la barra fina
  const isProductPage = pathname?.includes("/productos/") ?? false

  // Página de carrito → TopMarquee en vez de la barra fina
  const isCartPage = pathname?.includes("/cart") ?? false

  // Página de tienda (/store) → TopMarquee en vez de la barra fina
  const isStorePage = pathname?.includes("/store") ?? false

  // On the home page, this header renders nothing — the Hero slider
  // component owns the header (floating logo + hamburger, white bar on scroll).
  if (isHome) return null

  // En páginas no-home el header siempre está sobre fondo claro (blanco o glass),
  // por lo que el texto/iconos son siempre oscuros (nunca text-white).
  const textColor = "text-black"

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-[100] group/header
        transition-all duration-500 ease-out
        ${isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-gray-100/50"
          : "bg-transparent backdrop-blur-none"
        }
      `}
      data-scrolled={isScrolled}
      data-home={isHome}
    >
      {/* ── TOP BAR ── Productos/Tienda/Carrito: TopMarquee (etiqueta dorada + banda negra) · Resto: barra fina #0A0A0F ── */}
      {isProductPage || isCartPage || isStorePage ? (
        <div
          className={`transition-all duration-500 ease-out overflow-hidden
            ${isScrolled ? "h-0 opacity-0 py-0 border-transparent" : "opacity-100"}
          `}
        >
          <TopMarquee />
        </div>
      ) : (
        <div
          className={`
            bg-[#0A0A0F] text-white/70
            border-b border-white/5
            transition-all duration-500 ease-out overflow-hidden
            ${isScrolled ? "h-0 opacity-0 py-0 border-transparent" : "h-[28px] md:h-[32px] py-0.5 opacity-100"}
          `}
        >
        <div className="max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5 text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              IG
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              FB
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              TT
            </a>
            <a
              href="https://wa.me/573027567783"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              WA
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-5 text-[9px] md:text-[10px] font-medium tracking-[0.15em] uppercase">
            <span className="hidden sm:inline text-white/50">Envíos a toda Colombia</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <LocalizedClientLink
              href="/account"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              Registrarse
            </LocalizedClientLink>
            <span className="text-white/20">/</span>
            <LocalizedClientLink
              href="/account"
              className="hover:text-[#D4AF37] transition-colors duration-300"
            >
              Iniciar Sesión
            </LocalizedClientLink>
          </div>
        </div>
        </div>
      )}

      {/* ── MAIN HEADER ────────────────────────────────────────────── */}
      <header
        id="main-header"
        className={`mx-auto w-full transition-all duration-300 ease-out ${textColor}`}
      >
        {isProductPage ? (
          <>
            {/* Mobile (<md): bloque de Nav (hamburguesa | logo | carrito) */}
            <div className="md:hidden">
              <div
                className={`
                  max-w-[95rem] mx-auto px-4
                  flex justify-between items-center
                  transition-all duration-300 ease-out
                  ${isScrolled ? "min-h-[56px] py-2" : "min-h-[60px] py-3"}
                `}
              >
                {children}
              </div>
            </div>

            {/* Desktop (≥md): logo centrado + nav centrado + lupa/carrito */}
            <div className="hidden md:block">
              <div className="max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14">
                <ProductHeader
                  isScrolled={isScrolled}
                  cartSlot={cartSlot}
                  collections={collections}
                />
              </div>
            </div>
          </>
        ) : (
          <div
            className={`
              max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14
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
        )}
      </header>
    </div>
  )
}
