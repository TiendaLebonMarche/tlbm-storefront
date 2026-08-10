"use client"

import { HttpTypes } from "@medusajs/types"
import { useUI } from "@lib/context/ui-context"

/**
 * Botón del carrito (CLIENT): solo el icono + badge.
 * Abre el drawer global (instancia única en el layout vía cart-drawer-data).
 */
const CartButtonClient = ({ cart }: { cart?: HttpTypes.StoreCart | null }) => {
  const { openCart, cartCount, cart: contextCart } = useUI()

  // El contexto UI es siempre el más fresco (addToCart/delete lo setean).
  const cartState = contextCart ?? cart ?? null
  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const badgeCount = cartCount ?? totalItems

  return (
    <button
      onClick={openCart}
      className="nav-icon text-inherit hover:text-brand-black relative inline-flex items-center justify-center outline-hidden transition-colors w-12 h-12"
      data-testid="nav-cart-link"
      aria-label="Abrir bolsa de compras"
    >
      {badgeCount === 0 ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 00-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.461 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M15.75 10.5V6a3.75 3.75 0 00-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.461 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )}
      {badgeCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-brand-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold cart-badge-pop" key={badgeCount}>
          {badgeCount}
        </div>
      )}
    </button>
  )
}

export default CartButtonClient
