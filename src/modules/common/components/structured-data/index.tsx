import { getBaseURL } from "@lib/util/env"
import { FAQ_ITEMS } from "@lib/faq"

const BASE_URL = "https://www.tiendalebonmarche.com"
const COUNTRY_URL = `${BASE_URL}/co`

export default function StructuredData() {
  const baseUrl = getBaseURL()

  // 1. Organization Schema — completo con sameAs, contactPoint, address
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Store", "OnlineStore"],
    "@id": `${BASE_URL}/#organization`,
    "name": "Tienda Le Bon Marché",
    "alternateName": ["Le Bon Marche", "LeBonMarché", "TLBM"],
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/logo.png`,
      "width": 512,
      "height": 512,
      "caption": "Tienda Le Bon Marché — Boutique Online Colombia"
    },
    "description": "Tienda Le Bon Marché es la tienda virtual en Bucaramanga líder en productos importados, gadgets exóticos, tecnología de lujo, parlantes originales y smartwatch original en Bucaramanga. Como tienda retail premium y tienda gamer y oficina premium en Bucaramanga, ofrecemos productos exclusivos con los mejores precios y descuentos en Bucaramanga.",
    "slogan": "Originales & Exóticos",
    "foundingDate": "2021",
    "foundingLocation": {
      "@type": "Place",
      "name": "Bucaramanga, Santander, Colombia"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bucaramanga",
      "addressRegion": "Santander",
      "addressCountry": "CO",
      "postalCode": "680011"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+573027567783",
        "contactType": "customer service",
        "areaServed": "CO",
        "availableLanguage": ["Spanish"],
        "contactOption": "TollFree"
      },
      {
        "@type": "ContactPoint",
        "email": "info@tiendalebonmarche.com",
        "contactType": "customer support",
        "areaServed": "CO"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Colombia"
    },
    "sameAs": [
      "https://www.instagram.com/tiendalebonmarche",
      "https://www.facebook.com/tiendalebonmarche",
      "https://wa.me/573027567783"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo Le Bon Marché",
      "itemListElement": [
        { "@type": "OfferCatalog", "name": "Tecnología de lujo & Gadgets exóticos" },
        { "@type": "OfferCatalog", "name": "Parlantes originales & Smartwatch original" },
        { "@type": "OfferCatalog", "name": "Tienda gamer y oficina premium" },
        { "@type": "OfferCatalog", "name": "Decoración del Hogar & Libros de Colección" }
      ]
    }
  }

  // 2. WebSite Schema — con SearchAction (potentialAction)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": "Tienda Le Bon Marché",
    "description": "Boutique online con la selección más original en tecnología, gadgets premium, decoración exótica y libros de colección. Envíos VIP a toda Colombia desde Bucaramanga.",
    "inLanguage": "es-CO",
    "publisher": {
      "@id": `${BASE_URL}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${COUNTRY_URL}/store?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@id": `${BASE_URL}/#organization`
    }
  }

  // 3. FAQPage Schema — mismas preguntas del FAQ visible de la home (fuente única @lib/faq)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Preguntas Frecuentes — Tienda Le Bon Marché",
    "url": `${COUNTRY_URL}/#faq`,
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  // 4. LocalBusiness Schema — señal de negocio local Bucaramanga
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["OnlineStore", "LocalBusiness"],
    "@id": `${BASE_URL}/#localbusiness`,
    "name": "Tienda Le Bon Marché",
    "description": "Tienda virtual en Bucaramanga de tecnología de lujo, gadgets exóticos, parlantes originales, smartwatch original y oficina gamer premium con envíos VIP a toda Colombia.",
    "image": `${BASE_URL}/logo.png`,
    "url": BASE_URL,
    "telephone": "+573027567783",
    "email": "info@tiendalebonmarche.com",
    "priceRange": "$$",
    "currenciesAccepted": "COP",
    "paymentAccepted": "Credit Card, Debit Card, PSE, Nequi, Daviplata",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bucaramanga",
      "addressRegion": "Santander",
      "addressCountry": "CO",
      "postalCode": "680011"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "7.1254",
      "longitude": "-73.1198"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "hasMap": "https://maps.google.com/?q=Bucaramanga,+Santander,+Colombia",
    "areaServed": "Colombia",
    "sameAs": [
      "https://www.instagram.com/tiendalebonmarche",
      "https://www.facebook.com/tiendalebonmarche"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
