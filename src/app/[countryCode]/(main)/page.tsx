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

export const metadata: Metadata = {
  title: "Tienda Le Bon Marché | Originales & Exóticos",
  description:
    "Tienda online de productos luxury, tecnología, decoración y lifestyle en Bucaramanga, Colombia. Envíos a todo el país.",
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
    <>
      <Hero />

      <div className="reveal-up">
        <TrustBadges />
      </div>

      <div className="reveal-up delay-100">
        <HotDeals countryCode={countryCode} />
      </div>

      <div className="reveal-up delay-200">
        <BrandStatement />
      </div>

      <div className="reveal-up delay-300">
        <AnimatedTestimonialsSection />
      </div>

      <MostSoldSection countryCode={countryCode} />


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

      <div className="w-full bg-white pt-24 pb-12 border-t border-gray-100 overflow-hidden select-none reveal-up">
        <h1 className="text-[13.1vw] leading-[0.8] font-sans font-black tracking-[-0.05em] text-center w-full text-black uppercase whitespace-nowrap">
          LEBONMARCHÉ
        </h1>
      </div>
    </>
  )
}
