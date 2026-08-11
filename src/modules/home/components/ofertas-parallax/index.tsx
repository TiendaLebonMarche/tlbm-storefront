"use client"

import { useState, useEffect, useCallback } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const offers = [
  {
    title: "Audio Profesional",
    subtitle: "Parlantes y auriculares con la mejor fidelidad de sonido",
    bg: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786479006/mascotas/mascota-oferta-audio.jpg",
    label: "Precio de Selección",
    href: "/store?q=audio",
    align: "left",
  },
  {
    title: "Smartwatches",
    subtitle: "Smartwatches seleccionados con envío a toda Colombia",
    bg: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786479032/mascotas/mascota-oferta-smart.jpg",
    label: "Selección Global",
    href: "/store?q=smartwatch",
    align: "right",
  },
]

export default function OfertasParallax() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((idx: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(idx)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % offers.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 10000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Slides container */}
      <div className="relative h-[56vh] min-h-[420px] md:h-[85vh]">
        {offers.map((offer, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              i === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.02] pointer-events-none"
            }`}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
              style={{
                backgroundImage: `url('${offer.bg}')`,
              }}
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  offer.align === "left"
                    ? "linear-gradient(90deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.4) 50%, transparent 100%)"
                    : "linear-gradient(-90deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.4) 50%, transparent 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full max-w-[90rem] mx-auto px-6 lg:px-10 flex items-center">
              <div
                className={`max-w-lg transition-all duration-700 delay-200 ${
                  i === current
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${
                  offer.align === "right" ? "ml-auto text-right" : "text-left"
                }`}
              >
                <div className="inline-flex items-center gap-3 text-[#D4AF37]/80 text-[9px] font-bold uppercase tracking-[.35em] mb-6">
                  <span className="w-8 h-px bg-[#D4AF37]/40" />
                  {offer.label}
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-[.9] mb-6 text-white">
                  {offer.title}
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-8 font-light text-white/40">
                  {offer.subtitle}
                </p>
                <LocalizedClientLink
                  href={offer.href}
                  className="group inline-flex items-center gap-2.5 px-8 py-4 text-white font-bold text-[10px] uppercase tracking-[.25em] rounded-full btn-shine hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20"
                  style={{
                    background: "#0A0A0F",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  Comprar Ahora
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {offers.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 ${
              i === current
                ? "w-10 h-2 bg-[#D4AF37]"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Ir a oferta ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <div
          className="h-full bg-[#D4AF37] transition-[width] duration-200 ease-linear"
          style={{
            width: `${((current + 1) / offers.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}
