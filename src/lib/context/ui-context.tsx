"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { HttpTypes } from "@medusajs/types"

interface UIContextType {
  isSideMenuOpen: boolean
  isCartOpen: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
  openCart: () => void
  closeCart: () => void
  /** Conteo optimista de items (seteado al instante al añadir a la bolsa).
   * El badge del carrito lo usa como override del conteo del servidor,
   * que llega ~1-6s después vía router.refresh(). */
  cartCount: number | null
  setCartCount: (count: number | null) => void
  /** Último carrito conocido en el cliente (del response de addToCart).
   * El drawer lo usa como fallback cuando el prop del servidor quedó
   * vacío/stale porque el re-render RSC falló (React #441 transitorio). */
  cart: HttpTypes.StoreCart | null
  setCart: (cart: HttpTypes.StoreCart | null) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState<number | null>(null)
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)

  const openSideMenu = () => {
    setSideMenuOpen(true)
    setCartOpen(false)
  }
  const closeSideMenu = () => setSideMenuOpen(false)
  const openCart = () => {
    setCartOpen(true)
    setSideMenuOpen(false)
  }
  const closeCart = () => setCartOpen(false)

  return (
    <UIContext.Provider
      value={{
        isSideMenuOpen,
        isCartOpen,
        openSideMenu,
        closeSideMenu,
        openCart,
        closeCart,
        cartCount,
        setCartCount,
        cart,
        setCart,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error("useUI must be used within a UIProvider")
  }
  return context
}
