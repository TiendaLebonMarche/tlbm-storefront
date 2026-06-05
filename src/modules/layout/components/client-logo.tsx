"use client"

import Image from "next/image"
import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"

const LOGO_WHITE = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1780690110/logo-junio-blanco_1_xyjlaw.png"
const LOGO_BLACK = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1780690110/logo-junio-negro_cyhwth.png"

export default function ClientLogo({ isMobile = false }: { isMobile?: boolean }) {
  const isScrolled = useScrollThreshold(50)
  const pathname = usePathname()
  
  // Home page starts transparent, so we need the white logo at the very top.
  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")
  const showWhiteLogo = isHome && !isScrolled

  return (
    <div 
      className={`
        relative flex items-center justify-center
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        ${isMobile 
          ? (isScrolled ? "w-[140px]" : "w-[200px]") 
          : (isScrolled ? "w-[180px] md:w-[200px] lg:w-[220px] 2xl:w-[260px]" : "w-[240px] md:w-[280px] lg:w-[340px] 2xl:w-[400px]")
        }
      `}
      style={{ aspectRatio: "1822/548" }}
    >
      <Image
        src={LOGO_WHITE}
        alt="Tienda Le Bon Marché White"
        fill
        sizes="(max-width: 768px) 200px, 400px"
        className={`
          object-contain transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${showWhiteLogo ? "opacity-100" : "opacity-0"}
        `}
        priority
      />
      <Image
        src={LOGO_BLACK}
        alt="Tienda Le Bon Marché Black"
        fill
        sizes="(max-width: 768px) 200px, 400px"
        className={`
          object-contain transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${showWhiteLogo ? "opacity-0" : "opacity-100"}
        `}
        priority
      />
    </div>
  )
}
