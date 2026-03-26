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

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    template: "%s | Tienda Le Bon Marché",
    default: "Tienda Le Bon Marché | Productos Originales & Exóticos | Tienda Virtual en Bucaramanga",
  },
  description: "Descubre una selección exclusiva de libros Assouline, relojería de lujo, tecnología y piezas exóticas. Boutique online con envíos a toda Colombia.",
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
    <html lang="es" data-mode="light" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <StructuredData />
        <UIProvider>
          <main className="relative">{props.children}</main>
        </UIProvider>
      </body>
    </html>
  )
}
