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
  
  // Escala HEROICA perfeccionada (Ajuste para mobile grande)
  const kawsScale = useTransform(
    scrollY, 
    [0, 800], 
    [isMobile ? 0.58 : 0.74, isMobile ? 0.45 : 0.62]
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

      {/* 1. SECCIÓN DE CONTENIDO (DISTRIBUCIÓN ADAPTATIVA) */}
      <div className="relative z-30 w-full px-4 md:px-12 lg:px-14 pt-32 md:pt-40 lg:pt-52 grid grid-cols-1 lg:grid-cols-[1.1fr_2.5fr_1.1fr] items-center lg:items-start pointer-events-none select-none gap-y-4 lg:gap-x-0">
        
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 lg:gap-8 w-full order-3 lg:order-1 mt-6 lg:mt-0"
        >
          <div className="max-w-[280px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[550px]">
            <h1 className="text-brand-brown font-sans font-medium text-[16px] md:text-xl lg:text-xl xl:text-2xl leading-[1.3] tracking-tight uppercase reveal-up-hero">
              La primera <span className="font-serif italic font-black normal-case text-[1.1em] text-brand-brown inline-block">Tienda Virtual</span><br />
              <span className="block mt-1 md:mt-2">En <span className="font-serif italic font-black normal-case text-[1.1em] text-brand-brown underline decoration-brand-brown/20 underline-offset-4">Bucaramanga</span></span>
              <span className="text-[0.7em] md:text-[0.75em] block mt-6 opacity-70 font-bold tracking-[0.2em]">Con un ejército de bots,</span>
              <span className="block mt-1">Buscando los <span className="font-serif italic font-black normal-case text-[1.1em] text-brand-brown">Mejores Productos</span></span>
              <span className="block mt-4 md:mt-6 font-black text-2xl md:text-3xl lg:text-4xl tracking-tighter">PARA TI ❤️</span>
            </h1>
          </div>
        </motion.div>
        
        {/* BLOQUE CENTRAL: FIGURA SPACER (Solo visible en mobile para el flujo vertical) */}
        <div className="w-full lg:min-h-[1px] order-2 h-[20vh] md:h-[25vh] lg:h-auto" />

        {/* BLOQUE DERECHA: Slogans (Top in mobile, Right in desktop) */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentTranslate }}
          className="flex flex-col items-center text-center lg:items-end lg:text-right w-full lg:max-w-[340px] mt-0 lg:mt-0 order-1 lg:order-3"
        >
          <div className="max-w-[280px] md:max-w-[450px] lg:max-w-[500px] lg:pr-4 reveal-right-hero delay-200 lg:mt-12 flex flex-col items-center lg:items-end">
            <p className="font-sans text-brand-brown text-[14px] md:text-lg lg:text-xl xl:text-2xl leading-[1.1] uppercase tracking-tighter text-center lg:text-right">
              <span className="font-black italic underline decoration-[#A6FF00] decoration-[4px] md:decoration-[8px] underline-offset-[-2px] md:underline-offset-[-4px]">NORMAL, QUE NO AGUANTEN LA PRESION,</span><br />
              <span className="mt-4 block font-bold opacity-80">MANEJAMOS PRODUCTOS</span>
              <span className="block font-black text-[1.1em] md:text-[1.2em]">ORIGINALES Y EXÓTICOS</span>
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
             translateY: useTransform(scrollY, [0, 800], [isMobile ? 40 : 100, 240]),
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
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity whitespace-nowrap">Tienda ---</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px] whitespace-nowrap">LE BON MARCHÉ</span>
        </div>
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">SLOGAN ---</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px] uppercase whitespace-nowrap">PRODUCTOS ORIGINALES Y EXÓTICOS</span>
        </div>
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">UBICACION ---</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px] uppercase whitespace-nowrap">BUCARAMANGA</span>
        </div>
        <div className="flex flex-col items-center md:items-start group">
          <span className="text-[8px] uppercase tracking-[0.4em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase">BY ---</span>
          <span className="font-sans font-bold text-[9px] md:text-[11px] uppercase whitespace-nowrap">TLBM®</span>
        </div>
      </div>


    </section>
  )
}

export default Hero
