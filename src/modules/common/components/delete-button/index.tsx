"use client"

import { deleteLineItem, retrieveCart } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"
import { useUI } from "@lib/context/ui-context"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { setCart, setCartCount } = useUI()

  const syncCart = async (cart?: any) => {
    const fresh = cart ?? (await retrieveCart().catch(() => null))
    setCart(fresh ?? null)
    setCartCount(
      fresh?.items?.length
        ? fresh.items.reduce((acc: number, i: any) => acc + (i.quantity || 0), 0)
        : null
    )
    // Sin router.refresh(): el contexto UI ya actualiza badge/drawer (fix React #441)
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const cart = await deleteLineItem(id)
      await syncCart(cart)
    } catch (err: any) {
      const msg = err?.message || ""
      // RSC #441: el delete pudo ejecutarse aunque el re-render del árbol
      // Server Components falló → re-verificar el carrito real.
      if (/Minified React error|Server Components render/i.test(msg)) {
        await syncCart()
      } else {
        console.error("Error al eliminar item:", err)
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
