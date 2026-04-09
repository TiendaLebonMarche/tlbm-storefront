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
  const isScrolled = useScrollThreshold(10)
  const pathname = usePathname()

  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-[100] text-black
        transition-all duration-500
        ${isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-[#F2F2E1]/70 backdrop-blur-sm"
        }
      `}
    >
      {/* ── MARQUEE TOP BAR ──────────────────────────────────────────────
          Height: text-[10px] line-height ~12px + py-2.5 (20px) = 32px fixed
      ──────────────────────────────────────────────────────────────────── */}
      <div
        id="top-bar"
        className="
          bg-black text-white text-[10px]
          tracking-[0.22em] py-2.5
          overflow-hidden font-sans uppercase font-black
          border-b border-white/5
        "
      >
        <div className="flex whitespace-nowrap animate-marquee-fixed">
          <span className="mx-6">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
          <span className="mx-6">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
          <span className="mx-6">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
          <span className="mx-6">Envíos a todo Bucaramanga — Productos originales y exclusivos.</span>
        </div>
      </div>

      {/* ── MAIN NAV ────────────────────────────────────────────────────── */}
      <header
        id="main-header"
        className="mx-auto w-full"
      >
        {/* 
          Wrapper height explicit per breakpoint:
          Mobile : min-h-[68px] (logo h-[52px] + py-2 = 8+8 = 68)
          Desktop: min-h-[72px] 
        */}
        <div className="
          max-w-[95rem] mx-auto
          flex justify-between items-center
          min-h-[68px] md:min-h-[76px]
        ">
          {children}
        </div>
      </header>
    </div>
  )
}
