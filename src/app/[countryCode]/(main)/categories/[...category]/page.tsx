import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  try {
    const product_categories = await listCategories()

    if (!product_categories) {
      return []
    }

    const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    const categoryHandles = product_categories.map(
      (category: any) => category.handle
    )

    const staticParams = countryCodes
      ?.map((countryCode: string | undefined) =>
        categoryHandles.map((handle: any) => ({
          countryCode,
          category: [handle],
        }))
      )
      .flat()

    return staticParams
  } catch (error) {
    console.error(
      `Failed to generate static paths for categories: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    // Descripción SEO: prioridad a metadata.description (configurada por categoría),
    // luego al campo description nativo, y como último recurso el fallback genérico.
    const seoDescription = (productCategory as any)?.metadata?.description
      ?? productCategory.description
      ?? `Explora nuestra selección exclusiva de ${productCategory.name} en Tienda Le Bon Marché. Gadgets, tecnología y decoración premium con envíos a toda Colombia.`

    const title = `${productCategory.name} - Comprar Original`
    const description = seoDescription
    
    const BASE_URL = "https://www.tiendalebonmarche.com"
    const canonicalUrl = `${BASE_URL}/${params.countryCode}/categories/${params.category.join("/")}`

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${productCategory.name} | Tienda Le Bon Marché`,
        description,
        url: canonicalUrl,
        siteName: "Tienda Le Bon Marché",
        type: "website",
        images: [
          {
            url: "/opengraph-v2.jpg",
            width: 1200,
            height: 630,
            alt: `${productCategory.name} | Tienda Le Bon Marché`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${productCategory.name} | Le Bon Marché`,
        description,
      }
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  // CollectionPage + ItemList schema — ayuda a Google a indexar la categoría
  // como una colección curada con sus productos (rich results y contexto semántico)
  const BASE_URL = "https://www.tiendalebonmarche.com"
  const categoryUrl = `${BASE_URL}/${params.countryCode}/categories/${params.category.join("/")}`
  const categoryProducts = (productCategory as any).products || []
  const seoDescription = (productCategory as any)?.metadata?.description
    ?? productCategory.description
    ?? `Explora nuestra selección exclusiva de ${productCategory.name} en Tienda Le Bon Marché. Gadgets, tecnología y decoración premium con envíos a toda Colombia.`

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${categoryUrl}#collection`,
    "name": `${productCategory.name} — Tienda Le Bon Marché`,
    "description": seoDescription,
    "url": categoryUrl,
    "isPartOf": {
      "@type": "OnlineStore",
      "name": "Tienda Le Bon Marché",
      "url": BASE_URL,
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": `${productCategory.name} — productos originales`,
      "numberOfItems": categoryProducts.length,
      "itemListElement": categoryProducts
        .filter((p: any) => !!p?.handle)
        .slice(0, 30)
        .map((p: any, i: number) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": p.title || "",
          "url": `${BASE_URL}/${params.countryCode}/productos/${p.handle}`,
        })),
    },
  }

  // BreadcrumbList (guía oficial Google 07-ago): Inicio → Tienda → niveles de categoría
  const slugToName = (slug: string) =>
    slug
      .split("-")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/${params.countryCode}` },
    { "@type": "ListItem", position: 2, name: "Tienda", item: `${BASE_URL}/${params.countryCode}/store` },
    ...params.category.map((slug: string, idx: number) => ({
      "@type": "ListItem",
      position: idx + 3,
      name: idx === params.category.length - 1 ? productCategory.name : slugToName(slug),
      item: `${BASE_URL}/${params.countryCode}/categories/${params.category.slice(0, idx + 1).join("/")}`,
    })),
  ]
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${categoryUrl}#breadcrumb`,
    "itemListElement": breadcrumbItems,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CategoryTemplate
        category={productCategory}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </>
  )
}
