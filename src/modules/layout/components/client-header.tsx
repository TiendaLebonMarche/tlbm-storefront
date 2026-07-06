"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/*
  Header height budget (must match hero pt values):

  Top bar:
    h-[28px] md:h-[32px] → ~32px

  Nav bar:
    Mobile  (<md): min-h-[60px] + py-3 not scrolled, min-h-[56px] + py-2 scrolled
    Desktop (≥md): min-h-[72px] + py-3 not scrolled, min-h-[60px] + py-2 scrolled

  Total:
    Mobile  = 32 + 60 = 92px → hero pt uses ~112px
    Desktop = 32 + 72 = 104px → hero pt uses ~128px
*/
export default function ClientHeader({ children }: { children: React.ReactNode }) {
  const isScrolled = useScrollThreshold(50)
  const pathname = usePathname()

  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  const textColor = isScrolled
    ? "text-white"
    : isHome
      ? "text-white"
      : "text-black"

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-[100] group/header
        transition-all duration-500 ease-out
        ${isScrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : isHome
            ? "bg-transparent backdrop-blur-none"
            : "bg-white/90 backdrop-blur-xl shadow-[0_1px_20px_0_rgba(0,0,0,0.05)]"
        }
      `}
      data-scrolled={isScrolled}
      data-home={isHome}
    >
      {/* ── TOP BAR ── Always dark #0A0A0F ────────────────────────────── */}
      <div
        className={`
          bg-[#0A0A0F] text-white/70
          border-b border-white/5
          transition-all duration-500 ease-out overflow-hidden
          ${isScrolled ? "h-0 opacity-0 py-0 border-transparent" : "h-[28px] md:h-[32px] py-0.5 opacity-100"}
        `}
      >
        <div className="max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14 h-full flex items-center justify-between">
          {/* Left: Social links */}
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

          {/* Right: Info + Auth links */}
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

      {/* ── MAIN HEADER ────────────────────────────────────────────── */}
      <header
        id="main-header"
        className={`mx-auto w-full transition-all duration-300 ease-out ${textColor}`}
      >
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
      </header>
    </div>
  )
}
