"use client"

import { useCallback, useEffect, useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { CategoryCard } from "."

// Carousel de MOVIMIENTO CONTINUO Y CONSTANTE (marquee rAF): el track avanza a velocidad
// fija; al completar la copia A, reinicia a la posición equivalente de la copia B (seamless,
// invisible). Zoom suave en la tarjeta que CRUZA el centro del viewport (calculado por posición
// en cada frame — más preciso que IntersectionObserver para marquee). Flechas: pausa + salto
// de una tarjeta con transición suave. Pausa al hover/touch.
const SPEED_PX_S = 30
const CARD_STEP_MS = 400
const RESUME_AFTER_MANUAL_MS = 3500

export default function CategoriesCarouselClient({ cards }: { cards: CategoryCard[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Bucle continuo: movimiento + detección de la tarjeta central
  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const cardEls = Array.from(track.querySelectorAll<HTMLElement>("[data-cat-card]"))
    const halfWidth = () => track.scrollWidth / 2

    const applyCenter = () => {
      const vRect = viewport.getBoundingClientRect()
      const centerX = vRect.left + vRect.width / 2
      let active: HTMLElement | null = null
      for (const c of cardEls) {
        const r = c.getBoundingClientRect()
        if (r.left <= centerX && r.right >= centerX) {
          active = c
          break
        }
      }
      cardEls.forEach((c) => {
        const is = c === active
        c.classList.toggle("cat-center", is)
        c.classList.toggle("cat-side", !is)
      })
    }

    let frameCount = 0
    const frame = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTsRef.current) {
          const dt = (ts - lastTsRef.current) / 1000
          offsetRef.current += SPEED_PX_S * dt
          if (offsetRef.current >= halfWidth()) {
            offsetRef.current -= halfWidth()
          }
        }
        track.style.transform = `translateX(${-offsetRef.current}px)`
        // Calcular la central cada ~6 frames (evita trabajo innecesario por frame)
        frameCount++
        if (frameCount % 6 === 0) applyCenter()
      }
      lastTsRef.current = ts
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const pause = useCallback(() => {
    pausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }, [])

  const resume = useCallback(() => {
    pausedRef.current = false
  }, [])

  const pauseTemporarily = useCallback(() => {
    pause()
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(resume, RESUME_AFTER_MANUAL_MS)
  }, [pause, resume])

  const step = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current
      if (!track) return
      const card = track.querySelector<HTMLElement>("[data-cat-card]")
      const stepPx = card ? card.offsetWidth + 5 : 260
      const half = track.scrollWidth / 2
      offsetRef.current = (offsetRef.current + dir * stepPx + half) % half
      track.style.transition = `transform ${CARD_STEP_MS}ms cubic-bezier(0.16,1,0.3,1)`
      track.style.transform = `translateX(${-offsetRef.current}px)`
      setTimeout(() => {
        track.style.transition = "none"
      }, CARD_STEP_MS)
      pauseTemporarily()
    },
    [pauseTemporarily]
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
        ref={viewportRef}
        className="cats-viewport"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        <div ref={trackRef} className="cats-track">
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
                  Ingresar <span aria-hidden="true">→</span>
                </span>
              </span>
            </LocalizedClientLink>
          ))}
        </div>
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
