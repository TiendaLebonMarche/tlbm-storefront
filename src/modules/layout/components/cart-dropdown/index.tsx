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
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState, useCallback } from "react"
import { useUI } from "@lib/context/ui-context"

// Tiempo en ms antes de cerrar la bolsa automáticamente
const AUTO_CLOSE_MS = 8000

// Color exacto de WhatsApp
const WHATSAPP_COLOR = "#25D366"

const CartDropdown = ({
  cart: cartProp,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const { isCartOpen, openCart, closeCart, isSideMenuOpen, closeSideMenu, cartCount, cart: contextCart } = useUI()

  // Carrito efectivo: el del CONTEXTO UI es siempre el más fresco (viene del
  // response de addToCart/delete/update). El prop del servidor solo se usa
  // como fallback en el primer render (antes de cualquier mutación).
  const cartState = contextCart ?? cartProp ?? null

  // Cierra el menú lateral si se abre el carrito
  useEffect(() => {
    if (isCartOpen && isSideMenuOpen) {
      closeSideMenu()
    }
  }, [isCartOpen, isSideMenuOpen, closeSideMenu])

  const open = useCallback(() => openCart(), [openCart])
  const close = useCallback(() => closeCart(), [closeCart])

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  // Badge optimista: cartCount (seteado al añadir, instantáneo) tiene prioridad
  // sobre el conteo del servidor (que llega ~1-6s después vía router.refresh).
  const badgeCount = cartCount ?? totalItems

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  // Actualiza ref cuando cambia totalItems
  useEffect(() => {
    itemRef.current = totalItems
  }, [totalItems])

  const timedOpen = useCallback(() => {
    open()
    const timer = setTimeout(close, AUTO_CLOSE_MS)
    setActiveTimer(timer)
  }, [open, close])

  const openAndCancel = useCallback(() => {
    if (activeTimer) {
      clearTimeout(activeTimer)
      setActiveTimer(undefined)
    }
    open()
  }, [activeTimer, open])

  const handleWhatsAppAsesor = () => {
    if (!cartState?.items || cartState.items.length === 0) return

    let message = "Holaa, vengo de la tienda virtual, Me interesan estos productos, necesito asesoría para comprarlos.\n\n"

    cartState.items.forEach((item, index) => {
      message += `Producto #${index + 1} :\n`
      message += `Nombre: ${item.title}\n`
      message += `Opción/Color: ${item.variant?.title || "N/A"}\n`
      message += `Cantidad: ${item.quantity}\n`
      const price = convertToLocale({ amount: item.unit_price * item.quantity, currency_code: cartState.currency_code })
      message += `Subtotal: ${price}\n\n`
    })

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/573027567783?text=${encodedMessage}`, "_blank")
  }

  // Limpia timer al desmontar
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // Abre automáticamente cuando cambia el número de items
  // Solo en páginas que NO son de producto (desde producto lo abre handleAddToCart)
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart") && !pathname.includes("/productos/")) {
      timedOpen()
    }
  }, [totalItems, timedOpen, pathname])

  // --- Swipe to close en móvil ---
  const touchStartX = useRef<number | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = e.touches[0].clientX - touchStartX.current
    if (panelRef.current && diff > 0) {
      panelRef.current.style.transform = `translateX(${Math.min(diff, 150)}px)`
      panelRef.current.style.opacity = `${1 - diff / 400}`
    }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (panelRef.current) {
      panelRef.current.style.transform = ""
      panelRef.current.style.opacity = ""
    }
    if (diff > 100) {
      close()
    }
    touchStartX.current = null
  }, [close])

  return (
    <div className="h-full z-50 flex items-center relative">
      <Popover className="relative h-full flex items-center">
        <PopoverButton
          className="nav-icon text-inherit hover:text-brand-black relative inline-flex items-center justify-center outline-none transition-colors w-12 h-12"
          onClick={open}
          data-testid="nav-cart-link"
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
        </PopoverButton>

        {/* Overlay oscuro */}
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
            className="fixed inset-0 bg-black/50 z-[200] cursor-pointer backdrop-blur-sm"
            aria-label="Cerrar bolsa"
            tabIndex={0}
            onClick={close}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") close()
            }}
            role="button"
          />
        </Transition>

        {/* Panel lateral */}
        <Transition
          show={isCartOpen}
          as={Fragment}
          enter="transition transform duration-400 cubic-bezier(0.16, 1, 0.3, 1)"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition transform duration-400 ease-in"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-full opacity-0"
        >
          <PopoverPanel
            static
            ref={panelRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="fixed top-0 right-0 h-screen w-full sm:w-[420px] max-w-[100vw] bg-white shadow-2xl flex flex-col z-[300] overflow-hidden"
            data-testid="nav-cart-dropdown"
            aria-modal="true"
            role="dialog"
          >
            {/* Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-brand-gray-light flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-brand-black tracking-tight">
                Tu Bolsa
              </h2>
              <button
                onClick={close}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-2xl sm:text-3xl font-light text-brand-gray hover:text-brand-black hover:rotate-90 transition-all duration-300 rounded-full hover:bg-brand-gray-light/30"
                aria-label="Cerrar bolsa"
              >
                &times;
              </button>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5 space-y-3 sm:space-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                    .map((item) => (
                      <div
                        className="flex justify-between items-center bg-brand-gray-light/20 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors group"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <div className="flex gap-3 sm:gap-4 items-center flex-1 min-w-0">
                          <LocalizedClientLink
                            href={`/productos/${item.product_handle}`}
                            className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-md overflow-hidden bg-brand-gray-light/30"
                          >
                            {item.thumbnail ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.thumbnail}
                                alt={item.title || "Producto"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                draggable={false}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-brand-gray-light/30">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-gray-300">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                              </div>
                            )}
                          </LocalizedClientLink>
                          <div className="text-sm min-w-0 flex-1">
                            <p className="font-bold text-brand-black truncate">
                              {item.title}
                            </p>
                            <p className="text-[10px] sm:text-xs text-brand-gray mt-0.5">
                              Cantidad: {item.quantity}
                            </p>
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                              className="text-brand-gray font-medium text-xs sm:text-sm mt-0.5"
                            />
                          </div>
                        </div>
                        <DeleteButton
                          id={item.id}
                          className="text-red-300 hover:text-red-500 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          data-testid="cart-item-remove-button"
                        />
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 sm:px-6 sm:py-5 border-t border-brand-gray-light bg-white">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-semibold tracking-widest uppercase text-brand-gray">
                      Subtotal
                    </span>
                    <span
                      id="cart-total"
                      className="text-lg font-bold text-brand-black"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({ amount: subtotal, currency_code: cartState.currency_code })}
                    </span>
                  </div>

                  {/* Botón Ver Bolsa */}
                  <LocalizedClientLink href="/cart" passHref onClick={close}>
                    <button className="w-full bg-brand-black text-white py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors rounded-lg mb-3">
                      Ver Bolsa y Pagar
                    </button>
                  </LocalizedClientLink>

                  {/* Botón WhatsApp */}
                  <button
                    onClick={handleWhatsAppAsesor}
                    className="relative overflow-hidden w-full text-white py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all rounded-lg"
                    style={{
                      backgroundColor: WHATSAPP_COLOR,
                      boxShadow: `0 0 20px ${WHATSAPP_COLOR}66`,
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Asesoría en WhatsApp
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-gray-200 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 00-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.461 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-center text-brand-gray mb-6 font-serif italic text-lg">
                    Tu bolsa está vacía.
                  </p>
                  <LocalizedClientLink href="/store" onClick={close}>
                    <button
                      className="border border-brand-black py-3 px-8 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-black hover:text-white transition-all"
                      aria-label="Ver catálogo de productos"
                    >
                      Ver Catálogo
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
