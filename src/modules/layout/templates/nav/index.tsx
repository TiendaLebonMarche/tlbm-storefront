import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchModal from "@modules/layout/components/search-modal"
import ClientHeaderWrapper from "@modules/layout/components/client-header"
import NavMenuMore from "@modules/layout/components/nav-menu-more"
import { NAV_LINKS } from "@lib/constants"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  // Split links for left and right nav
  const leftLinks = NAV_LINKS.filter(link => link.href !== "/blog")
  const rightLinks = NAV_LINKS.filter(link => link.href === "/blog")

  return (
    <ClientHeaderWrapper>
      <div className="flex flex-1 items-center w-full gap-6 md:gap-8">
        {/* Sección Izquierda - Menú y búsqueda */}
        <div className="flex items-center gap-4 md:gap-0 md:flex-1">
          {/* Menú izquierdo (desktop) - con mejor spacing */}
          <nav className="hidden md:flex flex-1 justify-end gap-6 lg:gap-8 text-xs lg:text-sm font-bold tracking-widest uppercase md:pr-8">
            {leftLinks.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="relative group text-white group-data-[scrolled=true]:text-brand-black hover:text-brand-gold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </nav>

          {/* Search y SideMenu (mobile) */}
          <div className="flex md:hidden gap-3 items-center">
            <SearchModal />
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>
        </div>

        {/* Sección Centro - Logo Centrado */}
        <div className="flex-shrink-0 z-40 md:flex-1 flex justify-center px-2">
          <LocalizedClientLink
            href="/"
            className="text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight transition-all duration-300 text-white group-data-[scrolled=true]:text-brand-black hover:scale-105 hover:text-brand-gold select-none"
            style={{ letterSpacing: '0.08em' }}
          >
            LE BON MARCHÉ
          </LocalizedClientLink>
        </div>

        {/* Sección Derecha - Menú y Acciones */}
        <div className="flex items-center gap-6 md:gap-0 md:flex-1">
          {/* Menú derecho (desktop) - con mejor spacing */}
          <nav className="hidden md:flex flex-1 justify-start gap-6 lg:gap-8 text-xs lg:text-sm font-bold tracking-widest uppercase md:pl-8">
            <NavMenuMore />
            {rightLinks.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="relative group text-white group-data-[scrolled=true]:text-brand-black hover:text-brand-gold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </nav>

          {/* Acciones e íconos (desktop) */}
          <div className="hidden md:flex gap-6 items-center font-bold tracking-widest text-xs text-inherit">
            <SearchModal />
            <Suspense fallback={<CartButton />}>
              <CartButton />
            </Suspense>
          </div>

          {/* Carrito (mobile) */}
          <div className="md:hidden">
            <Suspense fallback={<CartButton />}>
              <CartButton />
            </Suspense>
          </div>
        </div>
      </div>
    </ClientHeaderWrapper>
  )
}

