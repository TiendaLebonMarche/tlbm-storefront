import { retrieveCart } from "@lib/data/cart"
import CartDrawer from "./cart-drawer"

/**
 * Wrapper SERVER del drawer de la bolsa: instancia ÚNICA global.
 * Se monta en el layout (main) — todas las páginas comparten el MISMO panel
 * (los CartButton del header solo abren el drawer vía contexto UI).
 */
export default async function CartDrawerData() {
  const cart = await retrieveCart().catch(() => null)
  return <CartDrawer cart={cart} />
}
