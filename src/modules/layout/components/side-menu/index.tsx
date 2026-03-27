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
                  className="nav-icon outline-none text-inherit hover:text-brand-gold transition-colors group-hover:underline decoration-1 underline-offset-4"
                  onClick={openSideMenu}
                >
                  <span className="hidden md:inline">MENU</span>
                  <span className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </span>
                </Popover.Button>
              </div>

              {isSideMenuOpen && (
                <div
                  className="fixed inset-0 z-[60] bg-black/30 pointer-events-auto transition-all duration-300"
                  onClick={closeSideMenu}
                  data-testid="side-menu-backdrop"
                  style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                />
              )}

              <Transition
                show={isSideMenuOpen}
                as={Fragment}
                enter="transition transform duration-500 ease-out"
                enterFrom="-translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition transform duration-400 ease-in"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-0"
              >
                <PopoverPanel className="fixed top-0 left-0 h-screen w-screen max-w-none bg-brand-black z-[70] text-white border-none flex flex-col shadow-2xl overflow-y-auto overscroll-contain">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-screen justify-between px-5 md:px-8 pt-8 md:pt-10 pb-6 md:pb-8"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gray-400">Menú</span>
                      <button data-testid="close-menu-button" onClick={closeSideMenu} className="text-2xl font-light text-gray-400 hover:text-white transition-all duration-200 leading-none" title="Cerrar menú">
                        &times;
                      </button>
                    </div>

                    <ul className="flex flex-col gap-1 items-start justify-start flex-1 w-full">
                      {mainMenu.map(({ name, href }) => (
                        <li key={name} className="w-full">
                          <LocalizedClientLink
                            href={href}
                            className="block w-full text-base md:text-lg font-light uppercase tracking-[0.2em] py-3 border-b border-white/10 text-white hover:text-gray-300 transition-colors duration-200"
                            onClick={close}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-white/10">
                      <Text className="text-[10px] text-gray-600 tracking-widest uppercase">
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
