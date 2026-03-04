import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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

      <section id="catalogo" className="bg-white">
        <div className="py-24 content-container">
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
            <img src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Colección Assouline" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          <div className="flex flex-col justify-center items-center text-center p-12 md:p-24 lg:p-32">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Exclusividad</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 italic leading-tight">Colección <br /> Assouline</h2>
            <p className="text-sm md:text-base text-gray-400 max-w-sm leading-loose mb-12 font-medium uppercase tracking-widest">
              Libros de mesa que son verdaderas obras de arte. Una curaduría de destinos icónicos, moda y diseño para el hogar moderno.
            </p>
            <LocalizedClientLink href="/store" className="group relative px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden">
              <span className="relative z-10">Ver Colección</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Ver Colección</span>
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
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
              { title: "Relojería", img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600" },
              { title: "Decoración", img: "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=600" },
              { title: "Calzado", img: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600" },
              { title: "Fragancias", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600" }
            ].map((cat) => (
              <div key={cat.title} className="category-card group cursor-pointer flex-shrink-0 w-[280px] md:w-[350px] snap-start">
                <div className="aspect-[3/4] overflow-hidden relative mb-6">
                  <img src={cat.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cat.title} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-brand-black group-hover:text-brand-gold transition-colors">{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-32 bg-[#fafafa]">
        <div className="content-container px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Journal</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-black">El Blog de la Tienda</h2>
            <p className="mt-4 text-gray-500 font-serif italic text-sm">Noticias, Manuales & Tendencias Exóticas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              {
                tag: "Tendencias",
                date: "14 FEB 2026",
                title: "Inspiración Luxury para tu Espacio",
                img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=800"
              },
              {
                tag: "Manuales",
                date: "10 FEB 2026",
                title: "Guía: Configura tus Gadgets Pro",
                img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800"
              },
              {
                tag: "Noticias",
                date: "05 FEB 2026",
                title: "Nueva Colección Importada 2026",
                img: "https://images.unsplash.com/photo-1512353087810-25dfcd100962?q=80&w=800"
              },
              {
                tag: "Reviews",
                date: "28 ENE 2026",
                title: "Passau: El Futuro del Sonido Exótico",
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800"
              }
            ].map((post) => (
              <article key={post.title} className="group cursor-pointer flex flex-col h-full">
                <div className="overflow-hidden relative aspect-[4/5] mb-6 bg-gray-100 shadow-md transform transition-all duration-700 group-hover:shadow-xl">
                  <img src={post.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={post.title} />
                  <span className="absolute top-6 left-6 text-[9px] font-bold uppercase tracking-widest py-2 px-4 bg-white text-brand-black shadow-sm group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                    {post.tag}
                  </span>
                </div>
                <div className="flex-grow space-y-3">
                  <time className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{post.date}</time>
                  <h3 className="text-xl font-serif text-brand-black leading-tight group-hover:text-brand-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                </div>
                <LocalizedClientLink href="/store" className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] inline-flex items-center gap-2 text-brand-black hover:text-brand-gold transition-colors group/link">
                  <span>Leer Artículo</span>
                  <div className="w-10 h-[1px] bg-brand-black group-hover/link:bg-brand-gold group-hover/link:w-16 transition-all duration-500"></div>
                </LocalizedClientLink>
              </article>
            ))}
          </div>
        </div>
      </section>

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
