"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUI } from "@lib/context/ui-context"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item: propItem, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { cart: contextCart, setCart, setCartCount } = useUI()
  const router = useRouter()

  // Fuente de verdad: el contexto UI (setCart lo actualiza tras cada mutación).
  // La prop del server solo se usa como carga inicial (contexto vacío): si el
  // contexto ya tiene carrito y el item NO está, fue eliminado → la fila se quita.
  // Sin esto, /co/cart no refleja update/delete hasta recargar (router.refresh()
  // falla silencioso en Next 16.3.0 con este árbol — bug #441; el revalidateTag
  // "max" ya deja el server cache fresco para la siguiente navegación).
  const item = contextCart
    ? contextCart.items?.find((i) => i.id === propItem.id)
    : propItem
  if (!item) return null // item eliminado → la fila desaparece al instante

  const syncCart = (cart: any) => {
    // updateLineItem YA retorna el carrito fresco (fix return 10-ago).
    // El contexto UI actualiza fila/drawer/badge al instante; router.refresh()
    // re-sincroniza el resto del server component (Summary) si el flight funciona.
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

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    try {
      const cart = await updateLineItem({
        lineId: item.id,
        quantity,
      })
      await syncCart(cart)
    } catch (err: any) {
      console.error("Error al actualizar cantidad:", err)
      setError(err?.message || "No se pudo actualizar la cantidad")
    } finally {
      setUpdating(false)
    }
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="pl-0! p-4 w-24">
        <LocalizedClientLink
          href={`/productos/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt={item.product_title || "Producto"}
              className="w-full h-full object-cover rounded-md bg-brand-gray-light/30"
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-gray-light/30 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center w-28">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="w-14 h-10 p-4"
              data-testid="product-select-button"
            >
              {/* TODO: Update this with the v2 way of managing inventory */}
              {Array.from(
                {
                  length: Math.min(maxQuantity, 10),
                },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}

              <option value={1} key={1}>
                1
              </option>
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className="pr-0!">
        <span
          className={clx("pr-0!", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
