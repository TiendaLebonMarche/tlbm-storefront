"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Best 10 categories from requested list - Minimalist & High Contrast
const CATEGORIES = [
  {
    title: "Mundo Tech",
    handle: "/categories/mundo-tech",
    img: "https://images.unsplash.com/photo-1483050801566-510f8a3010e4?q=80&w=1200",
    size: "large",
    description: "Innovación de vanguardia para el estilo de vida digital."
  },
  {
    title: "Audio & Sonido",
    handle: "/categories/audio-&-sonido",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    size: "medium-wide",
  },
  {
    title: "Gadgets Exóticos",
    handle: "/categories/gadgets-exoticos",
    img: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?q=80&w=600",
    size: "small",
  },
  {
    title: "Starlink",
    handle: "/categories/starlink",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600",
    size: "small",
  },
  {
    title: "Gamer & Oficina",
    handle: "/categories/gamer-&-oficina",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    size: "medium-wide",
  },
  {
    title: "Drones",
    handle: "/categories/drones",
    img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800",
    size: "medium-wide",
  },
  {
    title: "Smartwatch",
    handle: "/categories/smartwatch",
    img: "https://images.unsplash.com/photo-1544117518-e7963210278a?q=80&w=600",
    size: "small",
  },
  {
    title: "Parlantes",
    handle: "/categories/parlantes",
    img: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=600",
    size: "small",
  },
  {
    title: "Decoración Oficina",
    handle: "/categories/decoracion-oficina",
    img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=600",
    size: "small",
  },
  {
    title: "Ofertones",
    handle: "/categories/oferton",
    img: "https://images.unsplash.com/photo-1620987278429-ca17826ddb85?q=80&w=600",
    size: "small",
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1] as any
    }
  }
}

export default function CategoriesGrid() {
  return (
    <section className="bg-white py-20 md:py-32 overflow-hidden">
      <div className="content-container px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block">Navegación</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-brand-brown leading-tight italic">Categorías más vendidas</h2>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LocalizedClientLink
              href="/store"
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-brown border-b border-brand-brown/20 pb-2 hover:text-brand-olive hover:border-brand-olive transition-all whitespace-nowrap"
            >
              Ver Catálogo Completo →
            </LocalizedClientLink>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[280px] gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((cat, idx) => {
            let gridClasses = "col-span-1 row-span-1";
            if (cat.size === "large") gridClasses = "col-span-2 row-span-2";
            if (cat.size === "medium-wide") gridClasses = "col-span-2 row-span-1";
            
            return (
              <motion.div 
                key={cat.title}
                variants={itemVariants}
                className={`${gridClasses} group relative overflow-hidden bg-gray-50 rounded-sm border border-gray-100 hover:border-brand-olive transition-colors duration-500`}
              >
                <LocalizedClientLink href={cat.handle} className="block w-full h-full">
                  <Image 
                    src={cat.img} 
                    alt={cat.title}
                    fill
                    sizes={cat.size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />

                  {/* Text Content - Minimalist approach */}
                  <div className={`absolute inset-0 p-6 md:p-10 flex flex-col justify-end transition-all duration-700`}>
                    <div className="overflow-hidden">
                       {cat.size === "large" && (
                        <motion.span 
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 0.7 }}
                          className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block"
                        >
                          Curaduría Exclusive
                        </motion.span>
                      )}
                      <h3 className={`${
                        cat.size === "large" ? "text-3xl md:text-5xl" : "text-sm md:text-base"
                      } font-serif font-bold uppercase tracking-tight text-white drop-shadow-sm`}>
                        {cat.title}
                      </h3>
                      {cat.description && (
                        <p className="mt-4 text-[11px] text-white/90 max-w-[260px] line-clamp-2 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out italic">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Top Right Label for small items */}
                  {cat.size !== "large" && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <span className="text-[8px] font-bold tracking-[0.2em] text-white uppercase border-b border-white/50 pb-1">Ver →</span>
                    </div>
                  )}
                </LocalizedClientLink>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
