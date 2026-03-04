import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Overlay/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-brand-black z-10" />
        {/* Usaremos un degradado premium hasta que el usuario decida la imagen principal */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dbv5un7p9/image/upload/v1/assets/pattern_exotic')] bg-repeat" />
      </div>

      <div className="relative z-20 content-container flex flex-col items-center text-center px-6">
        <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 animate-fade-in-down">
          Luxury & Tech Curators
        </span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[1.1] animate-fade-in underline decoration-brand-gold/30 underline-offset-[16px]">
          Descubre lo <span className="italic text-brand-gold">Exótico</span>
        </h1>

        <p className="max-w-[600px] text-gray-400 text-sm md:text-base leading-relaxed mb-12 font-medium tracking-wide uppercase px-4">
          Rastreamos las piezas más exclusivas del mundo. Gadgets importados y lifestyle luxury curado para quienes buscan lo extraordinario.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <LocalizedClientLink href="/store">
            <Button
              className="h-14 px-12 bg-brand-gold hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-all duration-500 rounded-none shadow-2xl"
            >
              Explorar Colección
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/about">
            <Button
              variant="secondary"
              className="h-14 px-12 border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs transition-all duration-500 rounded-none"
            >
              Nuestra Historia
            </Button>
          </LocalizedClientLink>
        </div>
      </div>

      {/* Aesthetic Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-y-4 opacity-50">
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/40">Deslizar</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </div>
  )
}

export default Hero
