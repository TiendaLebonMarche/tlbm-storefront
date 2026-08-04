import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listCollections } from "@lib/data/collections"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchModal from "@modules/layout/components/search-modal"
import ThemeToggle from "@modules/layout/components/theme-toggle"
import ClientHeaderWrapper from "@modules/layout/components/client-header"
import CollectionsDropdown from "@modules/layout/components/collections-dropdown"
import { HttpTypes } from "@medusajs/types"

import ClientLogo from "@modules/layout/components/client-logo"

export default async function Nav() {
  const [regions, locales, currentLocale, { collections }] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCollections({ fields: "id,title,handle" }),
  ])

  return (
    <ClientHeaderWrapper
      collections={collections as HttpTypes.StoreCollection[]}
      cartSlot={
        <Suspense fallback={<div className="w-5 h-5" />}>
          <CartButton />
        </Suspense>
      }
    >
      {/* MOBILE (<md): hamburger left · LBM logo+text center · lupa + cart right */}
      <div className="flex md:hidden w-full items-center justify-between">
        <div className="flex-none">
          <SideMenu
            regions={regions}
            locales={locales}
            currentLocale={currentLocale}
            collections={collections as HttpTypes.StoreCollection[]}
          />
        </div>

        <LocalizedClientLink
          href="/"
          className="flex items-center h-11 pointer-events-auto"
        >
          <ClientLogo isMobile />
        </LocalizedClientLink>

        <div className="flex-none flex items-center gap-1">
          <SearchModal />
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
        <nav className="flex-none flex items-center gap-6 lg:gap-8">
          <LocalizedClientLink
            href="/"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Inicio
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Tienda
          </LocalizedClientLink>
          <CollectionsDropdown
            collections={collections as HttpTypes.StoreCollection[]}
            linkClassName="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase inline-flex items-center gap-1.5"
          />
          <LocalizedClientLink
            href="/store"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Ofertas
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/guias"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Guías
          </LocalizedClientLink>
          <a
            href="https://wa.me/573027567783"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-dark text-[12px] font-semibold tracking-[0.18em] uppercase"
          >
            Contacto
          </a>
        </nav>

        {/* Right: Search (lupa), Theme, Cart — sin botón EXPLORAR (regla: solo la lupa) */}
        <div className="flex items-center justify-end gap-3 lg:gap-5 flex-1">
          <SearchModal />
          <ThemeToggle />
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </ClientHeaderWrapper>
  )
}
