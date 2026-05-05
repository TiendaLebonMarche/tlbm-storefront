import { Inter, Playfair_Display } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import GoogleAnalytics from "@modules/common/components/google-analytics"
import StructuredData from "@modules/common/components/structured-data"
import { UIProvider } from "@lib/context/ui-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
})

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: "%s | Tienda Le Bon Marché",
    default: "Tienda Le Bon Marché | Productos Originales & Exóticos | Boutique Virtual Bucaramanga",
  },
  description: "Tienda Le Bon Marché — Boutique online con la selección más original en tecnología premium, gadgets exclusivos, decoración exótica y libros de colección. Envíos VIP a toda Colombia desde Bucaramanga.",
  keywords: [
    "tienda virtual Bucaramanga",
    "gadgets exclusivos Colombia",
    "productos originales para el hogar",
    "libros de lujo y colección",
    "regalos creativos premium",
    "tecnología de alta gama Santander",
    "decoración exótica Colombia",
    "compras online seguras Colombia",
    "Le Bon Marche Bucaramanga",
    "boutique online Colombia"
  ],
  authors: [{ name: "Tienda Le Bon Marché", url: BASE_URL }],
  creator: "Tienda Le Bon Marché",
  publisher: "Tienda Le Bon Marché",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/co`,
    languages: {
      "es-CO": `${BASE_URL}/co`,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: getBaseURL(),
    siteName: "Tienda Le Bon Marché",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tienda Le Bon Marché — Boutique Online Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Le Bon Marché | Boutique Online Colombia",
    description: "Originales & Exóticos — Tecnología premium, gadgets y decoración exclusiva. Envíos a toda Colombia.",
    images: ["/twitter-image.jpg"],
    creator: "@tiendalebonmarche",
    site: "@tiendalebonmarche",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  category: "shopping",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

import PagePaddingWrapper from "@modules/layout/components/page-padding-wrapper"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="light" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* RSS Feed for AI and content discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Blog Tienda Le Bon Marché"
          href={`${BASE_URL}/rss.xml`}
        />
        {/* AI Discovery endpoints */}
        <link
          rel="alternate"
          type="application/json"
          title="AI Summary — Le Bon Marché"
          href={`${BASE_URL}/ai/summary.json`}
        />
        {/* LLMs.txt reference */}
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs Context — Le Bon Marché"
          href={`${BASE_URL}/llms.txt`}
        />
        {/* Geo / locale signals */}
        <meta name="geo.region" content="CO-SAN" />
        <meta name="geo.placename" content="Bucaramanga, Santander, Colombia" />
        <meta name="geo.position" content="7.1254;-73.1198" />
        <meta name="ICBM" content="7.1254, -73.1198" />
        {/* Business signals */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Spanish" />
        <meta name="coverage" content="Colombia" />
        <meta name="distribution" content="global" />
      </head>
      <body className="antialiased">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <StructuredData />
        <UIProvider>
          <PagePaddingWrapper>{props.children}</PagePaddingWrapper>
        </UIProvider>
      </body>
    </html>
  )
}
