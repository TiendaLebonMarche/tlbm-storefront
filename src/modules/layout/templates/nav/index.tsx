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

// Solo los 2 enlaces más buscados aparecen visibles en el header
const FEATURED_LINKS = [
  { href: "/store?category=parlantes", label: "Parlantes" },
  { href: "/store?category=originales", label: "Originales" },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <ClientHeaderWrapper>
    <div className="w-full flex items-center justify-between">
      {/* MOBILE HEADER (sm and down): Transparent Integrated Bar */}
      <div className="flex md:hidden w-full px-4 pt-2">
        <div className="w-full px-5 py-3.5 flex items-center justify-between transition-colors">
          {/* Menu Trigger */}
          <div className="flex-1">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>
          
          {/* Logo */}
          <div className="flex items-center justify-center flex-grow">
            <LocalizedClientLink
              href="/"
              className="text-lg font-sans font-bold tracking-[0.2em] uppercase whitespace-nowrap"
            >
              LE BON MARCHÉ
            </LocalizedClientLink>
          </div>
          
          {/* Cart Icon */}
          <div className="flex-1 flex justify-end">
            <Suspense fallback={<div className="w-5 h-5" />}>
              <CartButton />
            </Suspense>
          </div>
        </div>
      </div>

      {/* DESKTOP HEADER (md and up): Transparent Modular Layout */}
      <div className="hidden md:flex items-center w-full h-full min-h-[3.5rem] gap-3 px-10">
        {/* IZQUIERDA: Menu Pod - No Background */}
        <div className="flex items-center justify-start flex-1">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
        </div>

        {/* CENTRO: Logo Pod - No Background */}
        <div className="flex items-center justify-center flex-0">
          <LocalizedClientLink
            href="/"
            className="pointer-events-auto text-base lg:text-lg font-sans font-bold tracking-[0.2em] hover:opacity-70 transition-all duration-300 uppercase whitespace-nowrap"
          >
            LE BON MARCHÉ
          </LocalizedClientLink>
        </div>

        {/* DERECHA: Icons Pod - No Background */}
        <div className="flex items-center justify-end flex-1 gap-6">
          <SearchModal />
          <Suspense fallback={<div className="w-4 h-4" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </div>
    </ClientHeaderWrapper>
  )
}
