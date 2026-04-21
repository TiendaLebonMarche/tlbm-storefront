"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { Text } from "@medusajs/ui"
import { Fragment, useEffect } from "react"
import { useUI } from "@lib/context/ui-context"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"



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
                  className="group flex items-center justify-center outline-none text-inherit transition-opacity duration-300 hover:opacity-70 w-10 h-10"
                  onClick={openSideMenu}
                >
                  <div className="relative flex flex-col justify-center items-center w-6 h-6 overflow-hidden">
                    <span className="absolute h-[1.5px] w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-y-[3px] group-hover:-translate-y-[4px]"></span>
                    <span className="absolute h-[1.5px] w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-[3px] group-hover:translate-y-[4px]"></span>
                  </div>
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
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Explorar — Navegación</span>
                      <button data-testid="close-menu-button" onClick={closeSideMenu} className="p-2 hover:rotate-90 transition-transform duration-500" title="Cerrar menú">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    <ul className="flex flex-col gap-2 items-start justify-start flex-1 w-full translate-y-4">
                      {mainMenu.map(({ name, href }, index) => (
                        <li key={name} className="w-full group overflow-hidden">
                          <LocalizedClientLink
                            href={href}
                            className={`block w-full text-2xl md:text-3xl font-black py-4 border-b border-gray-50 text-brand-brown transform transition-all duration-700 delay-[${index * 50}ms] group-hover:translate-x-2 tracking-tighter uppercase`}
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
