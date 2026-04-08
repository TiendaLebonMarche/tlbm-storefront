"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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
  const itemsToShow = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }

  // To solve responsiveness in a simple way for the carousel transform
  const [windowWidth, setWindowWidth] = React.useState(0)

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const currentItemsToShow = windowWidth < 640 ? itemsToShow.mobile : windowWidth < 1024 ? itemsToShow.tablet : itemsToShow.desktop
  
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < items.length - currentItemsToShow

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  return (
    <section className="w-full bg-[#f8f8f8] py-20 md:py-32">
      <div className="content-container px-6">
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
              disabled={!canGoPrev}
              className="rounded-full border-brand-brown/10 hover:border-brand-brown/30 bg-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5 text-brand-brown" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={!canGoNext}
              className="rounded-full border-brand-brown/10 hover:border-brand-brown/30 bg-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5 text-brand-brown" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{ transform: `translateX(-${currentIndex * (100 / currentItemsToShow)}%)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full group"
                style={{ flexBasis: `calc((100% / ${currentItemsToShow}) - (24px * ${currentItemsToShow - 1} / ${currentItemsToShow}))` }}
              >
                <Card className="border-0 bg-white shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                  <LocalizedClientLink href={`/products/${item.handle}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Button className="w-full bg-brand-brown text-white hover:bg-brand-olive border-0 rounded-none h-12 text-[10px] font-bold uppercase tracking-[0.2em]">
                        Ver Detalles
                      </Button>
                    </div>
                  </LocalizedClientLink>
                  <CardHeader className="p-6 pb-2">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive bg-brand-soft px-2 py-0.5">
                        {item.category}
                      </span>
                      <span className="text-sm font-black text-brand-brown tracking-tighter">
                        {item.price}
                      </span>
                    </div>
                    <LocalizedClientLink href={`/products/${item.handle}`}>
                      <h3 className="text-xl font-serif font-bold text-brand-brown leading-tight group-hover:text-brand-olive transition-colors lines-clamp-2">
                        {item.name}
                      </h3>
                    </LocalizedClientLink>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 mt-auto">
                    <div className="w-full h-[1px] bg-gray-100 my-4" />
                    <div className="flex items-center justify-between text-brand-gray/60">
                      <span className="text-[9px] font-bold uppercase tracking-widest">Original & Exótico</span>
                      <ShoppingCart className="size-4 opacity-40" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
