import { Metadata } from "next"

import Image from "next/image"
import HeroSection2 from "@modules/home/components/hero-section-2"
import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import HotDeals from "@modules/home/components/hot-deals"
import AnimatedTestimonialsSection from "@modules/home/components/animated-testimonials"
import NewsletterSection from "@modules/home/components/newsletter-section"
import CategoriesCarousel from "@modules/home/components/categories-carousel"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { blogPosts } from "@lib/data/blog"

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

      <section id="blog" className="py-20 md:py-32 bg-brand-soft reveal-up">
        <div className="content-container px-6">
          <div className="flex flex-col items-center text-center mb-24 space-y-4">
            <span className="text-brand-olive font-bold uppercase tracking-[0.4em] text-[10px]">Lifestyle Gallery</span>
            <h2 className="text-5xl md:text-7xl font-sans font-bold text-brand-brown leading-none">Crónicas de Estilo</h2>
            <p className="max-w-xl text-brand-gray font-normal text-base md:text-lg leading-relaxed">
              Descubre las piezas que definen el lujo moderno y las historias detrás de nuestra selección exclusiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {blogPosts.slice(0, 3).map((post, idx) => (
              <article key={post.title} className={`group cursor-pointer flex flex-col h-full bg-white p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 reveal-up delay-${(idx + 1) * 100}`}>
                <LocalizedClientLink href={`/blog/${post.handle}`} className="block relative overflow-hidden aspect-[1/1] mb-8 bg-gray-50 rounded-sm">
                  <Image
                    src={post.img}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </LocalizedClientLink>
                
                <div className="flex flex-col flex-1 space-y-4 px-2 pb-4 text-center items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive">
                      {post.tag}
                    </span>
                  </div>
                  
                  <LocalizedClientLink href={`/blog/${post.handle}`}>
                    <h3 className="text-2xl font-sans font-bold text-brand-brown leading-snug group-hover:text-brand-olive transition-colors duration-500">
                      {post.title}
                    </h3>
                  </LocalizedClientLink>
                  
                  <div className="pt-6 mt-auto">
                    <LocalizedClientLink href={`/blog/${post.handle}`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-brown group-hover:tracking-[0.4em] transition-all">
                      Leer Más →
                    </LocalizedClientLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />

      <div className="w-full bg-white py-20 border-t border-gray-100 overflow-hidden select-none flex items-center justify-center">
        <div className="content-container">
          <h1 className="text-[12vw] leading-none font-sans font-black tracking-tighter text-center whitespace-nowrap text-gray-200">
            LE BON MARCHÉ
          </h1>
        </div>
      </div>
    </>
  )
}
