import { Metadata } from "next"

import HeroSection2 from "@modules/home/components/hero-section-2"
import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import HotDeals from "@modules/home/components/hot-deals"
import AnimatedTestimonialsSection from "@modules/home/components/animated-testimonials"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { blogPosts } from "@lib/data/blog"
import { Blog7 } from "@/components/ui/blog7"
import MostSoldSection from "@modules/home/components/most-sold"
import BrandStatement from "@modules/home/components/brand-statement"

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Tienda Le Bon Marché | Productos Originales & Exóticos — Bucaramanga",
  description:
    "Boutique online en Bucaramanga con tecnología premium, gadgets exclusivos, decoración exótica y libros de colección. Envíos VIP a toda Colombia. Descubre lo extraordinario.",
  alternates: {
    canonical: `${BASE_URL}/co`,
  },
  openGraph: {
    title: "Tienda Le Bon Marché | Originales & Exóticos — Bucaramanga",
    description: "Tecnología premium, gadgets, decoración exótica y libros de colección. Boutique virtual en Bucaramanga con envíos a toda Colombia.",
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

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <div className="flex flex-col gap-0">
      <Hero />

      <div className="reveal-up">
        <TrustBadges />
      </div>

      <div className="reveal-up">
        <HotDeals countryCode={countryCode} />
      </div>

      <div className="reveal-up">
        <BrandStatement />
      </div>

      <div className="reveal-up">
        <AnimatedTestimonialsSection />
      </div>

      <div className="reveal-up">
        <MostSoldSection countryCode={countryCode} />
      </div>

      <div className="reveal-up">
        <Blog7
          tagline="Lifestyle & Tendencias"
          heading="Blog Le Bon Marché - El blog de tu tienda en bucaramanga."
          description="Descubre las piezas que definen el lujo moderno y las historias detrás de nuestra selección exclusiva. Inspiración editorial para los más exigentes."
          buttonText="Ver todos los artículos"
          buttonUrl="/blog"
          posts={blogPosts.slice(0, 3).map((post, idx) => ({
            id: `post-${idx}`,
            title: post.title,
            summary: post.img ? "Una selección exclusiva de piezas y tendencias del mundo luxury, traída directamente a tu pantalla." : "",
            label: post.tag,
            author: "Le Bon Marché",
            published: "2024",
            url: `/blog/${post.handle}`,
            image: post.img,
          }))}
        />
      </div>

    </div>
  )
}
