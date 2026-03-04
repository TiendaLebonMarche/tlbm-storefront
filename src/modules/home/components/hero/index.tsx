import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-brand-black">
      <img
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2600&auto=format&fit=crop"
        alt="Luxury Home Decoration"
        className="absolute inset-0 w-full h-full object-cover opacity-60 animate-pulse-slow"
      />
      <div className="relative z-10 text-center text-white px-4 mt-10">
        <p className="text-xs font-sans tracking-[0.4em] uppercase mb-6 text-brand-gold">
          Bienvenidos a lo extraordinario
        </p>
        <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">
          Originales & Exóticos
        </h1>
        <LocalizedClientLink
          href="/store"
          className="inline-block border border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-brand-black transition duration-300"
        >
          Ver Colección 2026
        </LocalizedClientLink>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-y-4 opacity-50">
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/40">Deslizar</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  )
}

export default Hero
