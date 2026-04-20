"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

/*
  ARQUITECTURA HERO:
  
  MÓVIL (<md)  → Natural flow con 3 zonas apiladas:
    1. [Slogan]      — z-30, fondo crema, sin overlap posible
    2. [Figura]      — flex-1, la figura crece para ocupar el espacio disponible
    3. [H1 + CTA]    — z-30, fondo crema, sin overlap posible
    (metadata en bottom absolute sobre la zona del h1)

  TABLET/DESKTOP (≥md) → Grid 3 columnas, figura absolute centrada
    Izquierda: H1 | Centro: spacer | Derecha: Slogan
    Figura: absolute inset-0, anchored to bottom center

  Header heights (FIJOS):
    Marquee:       text-[10px] + py-2.5 = ~32px
    Nav mobile:    logo h-[52px] + py-2    = ~68px  → Total mobile: ~100px
    Nav desktop:   min-h-[76px]            = ~76px  → Total desktop: ~108px
*/

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const springConfig = { stiffness: 25, damping: 45, restDelta: 0.001 }
  const xSpring = useSpring(0, springConfig)
  const ySpring = useSpring(0, springConfig)

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Mouse parallax — sólo desktop
  useEffect(() => {
    if (isMobile || isTablet) return
    const handle = (e: MouseEvent) => {
      xSpring.set((e.clientX / window.innerWidth - 0.5) * 40)
      ySpring.set((e.clientY / window.innerHeight - 0.5) * 40)
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [xSpring, ySpring, isMobile, isTablet])

  // ── Animaciones DESKTOP: scroll parallax de la figura ────────────────────
  const kawsTranslateY = useTransform(
    scrollY, [0, 800],
    [isTablet ? 80 : 110, isTablet ? 210 : 290]
  )
  const kawsScaleStart = isTablet ? 0.80 : 0.82
  const kawsScaleEnd   = isTablet ? 0.65 : 0.70
  const kawsScale  = useTransform(scrollY, [0, 800], [kawsScaleStart, kawsScaleEnd])
  const kawsRotate = useTransform(scrollY, [0, 800], [0, -3])
  const kawsBlur   = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(14px)"])

  // Textos desaparecen al hacer scroll
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const contentY       = useTransform(scrollY, [0, 400], [0, -45])

  // ── Animaciones MÓVIL: scroll parallax de la figura ──────────────────────
  const mobileKawsY     = useTransform(scrollY, [0, 600], [0, 60])
  const mobileKawsScale = useTransform(scrollY, [0, 600], [1, 0.9])
  const mobileKawsBlur  = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(8px)"])
  const mobileContentOp = useTransform(scrollY, [0, 350], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#F2F2E1] font-sans"
      style={{ minHeight: "100svh" }}
    >
      {/* Textura de papel premium */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYOUT MÓVIL (<md) — Satoshi Storefront (Luxury Minimalist)
         ══════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col relative w-full pt-[80px]" style={{ minHeight: "100svh" }}>
        
        {/* BLOQUE SUPERIOR: HEADER TEXT */}
        <div className="w-full flex-none pt-12 pb-6 px-6 z-30">
          <motion.div style={{ opacity: mobileContentOp, y: mobileKawsY }} className="flex flex-col gap-4 text-center items-center">
            <h1 className="text-brand-brown font-serif text-[46px] font-normal leading-[1] tracking-[-0.02em] relative z-20">
              Tienda Virtual
              <br />
              <span className="relative inline-block font-sans italic font-light tracking-[0.02em] text-[32px] opacity-90 mt-2">
                Bucaramanga.
                <svg className="absolute w-[105%] h-[16px] -bottom-[6px] -left-[2.5%] text-brand-olive/80" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M5,15 Q50,5 100,12 T195,15" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-1 text-[13px] font-sans font-light tracking-[0.05em] opacity-70 text-brand-brown max-w-[280px]">
              Ejército de bots buscando los mejores productos.
            </p>
          </motion.div>
        </div>

        {/* BLOQUE CENTRAL: IMAGEN */}
        <div className="relative flex-1 w-full min-h-[400px] flex items-center justify-center z-10 pointer-events-none">
          <motion.div
            style={{
              translateY: mobileKawsY,
              scale: mobileKawsScale,
              filter: mobileKawsBlur,
            }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <Image
              src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775753741/upscalemedia-transformed_4_e0iqwf.png"
              alt="KAWS Companion Premium"
              width={1600}
              height={1600}
              className="object-contain w-full h-full contrast-[1.25] brightness-[1.05] saturate-[1.1]"
              priority
              quality={100}
            />
          </motion.div>
        </div>

        {/* BLOQUE INFERIOR: METADATA & CTA */}
        <div className="w-full flex-none bg-gradient-to-t from-[#F2F2E1] via-[#F2F2E1] to-transparent z-30 pt-12 pb-10 px-6">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="space-y-2">
              <span className="block text-[10px] font-sans uppercase tracking-[0.25em] font-semibold text-brand-brown opacity-60">NORMAL, QUE NO AGUANTEN LA PRESIÓN</span>
              <span className="block font-serif italic text-[18px] text-brand-brown tracking-wide">Productos Originales y Exóticos</span>
            </div>
            
            <button className="px-10 py-3.5 bg-brand-brown text-[#F2F2E1] font-sans font-medium uppercase text-[12px] tracking-[0.2em] transition-all duration-300 hover:bg-brand-black w-full max-w-[280px]">
              Explorar
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYOUT TABLET + DESKTOP (≥md) — Grid 3 cols, figura absolute
         ══════════════════════════════════════════════════════════════════ */}

      {/* FIGURA absolute — z-10 (siempre DETRÁS de los textos z-30) */}
      <div className="hidden md:flex absolute inset-0 items-end justify-center z-10 pointer-events-none">
        <motion.div
          style={{
            x: xSpring,
            y: ySpring,
            translateY: kawsTranslateY,
            scale: kawsScale,
            rotate: kawsRotate,
            filter: kawsBlur,
          }}
          className="relative h-full w-full flex items-end justify-center"
        >
          <div className="relative w-[85%] lg:w-3/4 xl:w-[70%] h-full flex items-end justify-center">
            <Image
              src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775753741/upscalemedia-transformed_4_e0iqwf.png"
              alt="KAWS Companion Premium"
              width={1600}
              height={1600}
              className="object-contain object-bottom transition-all duration-300 contrast-[1.3] brightness-[1.05] saturate-[1.25]"
              priority
              quality={100}
            />
          </div>
        </motion.div>
      </div>

      {/* TEXTOS GRID desktop — z-30 */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="
          hidden md:grid
          relative z-30 w-full pointer-events-none select-none
          grid-cols-[1fr_1.8fr_1fr] lg:grid-cols-[1fr_2.2fr_1fr] items-start
          pt-[120px] lg:pt-[132px]
          px-6 md:px-8 lg:px-14 xl:px-20
        "
      >
        {/* Izquierda: H1 */}
        <div className="flex flex-col items-start text-left pt-8 lg:pt-10 reveal-up-hero">
          <div className="max-w-[340px] md:max-w-[400px] lg:max-w-[460px] xl:max-w-[500px]">
            <h1 className="text-brand-brown font-sans text-[20px] md:text-[22px] lg:text-[26px] xl:text-[32px] font-light leading-[1.3] tracking-[0.01em] relative transition-all duration-700 ease-out z-20">
              La primera <span className="font-serif italic font-normal tracking-wide text-[1.1em]">tienda virtual</span>
              <br />
              en <span className="relative inline-block font-serif italic text-[1.25em] font-medium tracking-[0.02em] mt-1 pr-1">
                Bucaramanga.
                <svg className="absolute w-[105%] h-[16px] xl:h-[20px] -bottom-[4px] xl:-bottom-[6px] -left-[2.5%] text-[#A6FF00]" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M5,15 Q50,5 100,12 T195,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
              <span className="block mt-7 md:mt-10 text-[0.6em] font-sans font-medium opacity-50 tracking-[0.25em] uppercase hover:opacity-80 transition-opacity duration-500">
                Con un ejército de bots,
              </span>
              <span className="block mt-2 font-sans font-light">
                buscando los <span className="font-serif italic font-normal opacity-90 tracking-normal text-[1.05em]">mejores productos</span>
              </span>
              <span className="block mt-6 md:mt-8 text-[1.1em] font-light tracking-[0.2em] uppercase flex items-center justify-start gap-2.5">
                Para ti <span className="text-[0.65em] relative top-0.5 opacity-80 grayscale-[0.3] hover:scale-110 transition-transform duration-300 cursor-default">❤️</span>
              </span>
            </h1>
          </div>
        </div>

        {/* Centro: spacer para la figura absolute */}
        <div />

        {/* Derecha: Slogan */}
        <div className="flex flex-col items-end text-right pt-8 lg:pt-10 reveal-right-hero delay-200">
          <div className="max-w-[300px] lg:max-w-[380px] xl:max-w-[420px]">
            <p className="font-sans text-brand-brown text-[14px] lg:text-[18px] xl:text-[21px] leading-[1.2] uppercase tracking-[0.05em] text-right transition-all duration-700">
              <span className="relative inline-block font-extrabold italic text-[1.1em]">
                NORMAL, QUE NO AGUANTEN LA PRESIÓN,
                <svg className="absolute w-[102%] h-[12px] xl:h-[16px] -bottom-[4px] -left-[1%] text-[#A6FF00]" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M2,16 Q45,2 100,10 T198,14" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="mt-5 block font-medium opacity-70 tracking-wider text-[0.9em]">MANEJAMOS PRODUCTOS</span>
              <span className="block font-black text-[1.25em] lg:text-[1.35em] tracking-wider mt-1.5 font-serif italic">ORIGINALES Y EXÓTICOS</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* METADATA desktop — absolute bottom */}
      <div className="hidden md:flex absolute bottom-4 left-0 z-30 w-full px-12 lg:px-20 flex-wrap justify-between items-end gap-x-6 gap-y-1 text-brand-brown/40 select-none pointer-events-none">
        {[
          { label: "Tienda ---", value: "LE BON MARCHÉ" },
          { label: "Slogan ---", value: "PRODUCTOS ORIGINALES Y EXÓTICOS" },
          { label: "Ubicación ---", value: "BUCARAMANGA" },
          { label: "By ---", value: "TLBM®" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-start group">
            <span className="text-[7px] uppercase tracking-[0.3em] font-black opacity-20 mb-0.5 group-hover:opacity-100 transition-opacity whitespace-nowrap">{label}</span>
            <span className="font-sans font-bold text-[10px] uppercase whitespace-nowrap">{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
