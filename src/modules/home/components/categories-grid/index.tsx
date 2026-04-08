"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Best 10 categories from requested list
const CATEGORIES = [
  {
    title: "Mundo Tech",
    handle: "/categories/mundo-tech",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200",
    size: "large", // 2x2
    description: "Lo último en innovación y gadgets de alto desempeño."
  },
  {
    title: "Audio & Sonido",
    handle: "/categories/audio-&-sonido",
    img: "https://images.unsplash.com/photo-1524486361537-8ad15500d17c?q=80&w=800",
    size: "medium-wide", // 2x1
  },
  {
    title: "Gadgets Exóticos",
    handle: "/categories/gadgets-exoticos",
    img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800",
    size: "small", // 1x1
  },
  {
    title: "Starlink",
    handle: "/categories/starlink",
    img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Gamer & Oficina",
    handle: "/categories/gamer-&-oficina",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800",
    size: "medium-wide", // 2x1
  },
  {
    title: "Drones",
    handle: "/categories/drones",
    img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=800",
    size: "medium-wide", // 2x1
  },
  {
    title: "Smartwatch",
    handle: "/categories/smartwatch",
    img: "https://images.unsplash.com/photo-1508685096489-7a689bdcd046?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Parlantes",
    handle: "/categories/parlantes",
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Decoración Oficina",
    handle: "/categories/decoracion-oficina",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
    size: "small", // 1x1
  },
  {
    title: "Oferton",
    handle: "/categories/oferton",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600",
    size: "small", // 1x1
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block">Navegación</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-brand-brown leading-tight italic">Categorías más vendidas</h2>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
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
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((cat, idx) => {
            // Layout logic
            let gridClasses = "col-span-1 row-span-1";
            if (cat.size === "large") gridClasses = "col-span-2 row-span-2";
            if (cat.size === "medium-wide") gridClasses = "col-span-2 row-span-1";
            
            return (
              <motion.div 
                key={cat.title}
                variants={itemVariants}
                className={`${gridClasses} group relative overflow-hidden bg-brand-soft rounded-sm`}
              >
                <LocalizedClientLink href={cat.handle} className="block w-full h-full">
                  <Image 
                    src={cat.img} 
                    alt={cat.title}
                    fill
                    sizes={cat.size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  
                  {/* Overlay according to size */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    cat.size === "large" 
                      ? "bg-gradient-to-t from-brand-brown/70 via-brand-brown/20 to-transparent opacity-80" 
                      : "bg-brand-brown/10 group-hover:bg-brand-brown/30 opacity-60"
                  }`} />

                  {/* Text Content */}
                  <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white transition-all duration-500 ${
                    cat.size !== "large" ? "items-center text-center translate-y-2 group-hover:translate-y-0" : ""
                  }`}>
                    {cat.size === "large" && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3 block opacity-70">
                        Top Recomendado
                      </span>
                    )}
                    <h3 className={`${
                      cat.size === "large" ? "text-3xl md:text-5xl" : "text-base md:text-xl"
                    } font-serif font-bold uppercase tracking-tight group-hover:text-white transition-colors`}>
                      {cat.title}
                    </h3>
                    {cat.description && (
                      <p className="mt-3 text-xs text-white/80 max-w-[280px] line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {cat.description}
                      </p>
                    )}
                    {cat.size !== "large" && (
                      <span className="text-[8px] font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explorar →
                      </span>
                    )}
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
