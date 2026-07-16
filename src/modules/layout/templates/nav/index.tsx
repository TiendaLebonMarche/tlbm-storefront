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
import ThemeToggle from "@modules/layout/components/theme-toggle"
import ClientHeaderWrapper from "@modules/layout/components/client-header"

import ClientLogo from "@modules/layout/components/client-logo"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <ClientHeaderWrapper>
      {/* MOBILE (<md): hamburger left · LBM logo+text center · cart right */}
      <div className="flex md:hidden w-full items-center justify-between">
        <div className="flex-none">
          <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
        </div>

        <LocalizedClientLink
          href="/"
          className="flex items-center h-9 pointer-events-auto"
        >
          <ClientLogo isMobile />
        </LocalizedClientLink>

        <div className="flex-none flex items-center gap-1">
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>

      {/* DESKTOP (≥md): LBM logo+text left · Nav links center · Actions right */}
      <div className="hidden md:flex items-center w-full h-full">
        {/* Left: Logo + Brand text */}
        <div className="flex items-center justify-start flex-1">
          <LocalizedClientLink
            href="/"
            className="flex items-center h-10 pointer-events-auto group"
          >
            <ClientLogo />
          </LocalizedClientLink>
        </div>

        {/* Center: Nav links */}
        <div className="flex-none flex items-center gap-8 lg:gap-10">
          <LocalizedClientLink
            href="/"
            className="nav-link text-[11px] font-semibold tracking-[0.18em] uppercase"
          >
            Inicio
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="nav-link text-[11px] font-semibold tracking-[0.18em] uppercase"
          >
            Tienda
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/collections"
            className="nav-link text-[11px] font-semibold tracking-[0.18em] uppercase"
          >
            Colecciones
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="nav-link text-[11px] font-semibold tracking-[0.18em] uppercase"
          >
            Ofertas
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/blog"
            className="nav-link text-[11px] font-semibold tracking-[0.18em] uppercase"
          >
            Blog
          </LocalizedClientLink>
        </div>

        {/* Right: Search, Explore, Cart */}
        <div className="flex items-center justify-end gap-3 lg:gap-5 flex-1">
          <SearchModal />
          <LocalizedClientLink
            href="/store"
            className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2 text-[10px] font-bold tracking-[0.18em] uppercase text-white rounded-full bg-[#0A0A0F] hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-black/20 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Explorar
          </LocalizedClientLink>
          <ThemeToggle />
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </ClientHeaderWrapper>
  )
}
