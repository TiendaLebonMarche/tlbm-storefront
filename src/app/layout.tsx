import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import GoogleAnalytics from "@modules/common/components/google-analytics"
import StructuredData from "@modules/common/components/structured-data"
import { UIProvider } from "@lib/context/ui-context"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: "%s | Tienda Le Bon Marché",
    default: "Tienda Le Bon Marché - Lujo, Exotismo y Lifestyle",
  },
  description: "Descubre una curaduría exclusiva de libros Assouline, relojería de lujo, tecnología y piezas exóticas. Boutique online con envíos a toda Colombia.",
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
        alt: "Tienda Le Bon Marché",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Le Bon Marché",
    description: "Originales & Exóticos - Boutique de Lujo",
    images: ["/twitter-image.jpg"],
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es" data-mode="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <StructuredData />
        <UIProvider>
          <main className="relative">{props.children}</main>
        </UIProvider>
      </body>
    </html>
  )
}
