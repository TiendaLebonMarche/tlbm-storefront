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
    <div className="relative flex items-center w-full h-full min-h-[3rem] md:min-h-[4rem]">
        
        {/* IZQUIERDA: Menu Trigger */}
        <div className="flex items-center flex-1">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
        </div>

        {/* CENTRO: Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <LocalizedClientLink
            href="/"
            className="pointer-events-auto text-lg md:text-2xl font-sans font-bold tracking-[0.2em] text-brand-brown hover:opacity-70 transition-all duration-300 uppercase"
          >
            LE BON MARCHÉ
          </LocalizedClientLink>
        </div>

        {/* DERECHA: Search + Cart */}
        <div className="flex items-center justify-end gap-3 md:gap-6 flex-1">
          <SearchModal />
          <Suspense fallback={<CartButton />}>
            <CartButton />
          </Suspense>
        </div>

      </div>
    </ClientHeaderWrapper>
  )
}
