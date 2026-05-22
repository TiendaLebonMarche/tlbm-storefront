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

const LOGO_URL = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1779482684/logo-TLBM-nlanco_njck5j.png"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <ClientHeaderWrapper>
      <div className="w-full flex items-center justify-between min-h-full">

        {/* MOBILE (<md): hamburger left · logo center · cart right */}
        <div className="flex md:hidden w-full px-5 h-full items-center">
          <div className="flex-none w-12 flex items-center justify-start">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <LocalizedClientLink href="/" className="pointer-events-auto">
              <Image
                src={LOGO_URL}
                alt="Tienda Le Bon Marché"
                width={1822}
                height={548}
                className="w-[140px] h-auto object-contain"
                priority
              />
            </LocalizedClientLink>
          </div>

          <div className="flex-none w-12 flex items-center justify-end">
            <Suspense fallback={<div className="w-5 h-5" />}>
              <CartButton />
            </Suspense>
          </div>
        </div>

        {/* DESKTOP (≥md): menu left · logo center · icons right */}
        <div className="hidden md:flex items-center w-full h-full px-10 lg:px-14">
          {/* Left */}
          <div className="flex items-center justify-start flex-1">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>

          {/* Center */}
          <div className="flex items-center justify-center flex-none px-8">
            <LocalizedClientLink href="/" className="pointer-events-auto">
              <Image
                src={LOGO_URL}
                alt="Tienda Le Bon Marché"
                width={1822}
                height={548}
                className="w-[160px] md:w-[190px] lg:w-[220px] h-auto object-contain"
                priority
              />
            </LocalizedClientLink>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end flex-1 gap-7">
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
