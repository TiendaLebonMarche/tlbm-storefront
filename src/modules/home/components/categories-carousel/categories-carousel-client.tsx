"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { CategoryCard } from "."

// Carousel por pasos suaves + LOOP SEAMLESS: el track lleva 2 copias idénticas; al llegar
// al final de la copia A, el scroll se reinicia sin animación a la posición equivalente de
// la copia B → el ciclo última→primera es INVISIBLE (movimiento continuo).
// Zoom suave en la tarjeta central (IntersectionObserver). Pausa al hover/touch. Flechas laterales.
const AUTOPLAY_MS = 3500
const PAUSE_AFTER_MANUAL_MS = 6000

export default function CategoriesCarouselClient({ cards }: { cards: CategoryCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const manualTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Avance por pasos con reinicio invisible (loop seamless)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const card = el.querySelector<HTMLElement>("[data-cat-card]")
      const step = card ? card.offsetWidth + 10 : 260
      const halfWidth = el.scrollWidth / 2
      if (el.scrollLeft >= halfWidth - 2) {
        // Fin de la copia A → saltar a la posición equivalente de la copia B (invisible)
        el.scrollTo({ left: el.scrollLeft - halfWidth, behavior: "instant" })
      } else {
        el.scrollBy({ left: step, behavior: "smooth" })
      }
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  // Zoom suave en la tarjeta central
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const cardEls = Array.from(el.querySelectorAll<HTMLElement>("[data-cat-card]"))
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
            best = e
          }
        }
        cardEls.forEach((c) => {
          const active = best && c === best.target
          c.classList.toggle("cat-center", !!active)
          c.classList.toggle("cat-side", !active)
        })
      },
      { root: el, threshold: [0.4, 0.6, 0.8] }
    )
    cardEls.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  const pause = useCallback(() => setPaused(true), [])
  const resume = useCallback(() => {
    setPaused(false)
    if (manualTimer.current) clearTimeout(manualTimer.current)
    manualTimer.current = setTimeout(() => setPaused(false), PAUSE_AFTER_MANUAL_MS)
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current
      if (!el) return
      const card = el.querySelector<HTMLElement>("[data-cat-card]")
      const stepPx = card ? card.offsetWidth + 10 : 260
      el.scrollBy({ left: dir * stepPx, behavior: "smooth" })
      pause()
      if (manualTimer.current) clearTimeout(manualTimer.current)
      manualTimer.current = setTimeout(() => setPaused(false), PAUSE_AFTER_MANUAL_MS)
    },
    [pause]
  )

  return (
    <section className="cats-section" aria-labelledby="cats-title">
      <div className="cats-head">
        <div className="cats-eyebrow">Explora</div>
        <h2 id="cats-title" className="cats-title">
          Nuestras <span className="cats-diamond" aria-hidden="true">◆</span> Categorías
        </h2>
        <p className="cats-sub">Productos 100% originales, seleccionados para ti</p>
      </div>

      <div
        ref={trackRef}
        className="cats-track"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {[...cards, ...cards].map((c, i) => (
          <LocalizedClientLink
            key={`${c.handle}-${i}`}
            href={`/categories/${c.handle}`}
            className="cat-card cat-side"
            data-cat-card="true"
          >
            <img src={c.image} alt={c.name} loading="lazy" className="cat-img" />
            <span className="cat-overlay">
              <span className="cat-label">Explora</span>
              <span className="cat-name">{c.name}</span>
              <span className="cat-btn">
                Shop <span aria-hidden="true">→</span>
              </span>
            </span>
          </LocalizedClientLink>
        ))}
      </div>

      <div className="cats-controls">
        <button className="cats-nav prev" onClick={() => step(-1)} aria-label="Categoría anterior">
          ←
        </button>
        <button className="cats-nav next" onClick={() => step(1)} aria-label="Siguiente categoría">
          →
        </button>
      </div>
    </section>
  )
}
