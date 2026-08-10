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
  {
    name: "Instagram",
    href: "https://instagram.com/tiendalebonmarche",
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/tiendalebonmarche",
    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@tiendalebonmarche",
    icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
  },
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

  // Cierre con clic en cualquier parte fuera del drawer (como la bolsa/cart).
  // Listener global = garantiza el cierre aunque el backdrop falle.
  useEffect(() => {
    if (!isSideMenuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      const panel = document.querySelector('[data-testid="nav-menu-popup"]')
      if (panel && !panel.contains(event.target as Node)) {
        closeSideMenu()
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isSideMenuOpen, closeSideMenu])

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

                      {/* ── Tienda (mismo menú en todas las páginas — regla Julián) ── */}
                      <li className="w-full group overflow-hidden border-b border-gray-50">
                        <LocalizedClientLink
                          href="/store"
                          className="block w-full text-3xl md:text-[34px] font-serif font-medium py-4 text-brand-black transform transition-all duration-700 group-hover:translate-x-2 group-hover:text-[#D4AF37] tracking-tight"
                          style={{ transitionDelay: "25ms" }}
                          onClick={() => { close(); closeSideMenu(); }}
                        >
                          Tienda
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
                      <div className="flex flex-col gap-4 mb-8">
                        <span className="text-[10px] font-bold tracking-[0.35em] uppercase opacity-40">
                          Síguenos
                        </span>
                        <div className="flex gap-4">
                          {socials.map((s) => (
                            <a
                              key={s.name}
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={s.name}
                              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-gray hover:text-white hover:bg-[#0A0A0F] hover:border-[#0A0A0F] transition-all duration-300"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">{s.icon}</svg>
                            </a>
                          ))}
                          <a
                            href="https://wa.me/573027567783"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-gray hover:text-white hover:bg-[#0A0A0F] hover:border-[#0A0A0F] transition-all duration-300"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
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
