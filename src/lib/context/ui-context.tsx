"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface UIContextType {
  isSideMenuOpen: boolean
  isCartOpen: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
  openCart: () => void
  closeCart: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSideMenuOpen, setSideMenuOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)

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
