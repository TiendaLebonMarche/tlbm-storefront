import { getBaseURL } from "@lib/util/env"

const BASE_URL = "https://www.tiendalebonmarche.com"
const COUNTRY_URL = `${BASE_URL}/co`

export default function StructuredData() {
  const baseUrl = getBaseURL()

  // 1. Organization Schema — completo con sameAs, contactPoint, address
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
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
    "description": "Tienda Le Bon Marché es la boutique virtual de referencia en Bucaramanga, Colombia. Vendemos tecnología premium, gadgets exclusivos, decoración exótica, libros de colección y lifestyle de alta gama con envíos a toda Colombia.",
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
        "email": "hola@tiendalebonmarche.com",
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
        { "@type": "OfferCatalog", "name": "Tecnología & Gadgets" },
        { "@type": "OfferCatalog", "name": "Decoración del Hogar" },
        { "@type": "OfferCatalog", "name": "Libros & Colección" },
        { "@type": "OfferCatalog", "name": "Lifestyle & Wellness" }
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

  // 3. FAQPage Schema — Preguntas frecuentes para rich results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Preguntas Frecuentes — Tienda Le Bon Marché",
    "url": `${COUNTRY_URL}/#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Hacen envíos a todo Colombia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Realizamos envíos a todos los municipios de Colombia. Los tiempos de entrega varían entre 2 y 7 días hábiles dependiendo del destino. Trabajamos con las principales transportadoras del país."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son los métodos de pago aceptados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aceptamos tarjetas de crédito y débito (Visa, Mastercard), PSE, Nequi, Daviplata y transferencia bancaria. Todas las transacciones están protegidas con cifrado SSL."
        }
      },
      {
        "@type": "Question",
        "name": "¿Los productos tienen garantía?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Todos nuestros productos cumplen con la garantía establecida por la normativa colombiana (Ley 1480 del Estatuto del Consumidor). El período varía según el tipo de producto."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tienen tienda física en Bucaramanga?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Somos una tienda 100% virtual con sede en Bucaramanga, Santander. No contamos con punto de venta físico pero puedes contactarnos por WhatsApp al +57 302 756 7783."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo hacer devoluciones?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, dentro de los primeros 15 días desde la recepción del producto, en condiciones originales. Contáctanos a hola@tiendalebonmarche.com para gestionar tu devolución."
        }
      }
    ]
  }

  // 4. LocalBusiness Schema — señal de negocio local Bucaramanga
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["OnlineStore", "LocalBusiness"],
    "@id": `${BASE_URL}/#localbusiness`,
    "name": "Tienda Le Bon Marché",
    "image": `${BASE_URL}/logo.png`,
    "url": BASE_URL,
    "telephone": "+573027567783",
    "email": "hola@tiendalebonmarche.com",
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
