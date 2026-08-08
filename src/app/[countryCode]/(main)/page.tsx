import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import BrandMarquee from "@modules/home/components/brand-marquee"
import HotDeals from "@modules/home/components/hot-deals"
import MostSoldSection from "@modules/home/components/most-sold"
import FaqSection from "@modules/home/components/faq-section"
import OfertasParallax from "@modules/home/components/ofertas-parallax"
import CategoriesCarousel from "@modules/home/components/categories-carousel"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Reveal from "@modules/common/components/reveal"

// Lazy load below-fold components
const AnimatedTestimonialsSection = dynamic(() => import("@modules/home/components/animated-testimonials"))
import dynamic from "next/dynamic"

// ISR: revalidate every hour — Vercel serves cached HTML, rebuilds in background
export const revalidate = 3600

// Dynamic params to avoid full static generation at build time
export const dynamicParams = true

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Tienda Virtual en Bucaramanga",
  description:
    "Tienda virtual en Bucaramanga con productos exóticos y 100% originales: tecnología premium, gadgets, parlantes, smartwatches y más. Envíos a toda Colombia.",
  alternates: {
    canonical: `${BASE_URL}/co`,
  },
  openGraph: {
    title: "Tienda Virtual en Bucaramanga | Le Bon Marché",
    description: "Tienda virtual en Bucaramanga con productos exóticos y 100% originales: tecnología premium, gadgets, parlantes, smartwatches y más. Envíos a toda Colombia.",
    url: `${BASE_URL}/co`,
    type: "website",
    locale: "es_CO",
    siteName: "Le Bon Marché",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tienda Virtual en Bucaramanga | Le Bon Marché",
      },
    ],
  },
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <Hero />

      {/* ═══ CONTENIDO ═══ */}
      <div className="bg-white dark:bg-[#0A0A0F]">
        {/* TRUST BADGES */}
        <Reveal>
          <TrustBadges />
        </Reveal>

        {/* BRAND MARQUEE — justo antes de "Nuestros mejores productos" (regla Julián) */}
        <BrandMarquee />

        {/* HOT DEALS — data-driven products from Medusa */}
        <Reveal>
          <HotDeals countryCode={countryCode} />
        </Reveal>

        {/* OFERTAS PARALLAX */}
        <Reveal>
          <OfertasParallax />
        </Reveal>

        {/* CATEGORÍAS — carousel (exactamente antes de Lo que dicen nuestros clientes, regla Julián 07-ago) */}
        <Reveal>
          <CategoriesCarousel />
        </Reveal>

        {/* TESTIMONIALS — lo que dicen nuestros clientes (después de Categorías, regla Julián 07-ago) */}
        <Reveal>
          <AnimatedTestimonialsSection />
        </Reveal>

        {/* MOST SOLD — data-driven products from Medusa */}
        <Reveal>
          <MostSoldSection countryCode={countryCode} />
        </Reveal>

        {/* FAQ + PROOF — preguntas visibles + cifras reales (framework AI SEO puntos 8 y 11) */}
        <FaqSection />
      </div>
    </main>
  )
}
