import { NextRequest, NextResponse } from "next/server"
import { addToCart, deleteLineItem, updateLineItem } from "@lib/data/cart"

/**
 * API route del carrito (JSON puro — SIN RSC flight).
 * Fix React #441 (10-ago): las server actions del carrito fallaban con 500
 * en Next 16.3.0 porque el flight del POST re-renderiza el árbol y un
 * componente con useId crashea (bug conocido ≥15.4.8; ver r/nextjs + #84029).
 * Las mutaciones del carrito ahora van por aquí → respuesta JSON limpia.
 */
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body
    let result: unknown

    if (action === "add") {
      result = await addToCart({
        variantId: body.variantId,
        quantity: body.quantity ?? 1,
        countryCode: body.countryCode,
      })
    } else if (action === "delete") {
      result = await deleteLineItem(body.lineId)
    } else if (action === "update") {
      result = await updateLineItem({
        lineId: body.lineId,
        quantity: body.quantity,
      })
    } else {
      return NextResponse.json({ error: "Acción desconocida" }, { status: 400 })
    }

    // addToCart retorna { cart } en éxito o un string de error
    if (typeof result === "string") {
      return NextResponse.json({ error: result }, { status: 400 })
    }

    const cart = (result as { cart?: unknown })?.cart ?? result
    return NextResponse.json({ cart })
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Error en el carrito" },
      { status: 500 }
    )
  }
}
