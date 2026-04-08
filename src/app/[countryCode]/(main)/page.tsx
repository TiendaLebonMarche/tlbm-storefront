import { Metadata } from "next"

import HeroSection2 from "@modules/home/components/hero-section-2"
import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import HotDeals from "@modules/home/components/hot-deals"
import AnimatedTestimonialsSection from "@modules/home/components/animated-testimonials"
import NewsletterSection from "@modules/home/components/newsletter-section"
import CategoriesCarousel from "@modules/home/components/categories-carousel"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { blogPosts } from "@lib/data/blog"
import { Blog7 } from "@/components/ui/blog7"

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
        <AnimatedTestimonialsSection />
      </div>

      <section id="catalogo" className="bg-white reveal-up delay-300">
        <HeroSection2 />
      </section>

      <section className="bg-white py-20 md:py-32 overflow-hidden reveal-up">
        <div className="content-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 px-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block">Navegación</span>
              <h2 className="text-4xl font-sans font-bold text-brand-brown leading-tight">Explora por Estilo</h2>
            </div>
            <LocalizedClientLink
              href="/store"
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-brown border-b border-brand-brown/20 pb-2 hover:text-brand-olive transition-colors whitespace-nowrap"
            >
              Ver Catálogo →
            </LocalizedClientLink>
          </div>

          <CategoriesCarousel />
        </div>
      </section>


      <Blog7
        tagline="Lifestyle & Tendencias"
        heading="Crónicas de Estilo"
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

      <NewsletterSection />

      <div className="w-full bg-white py-20 border-t border-gray-100 overflow-hidden select-none">
        <h1 className="text-[12vw] leading-none font-sans font-black tracking-tighter text-center w-full text-gray-200">
          LEBONMARCHÉ
        </h1>
      </div>
    </>
  )
}
