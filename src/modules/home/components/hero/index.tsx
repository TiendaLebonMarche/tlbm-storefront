"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// ── Logo URL ────────────────────────────────────────────────────────────────
const LOGO_URL =
  "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1784234322/logo-tlbmjul_yidrku.png"

// ── Slide Data ──────────────────────────────────────────────────────────────

interface Slide {
  id: number
  label: string
  title: string
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
}

const SLIDES: Slide[] = [
  {
    id: 1,
    label: "Tecnología Premium",
    title: "Dispositivos que\nmarcan la diferencia",
    subtitle:
      "Los mejores gadgets originales del mercado, seleccionados para quienes exigen calidad y diseño.",
    cta: "Explorar Colección",
    href: "/store",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1920&q=75",
    overlayFrom: "from-black/65",
    overlayTo: "to-black/30",
    textSide: "left",
  },
  {
    id: 2,
    label: "Productos Exclusivos",
    title: "Originalidad que\nte distingue",
    subtitle:
      "Piezas únicas y difíciles de encontrar. Tu estilo merece algo más que lo convencional.",
    cta: "Ver Productos",
    href: "/store?collection=exclusivos",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=75",
    overlayFrom: "from-black/60",
    overlayTo: "to-black/25",
    textSide: "right",
  },
  {
    id: 3,
    label: "Ofertas Especiales",
    title: "Precios que\nno podrás creer",
    subtitle:
      "Descuentos exclusivos en productos seleccionados. Calidad premium a tu alcance.",
    cta: "Ver Ofertas",
    href: "/store",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=75",
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
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1920&q=75",
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

function MarqueeBar() {
  return (
    <div className="relative z-50 bg-[#FFD700] text-black overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee-fixed py-2 md:py-2.5">
        <span className="inline-flex items-center gap-8 mx-4 text-[11px] md:text-[13px] font-bold tracking-[0.15em] uppercase">
          <span>✦</span>
          <span>Tienda Le Bon Marché</span>
          <span>•</span>
          <span>Tienda virtual en Bucaramanga</span>
          <span>•</span>
          <span>Productos exóticos y 100% originales</span>
          <span>✦</span>
        </span>
        <span className="inline-flex items-center gap-8 mx-4 text-[11px] md:text-[13px] font-bold tracking-[0.15em] uppercase">
          <span>✦</span>
          <span>Tienda Le Bon Marché</span>
          <span>•</span>
          <span>Tienda virtual en Bucaramanga</span>
          <span>•</span>
          <span>Productos exóticos y 100% originales</span>
          <span>✦</span>
        </span>
      </div>
    </div>
  )
}

// ── Sticky White Header (appears on scroll) ────────────────────────────────

function ScrollHeader({ visible }: { visible: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-[90] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            visible
              ? "translate-y-0 opacity-100 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)]"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-[60px] md:h-[68px] lg:h-[76px]">
            {/* Hamburger — 3 líneas asimétricas */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[7px] p-2 group cursor-pointer bg-none border-none outline-none"
              aria-label="Menú"
            >
              <span className="block h-[1.5px] bg-black rounded-[2px] transition-all duration-300 w-5 group-hover:w-6" />
              <span className="block h-[1.5px] bg-black rounded-[2px] transition-all duration-300 w-[14px] group-hover:w-5" />
              <span className="block h-[1.5px] bg-black rounded-[2px] transition-all duration-300 w-[18px] group-hover:w-4" />
            </button>

            {/* Logo centrado */}
            <LocalizedClientLink href="/" className="flex items-center h-8 md:h-9">
              <div className="relative w-[130px] md:w-[170px] h-full">
                <Image
                  src={LOGO_URL}
                  alt="Tienda Le Bon Marché"
                  fill
                  sizes="170px"
                  className="object-contain"
                  priority
                />
              </div>
            </LocalizedClientLink>

            <div className="w-9" />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-[60px] border-b border-gray-100">
              <LocalizedClientLink href="/" className="flex items-center h-7">
                <div className="relative w-[120px] h-full">
                  <Image src={LOGO_URL} alt="Tienda Le Bon Marché" fill sizes="120px" className="object-contain" />
                </div>
              </LocalizedClientLink>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-2xl font-light text-gray-400 hover:text-black transition-colors" aria-label="Cerrar menú">
                ✕
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              {[
                { label: "Inicio", href: "/" },
                { label: "Tienda", href: "/store" },
                { label: "Colecciones", href: "/collections" },
                { label: "Ofertas", href: "/store" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                >
                  <LocalizedClientLink
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl md:text-3xl font-serif font-bold text-black hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    {link.label}
                  </LocalizedClientLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Hero Overlay (floating logo + hamburger on hero) ───────────────────────

function HeroOverlay({ visible }: { visible: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full z-30 transition-all duration-500 ${
          visible ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-[95rem] mx-auto px-4 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-[60px] md:h-[72px]">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[7px] p-2 group cursor-pointer bg-none border-none outline-none"
              aria-label="Menú"
            >
              <span className="block h-[1.5px] bg-white rounded-[2px] transition-all duration-300 w-5 group-hover:w-6" />
              <span className="block h-[1.5px] bg-white rounded-[2px] transition-all duration-300 w-[14px] group-hover:w-5" />
              <span className="block h-[1.5px] bg-white rounded-[2px] transition-all duration-300 w-[18px] group-hover:w-4" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2">
              <LocalizedClientLink href="/" className="flex items-center justify-center">
                <div className="relative w-[170px] md:w-[220px] lg:w-[260px] h-[48px] md:h-[56px] lg:h-[64px]">
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

            <div className="w-9" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-[60px] border-b border-gray-100">
              <LocalizedClientLink href="/" className="flex items-center h-7">
                <div className="relative w-[120px] h-full">
                  <Image src={LOGO_URL} alt="Tienda Le Bon Marché" fill sizes="120px" className="object-contain" />
                </div>
              </LocalizedClientLink>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-2xl font-light text-gray-400 hover:text-black transition-colors" aria-label="Cerrar menú">
                ✕
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
              {[
                { label: "Inicio", href: "/" },
                { label: "Tienda", href: "/store" },
                { label: "Colecciones", href: "/collections" },
                { label: "Ofertas", href: "/store" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contact" },
              ].map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                >
                  <LocalizedClientLink
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl md:text-3xl font-serif font-bold text-black hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    {link.label}
                  </LocalizedClientLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Main Hero ───────────────────────────────────────────────────────────────

export default function Hero() {
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
      <MarqueeBar />

      {/* ── SCROLL HEADER (white bar) ── */}
      <ScrollHeader visible={isScrolled} />

      {/* ── HERO SLIDER ── */}
      <section
        className="relative w-full h-screen overflow-hidden bg-black"
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

            {/* Gradient overlays */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${currentSlide.overlayFrom} ${currentSlide.overlayTo}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          </motion.div>
        </AnimatePresence>

        {/* ── Floating header (logo + hamburger) ── */}
        <HeroOverlay visible={isScrolled} />

        {/* ── TEXT CONTENT ── */}
        <div className="absolute inset-0 z-20 flex items-center">
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
                className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] mb-3 md:mb-4"
              >
                <span className="block w-8 h-[1px] bg-[#D4AF37]" />
                {currentSlide.label}
              </motion.span>

              <motion.h1
                custom={1}
                variants={textVariants}
                className="font-serif text-[2.2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[1.05] font-bold text-white whitespace-pre-line"
              >
                {currentSlide.title}
              </motion.h1>

              <motion.p
                custom={2}
                variants={textVariants}
                className="text-sm md:text-base leading-relaxed mt-3 md:mt-5 max-w-[440px] text-white/60"
              >
                {currentSlide.subtitle}
              </motion.p>

              <motion.div custom={3} variants={textVariants} className="mt-6 md:mt-9">
                <LocalizedClientLink
                  href={currentSlide.href}
                  className="group relative inline-flex items-center gap-2 px-7 md:px-9 py-3 md:py-4 rounded-lg text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #C8912E, #B8860B)",
                    color: "#0A0A0F",
                    boxShadow: "0 4px 24px rgba(212,175,55,0.3)",
                  }}
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
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
