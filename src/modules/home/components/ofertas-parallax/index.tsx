"use client"

import { useState, useEffect, useCallback } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const offers = [
  {
    title: "Audio Profesional",
    subtitle: "Parlantes y auriculares con la mejor fidelidad de sonido",
    bg: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786479006/mascotas/mascota-oferta-audio.jpg",
    bgMobile: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786480089/mascotas/mascota-oferta-audio-mob.jpg",
    label: "Precio de Selección",
    href: "/store?q=audio",
    align: "right",
  },
  {
    title: "Smartwatches",
    subtitle: "Smartwatches seleccionados con envío a toda Colombia",
    bg: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786479579/mascotas/mascota-oferta-smart-v2.jpg",
    bgMobile: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786480127/mascotas/mascota-oferta-smart-mob.png",
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
      {/* Slides container — mobile 56vh (imagen vertical 3:4), desktop 85vh (16:9) */}
      <div className="relative h-[56vh] min-h-[480px] md:h-[85vh]">
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
              {/* Background image — mobile vertical / desktop parallax */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
                style={{
                  backgroundImage: `url('${offer.bg}')`,
                  // Mobile: imagen vertical 3:4 nativa (sin recorte), desktop 16:9
                  ["--mobile-bg" as string]: `url('${offer.bgMobile}')`,
                }}
                data-bg-mobile={offer.bgMobile}
              />

              {/* Overlay — mobile: gradiente inferior (texto abajo); desktop: derecho */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.45) 35%, transparent 60%)",
                }}
              />
              <div
                className="absolute inset-0 hidden md:block"
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

              {/* Content — mobile: abajo-centro; desktop: derecha */}
              <div className="relative z-10 h-full max-w-[90rem] mx-auto px-6 lg:px-10 flex items-end md:items-center pb-16 md:pb-0">
                <div className="w-full md:max-w-lg md:ml-auto text-center md:text-right">
                  {/* Label — stagger 1 */}
                  <div
                    className={`inline-flex items-center justify-center md:justify-end gap-3 text-gold text-[10px] font-bold uppercase tracking-[.35em] mb-4 transition-all duration-700 delay-150 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    <span className="w-8 h-px bg-gold/40" />
                    {offer.label}
                  </div>

                  {/* Título — stagger 2 */}
                  <h2
                    className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tighter leading-[.95] mb-4 text-white transition-all duration-700 delay-300 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    {offer.title}
                  </h2>

                  {/* Subtítulo — stagger 3 */}
                  <p
                    className={`text-base md:text-lg leading-relaxed mb-7 font-light text-white/70 transition-all duration-700 delay-450 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    {offer.subtitle}
                  </p>

                  {/* Botón — stagger 4 */}
                  <div
                    className={`flex md:block justify-center transition-all duration-700 delay-600 ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                  >
                    <LocalizedClientLink
                      href={offer.href}
                      className="group relative inline-flex items-center gap-3 px-9 py-4 text-[11px] font-bold uppercase tracking-[.25em] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]"
                      style={{
                        background: 'var(--ink)',
                        border: "1px solid rgba(212,175,55,0.5)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                      }}
                    >
                      {/* Shine sweep */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      Comprar Ahora
                      <svg
                        className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5"
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
                ? "w-10 h-2 bg-gold shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60 hover:scale-125"
            }`}
            aria-label={`Ir a oferta ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/10">
        <div
          className="h-full bg-gold transition-[width] duration-200 ease-linear"
          style={{
            width: `${((current + 1) / offers.length) * 100}%`,
          }}
        />
      </div>

      {/* Switcher móvil: la imagen vertical se aplica por CSS (media query) */}
      <style jsx>{`
        @media (max-width: 767px) {
          [data-bg-mobile] {
            background-image: var(--mobile-bg) !important;
            background-size: cover !important;
            background-position: center !important;
          }
        }
      `}</style>
    </section>
  )
}
