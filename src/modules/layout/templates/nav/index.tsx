"use client"
import { Suspense, useRef, useState, useEffect } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchModal from "@modules/layout/components/search-modal"
import ClientHeaderWrapper from "@modules/layout/components/client-header"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <ClientHeaderWrapper>
      <div className="flex flex-1 items-center justify-between gap-4 md:gap-0">
        {/* Menú izquierdo (desktop) */}
        <nav className="hidden md:flex flex-1 justify-end gap-8 text-sm font-bold tracking-widest uppercase">
          <LocalizedClientLink href="/ofertas" className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black">Ofertas</LocalizedClientLink>
          <LocalizedClientLink href="/tecnologia" className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black">Tecnología</LocalizedClientLink>
          <LocalizedClientLink href="/sonido" className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black">Sonido</LocalizedClientLink>
          <LocalizedClientLink href="/hogar" className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black">Hogar</LocalizedClientLink>
        </nav>

        {/* Logo centrado */}
        <div className="flex-shrink-0 z-50 flex-1 flex justify-center">
          <LocalizedClientLink
            href="/"
            className="text-2xl md:text-3xl font-serif font-bold tracking-tight transition-colors text-white group-data-[scrolled=true]:text-brand-black hover:opacity-80"
            style={{ letterSpacing: '0.1em' }}
          >
            LE BON MARCHÉ
          </LocalizedClientLink>
        </div>

        {/* Menú derecho (desktop) */}
        <nav className="hidden md:flex flex-1 justify-start gap-8 text-sm font-bold tracking-widest uppercase">
          {(() => {
            const [open, setOpen] = useState(false)
            const dropdownRef = useRef(null)
            useEffect(() => {
              function handleClickOutside(event) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                  setOpen(false)
                }
              }
              if (open) {
                document.addEventListener("mousedown", handleClickOutside)
              } else {
                document.removeEventListener("mousedown", handleClickOutside)
              }
              return () => document.removeEventListener("mousedown", handleClickOutside)
            }, [open])
            return (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black focus:outline-none uppercase"
                  onClick={() => setOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={open}
                  type="button"
                >
                  Más ▾
                </button>
                {open && (
                  <div
                    className="absolute left-0 top-full mt-2 min-w-[180px] py-2 px-0 bg-white shadow-2xl rounded-md border border-gray-100 z-[100]"
                    style={{ boxShadow: '0 8px 32px 0 rgba(60,60,60,0.18)' }}
                  >
                    <ul className="flex flex-col">
                      <li><LocalizedClientLink href="/accesorios" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Accesorios</LocalizedClientLink></li>
                      <li><LocalizedClientLink href="/marcas" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Marcas</LocalizedClientLink></li>
                      <li><LocalizedClientLink href="/mascotas" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Mascotas</LocalizedClientLink></li>
                      <li><LocalizedClientLink href="/personal" className="block px-6 py-2 text-brand-black hover:text-brand-gold hover:bg-gray-50 transition-colors">Personal</LocalizedClientLink></li>
                    </ul>
                  </div>
                )}
              </div>
            )
          })()}
          <LocalizedClientLink href="/blog" className="hover:text-brand-gold hover:underline underline-offset-8 transition-colors text-white group-data-[scrolled=true]:text-brand-black">Blog</LocalizedClientLink>
        </nav>

        {/* Acciones e íconos */}
        <div className="flex gap-4 md:gap-6 items-center font-bold tracking-widest text-[10px] md:text-xs text-inherit">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          <SearchModal />
          {/* Solo ícono de carrito, sin texto "BOLSA" */}
          <Suspense fallback={<CartButton />}>
            <CartButton iconOnly />
          </Suspense>
        </div>
      </div>
    </ClientHeaderWrapper>
  )
}

