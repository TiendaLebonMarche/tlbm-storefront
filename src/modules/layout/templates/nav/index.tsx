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
            <LocalizedClientLink href="/" className="pointer-events-auto flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1776805039/upscalemedia-transformed_5_tkeab1.png"
                alt="Tienda Le Bon Marché"
                width={1822}
                height={548}
                className="w-[180px] h-auto object-contain"
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
          </div>

          {/* CENTRO: Logo Pod (Centered in remaining space) */}
          <div className="flex items-center justify-center flex-none px-6">
            <LocalizedClientLink
              href="/"
              className="pointer-events-auto flex items-center justify-center"
            >
              <Image
                src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1776805039/upscalemedia-transformed_5_tkeab1.png"
                alt="Tienda Le Bon Marché"
                width={1822}
                height={548}
                className="w-[200px] md:w-[240px] lg:w-[280px] xl:w-[320px] h-auto object-contain"
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
