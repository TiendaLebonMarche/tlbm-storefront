"use client"

import * as React from "react"
import {
  Card,
  CardHeader,
} from "./card"
import { Button } from "./button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion, useMotionValue } from "framer-motion"
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
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [windowWidth, setWindowWidth] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowWidth < 768
  const cardWidth = isMobile ? windowWidth * 0.85 : 380
  const gap = isMobile ? 16 : 24
  
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    const max = isMobile ? items.length - 1 : items.length - 3
    setCurrentIndex((prev) => Math.min(max, prev + 1))
  }

  // Drag logic to update index
  const onDragEnd = (event: any, info: any) => {
    const threshold = cardWidth / 4
    if (info.offset.x < -threshold) {
      handleNext()
    } else if (info.offset.x > threshold) {
      handlePrev()
    }
  }

  const getX = () => {
    if (isMobile) {
      return `calc(50% - (${cardWidth}px / 2) - (${currentIndex} * (${cardWidth}px + ${gap}px)))`
    }
    return `-${currentIndex * (cardWidth + gap)}px`
  }

  return (
    <section className="w-full bg-[#f8f8f8] py-20 md:py-32 overflow-hidden">
      <div className="content-container px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-4 block">Selección VIP</span>
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-brand-brown tracking-tighter italic leading-none">
              {title}
            </h2>
            <p className="text-brand-gray/60 text-sm md:text-base font-medium italic mt-2">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-full border-brand-brown/10 hover:border-brand-brown/30 bg-white shadow-sm"
            >
              <ChevronLeft className="h-5 w-5 text-brand-brown" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={isMobile ? currentIndex === items.length - 1 : currentIndex >= items.length - 3}
              className="rounded-full border-brand-brown/10 hover:border-brand-brown/30 bg-white shadow-sm"
            >
              <ChevronRight className="h-5 w-5 text-brand-brown" />
            </Button>
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          <motion.div
            className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Elastic drag centered around its animate position
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            animate={{ x: getX() }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0"
                animate={{
                  opacity: isMobile ? (currentIndex === index ? 1 : 0.4) : 1,
                  scale: isMobile ? (currentIndex === index ? 1 : 0.96) : 1,
                }}
                style={{
                  width: isMobile ? "85vw" : "380px"
                }}
              >
                <Card className="border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-700 overflow-hidden h-full flex flex-col group rounded-none md:rounded-lg">
                  <LocalizedClientLink href={`/products/${item.handle}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 85vw, 380px"
                      className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
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
                      <h3 className="text-xl font-serif font-bold text-brand-brown leading-tight h-14 line-clamp-2">
                        {item.name}
                      </h3>
                    </LocalizedClientLink>
                  </CardHeader>
                  <div className="p-6 pt-2 mt-auto">
                    <LocalizedClientLink href={`/products/${item.handle}`}>
                      <Button className="w-full bg-brand-brown text-white hover:bg-brand-olive border-0 rounded-none h-11 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500">
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
