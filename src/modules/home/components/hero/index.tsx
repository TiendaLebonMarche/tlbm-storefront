"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Smooth springs for buttery motion
  const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth) - 0.5
      const y = (clientY / innerHeight) - 0.5
      xSpring.set(x * 35) 
      ySpring.set(y * 35)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [xSpring, ySpring])

  // Scroll parallax for KAWS
  const kawsTranslateY = useTransform(scrollY, [0, 1000], [0, 200])
  const kawsScale = useTransform(scrollY, [0, 500], [1, 0.95])
  
  // Opacity for elements on scroll
  const elementsOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[110vh] min-h-[850px] flex flex-col items-center justify-between overflow-hidden bg-[#F2F2E1] font-sans"
    >
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 1. TOP SECTION (Independent Text Blocks) */}
      <div className="relative z-30 w-full px-6 md:px-16 pt-32 md:pt-48 grid grid-cols-1 md:grid-cols-12 gap-y-12 select-none h-full">
        
        {/* TOP LEFT: Serif Phrase */}
        <motion.div 
          style={{ opacity: elementsOpacity }}
          className="md:col-span-4 flex flex-col gap-8"
        >
          <div className="max-w-[280px]">
            <p className="font-serif italic text-brand-brown text-base md:text-lg leading-tight tracking-tight reveal-up">
              Donde el arte encuentra la tecnología, cada hallazgo una obra maestra. ———
            </p>
          </div>
          
          {/* MIDDLE LEFT: AI Selection */}
          <div className="flex flex-col gap-3 reveal-up delay-100">
             <div className="w-14 h-14 rounded-full border border-brand-brown/20 flex items-center justify-center text-xs font-bold text-brand-brown/40 mb-2">
               R
             </div>
             <div className="max-w-[180px]">
               <p className="font-sans font-bold text-[10px] md:text-xs text-brand-brown/60 uppercase tracking-widest leading-relaxed">
                 R Selección Curada por IA /<br />Inteligencia de Vanguardia.
               </p>
             </div>
          </div>
        </motion.div>

        {/* MIDDLE RIGHT: Neon Bold Block & Description */}
        <motion.div 
          style={{ opacity: elementsOpacity }}
          className="md:col-span-8 flex flex-col items-end text-right"
        >
          <h1 className="text-[#A6FF00] font-sans font-black text-5xl md:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter uppercase reveal-right">
            LA PRIMERA<br />
            TIENDA VIRTUAL EN<br />
            BUCARAMANGA, DONDE<br />
            MILES DE BOTS BUSCAN<br />
            LAS MEJORES<br />
            OFERTAS PARA TI ❤️
          </h1>
          
          <div className="mt-8 md:mt-12 max-w-[360px] reveal-right delay-200">
            <p className="font-sans font-bold text-[11px] md:text-xs text-[#A6FF00] uppercase tracking-wide leading-relaxed">
              Esta es una curaduría inteligente, procesada por algoritmos avanzados para encontrar los precios más bajos en productos exclusivos, garantizando originalidad y rapidez en cada entrega.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. CENTER PIECE: BLACK COMPANION KAWS (FURRY TEXTURE) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pt-20">
        <motion.div
           style={{
             x: xSpring,
             y: ySpring,
             translateY: kawsTranslateY,
             scale: kawsScale,
           }}
           className="relative h-[75%] w-full max-w-6xl flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Usamos una versión de alta calidad con textura 3D detallada */}
            <Image
              src="https://images.squarespace-cdn.com/content/v1/593f66311e5b6c8a74e2d31c/1518063065406-V5A42I2YI8S759F7Z757/KAWS.png" 
              alt="Black Companion KAWS Furs"
              width={1200}
              height={1200}
              className="object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.25)] brightness-110"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* 3. METADATA BASEBAR (On Cream Background) */}
      <div className="relative z-30 w-full px-6 md:px-16 pt-20 pb-12 flex flex-col md:flex-row justify-between items-end gap-6 text-brand-brown/80 mix-blend-multiply select-none">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.3em] font-black opacity-40 mb-1">Title —</span>
          <span className="font-sans font-bold text-sm md:text-base">ANTIGRAVITY ECOMMERCE</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.3em] font-black opacity-40 mb-1">Date —</span>
          <span className="font-sans font-bold text-sm md:text-base">07.04.2026</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.3em] font-black opacity-40 mb-1">Time —</span>
          <span className="font-sans font-bold text-sm md:text-base">11:30 GMT-5</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.3em] font-black opacity-40 mb-1">Theme —</span>
          <span className="font-sans font-bold text-sm md:text-base uppercase">SMART SELECTION</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .reveal-up { opacity: 0; animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-right { opacity: 0; animation: revealRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 300ms; }
      `}</style>
    </section>
  )
}

export default Hero
