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
      {/* Contenedor principal con posicionamiento relativo para centrar logo con absolute */}
      <div className="relative flex flex-1 items-center w-full h-full min-h-[3rem]">

        {/* IZQUIERDA: Hamburger + 2 enlaces destacados */}
        <div className="flex items-center gap-4 lg:gap-6 flex-1">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />

          {/* 2 categorías destacadas — solo en desktop grande */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {FEATURED_LINKS.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="text-[11px] font-light tracking-[0.2em] uppercase text-black hover:opacity-50 transition-opacity"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        {/* CENTRO: Logo — posición absoluta para centrado perfecto sin depender del espacio lateral */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <LocalizedClientLink
            href="/"
            className="pointer-events-auto text-[11px] xs:text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-serif font-light tracking-[0.12em] text-black hover:opacity-60 transition-opacity uppercase whitespace-nowrap select-none"
          >
            LE BON MARCHÉ
          </LocalizedClientLink>
        </div>

        {/* DERECHA: Search (desktop) + Cart */}
        <div className="flex items-center justify-end gap-4 lg:gap-5 flex-1">
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
