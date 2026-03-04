import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

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
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-brand-black">
        <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2600&auto=format&fit=crop"
          alt="Luxury Home Decoration" className="absolute inset-0 w-full h-full object-cover opacity-60 animate-pulse-slow" />
        <div className="relative z-10 text-center text-white px-4 mt-10">
          <p className="text-xs font-sans tracking-[0.4em] uppercase mb-6 text-brand-gold">Bienvenidos a lo extraordinario</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">Originales & Exóticos</h1>
          <a href="#catalogo" className="inline-block border border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-brand-black transition duration-300">Ver Colección 2026</a>
        </div>
      </section>

      {/* Featured Products Component will replace this placeholder below later */}
      <section id="catalogo">
        <div className="py-12">
          <FeaturedProducts collections={collections} region={region} />
        </div>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          <div className="relative h-[400px] md:h-auto overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Colección Assouline" />
          </div>
          <div className="bg-brand-slate text-white flex flex-col justify-center items-center text-center p-12 md:p-24">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 italic tracking-tight">Colección Assouline</h2>
            <p className="text-sm md:text-base text-gray-300 max-w-md leading-relaxed mb-10 font-light">Libros de mesa que son verdaderas obras de arte. Una curaduría de destinos icónicos, moda y diseño.</p>
            <a href="#catalogo" className="border border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-brand-slate transition duration-300">Ver Colección</a>
          </div>
        </div>
      </section>

      <section className="max-w-[95rem] mx-auto px-6 md:px-12 py-12 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div className="w-full text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-serif italic text-brand-black">Nuestras Categorías</h2>
          </div>
        </div>

        {/* Placeholder: Carousel HTML translation */}
        <div className="carousel-viewport no-scrollbar flex gap-6 overflow-x-auto snap-x">
          <div className="category-card group cursor-pointer flex-shrink-0">
            <div className="aspect-[9/16] overflow-hidden relative mb-3">
              <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Wedding" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xs uppercase tracking-widest border-b border-transparent group-hover:border-black inline-block pb-1 transition-all">Bodas</h3>
            </div>
          </div>
          <div className="category-card group cursor-pointer flex-shrink-0">
            <div className="aspect-[9/16] overflow-hidden relative mb-3">
              <img src="https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Relojes" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xs uppercase tracking-widest border-b border-transparent group-hover:border-black inline-block pb-1 transition-all">Relojería</h3>
            </div>
          </div>
          <div className="category-card group cursor-pointer flex-shrink-0">
            <div className="aspect-[9/16] overflow-hidden relative mb-3">
              <img src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Zapatos" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xs uppercase tracking-widest border-b border-transparent group-hover:border-black inline-block pb-1 transition-all">Calzado</h3>
            </div>
          </div>
          <div className="category-card group cursor-pointer flex-shrink-0">
            <div className="aspect-[9/16] overflow-hidden relative mb-3">
              <img src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Decoración" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xs uppercase tracking-widest border-b border-transparent group-hover:border-black inline-block pb-1 transition-all">Decoración</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 px-6 max-w-[95rem] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-3">El Blog de la Tienda</h2>
          <p className="text-gray-500 font-serif italic">Noticias, Manuales & Tendencias</p>
          <div className="w-24 h-[1px] bg-brand-black mx-auto mt-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <article className="group cursor-pointer">
            <div className="overflow-hidden relative aspect-[4/3] mb-4 bg-gray-100">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=800" className="w-full h-full object-cover img-zoom" />
              <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 bg-white text-brand-black">Tendencias</span>
            </div>
            <div className="space-y-2">
              <time className="text-[10px] text-gray-400 uppercase tracking-widest">14 Feb 2026</time>
              <h3 className="text-lg font-serif leading-tight group-hover:text-brand-gold transition">Productos Luxury para tu Hogar</h3>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 inline-block mt-2">Leer Artículo</a>
            </div>
          </article>
          <article className="group cursor-pointer">
            <div className="overflow-hidden relative aspect-[4/3] mb-4 bg-gray-100">
              <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800" className="w-full h-full object-cover img-zoom" />
              <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 bg-white text-indigo-700">Manuales</span>
            </div>
            <div className="space-y-2">
              <time className="text-[10px] text-gray-400 uppercase tracking-widest">10 Feb 2026</time>
              <h3 className="text-lg font-serif leading-tight group-hover:text-brand-gold transition">Configura tus Gadgets</h3>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 inline-block mt-2">Leer Artículo</a>
            </div>
          </article>
          <article className="group cursor-pointer">
            <div className="overflow-hidden relative aspect-[4/3] mb-4 bg-gray-100">
              <img src="https://images.unsplash.com/photo-1512353087810-25dfcd100962?q=80&w=800" className="w-full h-full object-cover img-zoom" />
              <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 bg-brand-black text-white">Noticias</span>
            </div>
            <div className="space-y-2">
              <time className="text-[10px] text-gray-400 uppercase tracking-widest">05 Feb 2026</time>
              <h3 className="text-lg font-serif leading-tight group-hover:text-brand-gold transition">Nueva Colección Importada</h3>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 inline-block mt-2">Leer Artículo</a>
            </div>
          </article>
          <article className="group cursor-pointer">
            <div className="overflow-hidden relative aspect-[4/3] mb-4 bg-gray-100">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800" className="w-full h-full object-cover img-zoom" />
              <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 bg-white text-brand-gold">Reviews</span>
            </div>
            <div className="space-y-2">
              <time className="text-[10px] text-gray-400 uppercase tracking-widest">28 Ene 2026</time>
              <h3 className="text-lg font-serif leading-tight group-hover:text-brand-gold transition">Review: Calidad de Sonido</h3>
              <a href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 inline-block mt-2">Leer Artículo</a>
            </div>
          </article>
        </div>
      </section>

      <div className="w-full bg-brand-black py-4 border-t border-gray-800 overflow-hidden select-none flex items-center justify-center">
        <div className="w-[96%] mx-auto">
          <h1 className="text-[8.8vw] md:text-[9.2vw] leading-none font-serif font-bold tracking-tighter text-center whitespace-nowrap w-full">
            <span className="text-white">TIENDALEBON</span><span className="text-[#ff00ff]">MARCHE</span>
          </h1>
        </div>
      </div>
    </>
  )
}
