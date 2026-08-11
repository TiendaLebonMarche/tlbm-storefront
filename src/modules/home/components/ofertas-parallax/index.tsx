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
    align: "right",
  },
  {
    title: "Smartwatches",
    subtitle: "Smartwatches seleccionados con envío a toda Colombia",
    bg: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786479579/mascotas/mascota-oferta-smart-v2.jpg",
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
        {offers.map((offer, i) => {
          const active = i === current
          return (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                active
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-[1.03] pointer-events-none"
              }`}
            >
              {/* Background image — parallax */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
                style={{
                  backgroundImage: `url('${offer.bg}')`,
                }}
              />

              {/* Overlay gradient — texto SIEMPRE a la derecha */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(-90deg, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0.5) 45%, transparent 75%)",
                }}
              />

              {/* Vignette inferior sutil para anclar el botón */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,10,15,0.35) 0%, transparent 30%)",
                }}
              />

              {/* Content — derecha */}
              <div className="relative z-10 h-full max-w-[90rem] mx-auto px-6 lg:px-10 flex items-center">
                <div className="max-w-lg ml-auto text-right">
                  {/* Label — stagger 1 */}
                  <div
                    className={`inline-flex items-center justify-end gap-3 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[.35em] mb-6 transition-all duration-700 delay-150 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    <span className="w-8 h-px bg-[#D4AF37]/40" />
                    {offer.label}
                  </div>

                  {/* Título — stagger 2 */}
                  <h2
                    className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-[.9] mb-5 text-white transition-all duration-700 delay-300 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    {offer.title}
                  </h2>

                  {/* Subtítulo — stagger 3 */}
                  <p
                    className={`text-base md:text-lg leading-relaxed mb-9 font-light text-white/60 transition-all duration-700 delay-450 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    {offer.subtitle}
                  </p>

                  {/* Botón — stagger 4 */}
                  <div
                    className={`transition-all duration-700 delay-600 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    <LocalizedClientLink
                      href={offer.href}
                      className="group relative inline-flex items-center gap-3 px-9 py-4 text-[11px] font-bold uppercase tracking-[.25em] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
                      style={{
                        background: "#0A0A0F",
                        border: "1px solid rgba(212,175,55,0.5)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                      }}
                    >
                      {/* Shine sweep */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      Comprar Ahora
                      <svg
                        className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {offers.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-500 ${
              i === current
                ? "w-10 h-2 bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60 hover:scale-125"
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
