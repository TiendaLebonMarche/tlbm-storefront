import { Metadata } from "next"
import type { CSSProperties } from "react"

import { collectionTheme, collectionThemeVars } from "@lib/collection-theme"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PageHeader from "@modules/common/components/page-header"

export const metadata: Metadata = {
  title: "Colecciones | Tienda Le Bon Marché",
  description:
    "Explora todas las colecciones de Tienda Le Bon Marché: parlantes y audio, gaming, drones, Starlink, deportes y más.",
}

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function CollectionsPage({ params }: Props) {
  // Next 15: `params` es una promesa; hay que resolverla aunque ya no se use
  // el countryCode (la lista de colecciones no depende de la región).
  await params

  const { collections } = await listCollections({
    fields: "id,title,handle,products.id",
  })

  // Orden: colecciones con más productos primero (las vacías al final)
  const sorted = [...(collections ?? [])].sort((a, b) => {
    const na = a.products?.length ?? 0
    const nb = b.products?.length ?? 0
    return nb - na
  })

  return (
    <div className="content-container py-6 md:py-8 lg:pt-8 lg:pb-12">
      {/* Header — diseño por defecto de subpáginas (PageHeader, patrón /co/store) */}
      <PageHeader
        eyebrow="Catálogo"
        title={
          <>
            Nuestras <em className="italic font-light">colecciones</em>
          </>
        }
        description="Explora nuestro catálogo organizado por categorías: audio, gaming, tecnología, deportes y más. Todos los productos son originales y con envío en Bucaramanga."
      />

      {sorted.length === 0 ? (
        <p className="text-black/50">Aún no hay colecciones publicadas.</p>
      ) : (
        /* 2 columnas ya en móvil: 12 categorías en una sola columna obligaban a
           ~5 pantallas de scroll y dejaban visibles solo 3 (medido 11-sep-2026).
           Con 2 columnas bajan a ~1,3 pantallas y se ven 10. */
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
          {sorted.map((collection, index) => {
            const count = collection.products?.length ?? 0
            const isEmpty = count === 0
            const theme = collectionTheme(collection.handle, count)

            return (
              <LocalizedClientLink
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className={`collection-card group bg-white border border-gray-100 hover:border-gray-200 rounded-xl p-3.5 md:p-[22px] ${
                  isEmpty ? "collection-card--empty" : ""
                }`}
                style={collectionThemeVars(theme) as CSSProperties}
              >
                <div className="flex items-center justify-between mb-2 md:mb-2.5">
                  <span className="collection-card__idx font-playfair italic text-xs md:text-[15px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="collection-card__dia text-[11px] md:text-[13px]"
                  >
                    ◆
                  </span>
                </div>

                {/* min-h de 2 líneas: así los pies de todas las tarjetas quedan
                    alineados entre sí aunque el título ocupe una línea o dos. */}
                <h2 className="collection-card__title font-playfair text-[15.5px] md:text-[21px] font-semibold text-black leading-[1.22] min-h-[2.44em] transition-colors">
                  {collection.title}
                </h2>

                <div className="flex items-center justify-between gap-2.5 mt-2.5 md:mt-3">
                  <span className="collection-card__pill inline-block text-[9.5px] md:text-xs font-bold uppercase tracking-[0.06em] md:tracking-[0.1em] rounded-full px-2.5 py-1 md:px-[13px] md:py-[5px] leading-tight">
                    {isEmpty
                      ? "Próximamente"
                      : `${count} ${count === 1 ? "producto" : "productos"}`}
                  </span>
                  <span className="collection-card__go text-[13px] md:text-sm">
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
