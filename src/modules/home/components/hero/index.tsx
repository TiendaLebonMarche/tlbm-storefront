"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const SLIDES = [
  {
    id: 1,
    title: "AUDIOPREMIUM",
    subtitle: "COLLECCIÓN DE PARLANTES",
    description: "Sonido envolvente. Diseño que desafía la gravedad.",
    buttonText: "Explorar Sonido",
    buttonLink: "/store?category=parlantes",
    image: "/images/hero/speakers.png",
    align: "left",
  },
  {
    id: 2,
    title: "LUJO URBANO",
    subtitle: "BOLSOS & MALETINES",
    description: "La elegancia funcional para el profesional moderno.",
    buttonText: "Ver Colección",
    buttonLink: "/store?category=bolsos",
    image: "/images/hero/bags.png",
    align: "right",
  },
  {
    id: 3,
    title: "TECH ELITE",
    subtitle: "DRONES & STARLINK",
    description: "Conectividad sin fronteras. Accesorios de otro nivel.",
    buttonText: "Descubrir Tech",
    buttonLink: "/store?category=tech",
    image: "/images/hero/tech.png",
    align: "center",
  }
]

const Hero = () => {
  const [current, setCurrent] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full h-full flex items-center"
        >
          {/* Background Image with Ken Burns effect */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={SLIDES[current].image}
              alt={SLIDES[current].title}
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
            {/* Gradient Overlay for texture/depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 opacity-40" />
          </motion.div>

          {/* Content Wrapper */}
          <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex items-center">
            <div className={`w-full max-w-4xl flex flex-col ${
              SLIDES[current].align === "center" ? "items-center text-center mx-auto" :
              SLIDES[current].align === "right" ? "items-end text-right ml-auto" : 
              "items-start text-left"
            }`}>
              
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/60 font-sans tracking-[0.4em] text-[10px] md:text-[12px] uppercase font-bold mb-4"
              >
                {SLIDES[current].subtitle}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white font-sans text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6"
              >
                {SLIDES[current].title.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-white/80 font-sans font-light text-lg md:text-xl lg:text-2xl max-w-xl mb-10"
              >
                {SLIDES[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Link
                  href={SLIDES[current].buttonLink}
                  className="inline-flex items-center group overflow-hidden"
                >
                  <div className="bg-white text-black px-10 py-4 font-sans font-bold uppercase text-[12px] tracking-[0.2em] relative z-10 group-hover:text-white transition-colors duration-500 rounded-none border border-white">
                    <span className="flex items-center gap-4">
                      {SLIDES[current].buttonText}
                      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:translate-x-2">
                        <path d="M13 1L17 5L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 z-[-1]" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="relative h-1 w-12 bg-white/20 overflow-hidden"
              >
                {current === i && (
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    style={{ originX: 0 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Vertical Decoration - Left */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-10 z-20">
             <span className="rotate-90 text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase whitespace-nowrap">EXTREME LUXURY</span>
             <div className="w-[1px] h-20 bg-white/10" />
             <span className="text-white font-bold text-[10px] tracking-widest">0{current + 1}</span>
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Progress bar at the top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-[100]">
        <motion.div
          key={current}
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear" }}
        />
      </div>
    </section>
  )
}

export default Hero
