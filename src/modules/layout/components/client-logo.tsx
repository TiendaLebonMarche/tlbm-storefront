"use client"

import Image from "next/image"
import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"

const LOGO_WHITE = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1779482684/logo-TLBM-nlanco_njck5j.png"
const LOGO_BLACK = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1779483302/logo-TLBM-negro_tn0vbl.png"

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
            ? (isScrolled ? "w-[120px]" : "w-[160px]") 
            : (isScrolled ? "w-[160px] md:w-[180px] lg:w-[200px]" : "w-[200px] md:w-[240px] lg:w-[280px]")
          }
        `}
        priority
      />
    </div>
  )
}
