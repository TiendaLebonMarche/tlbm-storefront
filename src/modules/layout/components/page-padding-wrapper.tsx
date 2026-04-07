"use client"

import { usePathname } from "next/navigation"

/**
 * Agrega padding superior a las páginas que no son el Home
 * para evitar que el header fijo cubra el contenido.
 */
export default function PagePaddingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Lista de rutas que NO deben tener padding (normalmente solo el home)
  // Nota: countryCode es dinámico, revisamos si la ruta es solo /{countryCode} o /
  const isHome = pathname === "/" || /^\/[a-zA-Z-]{2,5}\/?$/.test(pathname || "")

  return (
    <main className={`relative transition-all duration-300 overflow-x-hidden w-full ${!isHome ? "pt-32 md:pt-40 lg:pt-48" : ""}`}>
      {children}
    </main>
  )
}
