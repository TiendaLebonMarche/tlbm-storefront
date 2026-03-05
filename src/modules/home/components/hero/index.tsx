import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Image con overlay gradual */}
      <img
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2600&auto=format&fit=crop"
        alt="Le Bon Marché - Originales & Exóticos"
        className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
      />
      {/* Gradient overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8 max-w-3xl">
        <p className="text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase mb-6 md:mb-8 text-brand-gold font-bold">
          Curaduría Exclusiva de Lujo
        </p>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4 md:mb-6 italic leading-tight">
          Originales & <br className="hidden md:block" />Exóticos
        </h1>
        
        <p className="text-sm md:text-base text-gray-300 mb-10 md:mb-12 font-light leading-relaxed max-w-xl mx-auto">
          Descubre la curación más exclusiva de productos de lujo: libros Assouline, relojería fina, tecnología premium y piezas únicas que cuentan una historia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <LocalizedClientLink
            href="/store"
            className="inline-block border border-white bg-white text-brand-black px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] hover:bg-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver Colección 2026
          </LocalizedClientLink>
          
          <LocalizedClientLink
            href="/store?filter=oferta"
            className="inline-block border border-white text-white px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-brand-black transition-all duration-300 group"
          >
            Ofertas <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </LocalizedClientLink>
        </div>

        {/* Promo Badge */}
        <div className="mt-12 md:mt-16 inline-flex items-center gap-2 px-4 py-2 bg-brand-gold bg-opacity-10 border border-brand-gold/30 rounded-full">
          <span className="text-brand-gold text-lg">✨</span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-brand-gold">
            Envío Gratis en &gt; $100.000
          </span>
        </div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-y-3 opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 font-bold">Deslizar</span>
        <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-brand-gold/60 to-transparent" />
      </div>
    </section>
  )
}

export default Hero
