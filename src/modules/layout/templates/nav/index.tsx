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

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <ClientHeaderWrapper>
      <div className="flex-shrink-0 z-50">
        <LocalizedClientLink
          href="/"
          className="text-2xl md:text-3xl font-serif font-semibold tracking-tight transition-colors text-white group-data-[scrolled=true]:text-brand-black hover:opacity-80"
        >
          Tienda Le Bon Marché
        </LocalizedClientLink>
      </div>

      <div className="hidden md:flex items-center gap-10">
        <nav className="flex gap-8 text-xs font-bold tracking-widest uppercase">
          <LocalizedClientLink href="/store" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">
            Catálogo
          </LocalizedClientLink>
          <LocalizedClientLink href="/about" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">
            Nosotros
          </LocalizedClientLink>
        </nav>

        <div className="w-[1px] h-4 transition-colors bg-white/40 group-data-[scrolled=true]:bg-brand-black/20"></div>

        <div className="flex gap-6 items-center font-bold tracking-widest text-xs text-inherit">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          <SearchModal />
          <Suspense fallback={<CartButton />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </ClientHeaderWrapper>
  )
}

