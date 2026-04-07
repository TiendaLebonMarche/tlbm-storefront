"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Movimiento suave para el muñeco (suave como un suspiro)
  const springConfig = { stiffness: 60, damping: 20, restDelta: 0.001 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      // Normalizamos de -0.5 a 0.5 para el centro
      const x = (clientX / innerWidth) - 0.5
      const y = (clientY / innerHeight) - 0.5
      xSpring.set(x * 30) // Intensidad moderada del movimiento
      ySpring.set(y * 30)
    }

    const container = containerRef.current
    if (container) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [xSpring, ySpring])

  // Efecto scroll parallax para el KAWS (más suave y profundo)
  const kawsTranslateY = useTransform(scrollY, [0, 1000], [0, 220])
  const kawsScale = useTransform(scrollY, [0, 800], [1.15, 1.05]) // Escalado inicial mayor para que esté más cerca
  const kawsRotate = useTransform(scrollY, [0, 800], [0, -3])
  
  // Opacidad para los textos al hacer scroll
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[750px] flex flex-col items-center justify-between overflow-hidden bg-[#F2F2E1]"
    >
      {/* Capa de textura sutil de papel premium */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 1. SECCIÓN SUPERIOR DE TEXTOS (INDEPENDIENTES Y RESPONSIVOS) */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-20 pt-32 md:pt-40 grid grid-cols-1 lg:grid-cols-2 gap-y-12 pointer-events-none select-none">
        
        {/* BLOQUE IZQUIERDA: Frase con estilo editorial */}
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="flex flex-col gap-12 lg:max-w-md"
        >
          <div className="max-w-[280px]">
            <p className="font-serif italic text-brand-brown text-xl md:text-2xl leading-[1.1] tracking-tight reveal-up">
              Donde el arte encuentra la tecnología, cada hallazgo es una chimba. ———
            </p>
          </div>
          
          {/* MIDDLE LEFT: Selección con inteligencia */}
          <div className="flex flex-col gap-4 reveal-up delay-100">
             <div className="w-16 h-16 rounded-full border border-brand-brown/10 flex items-center justify-center text-xs font-bold text-brand-brown/30 mb-2">
               R
             </div>
             <div className="max-w-[200px]">
               <p className="font-sans font-bold text-[11px] text-brand-brown/50 uppercase tracking-widest leading-relaxed">
                 R Los elegidos de la IA /<br />Inteligencia que la rompe.
               </p>
             </div>
          </div>
        </motion.div>

        {/* BLOQUE DERECHA: Título Principal en NEGRO (Más reducido) */}
        <motion.div 
          style={{ opacity: contentOpacity }}
          className="flex flex-col lg:items-end text-left lg:text-right"
        >
          <h1 className="text-brand-brown font-sans font-black text-4xl md:text-5xl lg:text-7xl leading-[0.85] tracking-tighter uppercase reveal-right">
            LA PRIMERA<br />
            TIENDA VIRTUAL EN<br />
            BUCARAMANGA, DONDE<br />
            MILES DE BOTS BUSCAN<br />
            LO MÁS TOP PARA TI ❤️
          </h1>
          
          {/* Descripción Juvenil */}
          <div className="mt-8 lg:mt-10 max-w-[400px] reveal-right delay-200">
            <p className="font-sans font-bold text-[12px] md:text-sm text-brand-brown/70 uppercase tracking-wide leading-relaxed">
              Pillamos lo mejor de lo mejor por todo el mundo con algoritmos de otro nivel, encontrando los precios más breves en productos exclusivos, garantizando que todo sea original y te llegue de una.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. ELEMENTO CENTRAL: KAWS COMPANION UPSCALE (MÁS CERCANO) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pt-24 lg:pt-12">
        <motion.div
           style={{
             x: xSpring,
             y: ySpring,
             translateY: kawsTranslateY,
             scale: kawsScale,
             rotate: kawsRotate,
           }}
           className="relative h-[95%] w-full max-w-6xl flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Imagen del KAWS Companion UPSCALE proporcionada por el usuario */}
            <Image
              src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775591992/upscalemedia-transformed_1_vrg9sa.png" 
              alt="KAWS Companion Upscale"
              width={1400}
              height={1400}
              className="object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.22)]"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* 3. METADATA EN LA BASE (SOBRE FONDO CREMA) */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-20 pb-10 flex flex-col md:flex-row justify-between items-end gap-6 text-brand-brown/40 select-none">
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
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .reveal-up { opacity: 0; animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .reveal-right { opacity: 0; animation: revealRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 200ms; }
        .delay-200 { animation-delay: 400ms; }
      `}</style>
    </section>
  )
}

export default Hero
