"use client"

import Image from "next/image"
import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"

const LOGO_WHITE = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1779485389/T-logo-blanco-LBM_mcccmw.png"
const LOGO_BLACK = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1779485388/T-logo-negro-LBM_aec5jr.png"

export default function ClientLogo({ isMobile = false }: { isMobile?: boolean }) {
  const isScrolled = useScrollThreshold(50)
  const pathname = usePathname()
  
  // Home page starts transparent, so we need the white logo at the very top.
  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")
  
  const showWhiteLogo = isHome && !isScrolled
  const logoSrc = showWhiteLogo ? LOGO_WHITE : LOGO_BLACK

  return (
    <div className="relative flex items-center justify-center">
      <Image
        src={logoSrc}
        alt="Tienda Le Bon Marché"
        width={1822}
        height={548}
        className={`
          h-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
          ${isMobile 
            ? (isScrolled ? "w-[140px]" : "w-[200px]") 
            : (isScrolled ? "w-[180px] md:w-[200px] lg:w-[220px]" : "w-[240px] md:w-[280px] lg:w-[340px]")
          }
        `}
        priority
      />
    </div>
  )
}
