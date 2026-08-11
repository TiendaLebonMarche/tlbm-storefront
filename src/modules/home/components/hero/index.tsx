"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TopMarquee from "@modules/common/components/top-marquee"
import HeaderSearchControls from "@modules/layout/components/header-search-controls"

// ── Logo URL ────────────────────────────────────────────────────────────────
const LOGO_URL = "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785517677/logo-TLBM-trpar_qtqudf.png"

// ── Slide Data ──────────────────────────────────────────────────────────────

interface Slide {
  id: number
  label: string
  title: string
  /** Frase a resaltar en dorado sólido (1 sola — regla oro solo acento) */
  highlight?: string
  subtitle: string
  cta: string
  href: string
  /** Primary media: image URL */
  image: string
  /** Optional video URL (if present, plays instead of static image) */
  video?: string
  overlayFrom: string
  overlayTo: string
  textSide: "left" | "right"
  /** Tema del texto según el fondo de la imagen: "light" = texto blanco sobre
   * imagen oscura; "dark" = texto negro sobre imagen clara (slider 1 luminoso). */
  textTheme?: "light" | "dark"
  /** Alineación vertical del bloque texto+botón: "center" (default) o "top"
   * (para composiciones con espacio libre arriba, como el slider 1). */
  alignY?: "center" | "top"
}

const SLIDES: Slide[] = [
  {
    id: 1,
    label: "Tienda Virtual Bucaramanga",
    title: "Tecnología original,\ndifícil de encontrar",
    highlight: "difícil de encontrar",
    subtitle:
      "Las marcas que amas, 100% originales, con envío a toda Colombia.",
    cta: "Descubrir Colección",
    href: "/store",
    image:
      "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786465781/hero/hero-slider1v4.jpg",
    overlayFrom: "from-black/0",
    overlayTo: "to-black/0",
    textSide: "left",
    textTheme: "dark",
    alignY: "top",
  },
  {
    id: 2,
    label: "Productos Exclusivos",
    title: "Originalidad que\nte distingue",
    highlight: "te distingue",
    subtitle:
      "Piezas únicas que no encuentras en cualquier tienda, para tu estilo.",
    cta: "Ver Productos",
    href: "/store",
    image:
      "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786466596/hero/hero-slider2v1.jpg",
    overlayFrom: "from-black/0",
    overlayTo: "to-black/0",
    textSide: "right",
    textTheme: "dark",
  },
  {
    id: 3,
    label: "Ofertas Especiales",
    title: "Ofertas reales en\nproductos originales",
    subtitle:
      "Descuentos en productos seleccionados. La calidad que buscas, al mejor precio.",
    cta: "Ver Ofertas",
    href: "/store",
    image:
      "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1785842112/hero/hero-3.jpg",
    overlayFrom: "from-black/55",
    overlayTo: "to-black/20",
    textSide: "left",
  },
  {
    id: 4,
    label: "Bucaramanga",
    title: "Hecho para ti,\ndesde Santander",
    subtitle:
      "Tienda virtual con corazón bumangués. Envíos a toda Colombia con el mejor servicio.",
    cta: "Conócenos",
    href: "/store",
    image:
      "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1785842113/hero/hero-4.jpg",
    overlayFrom: "from-black/60",
    overlayTo: "to-black/25",
    textSide: "right",
  },
]

// ── Variants (framer-motion) ────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
}

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

// ── Slide Media (image or video) ────────────────────────────────────────────

