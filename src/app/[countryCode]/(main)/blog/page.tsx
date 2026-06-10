import { Metadata } from "next"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const BASE_URL = "https://www.tiendalebonmarche.com"

export const metadata: Metadata = {
  title: "Blog & Journal | Tienda Le Bon Marché — Bucaramanga",
  description: "Tendencias, lifestyle y selección editorial exclusiva de Le Bon Marché. Crónicas sobre diseño, tecnología y el arte de vivir bien desde Bucaramanga, Colombia.",
  alternates: {
    canonical: `${BASE_URL}/co/blog`,
  },
  openGraph: {
    title: "Blog Le Bon Marché — Lifestyle & Tendencias",
    description: "Crónicas sobre diseño, tecnología premium y el arte de vivir bien. Boutique virtual en Bucaramanga.",
    url: `${BASE_URL}/co/blog`,
    siteName: "Tienda Le Bon Marché",
    type: "website",
    locale: "es_CO",
  },
}

import { blogPosts } from "@lib/data/blog"

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header */}
      <header className="py-24 md:py-32 border-b border-gray-50">
        <div className="content-container text-center space-y-6">
          <span className="text-brand-black font-bold uppercase tracking-[0.4em] text-[10px]">The Journal</span>
          <h1 className="text-6xl md:text-8xl font-serif text-brand-black italic leading-[0.9]">
            Historias <br /> <span className="not-italic">con Propósito</span>
          </h1>
          <p className="max-w-xl mx-auto text-brand-gray font-light text-base leading-relaxed pt-4">
            Crónicas sobre diseño, tecnología y el arte de vivir bien. <br /> Una colección de ideas para el coleccionista moderno.
          </p>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="py-24 md:py-32">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {blogPosts.map((post) => (
              <article key={post.title} className="group flex flex-col h-full">
                <LocalizedClientLink href={`/blog/${post.handle}`} className="relative aspect-[3/4] overflow-hidden mb-10 bg-brand-gray-light/20">
                  <Image
                    src={post.img}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-brand-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </LocalizedClientLink>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-black">
                      {post.tag}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <time className="text-[9px] text-brand-gray font-bold uppercase tracking-[0.2em]">
                      {post.date}
                    </time>
                  </div>

                  <LocalizedClientLink href={`/blog/${post.handle}`}>
                    <h2 className="text-3xl font-serif text-brand-black leading-tight mb-6 group-hover:text-brand-black transition-colors duration-500">
                      {post.title}
                    </h2>
                  </LocalizedClientLink>

                  <p className="text-brand-gray font-light leading-relaxed text-sm mb-8 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-brand-gray-light/60">
                    <LocalizedClientLink href={`/blog/${post.handle}`} className="text-[10px] font-bold uppercase tracking-[0.3em] inline-flex items-center gap-4 text-brand-black group/link">
                      <span className="group-hover:tracking-[0.4em] transition-all">Leer más</span>
                      <div className="w-8 h-[1px] bg-brand-black group-hover/link:w-12 transition-all duration-500"></div>
                    </LocalizedClientLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Sales CTA Section */}
      <div className="bg-brand-black text-white py-24 md:py-32">
        <div className="content-container max-w-2xl text-center space-y-8">
          <h2 className="text-4xl font-serif italic">¿Listo para probar lo mejor?</h2>
          <p className="text-gray-300 font-light text-sm leading-relaxed max-w-lg mx-auto">
            Nos quemamos las pestañas buscando las mejores ofertas y productos únicos, para que usted solo tenga que dar un clic y disfrutar.
          </p>
          <div className="pt-4">
            <LocalizedClientLink 
              href="/store"
              className="inline-block px-12 py-4 bg-brand-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-brand-black transition-colors"
            >
              Ver Catálogo
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}
