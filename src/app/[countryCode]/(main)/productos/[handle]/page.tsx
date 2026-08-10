import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import { truncateTitle } from "@lib/seo"
import ProductTemplate from "@modules/products/templates"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { HttpTypes } from "@medusajs/types"

const BASE_URL = "https://www.tiendalebonmarche.com"

// Marca real = tag `marca:*` de Medusa (40/40 productos lo tienen) — fallback la tienda
function getBrandName(product: HttpTypes.StoreProduct): string {
  const tag = product.tags?.find((t) => t.value?.startsWith("marca:"))
  const raw = tag?.value?.replace(/^marca:/, "").trim()
  if (!raw) return "Le Bon Marché"
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

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

  const rawDescription = product.description
    || `Descubre ${product.title} en Tienda Le Bon Marché — boutique virtual en Bucaramanga. Producto premium seleccionado por su calidad y diseño único. Envíos a toda Colombia.`

  // Meta description SEO de CONVERSIÓN (guía oficial Google 07-ago):
  // producto + marca + precio COP + envío, máx ~158 chars (Google trunca ~155-160).
  // El precio se calcula ANTES de la descripción para poder incluirlo.
  const firstVariant = product.variants?.[0]
  const rawPrice = firstVariant?.calculated_price
  const price = typeof rawPrice === "string"
    ? rawPrice
    : String((rawPrice as { calculated_amount?: number | null } | undefined)?.calculated_amount ?? 0)
  const currencyCode = region.currency_code.toUpperCase()

  const brand = getBrandName(product)
  const priceNumber = Number(price)
  const hasPrice = priceNumber > 0
  const priceFormatted = hasPrice ? `$${priceNumber.toLocaleString("es-CO")} ${currencyCode}` : ""
  const metaBase = priceFormatted
    ? `${product.title} — ${brand}. ${priceFormatted}. Envíos a toda Colombia.`
    : rawDescription
  const description = metaBase.length > 158
    ? `${metaBase.slice(0, 155).trimEnd()}…`
    : metaBase

  const canonicalUrl = `${BASE_URL}/${params.countryCode}/productos/${product.handle}`

  return {
    // Title SEO: ~60 chars finales con el template "%s | Le Bon Marché" del layout
    title: truncateTitle(product.title, 45),
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
    other: {
      "product:price:amount": String(price),
      "product:price:currency": currencyCode,
      "product:availability": product.variants?.some((v) => {
        if (v.manage_inventory === false) return true
        if (v.inventory_quantity === null || v.inventory_quantity === undefined) return true
        return (v.inventory_quantity ?? 0) > 0
      }) ? "in stock" : "out of stock",
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
  // Extraer SOLO el valor numérico para el JSON-LD (Google rechaza objetos)
  const rawPrice = firstVariant?.calculated_price
  const price = typeof rawPrice === "string"
    ? rawPrice
    : String(
        (rawPrice as { calculated_amount?: number | null } | undefined)
          ?.calculated_amount ??
        firstVariant?.original_amount ??
        0
      )
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
    "image": images.length > 0 ? images.map((i) => i.url) : [`${BASE_URL}/opengraph-v2.jpg`],
    "url": productUrl,
    "sku": firstVariant?.sku || pricedProduct.id,
    "mpn": pricedProduct.id,
    "identifier": pricedProduct.id,
    "brand": {
      "@type": "Brand",
      "name": getBrandName(pricedProduct),
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
      // validFrom = inicio de la oferta (requisito Fichas de comerciantes, correo GSC 07-ago):
      // fecha real de publicación del producto (created_at de Medusa) con ISO 8601 + timezone
      "validFrom": (pricedProduct.created_at
        ? new Date(pricedProduct.created_at).toISOString()
        : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()),
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
          { label: "Inicio", href: `/${params.countryCode}` },
          { label: "Tienda", href: `/${params.countryCode}/store` },
          { label: pricedProduct.title },
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
