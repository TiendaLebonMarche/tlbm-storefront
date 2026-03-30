"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { Text } from "@medusajs/ui"
import { Fragment, useEffect } from "react"
import { useUI } from "@lib/context/ui-context"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

import { NAV_LINKS, MORE_LINKS } from "@lib/constants"

const mainMenu = [
  { name: "Inicio", href: "/" },
  { name: "Parlantes", href: "/store?category=parlantes" },
  { name: "Originales", href: "/store?category=originales" },
  { name: "Tecnología", href: "/tecnologia" },
  { name: "Hogar", href: "/hogar" },
  { name: "Ofertas", href: "/ofertas" },
  { name: "Blog", href: "/blog" },
  { name: "Quiénes Somos", href: "/quienes-somos" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const { isSideMenuOpen, openSideMenu, closeSideMenu, isCartOpen, closeCart } = useUI()

  // Cierra el carrito si se abre el menú lateral
  useEffect(() => {
    if (isSideMenuOpen && isCartOpen) {
      closeCart()
    }
  }, [isSideMenuOpen, isCartOpen, closeCart])

  // Bloquea el scroll del body y html cuando el menú está abierto
  useEffect(() => {
    if (isSideMenuOpen) {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
      document.documentElement.style.height = "100vh"
      document.body.style.height = "100vh"
    } else {
      document.documentElement.style.overflow = "unset"
      document.body.style.overflow = "unset"
      document.documentElement.style.height = "auto"
      document.body.style.height = "auto"
    }
    return () => {
      document.documentElement.style.overflow = "unset"
      document.body.style.overflow = "unset"
      document.documentElement.style.height = "auto"
      document.body.style.height = "auto"
    }
  }, [isSideMenuOpen])

  return (
    <div className="h-full z-50">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="flex items-center gap-2 outline-none text-brand-brown hover:opacity-70 transition-opacity uppercase tracking-widest text-[10px] font-bold"
                  onClick={openSideMenu}
                >
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="1.5" fill="currentColor"/>
                    <rect y="10.5" width="20" height="1.5" fill="currentColor"/>
                  </svg>
                  <span className="hidden md:inline">Menu</span>
                </Popover.Button>
              </div>

              {isSideMenuOpen && (
                <div
                  className="fixed inset-0 z-[60] bg-brand-brown/10 pointer-events-auto transition-all duration-300"
                  onClick={closeSideMenu}
                  data-testid="side-menu-backdrop"
                  style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
                />
              )}

              <Transition
                show={isSideMenuOpen}
                as={Fragment}
                enter="transition transform duration-500 ease-out"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition transform duration-400 ease-in"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <PopoverPanel className="fixed top-0 left-0 h-screen w-screen max-w-[400px] bg-white z-[70] text-brand-brown border-r border-gray-100 flex flex-col shadow-xl overflow-y-auto overscroll-contain">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full justify-between px-6 md:px-10 pt-10 pb-10"
                  >
                    <div className="flex justify-between items-center mb-12">
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Navegación</span>
                      <button data-testid="close-menu-button" onClick={closeSideMenu} className="p-2 hover:opacity-50 transition-opacity" title="Cerrar menú">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </button>
                    </div>

                    <ul className="flex flex-col gap-1 items-start justify-start flex-1 w-full">
                      {mainMenu.map(({ name, href }) => (
                        <li key={name} className="w-full group">
                          <LocalizedClientLink
                            href={href}
                            className="block w-full text-lg md:text-xl font-medium py-4 border-b border-gray-50 text-brand-brown group-hover:pl-2 transition-all duration-300"
                            onClick={() => { close(); closeSideMenu(); }}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-10">
                      <div className="flex flex-col gap-4 mb-8">
                        <LocalizedClientLink href="/account" className="text-sm font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">Mi Cuenta</LocalizedClientLink>
                        <LocalizedClientLink href="/cart" className="text-sm font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">Carrito</LocalizedClientLink>
                      </div>
                      <Text className="text-[10px] text-gray-400 tracking-widest uppercase">
                        © {new Date().getFullYear()} Le Bon Marché
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
