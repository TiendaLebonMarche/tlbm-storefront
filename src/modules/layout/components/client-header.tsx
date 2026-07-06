"use client"

import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"

/*
  Header height budget (must match hero pt values):

  Top bar (marquee):
    text-[10px] → ~12px line-height  +  py-2.5 (10px top + 10px bot) = 32px  ← all breakpoints

  Nav bar:
    Mobile  (<md): py-2 (8+8) + logo h-[52px] = ~68px
    Desktop (≥md): min-h-[4.5rem] = 72px + py-1 = ~76px

  Total:
    Mobile  = 32 + 68 = 100px → hero pt uses 120px (gives 20px breathing room)
    Desktop = 32 + 76 = 108px → hero pt uses 136px (gives 28px breathing room)
*/
export default function ClientHeader({ children }: { children: React.ReactNode }) {
  const isScrolled = useScrollThreshold(50)
  const pathname = usePathname()

  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-[100] group/header
        transition-[transform,opacity] duration-300 ease-out
        ${isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_20px_0_rgba(0,0,0,0.05)] text-black"
          : isHome
            ? "bg-transparent backdrop-blur-none text-white"
            : "bg-transparent backdrop-blur-none text-black"
        }
      `}
      data-scrolled={isScrolled}
      data-home={isHome}
    >
      {/* ── MARQUEE TOP BAR ────────────────────────────────────────────── */}
      <div
        id="top-bar"
        className={`
          bg-[#1a1a1a] text-[#f4f4f4]/80 text-[8px] md:text-[9px]
          tracking-[0.2em] font-sans uppercase font-medium
          overflow-hidden border-b border-white/5
          transition-all duration-500 ease-out
          ${isScrolled ? "h-0 opacity-0 py-0 border-transparent" : "h-[24px] py-1 opacity-100"}
        `}
      >
        <div className="flex whitespace-nowrap animate-marquee-fixed w-full items-center h-full">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-6 flex items-center">
              Envíos a todo Bucaramanga <span className="mx-3 text-white/20">•</span> Productos originales y exclusivos
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN NAV ────────────────────────────────────────────────────── */}
      <header
        id="main-header"
        className="mx-auto w-full transition-[transform,opacity] duration-300 ease-out"
      >
        <div className={`
          max-w-[95rem] mx-auto
          flex justify-between items-center
          transition-[transform,opacity] duration-300 ease-out
          ${isScrolled ? "min-h-[56px] md:min-h-[60px] py-2 lg:py-3" : "min-h-[64px] md:min-h-[76px] py-3 lg:py-4"}
        `}>
          {children}
        </div>
      </header>
    </div>
  )
}
