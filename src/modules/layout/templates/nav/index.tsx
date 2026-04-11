import { Suspense } from "react"
import Image from "next/image"

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
    listRegions()
      .then((regions: StoreRegion[]) => regions)
      .catch((err) => {
        console.warn("Nav: Failed to fetch regions, using empty fallback.")
        return []
      }),
    listLocales(),
    getLocale(),
  ])

  return (
    <ClientHeaderWrapper>
    <div className="w-full flex items-center justify-between min-h-[4rem]">
      {/* MOBILE HEADER (<md): Logo centrado, menu izq, cart der */}
      <div className="flex md:hidden w-full px-5 py-2">
        {/* Menu - left */}
        <div className="flex-none w-10 flex items-center">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
        </div>

        {/* Logo - center */}
        <div className="flex-1 flex items-center justify-center">
          <LocalizedClientLink href="/" className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Tienda Le Bon Marché"
              width={160}
              height={56}
              className="logo-img h-[52px] w-auto object-contain transition-all duration-500"
              priority
            />
          </LocalizedClientLink>
        </div>

        {/* Cart - right */}
        <div className="flex-none w-10 flex items-center justify-end">
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>

      {/* DESKTOP HEADER (≥md): tres zonas equilibradas */}
      <div className="hidden md:flex items-center w-full h-full min-h-[76px] px-8 md:px-10 lg:px-14">
        {/* IZQUIERDA: Menu Group (33% of width) */}
        <div className="flex items-center justify-start flex-1 gap-8">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          <nav className="flex items-center gap-6">
            {FEATURED_LINKS.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-opacity"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        {/* CENTRO: Logo Pod (Centered in remaining space) */}
        <div className="flex items-center justify-center flex-none px-6">
          <LocalizedClientLink
            href="/"
            className="pointer-events-auto flex items-center justify-center hover:opacity-70 transition-all duration-300"
          >
            <Image
              src="/logo.png"
              alt="Tienda Le Bon Marché"
              width={220}
              height={64}
              className="logo-img h-[48px] md:h-[52px] lg:h-[56px] xl:h-[60px] w-auto object-contain transition-all duration-500"
              priority
            />
          </LocalizedClientLink>
        </div>

        {/* DERECHA: Icons Group (33% of width matching Left) */}
        <div className="flex items-center justify-end flex-1 gap-8">
          <SearchModal />
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </div>
    </ClientHeaderWrapper>
  )
}
