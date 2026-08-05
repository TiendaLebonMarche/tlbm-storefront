"use client"

import { usePathname } from "next/navigation"
import SearchModal from "@modules/layout/components/search-modal"
import ThemeToggle from "@modules/layout/components/theme-toggle"

/**
 * Controles del header (lupa + cambio de tema).
 * En la página de carrito (/cart) se ocultan: el carrito ya es el foco,
 * y el usuario pidió explícitamente que no haya lupa ni ThemeToggle ahí.
 */
const HeaderSearchControls = () => {
  const pathname = usePathname()
  const isCartPage = pathname?.includes("/cart") ?? false

  if (isCartPage) return null

  return (
    <>
      <SearchModal />
      <ThemeToggle />
    </>
  )
}

export default HeaderSearchControls
