import { Metadata } from "next"
import dynamic from "next/dynamic"

import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import BrandMarquee from "@modules/home/components/brand-marquee"
import HotDeals from "@modules/home/components/hot-deals"
import MostSoldSection from "@modules/home/components/most-sold"
import OfertasParallax from "@modules/home/components/ofertas-parallax"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Reveal from "@modules/common/components/reveal"

// Lazy load below-fold components
const AnimatedTestimonialsSection = dynamic(() => import("@modules/home/components/animated-testimonials"))

// ISR: revalidate every hour — Vercel serves cached HTML, rebuilds in background
export const revalidate = 3600

// Dynamic params to avoid full static generation at build time
export const dynamicParams = true

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Le Bon Marché - Tienda virtual en Bucaramanga - Productos Exóticos y 100% Originales",
  description:
    "Le Bon Marché es tu tienda virtual en Bucaramanga con productos exóticos, originales y difíciles de encontrar. Tecnología premium, gadgets exclusivos, parlantes originales, smartwatches y accesorios. Envíos a toda Colombia. 100% original, garantizado.",
  alternates: {
    canonical: `${BASE_URL}/co`,
  },
  openGraph: {
    title: "Le Bon Marché - Tienda virtual en Bucaramanga - Productos Exóticos y 100% Originales",
    description: "Le Bon Marché es tu tienda virtual en Bucaramanga con productos exóticos, originales y difíciles de encontrar. Tecnología premium, gadgets exclusivos, parlantes y smartwatch originales. Envíos VIP a toda Colombia. 100% original, garantizado.",
    url: `${BASE_URL}/co`,
    type: "website",
    locale: "es_CO",
    siteName: "Le Bon Marché",
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
    <div className="relative bg-white dark:bg-[#0A0A0F]">
      {/* ═══ HERO FIJO (se queda estático) ═══ */}
      <div className="fixed inset-0 z-0">
        <Hero />
      </div>

      {/* ═══ SPACER: empuja el contenido debajo del hero ═══ */}
      <div className="h-screen w-full relative z-[1]" />

      {/* ═══ CONTENIDO CON REVEAL (sube tapando el hero) ═══ */}
      <div className="relative z-[2] bg-white dark:bg-[#0A0A0F] shadow-[0_-8px_60px_rgba(0,0,0,0.12)]">
        {/* Curva SVG decorativa superior */}
        <div className="absolute top-[-60px] left-0 w-full h-[60px] leading-none overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>

        {/* TRUST BADGES */}
        <Reveal>
          <TrustBadges />
        </Reveal>

        {/* HOT DEALS — data-driven products from Medusa */}
        <Reveal>
          <HotDeals countryCode={countryCode} />
        </Reveal>

        {/* BRAND MARQUEE */}
        <Reveal>
          <BrandMarquee />
        </Reveal>

        {/* OFERTAS PARALLAX */}
        <Reveal>
          <OfertasParallax />
        </Reveal>

        {/* MOST SOLD — data-driven products from Medusa */}
        <Reveal>
          <MostSoldSection countryCode={countryCode} />
        </Reveal>

        {/* TESTIMONIALS */}
        <Reveal>
          <AnimatedTestimonialsSection />
        </Reveal>
      </div>
    </div>
  )
}
