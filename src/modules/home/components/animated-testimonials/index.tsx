"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { cn } from "@lib/utils"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Claudia Mendoza",
    location: "Bogotá, Colombia",
    text: "La calidad de los productos es incomparable. El diseño es tan sofisticado que parece una pieza de joyería. La atención fue impecable.",
    size: "large"
  },
  {
    id: 2,
    name: "Andrés V.",
    location: "Bucaramanga",
    text: "Buscaba algo único para mi oficina y encontré gadgets exóticos increíbles. El envío fue rápido y muy premium.",
    size: "small"
  },
  {
    id: 3,
    name: "Isabella S.",
    location: "Medellín",
    text: "Le Bon Marché se ha convertido en mi tienda favorita para regalos. Todo tiene un toque de exclusividad único.",
    size: "medium"
  },
  {
    id: 4,
    name: "Ricardo Ortiz",
    location: "Cali",
    text: "Una experiencia de lujo desde la web hasta la entrega. Recomendado 100% para amantes de la tecnología original.",
    size: "small"
  },
  {
    id: 5,
    name: "Elena G.",
    location: "Bucaramanga",
    text: "Diseño impecable y funcionalidad superior en cada pieza. Una joya nacional.",
    size: "medium"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 md:py-28 overflow-hidden relative">
      <div className="content-container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Header Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="size-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-brand-brown">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-olive">+2000 Clientes</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-brand-brown leading-[0.9] tracking-tighter italic mb-8">
                Opiniones reales de nuestros clientes
              </h2>
              <p className="max-w-md text-brand-gray/60 leading-relaxed font-medium">
                La satisfacción de quienes confían en nosotros es el pilar de Le Bon Marché. Descubre por qué somos la referencia en lujo y exclusividad.
              </p>
              
              <div className="mt-12 flex items-center gap-6">
                <div>
                  <div className="text-3xl font-bold text-brand-brown">4.9/5</div>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="size-3 fill-brand-olive text-brand-olive" />)}
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-gray-100" />
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray/40">CALIFICACIÓN PROMEDIO</div>
              </div>
            </motion.div>
          </div>

          {/* Testimonials Bento/Mosaic */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={cn(
                  "p-8 rounded-none border border-gray-50 bg-[#fafafa] flex flex-col justify-between hover:bg-white hover:border-brand-brown/10 hover:shadow-2xl transition-all duration-700",
                  t.size === "large" ? "md:col-span-2 md:min-h-[280px]" : "md:col-span-1"
                )}
              >
                <Quote className="size-6 text-brand-olive/20 mb-6" />
                
                <p className={cn(
                  "text-brand-brown leading-relaxed mb-8",
                  t.size === "large" ? "text-xl md:text-2xl font-medium tracking-tight" : "text-sm font-medium"
                )}>
                  &quot;{t.text}&quot;
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-brown">{t.name}</h4>
                    <p className="text-[9px] text-brand-gray/40 uppercase font-bold tracking-tighter">{t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="size-2.5 fill-brand-olive/40 text-brand-olive/40" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Decorative pattern */}
       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
    </section>
  )
}


