"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Claudia Mendoza",
    location: "Bogotá, Colombia",
    text: "La calidad de los productos es incomparable. Compré un reloj inteligente y el diseño es tan sofisticado que parece una pieza de joyería. La atención en Bucaramanga fue impecable.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600"
  },
  {
    id: 2,
    name: "Andrés Villamizar",
    location: "Bucaramanga, Santander",
    text: "Buscaba algo único para mi oficina y encontré unos gadgets exóticos que no había visto en ninguna otra parte del país. El envío fue rápido y el empaque muy premium.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600"
  },
  {
    id: 3,
    name: "Isabella Santamaría",
    location: "Medellín, Colombia",
    text: "Le Bon Marché se ha convertido en mi tienda favorita para regalos. Todo lo que venden tiene ese toque de exclusividad que busco. El proceso de compra es muy sencillo.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600"
  }
]

export default function AnimatedTestimonialsSection() {
  const [active, setActive] = useState(0)

  const handleNext = () => setActive((prev) => (prev + 1) % TESTIMONIALS.length)
  const handlePrev = () => setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    const timer = setInterval(handleNext, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden border-t border-gray-100">
      <div className="content-container px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block"
          >
            Experiencias Reales
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-bold text-brand-brown leading-tight tracking-tighter italic"
          >
            Opiniones reales de nuestros clientes
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto relative px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-sm shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={TESTIMONIALS[active].img} 
                    alt={TESTIMONIALS[active].name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-brown/10 mix-blend-multiply" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center py-8">
              <Quote className="size-12 text-brand-olive/20 mb-8" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div className="flex gap-1">
                    {[...Array(TESTIMONIALS[active].rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-brand-olive text-brand-olive" />
                    ))}
                  </div>
                  
                  <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-brand-brown leading-relaxed tracking-tight italic">
                    "{TESTIMONIALS[active].text}"
                  </p>
                  
                  <div>
                    <h4 className="text-lg font-bold text-brand-brown uppercase tracking-widest">{TESTIMONIALS[active].name}</h4>
                    <p className="text-sm text-brand-gray/60 font-medium">{TESTIMONIALS[active].location}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex gap-4 mt-12">
                <button 
                  onClick={handlePrev}
                  className="size-12 rounded-full border border-brand-brown/10 flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all group"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="size-12 rounded-full border border-brand-brown/10 flex items-center justify-center hover:bg-brand-brown hover:text-white transition-all group"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 pointer-events-none" />
    </section>
  )
}
