"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Movimiento suave y dinámico (Efecto Inmersivo)
  const springConfig = { stiffness: 35, damping: 30, restDelta: 0.001 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  // Detectamos si es móvil de forma simple para el escalado
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth) - 0.5
      const y = (clientY / innerHeight) - 0.5
      xSpring.set(x * 40) 
      ySpring.set(y * 40)
    }

    const container = containerRef.current
    if (container) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [xSpring, ySpring])

  // Parallax de scroll súper fluido
  const kawsTranslateY = useTransform(scrollY, [0, 800], [0, 150])
  
  // Escala dinámica perfeccionada para CERO solapamiento
  const kawsScale = useTransform(
    scrollY, 
    [0, 800], 
    [isMobile ? 0.38 : 0.48, isMobile ? 0.3 : 0.4]
  ) 
  
  const kawsRotate = useTransform(scrollY, [0, 800], [0, -3])
  
  // Efecto Blur progresivo al hacer scroll para legibilidad
  const kawsBlur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(12px)"])

  // Opacidad y movimiento de salida para los textos
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const contentTranslate = useTransform(scrollY, [0, 450], [0, -60])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] min-h-[700px] flex flex-col items-center justify-between overflow-hidden bg-[#F2F2E1] font-sans"
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

      {/* 1. SECCIÓN DE CONTENIDO (GRID DE 3 COLUMNAS PARA EVITAR SOLAPE) */}
      <div className="relative z-30 w-full px-6 md:px-16 lg:px-24 pt-32 md:pt-40 lg:pt-52 grid grid-cols-1 lg:grid-cols-3 items-center lg:items-start pointer-events-none select-none gap-y-8 lg:gap-x-12">
        
        {/* BLOQUE IZQUIERDA: Editorial */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 lg:gap-8 w-full"
        >
          <div className="max-w-[260px] md:max-w-[500px] lg:w-full">
            <h1 className="text-brand-brown font-sans font-black text-xl md:text-3xl lg:text-[2.2rem] leading-[1] tracking-tighter uppercase reveal-up">
              LA PRIMERA<br />
              TIENDA VIRTUAL<br />
              <span className="font-serif italic font-bold normal-case tracking-tight text-brand-brown lg:text-[2.6rem] block lg:my-1">en Bucaramanga</span><br />
              <span className="text-[0.85em] md:text-[0.9em]">CON UN EJERCITO DE BOTS,</span><br />
              <span className="font-serif italic font-bold normal-case tracking-tight text-brand-brown lg:text-[2.6rem] block lg:my-1">buscando los mejores productos</span><br />
              PARA TI ❤️
            </h1>
          </div>
        </motion.div>
        
        {/* BLOQUE CENTRAL: Espacio reservado para la figura (Oculto en stack mobile) */}
        <div className="hidden lg:block w-full h-[1px]" />

        {/* BLOQUE DERECHA: Descripción Disruptiva */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col items-center text-center lg:items-end lg:text-right w-full lg:max-w-[280px] mt-2 lg:mt-0"
        >
          <div className="lg:mt-12 max-w-[240px] md:max-w-[280px] reveal-right delay-200">
            <p className="font-sans text-brand-brown text-[10px] md:text-sm lg:text-sm leading-relaxed uppercase tracking-tighter">
              <span className="font-black italic underline decoration-[#A6FF00] decoration-4">NORMAL</span> que por nuestros precios, el <span className="font-black italic text-brand-brown">bro se desmaye!</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. ELEMENTO CENTRAL: KAWS COMPANION (DINÁMICO) */}
      <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
        <motion.div
           style={{
             x: xSpring,
             y: ySpring,
             translateY: useTransform(scrollY, [0, 800], [isMobile ? 120 : 80, 200]),
             scale: kawsScale,
             rotate: kawsRotate,
             filter: kawsBlur,
           }}
           className="relative h-full w-full max-w-[140rem] flex items-end justify-center z-10"
        >
          <div className="relative w-full lg:w-3/4 h-full flex flex-col items-center justify-end">
            <div className="relative w-full h-full flex items-end justify-center overflow-visible">
              <Image
                src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775753741/upscalemedia-transformed_4_e0iqwf.png" 
                alt="KAWS Companion Premium"
                width={1600}
                height={1600}
                className="object-contain object-bottom opacity-100 transition-all duration-300 contrast-[1.3] brightness-[1.1] saturate-[1.3]"
                priority
                quality={100}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Degradado removed as per user instruction "NO debe llevar sombras" */}

      {/* 3. METADATA EN LA BASE - Reposicionada para evitar solapamiento */}
      <div className="absolute bottom-6 left-0 z-30 w-full px-6 md:px-16 lg:px-24 flex flex-wrap justify-center md:justify-between items-end gap-x-8 gap-y-2 text-brand-brown/40 select-none pointer-events-none">
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity">Tienda —</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px]">LE BON MARCHÉ</span>
        </div>
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity">Slogan —</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px] uppercase">Productos Exoticos.</span>
        </div>
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity">Ubicacion —</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px] uppercase">BUCARAMANGA</span>
        </div>
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity">By —</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px] uppercase">TLBM®</span>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(40px); }
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
        .font-serif { font-family: 'Playfair Display', serif !important; }
      `}</style>
    </section>
  )
}

export default Hero
