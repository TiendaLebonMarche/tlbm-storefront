import { Inter, Playfair_Display } from "next/font/google"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { SEASON } from "@lib/season"
import SeasonalDecor from "@modules/common/components/seasonal-decor"
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
    default: "Tienda Virtual en Bucaramanga | Le Bon Marché",
    template: "%s | Le Bon Marché",
  },
  description: "Tienda virtual en Bucaramanga con productos exóticos y 100% originales: tecnología premium, gadgets, parlantes, smartwatches y más. Envíos a toda Colombia.",
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
        // opengraph-v2.jpg = URL NUEVA (cache-buster natural): WhatsApp/Facebook/
        // Telegram cachean la preview POR URL. Al cambiar la imagen, renombrar el
        // archivo (v3, v4...) para forzar refetch inmediato en todos los clientes.
        // (Next.js metadata strip-aba el query string incluso en URL absoluta.)
        url: "/opengraph-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Tienda Virtual en Bucaramanga | Le Bon Marché",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Virtual en Bucaramanga | Le Bon Marché",
    description: "Tienda virtual en Bucaramanga con productos exóticos y 100% originales: tecnología premium, gadgets, parlantes, smartwatches y más. Envíos a toda Colombia.",
    images: ["/twitter-v2.jpg"],
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
    <html lang="es" data-mode="light" data-theme={SEASON} className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        {/* Anti-flash de tema: aplica dark ANTES del paint si el usuario lo eligió */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tlbm_theme");if(t==="dark"){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-mode","dark");}}catch(e){}})();`,
          }}
        />
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

        {/* Preload hero image for faster LCP — alineado con el slide 1 real (Cloudinary f_auto) */}
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1785842108/hero/hero-1.jpg"
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
        {/* Escenografía por temporada — capa decorativa (vacía en default) */}
        <SeasonalDecor />
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
