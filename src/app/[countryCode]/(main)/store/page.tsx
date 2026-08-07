import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import Breadcrumbs from "@modules/common/components/breadcrumbs"

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Catálogo de Productos",
  description: "Descubre nuestra selección curada de tecnología premium, gadgets exclusivos, decoración exótica y libros de colección. Boutique virtual en Bucaramanga con envíos a toda Colombia.",
  alternates: {
    canonical: `${BASE_URL}/co/store`,
  },
  openGraph: {
    title: "Catálogo de Productos | Tienda Le Bon Marché",
    description: "Tecnología premium, gadgets, decoración exótica y libros de colección. Envíos a toda Colombia desde Bucaramanga.",
    url: `${BASE_URL}/co/store`,
    siteName: "Tienda Le Bon Marché",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Catálogo de Productos | Tienda Le Bon Marché",
      },
    ],
  },
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    q?: string
    collection?: string
    minPrice?: string
    maxPrice?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, q, collection, minPrice, maxPrice } = searchParams

  // BreadcrumbList (guía oficial Google 07-ago)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/co/store#breadcrumb`,
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/co` },
      { "@type": "ListItem", position: 2, name: "Catálogo", item: `${BASE_URL}/co/store` },
    ],
  }

  return (
    <div className="content-container px-4 py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Breadcrumbs items={[
        { label: "Inicio", href: `/co` },
        { label: "Catálogo" },
      ]} />
      <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      query={q}
      collection={collection}
      minPrice={minPrice}
      maxPrice={maxPrice}
    />
    </div>
  )
}
