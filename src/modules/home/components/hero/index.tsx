"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Movimiento suave y con "más vida" para el muñeco
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth) - 0.5
      const y = (clientY / innerHeight) - 0.5
      xSpring.set(x * 50) // Aumentamos intensidad para "más vida"
      ySpring.set(y * 50)
    }

    const container = containerRef.current
    if (container) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [xSpring, ySpring])

  // Parallax de scroll más dinámico
  const kawsTranslateY = useTransform(scrollY, [0, 800], [0, 150])
  const kawsScale = useTransform(scrollY, [0, 600], [0.85, 0.75]) // Reducido un 20%+ para elegancia
  const kawsRotate = useTransform(scrollY, [0, 800], [0, -8])
  const kawsFloating = useTransform(scrollY, [0, 800], [0, -20])
  
  // Opacidad y movimiento de salida para los textos
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const contentTranslate = useTransform(scrollY, [0, 300], [0, -30])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[700px] flex flex-col items-center justify-between overflow-hidden bg-[#F2F2E1] font-sans"
    >
      {/* Textura sutil y elegante */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 1. SECCIÓN DE TEXTOS (MÁS PEQUEÑOS Y ELEGANTES) */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-24 pt-32 md:pt-44 grid grid-cols-1 lg:grid-cols-2 gap-y-12 pointer-events-none select-none">
        
        {/* IZQUIERDA: Editorial */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col gap-10 lg:max-w-sm"
        >
          <div className="max-w-[260px]">
            <p className="font-serif italic text-brand-brown text-lg md:text-xl leading-[1.1] tracking-tight reveal-up">
              Donde el arte encuentra la tecnología, cada hallazgo es una chimba. ———
            </p>
          </div>
          
          <div className="flex flex-col gap-3 reveal-up delay-100">
             <div className="w-12 h-12 rounded-full border border-brand-brown/10 flex items-center justify-center text-[10px] font-bold text-brand-brown/30 mb-1">
               R
             </div>
             <div className="max-w-[180px]">
               <p className="font-sans font-bold text-[10px] text-brand-brown/50 uppercase tracking-widest leading-relaxed">
                 R Los elegidos de la IA /<br />Inteligencia que la rompe.
               </p>
             </div>
          </div>
        </motion.div>

        {/* DERECHA: Título reducido un 50% para elegancia */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col lg:items-end text-left lg:text-right"
        >
          <h1 className="text-brand-brown font-sans font-black text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tighter uppercase reveal-right">
            LA PRIMERA<br />
            TIENDA VIRTUAL EN<br />
            BUCARAMANGA, DONDE<br />
            MILES DE BOTS BUSCAN<br />
            LO MÁS TOP PARA TI ❤️
          </h1>
          
          {/* Descripción con lenguaje Santandereano/Colombiano refinado */}
          <div className="mt-6 lg:mt-8 max-w-[320px] reveal-right delay-200">
            <p className="font-sans font-bold text-[11px] md:text-xs text-brand-brown/70 uppercase tracking-wide leading-relaxed">
              Miles de bots buscando y comprando los mejores productos del mercado.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. ELEMENTO CENTRAL: KAWS COMPANION (REDUCIDO 20% Y MÁS VIVO) */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center z-10 pointer-events-none pt-20">
        <motion.div
           style={{
             x: xSpring,
             y: ySpring,
             translateY: kawsTranslateY,
             scale: kawsScale,
             rotate: kawsRotate,
           }}
           className="relative h-[85%] w-full max-w-4xl flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775591992/upscalemedia-transformed_1_vrg9sa.png" 
              alt="KAWS Companion Upscale"
              width={1000}
              height={1000}
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* 3. METADATA EN LA BASE */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-24 pb-10 flex flex-col md:flex-row justify-between items-end gap-6 text-brand-brown/30 select-none">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Title —</span>
          <span className="font-sans font-bold text-xs">ANTIGRAVITY ECOMMERCE</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Date —</span>
          <span className="font-sans font-bold text-xs">07.04.2026</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Time —</span>
          <span className="font-sans font-bold text-xs">11:30 GMT-5</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Theme —</span>
          <span className="font-sans font-bold text-xs uppercase">SMART SELECTION</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(30px); }
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
