"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
} from "./card"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"

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
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1))
  }

  // Effect to handle scroll into view or manual transition
  // We'll use a transform approach that centers the active index
  
  return (
    <section className="w-full bg-[#f8f8f8] py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block">Selección VIP</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-brand-brown leading-tight mb-2 tracking-tighter">
              {title}
            </h2>
            <p className="text-brand-gray text-sm md:text-base font-medium opacity-80 italic">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full border-brand-brown/10 hover:border-brand-brown/30 bg-white"
            >
              <ChevronLeft className="h-5 w-5 text-brand-brown" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex === items.length - 1}
              className="rounded-full border-brand-brown/10 hover:border-brand-brown/30 bg-white"
            >
              <ChevronRight className="h-5 w-5 text-brand-brown" />
            </Button>
          </div>
        </div>

        <div className="relative h-full">
          {/* We use a motion div for smooth, centered transitions */}
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            animate={{
               // The logic here: 
               // We want the item at currentIndex to be at the center.
               // Mobile: item is ~85% width. Offset is (100% - 85%) / 2 for the first one.
               // But simpler: use a center-aligned container and transform.
               x: `calc(50% - (var(--card-width) / 2) - (${currentIndex} * (var(--card-width) + 24px)))`
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            style={{
              // @ts-ignore
              "--card-width": "min(85vw, 380px)",
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0"
                animate={{
                  opacity: currentIndex === index ? 1 : 0.4,
                  scale: currentIndex === index ? 1 : 0.95,
                }}
                style={{
                  width: "var(--card-width)"
                }}
              >
                <Card className="border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col rounded-none md:rounded-lg">
                  <LocalizedClientLink href={`/products/${item.handle}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </LocalizedClientLink>
                  <CardHeader className="p-6 pb-2">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-olive bg-brand-soft px-2 py-0.5">
                        {item.category}
                      </span>
                      <span className="text-sm font-black text-brand-brown tracking-tighter">
                        {item.price}
                      </span>
                    </div>
                    <LocalizedClientLink href={`/products/${item.handle}`}>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-brown leading-tight">
                        {item.name}
                      </h3>
                    </LocalizedClientLink>
                  </CardHeader>
                  <div className="p-6 pt-2 mt-auto">
                    <LocalizedClientLink href={`/products/${item.handle}`}>
                      <Button className="w-full bg-brand-brown text-white hover:bg-brand-olive border-0 rounded-none h-11 text-[9px] font-bold uppercase tracking-[0.2em]">
                        Comprar Ahora
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
