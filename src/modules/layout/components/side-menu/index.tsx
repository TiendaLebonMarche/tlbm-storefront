"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { useUI } from "@lib/context/ui-context"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Locale } from "@lib/data/locales"
import { HttpTypes } from "@medusajs/types"

/**
 * SideMenu premium (v3, 10-ago-2026 — research SSENSE/Aesop/Net-a-Porter/Goop +
 * Baymard/NN/g):
 * - "Colecciones ▾" con ACORDEÓN: el label navega a /collections y cierra el drawer;
 *   el chevron expande SIN cerrar (patrón validado r/userexperience + Baymard
 *   "View All": solo 24% de ecommerce lo hace bien). Las colecciones viven
 *   colapsadas → NO compiten con los ítems principales.
 * - Guías como top-level único (patrón "Read"/"The Edit" de Aesop/Goop/NAP).
 * - SIN Mi Cuenta ni Carrito (regla Julián: se agregan después; el carrito ya vive
 *   en el header, como recomienda NN/g utility navigation).
 * - Label "Menú" junto al icono (NN/g: con label + borde se usa más).
 * - Animación easeOutExpo + stagger 50ms; ancho max 400px (nunca full-screen).
 */

const mainMenu = [
  { name: "Ofertas", href: "/store" },
  { name: "Guías", href: "/guias" },
  { name: "Quiénes Somos", href: "/quienes-somos" },
  { name: "Contacto", href: "https://wa.me/573027567783", external: true },
]

