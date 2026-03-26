import { Metadata } from "next"

import Image from "next/image"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import HotDeals from "@modules/home/components/hot-deals"
import CustomerReviews from "@modules/home/components/customer-reviews"
import NewsletterSection from "@modules/home/components/newsletter-section"
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

      <TrustBadges />

      <HotDeals countryCode={countryCode} />

      <CustomerReviews />

      <section id="catalogo" className="bg-white">
        <div className="py-16 md:py-20 content-container">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl font-serif text-brand-black mb-3">Productos Exclusivos</h2>
            <div className="w-24 h-[1px] bg-brand-black mx-auto" />
          </div>
          <FeaturedProducts collections={collections} region={region} />
        </div>
      </section>

      <section className="w-full bg-brand-black overflow-hidden py-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[500px] md:h-[700px] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1600"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Colección Assouline"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          <div className="flex flex-col justify-center items-center text-center p-12 md:p-24 lg:p-32">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Exclusividad</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 italic leading-tight">Colección <br /> Assouline</h2>
            <p className="text-sm md:text-base text-gray-400 max-w-sm leading-loose mb-12 font-medium uppercase tracking-widest">
              Libros de mesa que son verdaderas obras de arte. Una selección de destinos icónicos, moda y diseño para el hogar moderno.
            </p>
            <LocalizedClientLink href="/store?q=assouline" className="group relative px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden">
              <span className="relative z-10">Ver Colección</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Ver Colección</span>
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="content-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-4">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Explora por Estilo</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-black italic">Nuestras Categorías</h2>
            </div>
            <LocalizedClientLink href="/store" className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-black border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors">
              Ver Catálogo Completo
            </LocalizedClientLink>
          </div>

          <div className="no-scrollbar flex gap-8 overflow-x-auto snap-x px-4 pb-8">
            {[
              { title: "Relojería", handle: "/store?q=reloj", img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600" },
              { title: "Sonido", handle: "/categories/parlantes", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=600" },
              { title: "Decoración", handle: "/store?q=decoracion", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" },
              { title: "Fragancias", handle: "/store?q=fragancia", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600" }
            ].map((cat) => (
              <LocalizedClientLink key={cat.title} href={cat.handle} className="category-card group cursor-pointer flex-shrink-0 w-[280px] md:w-[350px] snap-start">
                <div className="aspect-[3/4] overflow-hidden relative mb-6">
                  <Image
                    src={cat.img}
                    fill
                    sizes="(max-width: 768px) 280px, 350px"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={cat.title}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-brand-black group-hover:text-brand-gold transition-colors">{cat.title}</h3>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 md:py-20 bg-white">
        <div className="content-container">
          <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">Journal</span>
            <h2 className="text-5xl md:text-6xl font-serif text-brand-black italic">Crónicas de Estilo</h2>
            <p className="max-w-xl text-gray-500 font-light text-base leading-relaxed">
              Exploramos las historias detrás de cada pieza, guías de estilo y las últimas tendencias en el mundo del lujo exótico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.title} className="group cursor-pointer flex flex-col h-full bg-white">
                <LocalizedClientLink href={`/blog/${post.handle}`} className="block relative overflow-hidden aspect-[3/4] mb-8 bg-gray-50">
                  <Image
                    src={post.img}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-brand-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </LocalizedClientLink>
                
                <div className="flex flex-col flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                      {post.tag}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <time className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">{post.date}</time>
                  </div>
                  
                  <LocalizedClientLink href={`/blog/${post.handle}`}>
                    <h3 className="text-2xl font-serif text-brand-black leading-snug group-hover:text-brand-gold transition-colors duration-500">
                      {post.title}
                    </h3>
                  </LocalizedClientLink>
                  
                  <div className="pt-6 mt-auto">
                    <LocalizedClientLink href={`/blog/${post.handle}`} className="text-[10px] font-bold uppercase tracking-[0.3em] inline-flex items-center gap-4 text-brand-black group/link">
                      <span className="group-hover:tracking-[0.4em] transition-all">Leer Journal</span>
                      <div className="w-8 h-[1px] bg-brand-gold group-hover/link:w-12 transition-all duration-500"></div>
                    </LocalizedClientLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />

      <div className="w-full bg-[#0a0a0a] py-8 border-t border-white/5 overflow-hidden select-none flex items-center justify-center">
        <div className="content-container">
          <h1 className="text-[10vw] md:text-[8vw] leading-none font-serif font-black tracking-tighter text-center whitespace-nowrap opacity-100">
            <span className="text-white">TIENDALEBON</span><span className="text-brand-gold italic">MARCHE</span>
          </h1>
        </div>
      </div>
    </>
  )
}
