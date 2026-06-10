"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// 10 key categories with verified handles and premium minimalist images
const CATEGORIES = [
  {
    title: "Mundo Tech",
    handle: "/store?q=tech",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    size: "huge", // 2x2
    description: "Innovación de vanguardia para el estilo de vida digital."
  },
  {
    title: "Audio & Sonido",
    handle: "/store?q=audio",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    size: "wide", // 2x1
  },
  {
    title: "Gadgets Exóticos",
    handle: "/store?q=gadgets",
    img: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Starlink",
    handle: "/store?q=starlink",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Gamer & Oficina",
    handle: "/store?q=gamer",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    size: "wide", // 2x1
  },
  {
    title: "Drones",
    handle: "/store?q=drone",
    img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800",
    size: "wide", // 2x1
  },
  {
    title: "Smartwatch",
    handle: "/store?q=smartwatch",
    img: "https://images.unsplash.com/photo-1508685096489-7a689bdcd046?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Parlantes",
    handle: "/store?q=parlante",
    img: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Decoración Oficina",
    handle: "/store?q=decoracion",
    img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Ofertones",
    handle: "/store?q=oferta",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600",
    size: "small", // 1x1
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any }
  }
}

export default function CategoriesGrid() {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="content-container px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-black mb-3 block">Navegación</span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-brand-black italic">Categorías más vendidas</h2>
          </motion.div>
          <LocalizedClientLink
            href="/store"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-black border-b border-brand-black/10 pb-1 hover:text-brand-black hover:border-brand-black transition-all whitespace-nowrap mb-1"
          >
            Catálogo Completo →
          </LocalizedClientLink>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-6 auto-rows-[160px] md:auto-rows-[180px] gap-3 lg:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((cat, idx) => {
            // Bento Layout logic for 6-column grid
            let gridClasses = "col-span-1 row-span-1";
            
            if (cat.size === "huge") gridClasses = "md:col-span-2 md:row-span-2 col-span-2 row-span-2";
            if (cat.size === "wide") gridClasses = "md:col-span-2 md:row-span-1 col-span-2 row-span-1";
            
            return (
              <motion.div 
                key={cat.title}
                variants={itemVariants}
                className={`${gridClasses} group relative overflow-hidden bg-brand-gray-light/20 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-500`}
              >
                <LocalizedClientLink href={cat.handle} className="block w-full h-full">
                  <Image 
                    src={cat.img} 
                    alt={cat.title}
                    fill
                    sizes={cat.size === "huge" ? "33vw" : "16vw"}
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    priority={cat.size === "huge"}
                  />
                  
                  {/* Minimalist readability overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Text Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end text-white">
                    <h3 className={`${
                      cat.size === "huge" ? "text-xl md:text-3xl" : "text-xs md:text-sm"
                    } font-serif font-bold uppercase tracking-tight`}>
                      {cat.title}
                    </h3>
                  </div>
                </LocalizedClientLink>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
