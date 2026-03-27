import Image from "next/image"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2600&auto=format&fit=crop"
        alt="Le Bon Marché - Originales & Exóticos"
        fill
        priority
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
      />
      {/* Subtle overlay for text readability only if using white text */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8 max-w-4xl flex flex-col items-center">
        <p className="text-[10px] md:text-xs font-sans tracking-widest lowercase mb-6">
          colección exclusiva de lujo
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-8 italic leading-tight">
          Originales & Exóticos
        </h1>

        <LocalizedClientLink
          href="/store"
          className="inline-block border border-white bg-transparent text-white px-10 py-3 text-[10px] uppercase font-sans tracking-widest hover:bg-white hover:text-black transition-all duration-300"
        >
          ver colección
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default Hero
