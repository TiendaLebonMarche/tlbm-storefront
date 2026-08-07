"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { CategoryCard } from "."

// Carousel de MOVIMIENTO CONTINUO (marquee rAF) de IZQUIERDA→DERECHA: el track empieza
// mostrando el final de la copia B y avanza hacia el inicio (las tarjetas se desplazan hacia
// la derecha); al llegar al inicio reinicia al final de la copia B (seamless, invisible).
// Zoom central por POSICIÓN real + SWIPE táctil + pausa hover/touch.
const SPEED_PX_S = 30
const CARD_STEP_MS = 400
const RESUME_AFTER_MANUAL_MS = 3500
const SWIPE_THRESHOLD_PX = 20

export default function CategoriesCarouselClient({ cards }: { cards: CategoryCard[] }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pointerRef = useRef<{ x: number; y: number; moved: boolean } | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Respetar prefers-reduced-motion (WCAG): sin animación automática
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // Bucle continuo: movimiento + tarjeta central (solo si no hay reduced-motion)
  useEffect(() => {
    if (reducedMotion) return
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const cardEls = Array.from(track.querySelectorAll<HTMLElement>("[data-cat-card]"))
    const halfWidth = () => track.scrollWidth / 2

    const applyCenter = () => {
      const vRect = viewport.getBoundingClientRect()
      const centerX = vRect.left + vRect.width / 2
      let active: HTMLElement | null = null
      let bestDist = Infinity
      for (const c of cardEls) {
        const r = c.getBoundingClientRect()
        const cCenter = (r.left + r.right) / 2
        const dist = Math.abs(cCenter - centerX)
        if (dist < bestDist) {
          bestDist = dist
          active = c
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
          // IZQUIERDA→DERECHA: el offset crece desde -halfWidth (final de la copia B) hacia 0;
          // al llegar a 0 reinicia a -halfWidth (posición idéntica → invisible)
          offsetRef.current += SPEED_PX_S * dt
          if (offsetRef.current >= 0) {
            offsetRef.current -= halfWidth()
          }
        }
        track.style.transform = `translateX(${-offsetRef.current}px)`
        frameCount++
        if (frameCount % 6 === 0) applyCenter()
      }
      lastTsRef.current = ts
      rafRef.current = requestAnimationFrame(frame)
    }
    // Posición inicial: final del track (copia B) → el primer avance muestra contenido anterior
    offsetRef.current = -halfWidth()
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reducedMotion])

  const pause = useCallback(() => {
    pausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }, [])

  const resume = useCallback(() => {
    pausedRef.current = false
  }, [])

  const pauseTemporarily = useCallback(
    (ms = RESUME_AFTER_MANUAL_MS) => {
      pause()
      resumeTimerRef.current = setTimeout(resume, ms)
    },
    [pause, resume]
  )

  const setOffset = useCallback((next: number, animate = true) => {
    const track = trackRef.current
    if (!track) return
    const half = track.scrollWidth / 2
    offsetRef.current = ((next % half) + half) % half
    if (animate) track.style.transition = `transform ${CARD_STEP_MS}ms cubic-bezier(0.16,1,0.3,1)`
    track.style.transform = `translateX(${-offsetRef.current}px)`
    if (animate) {
      setTimeout(() => {
        track.style.transition = "none"
      }, CARD_STEP_MS)
    }
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current
      if (!track) return
      const card = track.querySelector<HTMLElement>("[data-cat-card]")
      const stepPx = card ? card.offsetWidth + 5 : 260
      setOffset(offsetRef.current + dir * stepPx)
      pauseTemporarily()
    },
    [setOffset, pauseTemporarily]
  )

  // SWIPE táctil: pointer events en el viewport; swipe > umbral ajusta el offset y
  // cancela el click del link (evita navegar accidentalmente al deslizar)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY, moved: false }
    pause()
  }, [pause])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const p = pointerRef.current
    if (!p) return
    const dx = e.clientX - p.x
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      p.moved = true
      // Arrastre en vivo (sin transición): seguir el dedo
      const track = trackRef.current
      if (track) {
        track.style.transition = "none"
        track.style.transform = `translateX(${-(offsetRef.current - dx)}px)`
      }
    }
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const p = pointerRef.current
      pointerRef.current = null
      if (!p) return
      const dx = e.clientX - p.x
      if (p.moved) {
        // Liberar: fijar el offset al salto de tarjeta más cercano
        const track = trackRef.current
        if (track) {
          const card = track.querySelector<HTMLElement>("[data-cat-card]")
          const stepPx = card ? card.offsetWidth + 5 : 260
          const dir = dx < 0 ? 1 : -1
          setOffset(offsetRef.current - dx + dir * stepPx * 0.5)
        }
        pauseTemporarily(1500)
      } else {
        resume()
      }
    },
    [setOffset, pauseTemporarily, resume]
  )

  const onPointerCancel = useCallback(() => {
    pointerRef.current = null
    resume()
  }, [resume])

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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div ref={trackRef} className="cats-track">
          {[...cards, ...cards].map((c, i) => {
            const isClone = i >= cards.length
            return (
              <LocalizedClientLink
                key={`${c.handle}-${i}`}
                href={`/categories/${c.handle}`}
                className="cat-card cat-side"
                data-cat-card="true"
                aria-hidden={isClone}
                tabIndex={isClone ? -1 : 0}
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
            )
          })}
        </div>

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
