"use client"

import Image from "next/image"
import { useScrollThreshold } from "@lib/hooks/use-scroll-threshold"
import { usePathname } from "next/navigation"

const LOGO_URL = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785517677/logo-TLBM-trpar_qtqudf.png"

export default function ClientLogo({ isMobile = false }: { isMobile?: boolean }) {
  const isScrolled = useScrollThreshold(50)
  const pathname = usePathname()

  // Home page starts transparent, so we invert the logo to white at the very top.
  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")
  const onTransparentBg = isHome && !isScrolled

  return (
    <div
      className={`
        relative flex items-center justify-center
        transition-all duration-500
        ${isMobile
          ? (isScrolled ? "w-[150px]" : "w-[170px]")
          : (isScrolled ? "w-[180px] md:w-[200px] lg:w-[220px] 2xl:w-[260px]" : "w-[200px] md:w-[240px] lg:w-[280px] 2xl:w-[340px]")
        }
        h-full
      `}
      style={{ transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)" }}
    >
      <Image
        src={LOGO_URL}
        alt="Tienda Le Bon Marché"
        fill
        sizes="(max-width: 768px) 170px, 340px"
        className={`
          object-contain
          transition-all duration-500
          ${onTransparentBg ? "brightness-0 invert" : ""}
        `}
        style={{ transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)" }}
        priority
      />
    </div>
  )
}
