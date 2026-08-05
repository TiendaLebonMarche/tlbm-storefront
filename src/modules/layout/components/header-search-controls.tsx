"use client"

import { usePathname } from "next/navigation"
import SearchModal from "@modules/layout/components/search-modal"
import ThemeToggle from "@modules/layout/components/theme-toggle"

/**
 * Controles del header (lupa + cambio de tema).
 * En carrito (/cart) y tienda (/store) se ocultan: el usuario pidió
 * explícitamente que esas páginas no tengan lupa ni ThemeToggle.
 */
const HeaderSearchControls = () => {
  const pathname = usePathname()
  const hideOn = ["/cart", "/store"].some((p) => pathname?.includes(p)) ?? false

  if (hideOn) return null

  return (
    <>
      <SearchModal />
      <ThemeToggle />
    </>
  )
}

export default HeaderSearchControls
