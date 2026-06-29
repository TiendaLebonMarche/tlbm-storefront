import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { HttpTypes } from "@medusajs/types"

const BASE_URL = "https://www.tiendalebonmarche.com"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images || []
  }

  const variant = product.variants?.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images?.length) {
    return product.images || []
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return (product.images || []).filter((i) => imageIdsMap.has(i.id))
}

async function findProduct(
  countryCode: string,
  handleOrSku: string
): Promise<HttpTypes.StoreProduct | null> {
  const product = await listProducts({
    countryCode,
    queryParams: { handle: handleOrSku },
  }).then(({ response }) => response.products[0]).catch(() => null)

  return product
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await findProduct(params.countryCode, handle)

  if (!product) {
    notFound()
  }

  const description = product.description
    || `Descubre ${product.title} en Tienda Le Bon Marché — boutique virtual en Bucaramanga. Producto premium seleccionado por su calidad y diseño único. Envíos a toda Colombia.`

  const canonicalUrl = `${BASE_URL}/${params.countryCode}/productos/${product.handle}`

  return {
    title: `${product.title} | Le Bon Marché`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} | Tienda Le Bon Marché`,
      description,
      images: product.thumbnail
        ? [{ url: product.thumbnail, width: 800, height: 800, alt: product.title || "" }]
        : [],
      type: "website",
      siteName: "Tienda Le Bon Marché",
      locale: "es_CO",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Le Bon Marché`,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    }
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await findProduct(params.countryCode, params.handle)

  if (!pricedProduct) {
    notFound()
  }

  const images = getImagesForVariant(pricedProduct, selectedVariantId)
  const productUrl = `${BASE_URL}/${params.countryCode}/productos/${pricedProduct.handle}`
  const currencyCode = region.currency_code.toUpperCase()
  const firstVariant = pricedProduct.variants?.[0] as any
  const price = firstVariant?.calculated_price || firstVariant?.original_price || 0
  const isInStock = pricedProduct.variants?.some((v) => {
    // In Medusa v2, inventory_quantity may be null (managed via inventory items)
    if (v.inventory_quantity === null || v.inventory_quantity === undefined) return true
    return (v.inventory_quantity ?? 0) > 0
  })

  // Rich Product Schema — compliant with Google Rich Results requirements
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    "name": pricedProduct.title,
    "description": pricedProduct.description || `${pricedProduct.title} — Disponible en Tienda Le Bon Marché, boutique virtual en Bucaramanga con envíos a toda Colombia.`,
    "image": images.length > 0 ? images.map((i) => i.url) : [`${BASE_URL}/opengraph-image.jpg`],
    "url": productUrl,
    "sku": firstVariant?.sku || pricedProduct.id,
    "mpn": pricedProduct.id,
    "identifier": pricedProduct.id,
    "brand": {
      "@type": "Brand",
      "name": "Le Bon Marché",
      "url": BASE_URL
    },
    "seller": {
      "@type": "OnlineStore",
      "name": "Tienda Le Bon Marché",
      "url": BASE_URL,
      "telephone": "+573027567783"
    },
    "itemCondition": "https://schema.org/NewCondition",
    "category": pricedProduct.collection?.title || "Productos Premium",
    "offers": {
      "@type": "Offer",
      "@id": `${productUrl}#offer`,
      "url": productUrl,
      "priceCurrency": currencyCode,
      "price": price,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": isInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "OnlineStore",
        "name": "Tienda Le Bon Marché"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "COP"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "CO"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 7,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "CO",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 15,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    }
  }

  // BreadcrumbList Schema — navigation context
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": `${BASE_URL}/${params.countryCode}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tienda",
        "item": `${BASE_URL}/${params.countryCode}/store`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pricedProduct.title || "",
        "item": productUrl
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="content-container px-4 py-4">
        <Breadcrumbs items={[
          { label: "Tienda", href: `/co/store` },
          { label: product.title },
        ]} />
      </div>
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images}
      />
    </>
  )
}
