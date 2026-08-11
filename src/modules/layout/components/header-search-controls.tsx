"use client"

import { usePathname } from "next/navigation"
import SearchModal from "@modules/layout/components/search-modal"

/**
 * Controles del header (lupa).
 * En carrito (/cart) y tienda (/store) se ocultan: el usuario pidió
 * explícitamente que esas páginas no tengan lupa.
 * El cambio de tema (claro/oscuro) se eliminó 11-ago-2026 (decisión Julián):
 * la tienda es siempre modo claro.
 */
const HeaderSearchControls = () => {
  const pathname = usePathname()
  const hideOn = ["/cart", "/store"].some((p) => pathname?.includes(p)) ?? false

  if (hideOn) return null

  return <SearchModal />
}

export default HeaderSearchControls
