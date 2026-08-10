import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listCollections } from "@lib/data/collections"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import HeaderSearchControls from "@modules/layout/components/header-search-controls"
import ClientHeaderWrapper from "@modules/layout/components/client-header"
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
    <ClientHeaderWrapper>
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
          <HeaderSearchControls />
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>

      {/* DESKTOP (≥md): hamburger left · logo CENTRADO (absoluto) · acciones right
          Mismo patrón que el index: el menú vive en el drawer (SideMenu) en TODAS
          las páginas. Regla Julián 10-ago: logo al centro, sin nav visible. */}
      <div className="hidden md:flex relative items-center w-full h-full">
        {/* Left: hamburger → SideMenu (mismo drawer en todas las páginas) */}
        <div className="flex items-center justify-start flex-1">
          <SideMenu
            regions={regions}
            locales={locales}
            currentLocale={currentLocale}
            collections={collections as HttpTypes.StoreCollection[]}
          />
        </div>

        {/* Center: logo absolutamente centrado */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <LocalizedClientLink
            href="/"
            className="flex items-center h-10 md:h-12 pointer-events-auto group"
          >
            <ClientLogo />
          </LocalizedClientLink>
        </div>

        {/* Right: Search (lupa), Theme, Cart */}
        <div className="flex items-center justify-end gap-3 lg:gap-5 flex-1">
          <HeaderSearchControls />
          <Suspense fallback={<div className="w-5 h-5" />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </ClientHeaderWrapper>
  )
}
