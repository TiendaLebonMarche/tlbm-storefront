import { Metadata } from "next"
import dynamic from "next/dynamic"

import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import CategoriesGrid from "@modules/home/components/categories-grid"
import BrandMarquee from "@modules/home/components/brand-marquee"
import HotDeals from "@modules/home/components/hot-deals"
import MostSoldSection from "@modules/home/components/most-sold"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { blogPosts } from "@lib/data/blog"
import Reveal from "@modules/common/components/reveal"

// Lazy load below-fold components
const BrandStatement = dynamic(() => import("@modules/home/components/brand-statement"))
const AnimatedTestimonialsSection = dynamic(() => import("@modules/home/components/animated-testimonials"))
const Blog7 = dynamic(() => import("@/components/ui/blog7").then(m => ({ default: m.Blog7 })))

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Tienda Le Bon Marché Bucaramanga | Productos Originales & Exóticos",
  description:
    "Tienda Le Bon Marché en Bucaramanga: tecnología de lujo, gadgets exóticos, parlantes originales, smartwatch original y oficina premium. ¡Los mejores precios y descuentos en Bucaramanga con envíos VIP a toda Colombia!",
  alternates: {
    canonical: `${BASE_URL}/co`,
  },
  openGraph: {
    title: "Tienda Le Bon Marché Bucaramanga | Productos Originales & Exóticos",
    description: "Tecnología de lujo, gadgets exóticos, parlantes y smartwatch original en Bucaramanga. Tu tienda virtual premium con los mejores precios.",
    url: `${BASE_URL}/co`,
    type: "website",
    locale: "es_CO",
    siteName: "Tienda Le Bon Marché",
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
    <div className="flex flex-col gap-0">
      {/* HERO */}
      <Hero />

      {/* TRUST BADGES */}
      <Reveal>
        <TrustBadges />
      </Reveal>

      {/* HOT DEALS — data-driven products from Medusa */}
      <Reveal>
        <HotDeals countryCode={countryCode} />
      </Reveal>

      {/* CATEGORIES */}
      <Reveal>
        <CategoriesGrid />
      </Reveal>

      {/* BRAND MARQUEE */}
      <Reveal>
        <BrandMarquee />
      </Reveal>

      {/* PROMO */}
      <Reveal>
        <BrandStatement />
      </Reveal>

      {/* MOST SOLD — data-driven products from Medusa */}
      <Reveal>
        <MostSoldSection countryCode={countryCode} />
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal>
        <AnimatedTestimonialsSection />
      </Reveal>

      {/* BLOG */}
      <Reveal>
        <Blog7
          tagline="Lifestyle & Tendencias"
          heading="Blog Le Bon Marché - El blog de tu tienda en bucaramanga."
          description="Descubre las piezas que definen el lujo moderno y las historias detrás de nuestra selección exclusiva. Inspiración editorial para los más exigentes."
          buttonText="Ver todos los artículos"
          buttonUrl="/blog"
          posts={blogPosts.slice(0, 3).map((post, idx) => ({
            id: `post-${idx}`,
            title: post.title,
            summary: post.img
              ? "Una selección exclusiva de piezas y tendencias del mundo luxury, traída directamente a tu pantalla."
              : "",
            label: post.tag,
            author: "Le Bon Marché",
            published: "2024",
            url: `/blog/${post.handle}`,
            image: post.img,
          }))}
        />
      </Reveal>
    </div>
  )
}
