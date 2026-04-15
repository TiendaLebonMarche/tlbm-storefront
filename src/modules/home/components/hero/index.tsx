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
          LAYOUT MÓVIL (<md) — Absolute figure & overlapping text with proper contrast
         ══════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col justify-between relative" style={{ minHeight: "100svh", paddingTop: "100px" }}>

        {/* ZONA 2: FIGURA — En background abosluto al doble de su tamaño */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none" style={{ top: "80px", bottom: "160px" }}>
          <motion.div
            style={{
              translateY: mobileKawsY,
              scale: mobileKawsScale,
              filter: mobileKawsBlur,
            }}
            className="relative w-full h-full flex items-center justify-center mt-8"
          >
            <Image
              src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1775753741/upscalemedia-transformed_4_e0iqwf.png"
              alt="KAWS Companion Premium"
              width={1600}
              height={1600}
              // Escala aumentada a aprox 2x y object-cover forzando a llenar verticalmente sin romper boundaries
              className="object-contain w-[180%] max-w-[220%] sm:w-[150%] scale-[1.35] origin-center contrast-[1.3] brightness-[1.05] saturate-[1.25]"
              priority
              quality={100}
            />
          </motion.div>
        </div>

        {/* ZONA 1: SLOGAN — Texto superpuesto superior */}
        <motion.div
          style={{ opacity: mobileContentOp }}
          className="flex-none w-full px-5 pt-6 pb-3 flex flex-col items-center text-center z-30 reveal-right-hero delay-200 pointer-events-none select-none relative"
        >
          {/* Difuminado suave por detrás del texto para contraste con la imagen negra gigante */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F2F2E1]/90 via-[#F2F2E1]/60 to-transparent blur-sm z-[-1]" />
          
          <p className="font-sans text-brand-brown text-[12px] leading-[1.3] uppercase tracking-[0.05em] max-w-[280px] drop-shadow-[0px_0px_12px_rgba(242,242,225,1)]">
            <span className="font-extrabold italic underline decoration-[#A6FF00]/80 decoration-[3px] underline-offset-[3px] transition-all duration-500 hover:decoration-[#A6FF00]">
              NORMAL, QUE NO AGUANTEN LA PRESIÓN,
            </span>
            <span className="mt-3 block font-medium opacity-80 tracking-wider">MANEJAMOS PRODUCTOS</span>
            <span className="block font-black text-[1.15em] tracking-wide mt-0.5">ORIGINALES Y EXÓTICOS</span>
          </p>
        </motion.div>

        {/* ZONA 3: H1 + CTA — Texto superpuesto inferior */}
        <motion.div
          style={{ opacity: mobileContentOp }}
          className="flex-none w-full bg-gradient-to-t from-[#F2F2E1] via-[#F2F2E1]/95 to-transparent pt-24 pb-14 px-5 flex flex-col items-center text-center z-30 reveal-up-hero pointer-events-none select-none relative"
        >
          <div className="max-w-[300px] drop-shadow-[0px_0px_12px_rgba(242,242,225,1)] relative z-10">
            <h1 className="text-brand-brown font-sans text-[17px] font-light leading-[1.45] tracking-[0.02em] relative">
              La primera <span className="font-serif italic font-normal tracking-normal">tienda virtual</span>
              <br />
              en <span className="font-normal tracking-[0.05em]">Bucaramanga</span>.
              <span className="block mt-6 text-[0.7em] font-light opacity-60 tracking-[0.25em] uppercase transition-opacity duration-500">
                Con un ejército de bots,
              </span>
              <span className="block mt-2">
                buscando los <span className="font-serif italic font-normal opacity-90 tracking-normal">mejores productos</span>
              </span>
              <span className="block mt-5 text-[1.2em] font-light tracking-[0.2em] uppercase items-center justify-center flex gap-2">
                Para ti <span className="text-[0.65em] mt-0.5 opacity-80 grayscale-[0.3] hover:scale-110 transition-transform duration-300">❤️</span>
              </span>
            </h1>
          </div>
        </motion.div>
      </div>

      {/* METADATA (mobile only) — absolute bottom, encima del h1 */}
      <div className="md:hidden absolute bottom-3 left-0 z-40 w-full px-4 flex flex-wrap justify-between items-end gap-x-2 gap-y-1 text-brand-brown/40 select-none pointer-events-none">
        {[
          { label: "Tienda ---", value: "LE BON MARCHÉ" },
          { label: "Slogan ---", value: "PROD. ORIG. Y EX." },
          { label: "Ubic. ---", value: "BUCARAMANGA" },
          { label: "By ---", value: "TLBM®" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-start">
            <span className="text-[7px] uppercase tracking-[0.25em] font-black opacity-20 mb-0.5 whitespace-nowrap">{label}</span>
            <span className="font-sans font-bold text-[7.5px] uppercase whitespace-nowrap">{value}</span>
          </div>
        ))}
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
            <h1 className="text-brand-brown font-sans text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-light leading-[1.4] tracking-[0.03em] relative transition-all duration-700 ease-out">
              La primera <span className="font-serif italic font-normal tracking-normal">tienda virtual</span>
              <br />
              en <span className="font-normal tracking-[0.05em]">Bucaramanga</span>.
              <span className="block mt-7 md:mt-9 text-[0.65em] font-light opacity-60 tracking-[0.25em] uppercase hover:opacity-80 transition-opacity duration-500">
                Con un ejército de bots,
              </span>
              <span className="block mt-2.5">
                buscando los <span className="font-serif italic font-normal opacity-90 tracking-normal">mejores productos</span>
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
              <span className="font-extrabold italic underline decoration-[#A6FF00]/80 decoration-[3px] lg:decoration-[5px] underline-offset-[3px] transition-all duration-500 hover:decoration-[#A6FF00]">
                NORMAL, QUE NO AGUANTEN LA PRESIÓN,
              </span>
              <span className="mt-4 block font-medium opacity-80 tracking-wider">MANEJAMOS PRODUCTOS</span>
              <span className="block font-black text-[1.15em] lg:text-[1.25em] tracking-wide mt-1">ORIGINALES Y EXÓTICOS</span>
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