const socials = [
  { name: "Instagram", href: "https://instagram.com/tiendalebonmarche" },
  { name: "Facebook", href: "https://facebook.com/tiendalebonmarche" },
  { name: "TikTok", href: "https://tiktok.com/@tiendalebonmarche" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  collections?: Array<{ id: string; title: string; handle: string }>
}

const SideMenu = ({ regions, locales, currentLocale, collections = [] }: SideMenuProps) => {
  const { isSideMenuOpen, openSideMenu, closeSideMenu, isCartOpen, closeCart } = useUI()
  const [collectionsOpen, setCollectionsOpen] = useState(false)

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

  // Al abrir el menú se resetea el acordeón (siempre empieza colapsado)
  useEffect(() => {
    if (isSideMenuOpen) setCollectionsOpen(false)
  }, [isSideMenuOpen])

  return (
    <div className="h-full z-50">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="group flex items-center justify-center gap-2 outline-none text-inherit transition-opacity duration-300 hover:opacity-70 h-12"
                  onClick={openSideMenu}
                >
                  <div className="flex flex-col gap-[6px] items-start">
                    <span className="block h-[1.5px] bg-current rounded-[2px] transition-all duration-300 w-5 group-hover:w-6" />
                    <span className="block h-[1.5px] bg-current rounded-[2px] transition-all duration-300 w-[14px] group-hover:w-5" />
                    <span className="block h-[1.5px] bg-current rounded-[2px] transition-all duration-300 w-[18px] group-hover:w-4" />
                  </div>
                  {/* Label "Menú" (NN/g: con label se usa más) — solo desktop para no saturar mobile */}
                  <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-[0.2em]">
                    Menú
                  </span>
                </Popover.Button>
              </div>

              {isSideMenuOpen && (
                <div
                  className="fixed inset-0 z-[155] bg-brand-black/10 pointer-events-auto transition-all duration-300"
                  onClick={closeSideMenu}
                  data-testid="side-menu-backdrop"
                  style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
                />
              )}

              <Transition
                show={isSideMenuOpen}
                as={Fragment}
                enter="transition transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                enterFrom="-translate-x-full opacity-60"
                enterTo="translate-x-0 opacity-100"
                leave="transition transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-60"
              >
                <PopoverPanel className="fixed top-0 left-0 h-screen w-screen max-w-[400px] bg-white z-[160] text-brand-black border-r border-brand-gray-light flex flex-col shadow-xl overflow-y-auto overscroll-contain">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full justify-between px-6 md:px-10 pt-10 pb-8"
                  >
                    <div className="flex justify-between items-center mb-10">
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Menú</span>
                      <button data-testid="close-menu-button" onClick={closeSideMenu} className="p-2 hover:rotate-90 transition-transform duration-500" title="Cerrar menú">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    <ul className="flex flex-col items-start justify-start flex-1 w-full">
                      {/* ── Inicio (el logo enlaza a home, pero el drawer cubre el header → se mantiene) ── */}
                      <li className="w-full group overflow-hidden border-b border-gray-50">
                        <LocalizedClientLink
                          href="/"
                          className="block w-full text-3xl md:text-[34px] font-serif font-medium py-4 text-brand-black transform transition-all duration-700 group-hover:translate-x-2 group-hover:text-[#D4AF37] tracking-tight"
                          style={{ transitionDelay: "0ms" }}
                          onClick={() => { close(); closeSideMenu(); }}
                        >
                          Inicio
                        </LocalizedClientLink>
                      </li>

                      {/* ── Colecciones ▾ (acordeón: label navega · chevron expande sin cerrar) ── */}
                      <li className="w-full group overflow-hidden border-b border-gray-50">
                        <div className="flex items-center">
                          <LocalizedClientLink
                            href="/collections"
                            className="flex-1 block text-3xl md:text-[34px] font-serif font-medium py-4 text-brand-black transform transition-all duration-700 group-hover:translate-x-2 group-hover:text-[#D4AF37] tracking-tight"
                            style={{ transitionDelay: "50ms" }}
                            onClick={() => { close(); closeSideMenu(); }}
                          >
                            Colecciones
                          </LocalizedClientLink>
                          <button
                            onClick={() => setCollectionsOpen(!collectionsOpen)}
                            className="p-4 text-brand-gray hover:text-[#D4AF37] transition-colors duration-300"
                            aria-label={collectionsOpen ? "Ocultar colecciones" : "Mostrar colecciones"}
                            aria-expanded={collectionsOpen}
                          >
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${collectionsOpen ? "rotate-180" : ""}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        {collectionsOpen && (
                          <ul className="pb-5 pl-1 space-y-0.5">
                            <li>
                              <LocalizedClientLink
                                href="/collections"
                                className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] py-2 hover:opacity-70 transition-opacity"
                                onClick={() => { close(); closeSideMenu(); }}
                              >
                                Ver todas las colecciones
                              </LocalizedClientLink>
                            </li>
                            {collections.map((c) => (
                              <li key={c.id}>
                                <LocalizedClientLink
                                  href={`/collections/${c.handle}`}
                                  className="block text-base font-light text-brand-black/80 py-1.5 hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-300"
                                  onClick={() => { close(); closeSideMenu(); }}
                                >
                                  {c.title}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>

                      {/* ── Resto del menú principal ── */}
                      {mainMenu.map((item, index) => (
                        <li key={item.name} className="w-full group overflow-hidden border-b border-gray-50">
                          {item.href.startsWith("http") ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-3xl md:text-[34px] font-serif font-medium py-4 text-brand-black transform transition-all duration-700 group-hover:translate-x-2 group-hover:text-[#D4AF37] tracking-tight"
                              style={{ transitionDelay: `${(index + 2) * 50}ms` }}
                              onClick={() => { close(); closeSideMenu(); }}
                            >
                              {item.name}
                            </a>
                          ) : (
                            <LocalizedClientLink
                              href={item.href}
                              className="block w-full text-3xl md:text-[34px] font-serif font-medium py-4 text-brand-black transform transition-all duration-700 group-hover:translate-x-2 group-hover:text-[#D4AF37] tracking-tight"
                              style={{ transitionDelay: `${(index + 2) * 50}ms` }}
                              onClick={() => { close(); closeSideMenu(); }}
                            >
                              {item.name}
                            </LocalizedClientLink>
                          )}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-10">
                      <div className="flex flex-col gap-3 mb-8">
                        <span className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40 mb-1">
                          Síguenos
                        </span>
                        <div className="flex gap-5">
                          {socials.map((s) => (
                            <a
                              key={s.name}
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gray hover:text-[#D4AF37] transition-colors duration-300"
                            >
                              {s.name}
                            </a>
                          ))}
                          <a
                            href="https://wa.me/573027567783"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gray hover:text-[#D4AF37] transition-colors duration-300"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                      <p className="text-[10px] text-brand-gray tracking-widest uppercase">
                        © {new Date().getFullYear()} Le Bon Marché · Bucaramanga, Colombia
                      </p>
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
