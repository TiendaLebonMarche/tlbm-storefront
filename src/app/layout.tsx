import { Inter, Playfair_Display } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import GoogleAnalytics from "@modules/common/components/google-analytics"
import StructuredData from "@modules/common/components/structured-data"
import { UIProvider } from "@lib/context/ui-context"
import WhatsAppFloat from "@modules/layout/components/whatsapp-float"
import LayoutClient from "@modules/layout/components/layout-client"
import PagePaddingWrapper from "@modules/layout/components/page-padding-wrapper"

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
    default: "Le Bon Marché - Tienda virtual en Bucaramanga - Productos Exóticos y 100% Originales",
    template: "%s | Le Bon Marché",
  },
  description: "Le Bon Marché es tu tienda virtual en Bucaramanga con productos exóticos, originales y difíciles de encontrar. Tecnología premium, gadgets exclusivos, parlantes originales, smartwatches y accesorios. Envíos a toda Colombia. 100% original, garantizado.",
  keywords: [
    "tienda virtual en Bucaramanga",
    "Tienda Le Bon Marché productos",
    "Tienda Le Bon Marché Bucaramanga",
    "gadgets exóticos Bucaramanga",
    "tecnología de lujo Bucaramanga",
    "parlantes originales Bucaramanga",
    "tienda gamer y oficina premium Bucaramanga",
    "smartwatch original en Bucaramanga",
    "tienda retail Bucaramanga",
    "productos importados Bucaramanga",
    "descuentos Bucaramanga",
    "productos exclusivos",
    "mejores precios",
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
        alt: "Le Bon Marché — Tienda virtual en Bucaramanga — Productos Exóticos y 100% Originales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Bon Marché - Tienda virtual en Bucaramanga - Productos Exóticos y 100% Originales",
    description: "Le Bon Marché es tu tienda virtual en Bucaramanga con productos exóticos, originales y difíciles de encontrar. Tecnología premium, gadgets exclusivos, parlantes y smartwatch originales. Envíos VIP a toda Colombia. 100% original, garantizado.",
    images: ["/twitter-image.jpg"],
    creator: "@tiendalebonmarche",
    site: "@tiendalebonmarche",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  category: "shopping",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="light" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <meta property="og:image" content="https://www.tiendalebonmarche.com/opengraph-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Tienda Le Bon Marché — Boutique Online Colombia" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P7ZD7RQP');`,
          }}
        />

        {/* Preconnect to optimize asset connection speed (Core Web Vitals) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload hero image for faster LCP — alineado con el slide 1 real (foto 1468495244123) */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1920&q=75"
          fetchPriority="high"
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7ZD7RQP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <StructuredData />
        <UIProvider>
          <LayoutClient />
          <PagePaddingWrapper>{props.children}</PagePaddingWrapper>
          <WhatsAppFloat />
        </UIProvider>
      </body>
    </html>
  )
}
