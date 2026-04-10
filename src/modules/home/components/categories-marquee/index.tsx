"use client"

import { motion, useAnimationControls, useMotionValue } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useRef, useState } from "react"

const CATEGORIES = [
  {
    title: "Mundo Tech",
    handle: "/categories/mundo-tech",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
  },
  {
    title: "Audio & Sonido",
    handle: "/categories/audio-sonido",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
  },
  {
    title: "Gadgets Exóticos",
    handle: "/categories/gadgets-exoticos",
    img: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?q=80&w=600",
  },
  {
    title: "Starlink",
    handle: "/categories/starlink",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600",
  },
  {
    title: "Gamer & Oficina",
    handle: "/categories/gamer-oficina",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
  },
  {
    title: "Drones",
    handle: "/categories/drones",
    img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800",
  },
  {
    title: "Smartwatch",
    handle: "/categories/smartwatch",
    img: "https://images.unsplash.com/photo-1508685096489-7a689bdcd046?q=80&w=600",
  },
  {
    title: "Parlantes",
    handle: "/categories/parlantes",
    img: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=600",
  },
  {
    title: "Decoración Oficina",
    handle: "/categories/decoracion-oficina",
    img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=600",
  },
  {
    title: "Ofertones",
    handle: "/categories/oferton",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600",
  }
]

export default function CategoriesMarquee() {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  
  // Multiply categories to ensure seamless loop
  const duplicatedCategories = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES]

  return (
    <section className="bg-[#fafaf5] py-16 md:py-24 overflow-hidden border-y border-stone-200/50">
      <div className="px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#50652a] mb-4 block">
            Selección Curada
          </span>
          <h2 className="text-4xl md:text-7xl font-sans font-black text-[#322214] uppercase leading-none tracking-tight italic">
            Nuestras Categorías
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden select-none touch-pan-y">
        <motion.div 
          className="flex gap-4 md:gap-8 px-4"
          initial={{ x: "-50%" }}
          animate={{ x: isPaused ? undefined : "0%" }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }} // Simple drag fallback
          style={{ width: "fit-content" }}
        >
          {duplicatedCategories.map((cat, idx) => (
            <div 
              key={`${cat.title}-${idx}`} 
              className="relative w-[280px] h-[380px] md:w-[450px] md:h-[600px] flex-shrink-0 group overflow-hidden bg-white shadow-2xl shadow-black/5"
            >
              <LocalizedClientLink href={cat.handle} className="block w-full h-full">
                <Image 
                  src={cat.img} 
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 280px, 450px"
                  className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
                
                {/* Luxury Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#322214]/60 opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                
                {/* Border Accent */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-700 m-4" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                  <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">Explorar Categoría</span>
                  <h3 className="text-2xl md:text-5xl font-serif font-light leading-tight">
                    {cat.title}
                  </h3>
                  <div className="w-0 group-hover:w-full h-px bg-white/40 mt-4 transition-all duration-1000 ease-out" />
                </div>
              </LocalizedClientLink>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 text-center reveal-up">
          <LocalizedClientLink
            href="/store"
            className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-[#322214] border-b-2 border-[#322214]/20 pb-2 hover:text-[#50652a] hover:border-[#50652a] transition-all"
          >
            Ver catálogo completo
          </LocalizedClientLink>
      </div>
    </section>
  )
}
