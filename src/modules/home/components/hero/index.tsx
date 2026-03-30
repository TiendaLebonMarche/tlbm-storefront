import Image from "next/image"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-brand-soft">
      {/* Background Image with subtle zoom */}
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2600&auto=format&fit=crop"
        alt="Le Bon Marché - Pure Luxury"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] scale-105 group-hover:scale-100"
      />
      {/* Sophisticated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12 max-w-5xl">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-4 block opacity-90">
          Nueva Edición Limitada
        </span>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-bold mb-8 leading-none tracking-tight">
          Pura <br /> <span className="italic font-light">Elegancia.</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <LocalizedClientLink
            href="/store"
            className="px-10 py-4 bg-white text-brand-brown text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-brand-olive hover:text-white transition-all duration-500 rounded-sm shadow-xl"
          >
            Explorar Catálogo
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/store?category=originales"
            className="px-10 py-4 border border-white/40 bg-white/5 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-white hover:text-brand-brown transition-all duration-500 rounded-sm"
          >
            Ver Originales
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default Hero
