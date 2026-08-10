"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { CollectionCard } from "."

// Carousel SNAP SUAVE (10-ago-2026): scroll-snap nativo + scrollTo smooth.
// Se reemplazó el marquee continuo (rAF 45px/s + zoom por frame) que se sentía
// pesado/mareante. Ahora: tarjetas GRANDES (hasta 340px), movimiento SOLO al
// avanzar (autoplay 4.5s / flechas / swipe), pausa hover+touch, reduced-motion.
const AUTOPLAY_MS = 4500

export default function CollectionsCarouselClient({ cards }: { cards: CollectionCard[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [paused, setPaused] = useState(false)

  // Respetar prefers-reduced-motion (WCAG): sin autoplay
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const scrollToCard = useCallback(
    (dir: 1 | -1) => {
      const viewport = viewportRef.current
      if (!viewport) return
      const card = viewport.querySelector<HTMLElement>("[data-cat-card]")
      const cardW = card ? card.offsetWidth + 16 : 340
      viewport.scrollBy({ left: dir * cardW, behavior: reducedMotion ? "auto" : "smooth" })
    },
    [reducedMotion]
  )

  // Autoplay suave: avanza una tarjeta cada 4.5s (salvo pausa hover/touch)
  useEffect(() => {
    if (reducedMotion || paused) return
    const id = setInterval(() => scrollToCard(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [reducedMotion, paused, scrollToCard])

  return (
    <section className="cats-section" aria-labelledby="cats-title">
      <div className="cats-head">
        <div className="cats-eyebrow">Explora</div>
        <h2 id="cats-title" className="cats-title">
          Descubre tu próxima <span className="cats-gold">obsesión</span>
        </h2>
        <p className="cats-sub">Productos 100% originales, seleccionados para ti</p>
      </div>

      <div
        ref={viewportRef}
        className="cats-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="cats-track">
          {cards.map((c) => (
            <LocalizedClientLink
              key={c.handle}
              href={`/collections/${c.handle}`}
              className="cat-card"
              data-cat-card="true"
            >
              <img src={c.image} alt={c.name} loading="lazy" decoding="async" className="cat-img" />
              <span className="cat-overlay">
                <span className="cat-label">Explora</span>
                <span className="cat-name">{c.name}</span>
                <span className="cat-btn">
                  Ingresar <span aria-hidden="true">→</span>
                </span>
              </span>
            </LocalizedClientLink>
          ))}
        </div>

        <button className="cats-nav prev" onClick={() => scrollToCard(-1)} aria-label="Colección anterior">
          ←
        </button>
        <button className="cats-nav next" onClick={() => scrollToCard(1)} aria-label="Siguiente colección">
          →
        </button>
      </div>
    </section>
  )
}
