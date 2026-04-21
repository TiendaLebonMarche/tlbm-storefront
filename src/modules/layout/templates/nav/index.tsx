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
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <ClientHeaderWrapper>
      <div className="w-full flex items-center justify-between min-h-full">
        {/* MOBILE HEADER (<md): Logo centrado, menu izq, cart der */}
        <div className="flex md:hidden w-full px-5 h-full items-center">
          {/* Menu - left */}
          <div className="flex-none w-16 flex items-center justify-start">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>

          {/* Logo - center */}
          <div className="flex-1 flex items-center justify-center">
            <LocalizedClientLink href="/" className="group flex items-center justify-center pointer-events-auto">
              <Image
                src="/logo.png"
                alt="Tienda Le Bon Marché"
                width={160}
                height={56}
                className="logo-img h-[48px] w-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-95 group-hover:opacity-80"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Cart - right */}
          <div className="flex-none w-16 flex items-center justify-end gap-4">
            <Suspense fallback={<div className="w-5 h-5" />}>
              <CartButton />
            </Suspense>
          </div>
        </div>

        {/* DESKTOP HEADER (≥md): tres zonas equilibradas */}
        <div className="hidden md:flex items-center w-full h-full px-8 md:px-10 lg:px-14">
          {/* IZQUIERDA: Menu Group (33% of width) */}
          <div className="flex items-center justify-start flex-1 gap-10">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            <nav className="flex items-center gap-8">
              {FEATURED_LINKS.map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="group relative overflow-hidden py-1"
                >
                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#322214] transition-colors duration-500 group-hover:text-black">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/40 origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:origin-left group-hover:scale-x-100" />
                </LocalizedClientLink>
              ))}
            </nav>
          </div>

          {/* CENTRO: Logo Pod (Centered in remaining space) */}
          <div className="flex items-center justify-center flex-none px-6">
            <LocalizedClientLink
              href="/"
              className="group pointer-events-auto flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="Tienda Le Bon Marché"
                width={220}
                height={64}
                className="logo-img h-[48px] md:h-[52px] lg:h-[56px] xl:h-[60px] w-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[0.97] group-hover:opacity-70"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* DERECHA: Icons Group (33% of width matching Left) */}
          <div className="flex items-center justify-end flex-1 gap-8">
            <div className="group relative overflow-hidden py-1 flex items-center cursor-pointer transition-opacity duration-300 hover:opacity-70">
              <SearchModal />
            </div>
            <div className="group relative overflow-hidden py-1 flex items-center cursor-pointer transition-opacity duration-300 hover:opacity-70">
              <Suspense fallback={<div className="w-5 h-5" />}>
                <CartButton />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </ClientHeaderWrapper>
  )
}
