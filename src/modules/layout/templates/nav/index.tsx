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
      <div className="flex flex-1 items-center justify-between gap-4 md:gap-0">
        {/* Menú izquierdo (desktop) */}
        <nav className="hidden md:flex flex-1 justify-end gap-6 text-xs font-bold tracking-widest uppercase">
          <LocalizedClientLink href="/ofertas" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Ofertas</LocalizedClientLink>
          <LocalizedClientLink href="/tecnologia" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Tecnología</LocalizedClientLink>
          <LocalizedClientLink href="/sonido" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Sonido</LocalizedClientLink>
          <LocalizedClientLink href="/hogar" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Hogar</LocalizedClientLink>
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
        <nav className="hidden md:flex flex-1 justify-start gap-6 text-xs font-bold tracking-widest uppercase">
          <LocalizedClientLink href="/accesorios" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Accesorios</LocalizedClientLink>
          <LocalizedClientLink href="/marcas" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Marcas</LocalizedClientLink>
          <LocalizedClientLink href="/mascotas" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Mascotas</LocalizedClientLink>
          <LocalizedClientLink href="/personal" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Personal</LocalizedClientLink>
          <LocalizedClientLink href="/blog" className="hover:text-brand-gold transition-colors text-white group-data-[scrolled=true]:text-brand-black">Blog</LocalizedClientLink>
        </nav>

        {/* Acciones e íconos */}
        <div className="flex gap-4 md:gap-6 items-center font-bold tracking-widest text-[10px] md:text-xs text-inherit">
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

