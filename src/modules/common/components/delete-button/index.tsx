"use client"

import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useRouter } from "next/navigation"
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
  const router = useRouter()

  const syncCart = (cart: any) => {
    // deleteLineItem YA retorna el carrito fresco (fix return 10-ago).
    // Contexto UI actualiza drawer/badge; router.refresh() re-sincroniza /co/cart.
    setCart(cart ?? null)
    setCartCount(
      cart?.items?.length
        ? cart.items.reduce((acc: number, i: any) => acc + (i.quantity || 0), 0)
        : null
    )
    try {
      router.refresh()
    } catch {}
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const cart = await deleteLineItem(id)
      await syncCart(cart)
    } catch (err: any) {
      console.error("Error al eliminar item:", err)
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
