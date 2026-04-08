"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  {
    title: "Fragancias",
    handle: "/store?q=fragancia",
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
    size: "large", // 2x2 or spanning
    description: "Esencias exóticas y exclusivas."
  },
  {
    title: "Relojería",
    handle: "/store?q=reloj",
    img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800",
    size: "medium",
    description: "Precisión y lujo en tu pulso."
  },
  {
    title: "Sonido",
    handle: "/categories/parlantes",
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=600",
    size: "small",
  },
  {
    title: "Decoración",
    handle: "/store?q=decoracion",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
    size: "small",
  },
  {
    title: "Tecnología",
    handle: "/store?q=tecnologia",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800",
    size: "medium",
    description: "Innovación para el estilo de vida moderno."
  },
  {
    title: "Hogar",
    handle: "/store?q=hogar",
    img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800",
    size: "medium",
  },
  {
    title: "Oficina",
    handle: "/store?q=oficina",
    img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600",
    size: "small",
  },
  {
    title: "Mesa & Cocina",
    handle: "/store?q=cocina",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600",
    size: "small",
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block">Navegación</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-brand-brown leading-tight italic">Explora por Estilo</h2>
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
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Item 1: Large (Fragancias) - Spans 2x2 on desktop */}
          <motion.div 
            variants={itemVariants}
            className="col-span-2 row-span-2 group relative overflow-hidden bg-brand-soft"
          >
            <LocalizedClientLink href={CATEGORIES[0].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[0].img} 
                alt={CATEGORIES[0].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block opacity-80">Categoría Destacada</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">{CATEGORIES[0].title}</h3>
                <p className="text-xs text-white/80 max-w-[200px] line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {CATEGORIES[0].description}
                </p>
              </div>
            </LocalizedClientLink>
          </motion.div>

          {/* Item 2: Medium (Relojeria) - Spans 2x1 on desktop */}
          <motion.div 
            variants={itemVariants}
            className="col-span-2 row-span-1 md:col-span-2 group relative overflow-hidden"
          >
            <LocalizedClientLink href={CATEGORIES[1].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[1].img} 
                alt={CATEGORIES[1].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-brown/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-widest">{CATEGORIES[1].title}</h3>
              </div>
            </LocalizedClientLink>
          </motion.div>

          {/* Item 3: Small (Sonido) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 row-span-1 group relative overflow-hidden"
          >
            <LocalizedClientLink href={CATEGORIES[2].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[2].img} 
                alt={CATEGORIES[2].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">{CATEGORIES[2].title}</h3>
              </div>
            </LocalizedClientLink>
          </motion.div>

          {/* Item 4: Small (Decoracion) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 row-span-1 group relative overflow-hidden"
          >
             <LocalizedClientLink href={CATEGORIES[3].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[3].img} 
                alt={CATEGORIES[3].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">{CATEGORIES[3].title}</h3>
              </div>
            </LocalizedClientLink>
          </motion.div>

          {/* Item 5: Medium (Tecnologia) - Large vertical on desktop */}
          <motion.div 
            variants={itemVariants}
            className="col-span-2 row-span-2 group relative overflow-hidden"
          >
             <LocalizedClientLink href={CATEGORIES[4].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[4].img} 
                alt={CATEGORIES[4].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-serif font-bold mb-1">{CATEGORIES[4].title}</h3>
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-80">Ver Colección</span>
              </div>
            </LocalizedClientLink>
          </motion.div>

          {/* Item 6: Medium (Hogar) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-2 row-span-1 group relative overflow-hidden"
          >
             <LocalizedClientLink href={CATEGORIES[5].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[5].img} 
                alt={CATEGORIES[5].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all">
                 <span className="px-6 py-2 border border-white text-white text-[10px] uppercase font-bold tracking-widest">{CATEGORIES[5].title}</span>
              </div>
              <div className="absolute bottom-4 left-4 block group-hover:hidden">
                 <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">{CATEGORIES[5].title}</h3>
              </div>
            </LocalizedClientLink>
          </motion.div>

          {/* Item 7: Small (Oficina) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 row-span-1 group relative overflow-hidden"
          >
             <LocalizedClientLink href={CATEGORIES[6].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[6].img} 
                alt={CATEGORIES[6].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">{CATEGORIES[6].title}</h3>
              </div>
            </LocalizedClientLink>
          </motion.div>

           {/* Item 8: Small (Mesa) */}
           <motion.div 
            variants={itemVariants}
            className="col-span-1 row-span-1 group relative overflow-hidden"
          >
             <LocalizedClientLink href={CATEGORIES[7].handle} className="block w-full h-full">
              <Image 
                src={CATEGORIES[7].img} 
                alt={CATEGORIES[7].title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">{CATEGORIES[7].title}</h3>
              </div>
            </LocalizedClientLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
