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
  
  // Escala dinámica: +20% en móvil (aprox 0.96) vs 0.8 en desktop
  const kawsScale = useTransform(
    scrollY, 
    [0, 800], 
    [isMobile ? 0.62 : 0.72, isMobile ? 0.52 : 0.62]
  ) 
  
  const kawsRotate = useTransform(scrollY, [0, 800], [0, -4])
  
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

      {/* 1. SECCIÓN DE CONTENIDO (TEXTOS INDEPENDIENTES) */}
      <div className="relative z-30 w-full px-6 md:px-16 lg:px-24 pt-44 md:pt-40 lg:pt-52 grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-y-12 pointer-events-none select-none">
        
        {/* BLOQUE IZQUIERDA: Editorial (Now main heading) */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 lg:gap-12 lg:max-w-xl"
        >
          <div className="max-w-[700px]">
            <h1 className="text-brand-brown font-sans font-black text-3xl md:text-5xl lg:text-[2.8rem] leading-[0.85] tracking-tighter uppercase reveal-up drop-shadow-[0_2px_10px_rgba(242,242,225,0.8)]">
              LA PRIMERA<br />
              TIENDA VIRTUAL EN<br />
              BUCARAMANGA, DONDE<br />
              MILES DE BOTS BUSCAN<br />
              LO MÁS TOP PARA TI ❤️
            </h1>
          </div>
          
          {/* Oculto en Responsive: R Selección IA */}
          <div className="hidden lg:flex flex-col gap-4 reveal-up delay-100">
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

        {/* BLOQUE DERECHA: Descripción Disruptiva */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col items-center text-center lg:items-end lg:text-right -mt-4 lg:mt-0"
        >
          <div className="mt-8 lg:mt-12 max-w-[500px] reveal-right delay-200">
            <p className="font-sans text-brand-brown text-sm md:text-base lg:text-lg leading-relaxed uppercase tracking-tighter">
              <span className="font-black italic underline decoration-[#A6FF00] decoration-4">NORMAL</span> que por nuestros precios, el <span className="font-black italic text-brand-brown">bro se desmaye!</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. ELEMENTO CENTRAL: KAWS COMPANION (DINÁMICO) */}
      <div className="absolute inset-0 flex items-end justify-center lg:justify-end z-10 pointer-events-none">
        <motion.div
           style={{
             x: xSpring,
             y: ySpring,
             translateY: kawsTranslateY,
             scale: kawsScale,
             rotate: kawsRotate,
             filter: kawsBlur,
           }}
           className="relative h-[80%] md:h-[85%] lg:h-[90%] w-full max-w-[120rem] flex items-end justify-center lg:justify-end"
        >
          <div className="relative w-full lg:w-2/5 h-full flex flex-col items-center justify-end lg:items-end lg:pr-32">
            {/* Sombra de contacto en el "suelo" - Refinada y Premium */}
            <motion.div 
              style={{ scaleX: useTransform(scrollY, [0, 500], [1, 1.5]), opacity: useTransform(scrollY, [0, 500], [0.1, 0.02]) }}
              className="absolute bottom-[5px] w-2/3 h-12 bg-black/30 blur-3xl rounded-[100%] z-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-32 lg:translate-x-0"
            />
            
            <div className="relative w-full h-full flex items-end justify-center lg:justify-end overflow-visible">
              <Image
                src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775750283/upscalemedia-transformed_3_mbu5oc.png" 
                alt="KAWS Companion Premium"
                width={1200}
                height={1200}
                className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] opacity-100 transition-all duration-300 contrast-[1.02] brightness-[1.05]"
                style={{ maskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)' }}
                priority
                quality={100}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Degradado sutil de profundidad en la base - Muy suave */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/[0.03] to-transparent z-[11] pointer-events-none" />

      {/* 3. METADATA EN LA BASE */}
      <div className="relative z-30 w-full px-6 md:px-16 lg:px-24 pb-12 flex flex-col md:flex-row justify-between items-end gap-6 text-brand-brown/40 select-none">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Tienda —</span>
          <span className="font-sans font-bold text-xs md:text-sm">LE BON MARCHÉ</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Slogan —</span>
          <span className="font-sans font-bold text-xs md:text-sm uppercase">Productos Exoticos & Originales.</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">Ubicacion —</span>
          <span className="font-sans font-bold text-xs md:text-sm uppercase">BUCARAMANGA, SANTANDER</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-30 mb-1">By —</span>
          <span className="font-sans font-bold text-xs md:text-sm uppercase">TIENDA LE BON MARCHÉ</span>
        </div>
      </div>

      <style jsx global>{`
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
      `}</style>
    </section>
  )
}

export default Hero