function SlideMedia({
  slide,
  isActive,
}: {
  slide: Slide
  isActive: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !slide.video) return
    if (isActive) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isActive, slide.video])

  return (
    <>
      {/* Image (always renders as fallback / poster) */}
      <Image
        src={slide.image}
        alt={slide.label}
        fill
        sizes="100vw"
        className={`object-cover transition-opacity duration-500 ${
          slide.video && isActive ? "opacity-0" : "opacity-100"
        }`}
        priority={slide.id <= 2}
        fetchPriority={slide.id === 1 ? "high" : "auto"}
      />

      {/* Video (plays only when active) */}
      {slide.video && (
        <video
          ref={videoRef}
          src={slide.video}
          muted
          loop
          playsInline
          preload={isActive ? "auto" : "none"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  )
}

// ── Marquee ─────────────────────────────────────────────────────────────────
// La marquesina superior ahora vive en @modules/common/components/top-marquee
// para reutilizarse en el index (variante dorada) y en páginas de producto
// (variante oscura). Ver TopMarquee.

// ── Sticky White Header (appears on scroll) ────────────────────────────────

function ScrollHeader({ visible, menuSlot, cartSlot }: { visible: boolean; menuSlot?: React.ReactNode; cartSlot?: React.ReactNode }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-[90] transition-all duration-500
        ${
          visible
            ? "translate-y-0 opacity-100 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
    >
      <div className="max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-[60px] md:h-[68px] lg:h-[76px]">
          {/* Hamburger — MISMO drawer SideMenu que todas las páginas (regla 10-ago) */}
          <div className="flex-none">{menuSlot}</div>

          {/* Logo centrado */}
          <LocalizedClientLink href="/" className="flex items-center h-10 md:h-12">
            <div className="relative w-[170px] md:w-[220px] h-full">
              <Image
                src={LOGO_URL}
                alt="Tienda Le Bon Marché"
                fill
                sizes="220px"
                className="object-contain"
                priority
              />
            </div>
          </LocalizedClientLink>

          {/* Right: Search (lupa), Theme, Cart — igual que todas las páginas (10-ago) */}
          <div className="flex items-center justify-end gap-3 lg:gap-5">
            <HeaderSearchControls />
            {cartSlot}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Hero Overlay (floating logo + hamburger on hero) ───────────────────────

function HeroOverlay({ visible, menuSlot, cartSlot }: { visible: boolean; menuSlot?: React.ReactNode; cartSlot?: React.ReactNode }) {
  return (
    <div
      className={`absolute top-0 left-0 w-full z-30 transition-all duration-500 ${
        visible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-[60px] md:h-[72px]">
          {/* Hamburger blanca (sobre hero oscuro) — MISMO drawer SideMenu que todas las páginas */}
          <div className="flex-none text-white">{menuSlot}</div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <LocalizedClientLink href="/" className="flex items-center justify-center">
              <div className="relative w-[170px] md:w-[220px] lg:w-[260px] h-[51px] md:h-[65px] lg:h-[77px]">
                <Image
                  src={LOGO_URL}
                  alt="Tienda Le Bon Marché"
                  fill
                  sizes="260px"
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </LocalizedClientLink>
          </div>

          {/* Right: Search (lupa), Theme, Cart — blancos sobre el hero oscuro */}
          <div className="flex items-center justify-end gap-3 lg:gap-5 text-white">
            <HeaderSearchControls />
            {cartSlot}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Hero ───────────────────────────────────────────────────────────────

export default function Hero({ menuSlot, cartSlot }: { menuSlot?: React.ReactNode; cartSlot?: React.ReactNode }) {
  const [[slideIndex, direction], setSlideState] = useState([0, 0])
  const [isScrolled, setIsScrolled] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [paused, setPaused] = useState(false)

  const totalSlides = SLIDES.length

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── Auto-play (12s) ──
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setSlideState(([current]) => [(current + 1) % totalSlides, 1])
    }, 12000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused, totalSlides])

  const goTo = useCallback((index: number) => {
    setSlideState(([current]) => {
      const dir = index > current ? 1 : -1
      return [index, dir]
    })
  }, [])

  const next = useCallback(() => {
    setSlideState(([current]) => [(current + 1) % totalSlides, 1])
  }, [totalSlides])

  const prev = useCallback(() => {
    setSlideState(([current]) => [(current - 1 + totalSlides) % totalSlides, -1])
  }, [totalSlides])

  const currentSlide = SLIDES[slideIndex]

  return (
    <>
      {/* ── MARQUEE ── */}
      <TopMarquee />

      {/* ── SCROLL HEADER (white bar) — mismo drawer que todas las páginas ── */}
      <ScrollHeader visible={isScrolled} menuSlot={menuSlot} cartSlot={cartSlot} />

      {/* ── HERO SLIDER ── */}
      <section
        className="relative w-full min-h-[100dvh] max-h-[700px] overflow-hidden bg-black"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <SlideMedia slide={currentSlide} isActive={true} />

            {/* Gradient overlays — solo en slides oscuros (light theme no necesita) */}
            {currentSlide.textTheme !== "dark" && (
              <>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${currentSlide.overlayFrom} ${currentSlide.overlayTo}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Floating header (logo + hamburger) ── */}
        <HeroOverlay visible={isScrolled} menuSlot={menuSlot} cartSlot={cartSlot} />

        {/* ── TEXT CONTENT ── */}
        <div
          className={`absolute inset-0 z-20 flex ${
            currentSlide.alignY === "top"
              ? "items-start pt-20 md:pt-24 lg:pt-28"
              : "items-center"
          }`}
        >
          <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
            <motion.div
              key={`text-${slideIndex}`}
              className={`max-w-[580px] ${
                currentSlide.textSide === "right"
                  ? "ml-auto text-right md:items-end"
                  : "text-left md:items-start"
              } flex flex-col`}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                custom={0}
                variants={textVariants}
                className={`inline-flex items-center gap-2 text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase mb-3 md:mb-4 ${
                  currentSlide.textTheme === "dark"
                    ? "text-[#B8860B]"
                    : "text-[#D4AF37]"
                }`}
              >
                <span
                  className={`block w-8 h-[1px] ${
                    currentSlide.textTheme === "dark"
                      ? "bg-[#B8860B]"
                      : "bg-[#D4AF37]"
                  }`}
                />
                {currentSlide.label}
              </motion.span>

              <motion.h1
                custom={1}
                variants={textVariants}
                className={`font-serif font-semibold whitespace-pre-line text-[2.05rem] min-[375px]:text-[2.2rem] sm:text-[2.7rem] md:text-[3.1rem] lg:text-[3.9rem] min-[1440px]:text-[4.5rem] min-[1920px]:text-[5rem] leading-[1.08] md:leading-[1.06] lg:leading-[1.03] min-[1440px]:leading-[1.01] min-[1920px]:leading-[1] tracking-[-0.008em] sm:tracking-[-0.01em] lg:tracking-[-0.012em] min-[1440px]:tracking-[-0.015em] text-balance max-w-[18ch] lg:max-w-[20ch] ${
                  currentSlide.textTheme === "dark"
                    ? "text-brand-black"
                    : "text-white"
                }`}
              >
                {currentSlide.highlight && currentSlide.title.includes(currentSlide.highlight)
                  ? (() => {
                      const parts = currentSlide.title.split(currentSlide.highlight)
                      return (
                        <>
                          {parts[0]}
                          <span className="text-[#B8860B]">{currentSlide.highlight}</span>
                          {parts[1]}
                        </>
                      )
                    })()
                  : currentSlide.title}
              </motion.h1>

              <motion.p
                custom={2}
                variants={textVariants}
                className={`text-sm md:text-base leading-relaxed mt-3 md:mt-5 max-w-[440px] ${
                  currentSlide.textTheme === "dark"
                    ? "text-brand-gray"
                    : "text-white/60"
                }`}
              >
                {currentSlide.subtitle}
              </motion.p>

              <motion.div custom={3} variants={textVariants} className="mt-6 md:mt-9">
                <LocalizedClientLink
                  href={currentSlide.href}
                  className={`group relative inline-flex items-center gap-2 px-7 md:px-9 py-3 md:py-4 rounded-full text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:opacity-90 active:scale-[0.98] ${
                    currentSlide.textTheme === "dark"
                      ? "bg-[#0A0A0F] text-white border border-brand-black/10 shadow-[0_8px_30px_rgba(10,10,15,0.18)] hover:shadow-[0_12px_40px_rgba(10,10,15,0.28)] hover:-translate-y-0.5"
                      : "bg-[#0A0A0F] text-white border border-white/10"
                  }`}
                >
                  <span className="relative z-10">{currentSlide.cta}</span>
                  <svg
                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </LocalizedClientLink>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── ARROWS ── */}
        <button
          onClick={prev}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
          aria-label="Anterior"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
          aria-label="Siguiente"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ── SLIDE INDICATORS (numbered) ── */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 md:gap-3">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goTo(index)}
              className={`group flex items-center gap-2 transition-all duration-500 ${
                index === slideIndex ? "" : "opacity-40 hover:opacity-70"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  index === slideIndex
                    ? "w-8 md:w-10 h-[2px] bg-[#D4AF37]"
                    : "w-2 h-2 bg-white/60 group-hover:bg-white"
                }`}
              />
              <span
                className={`text-[9px] font-bold tracking-[0.15em] transition-all duration-500 ${
                  index === slideIndex ? "text-[#D4AF37]" : "text-white/50"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        {/* ── Pause indicator ── */}
        <div className="absolute bottom-6 md:bottom-10 right-6 md:right-10 z-20">
          <span className="text-[9px] font-medium tracking-[0.15em] text-white/30">
            {paused ? "❚❚" : "▶"} AUTO
          </span>
        </div>
      </section>
    </>
  )
}
