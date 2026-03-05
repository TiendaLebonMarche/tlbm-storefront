"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { useUI } from "@lib/context/ui-context"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const { isCartOpen, openCart, closeCart, isSideMenuOpen, closeSideMenu } = useUI()

  // Cierra el menú lateral si se abre el carrito
  useEffect(() => {
    if (isCartOpen && isSideMenuOpen) {
      closeSideMenu()
    }
  }, [isCartOpen, isSideMenuOpen, closeSideMenu])

  const open = () => openCart()
  const close = () => closeCart()

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50 flex items-center"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full flex items-center">
        <PopoverButton className="nav-icon text-inherit hover:text-brand-gold relative flex items-center gap-1.5 outline-none transition-colors" onClick={open}>
          {totalItems === 0 ? (
            // Bolsa delgada cuando está vacía
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          ) : (
            // Bolsa robusta cuando tiene elementos
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M7 4V3c0-.552.448-1 1-1h8c.552 0 1 .448 1 1v1h5.586L23 7.414V19c0 1.657-1.343 3-3 3H4c-1.657 0-3-1.343-3-3V7.414L7 4zm2 0h6V3H9v1zm10 2H5v12c0 .552.448 1 1 1h12c.552 0 1-.448 1-1V6zM9 9c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1s-1-.448-1-1v-4c0-.552.448-1 1-1zm6 0c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1s-1-.448-1-1v-4c0-.552.448-1 1-1z" />
            </svg>
          )}
          {totalItems > 0 && (
            <div id="cart-count" className="absolute -top-2 -right-2 bg-brand-gold text-brand-black w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold">
              {totalItems}
            </div>
          )}
        </PopoverButton>

        {/* Overlay Background when Open (siempre visible y clickeable para cerrar) */}
        <Transition
          show={isCartOpen}
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
            aria-label="Cerrar bolsa"
            tabIndex={0}
            onClick={close}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') close() }}
            role="button"
          />
        </Transition>

        <Transition
          show={isCartOpen}
          as={Fragment}
          enter="transition transform duration-400 cubic-bezier(0.16, 1, 0.3, 1)"
          enterFrom="translate-x-100 opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition transform duration-400 ease-in"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-100 opacity-0"
        >
          <PopoverPanel
            static
            className="fixed top-0 right-0 h-full w-[400px] max-w-[85%] bg-white shadow-2xl flex flex-col z-50 overflow-hidden"
            data-testid="nav-cart-dropdown"
            aria-modal="true"
            role="dialog"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-serif font-bold text-brand-black">Tu Bolsa</h2>
              <button
                onClick={close}
                className="text-2xl text-gray-400 hover:text-black outline-none focus:ring-2 focus:ring-brand-gold rounded-full p-2"
                aria-label="Cerrar bolsa"
                tabIndex={0}
              >
                &times;
              </button>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                    .map((item) => (
                      <div className="flex justify-between items-center bg-gray-50 p-3" key={item.id} data-testid="cart-item">
                        <div className="flex gap-4 items-center flex-1">
                          <LocalizedClientLink href={`/products/${item.product_handle}`} className="w-16 h-16 flex-shrink-0">
                            <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="square" className="w-full h-full object-cover" />
                          </LocalizedClientLink>
                          <div className="text-sm">
                            <p className="font-bold text-brand-black w-36 truncate">{item.title}</p>
                            <p className="text-[10px] text-gray-500 mb-1">Cantidad: {item.quantity}</p>
                            <LineItemPrice item={item} style="tight" currencyCode={cartState.currency_code} className="text-gray-500 font-medium" />
                          </div>
                        </div>
                        <DeleteButton id={item.id} className="text-red-400 text-xl hover:text-red-600 bg-transparent" data-testid="cart-item-remove-button">
                          &times;
                        </DeleteButton>
                      </div>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-100">
                  <div className="flex justify-between mb-4 font-bold text-brand-black">
                    <span className="text-xs tracking-widest uppercase">Subtotal</span>
                    <span id="cart-total" data-testid="cart-subtotal" data-value={subtotal}>
                      {convertToLocale({ amount: subtotal, currency_code: cartState.currency_code })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref onClick={close}>
                    <button className="w-full border border-black text-black py-4 mb-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition">
                      Ver Bolsa y Pagar
                    </button>
                  </LocalizedClientLink>
                  <button onClick={() => window.open('https://wa.me/573027567783', '_blank')} className="w-full bg-brand-whatsapp text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-green-600 transition">
                    Asesoría en WhatsApp
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center flex flex-col items-center">
                  <p className="text-center text-gray-400 mb-6 font-serif italic text-lg">Tu bolsa está vacía.</p>
                  <LocalizedClientLink href="/store" onClick={close}>
                    <button
                      className="border border-brand-black py-3 px-8 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-black hover:text-white transition-all"
                      aria-label="Explorar productos"
                    >
                      Explorar Productos
                    </button>
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
