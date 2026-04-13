"use client"

import * as React from "react"
import { Card, CardHeader } from "./card"
import { Button } from "./button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"
import Image from "next/image"

export interface ProductItem {
  id: string
  name: string
  handle: string
  category: string
  imageSrc: string
  price: string
}

export interface ProductMostSoldProps {
  title: string
  subtitle: string
  items: ProductItem[]
}

export const ProductMostSold = ({
  title,
  subtitle,
  items,
}: ProductMostSoldProps) => {
  const [isPaused, setIsPaused] = React.useState(false)
  
  // Quadruple items to ensure a very long seamless marquee loop
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <section className="w-full bg-[#f8f8f8] py-16 md:py-24 overflow-hidden border-b border-gray-100">
      <div className="content-container px-6 mb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block underline underline-offset-8 decoration-brand-olive/20">Selección VIP</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-brand-brown tracking-tighter italic leading-none uppercase">
            {title}
          </h2>
          <p className="text-brand-gray/60 text-sm md:text-base font-medium italic mt-4 max-w-xl">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden select-none touch-pan-y">
        <motion.div
          className="flex gap-4 md:gap-6 px-4"
          initial={{ x: "0%" }}
          animate={{ x: isPaused ? undefined : "-50%" }}
          transition={{
            duration: 90, // Slower than categories for better visibility of products
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          drag="x"
          dragConstraints={{ left: -3000, right: 0 }}
          style={{ width: "fit-content" }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[280px] md:w-[350px] flex-shrink-0"
            >
              <Card className="border-0 bg-white shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden h-full flex flex-col group rounded-none">
                <LocalizedClientLink href={`/productos/${item.handle}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 280px, 350px"
                      className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                      Sin imagen
                    </div>
                  )}
                  {/* Overlay elegant */}
                  <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                    <div className="bg-brand-brown text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                       Nuevo
                    </div>
                  </div>
                </LocalizedClientLink>
                <CardHeader className="p-6 pb-2 bg-white">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-olive bg-brand-soft px-2 py-0.5">
                      {item.category}
                    </span>
                    <span className="text-sm font-black text-brand-brown tracking-tighter">
                      {item.price}
                    </span>
                  </div>
                  <LocalizedClientLink href={`/productos/${item.handle}`}>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-brand-brown leading-tight h-14 line-clamp-2 hover:text-brand-olive transition-colors">
                      {item.name}
                    </h3>
                  </LocalizedClientLink>
                </CardHeader>
                <div className="p-6 pt-2 mt-auto bg-white">
                  <LocalizedClientLink href={`/productos/${item.handle}`}>
                    <Button className="w-full bg-brand-brown text-white hover:bg-brand-olive border-0 rounded-none h-11 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-lg shadow-black/5 group-hover:shadow-brand-brown/20">
                      Explorar Detalle
                    </Button>
                  </LocalizedClientLink>
                </div>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="mt-16 text-center">
          <LocalizedClientLink
            href="/store"
            className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-brand-brown border-b-2 border-brand-brown/10 pb-2 hover:text-brand-olive hover:border-brand-olive transition-all"
          >
            Ver catálogo completo
          </LocalizedClientLink>
      </div>
    </section>
  )
}
