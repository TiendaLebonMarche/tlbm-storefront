import { retrieveCart } from "@lib/data/cart"
import CartButtonClient from "./cart-button-client"

/**
 * Botón del carrito (SERVER): trae el carrito para el badge inicial.
 * El drawer (panel) vive en `cart-drawer-data` — instancia ÚNICA global,
 * nunca aquí (antes cada CartButton montaba su propio drawer con portal
 * → 2 paneles duplicados en mobile + Popover/useId = React #441).
 */
export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)
  return <CartButtonClient cart={cart} />
}
