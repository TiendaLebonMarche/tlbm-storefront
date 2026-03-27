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
      <div className="flex flex-1 items-center w-full justify-between">
        
        {/* Sección Izquierda - Hamburger y Enlaces */}
        <div className="flex items-center gap-6 md:flex-1">
          {/* Hamburger (Mobile & Desktop) */}
          <div className="flex items-center">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>
          
          {/* Enlaces Desktop */}
          <nav className="hidden md:flex gap-6 lg:gap-8 text-xs font-light tracking-widest uppercase">
            {NAV_LINKS.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="relative group text-black hover:opacity-50 transition-colors duration-200 uppercase"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        {/* Sección Centro - Logo */}
        <div className="flex-shrink-0 z-40 md:flex-[0.5] flex justify-center">
          <LocalizedClientLink
            href="/"
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-[0.1em] text-black hover:opacity-70 transition-opacity uppercase"
          >
            LE BON MARCHÉ
          </LocalizedClientLink>
        </div>

        {/* Sección Derecha - Iconos (Search, Bag) */}
        <div className="flex items-center justify-end gap-5 md:gap-6 md:flex-1">
          <div className="hidden md:flex items-center">
            <SearchModal />
          </div>
          <div className="flex items-center">
            <Suspense fallback={<CartButton />}>
              <CartButton />
            </Suspense>
          </div>
        </div>

      </div>
    </ClientHeaderWrapper>
  )
}

