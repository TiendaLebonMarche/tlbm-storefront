"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Movimiento suave y dinámico para el personaje (Efecto Parallax Vivo)
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth) - 0.5
      const y = (clientY / innerHeight) - 0.5
      xSpring.set(x * 55) 
      ySpring.set(y * 55)
    }

    const container = containerRef.current
    if (container) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [xSpring, ySpring])

  // Parallax de scroll: Profundidad y escala
  const kawsTranslateY = useTransform(scrollY, [0, 800], [0, 150])
  const kawsScale = useTransform(scrollY, [0, 600], [1.1, 1.0]) 
  const kawsRotate = useTransform(scrollY, [0, 800], [0, -6])
  
  // Opacidad y movimiento de salida para los textos
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const contentTranslate = useTransform(scrollY, [0, 400], [0, -40])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[800px] flex flex-col items-center justify-between overflow-hidden bg-[#F2F2E1] font-sans"
    >
      {/* Capa de textura sutil de papel premium */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 1. SECCIÓN DE CONTENIDO (TEXTOS INDEPENDIENTES) */}
      <div className="relative z-30 w-full px-6 md:px-16 lg:px-24 pt-32 md:pt-44 grid grid-cols-1 lg:grid-cols-2 gap-y-12 pointer-events-none select-none">
        
        {/* BLOQUE IZQUIERDA: Editorial */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col gap-12 lg:max-w-md"
        >
          <div className="max-w-[320px]">
            <p className="font-serif italic text-brand-brown text-xl md:text-2xl lg:text-3xl leading-[1.1] tracking-tight reveal-up">
              Donde el arte encuentra la tecnología, cada hallazgo es una chimba. ———
            </p>
          </div>
          
          <div className="flex flex-col gap-4 reveal-up delay-100">
             <div className="w-14 h-14 rounded-full border border-brand-brown/10 flex items-center justify-center text-[10px] font-bold text-brand-brown/30 mb-1">
               R
             </div>
             <div className="max-w-[220px]">
               <p className="font-sans font-bold text-[12px] text-brand-brown/50 uppercase tracking-widest leading-relaxed">
                 R Los elegidos de la IA /<br />Inteligencia que la rompe.
               </p>
             </div>
          </div>
        </motion.div>

        {/* BLOQUE DERECHA: Título Principal */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col lg:items-end text-left lg:text-right"
        >
          <h1 className="text-brand-brown font-sans font-black text-3xl md:text-5xl lg:text-[3.2rem] leading-[0.85] tracking-tighter uppercase reveal-right">
            LA PRIMERA<br />
            TIENDA VIRTUAL EN<br />
            BUCARAMANGA, DONDE<br />
            MILES DE BOTS BUSCAN<br />
            LO MÁS TOP PARA TI ❤️
          </h1>
          
          {/* Descripción Disruptiva y Santandereana */}
          <div className="mt-10 lg:mt-12 max-w-[450px] reveal-right delay-200">
            <p className="font-sans text-brand-brown text-sm md:text-base lg:text-lg leading-relaxed uppercase tracking-tighter">
              <span className="font-black italic underline decoration-[#A6FF00] decoration-4">NORMAL</span> que por nuestros precios, al Bro le de la <span className="font-black italic text-brand-brown">Pálida!</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. ELEMENTO CENTRAL: KAWS COMPANION UPSCALE (OPTIMIZADO) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pt-24 lg:pt-16 pb-12">
        <motion.div
           style={{
             x: xSpring,
             y: ySpring,
             translateY: kawsTranslateY,
             scale: kawsScale,
             rotate: kawsRotate,
           }}
           className="relative h-[90%] w-full max-w-5xl flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775593561/upscalemedia-transformed_2_mckxtd.png" 
              alt="KAWS Companion Premium"
              width={1400}
              height={1400}
              className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.18)]"
              priority
              quality={90}
            />
          </div>
        </motion.div>
      </div>

      {/* 3. METADATA EN LA BASE */}
      <div className="relative z-30 w-full px-6 md:px-16 lg:px-24 pb-12 flex flex-col md:flex-row justify-between items-end gap-6 text-brand-brown/40 select-none">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Title —</span>
          <span className="font-sans font-bold text-xs md:text-sm">ANTIGRAVITY ECOMMERCE</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Date —</span>
          <span className="font-sans font-bold text-xs md:text-sm">07.04.2026</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Time —</span>
          <span className="font-sans font-bold text-xs md:text-sm">11:30 GMT-5</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Theme —</span>
          <span className="font-sans font-bold text-xs md:text-sm uppercase">SMART SELECTION</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .reveal-up { opacity: 0; animation: revealUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-right { opacity: 0; animation: revealRight 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 250ms; }
        .delay-200 { animation-delay: 500ms; }
      `}</style>
    </section>
  )
}

export default Hero
