import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Colecciones | Tienda Le Bon Marché",
  description:
    "Explora todas las colecciones de Tienda Le Bon Marché: parlantes y audio, gaming, drones, Starlink, deportes y más.",
}

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function CollectionsPage({ params }: Props) {
  const { countryCode } = await params

  const [{ collections }, regions] = await Promise.all([
    listCollections({ fields: "id,title,handle,products.id" }),
    listRegions(),
  ])

  const region = regions?.find(
    (r: StoreRegion) =>
      r.countries?.some((c) => c.iso_2 === countryCode)
  )

  // Orden: colecciones con más productos primero (las vacías al final)
  const sorted = [...(collections ?? [])].sort((a, b) => {
    const na = a.products?.length ?? 0
    const nb = b.products?.length ?? 0
    return nb - na
  })

  const formatNumber = (n: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: region?.currency_code ?? "COP",
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <div className="content-container py-6 md:py-8 lg:pt-8 lg:pb-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-playfair font-semibold text-black">
          Colecciones
        </h1>
        <p className="mt-2 text-sm text-black/50 max-w-xl">
          Explora nuestro catálogo organizado por categorías: audio, gaming,
          tecnología, deportes y más. Todos los productos son originales y
          con envío en Bucaramanga.
        </p>
      </div>

      {sorted.length === 0 ? (
        <p className="text-black/50">Aún no hay colecciones publicadas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sorted.map((collection) => {
            const count = collection.products?.length ?? 0
            return (
              <LocalizedClientLink
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group bg-white border border-gray-100 hover:border-[#D4AF37]/40 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(10,10,15,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-playfair text-lg md:text-xl font-semibold text-black group-hover:text-[#B8962E] transition-colors">
                      {collection.title}
                    </h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-black/40">
                      {count} {count === 1 ? "producto" : "productos"}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-[#D4AF37]/70 text-xs mt-1"
                  >
                    ◆
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-black/50 group-hover:text-[#B8962E] transition-colors">
                    Ver colección
                  </span>
                  <span className="text-[#D4AF37] text-sm transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>
      )}
    </div>
  )
}
