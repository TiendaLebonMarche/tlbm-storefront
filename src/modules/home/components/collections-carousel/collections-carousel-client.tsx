"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { CollectionCard } from "."

// Carousel de MOVIMIENTO CONTINUO (marquee rAF): las tarjetas fluyen en orden de
// IZQUIERDA→DERECHA (la siguiente entra por la derecha; el contenido avanza hacia la
// izquierda). Loop seamless: 2 copias; al completar la copia A reinicia invisible.
// Zoom central por POSICIÓN real + SWIPE táctil + pausa hover/touch.
const SPEED_PX_S = 45
const CARD_STEP_MS = 400
const RESUME_AFTER_MANUAL_MS = 3500
const SWIPE_THRESHOLD_PX = 20

export default function CollectionsCarouselClient({ cards }: { cards: CollectionCard[] }) {
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
    // Métricas cacheadas (se leen UNA vez): leer scrollWidth/getBoundingClientRect
    // por frame era la causa del movimiento "trancado" (layout thrash).
    let halfW = 0
    let cardW = 270
    let vCenter = 0
    const GAP = 5
    const PAD_L = 32

    const ensureMetrics = () => {
      if (halfW > 0) return
      const w = track.scrollWidth
      if (w <= 0) return
      halfW = w / 2
      const c = cardEls[0]
      if (c) cardW = c.offsetWidth
      vCenter = viewport.getBoundingClientRect().width / 2
    }

    // Centro por ARITMÉTICA (sin leer layout por tarjeta):
    // centro de la tarjeta n en coords del track = PAD_L + n*(cardW+GAP) + cardW/2
    // → n = (offset + vCenter - PAD_L - cardW/2) / (cardW+GAP), con módulo por copias.
    const applyCenter = () => {
      if (halfW <= 0) return
      const target = offsetRef.current + vCenter
      const n = Math.round((target - PAD_L - cardW / 2) / (cardW + GAP))
      const count = cardEls.length
      const idx = ((n % count) + count) % count
      cardEls.forEach((c, i) => {
        const is = i === idx
        c.classList.toggle("cat-center", is)
        c.classList.toggle("cat-side", !is)
      })
    }

    let frameCount = 0
    const frame = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTsRef.current) {
          // Clamp del dt (máx 100ms): evita la explosión del offset si la pestaña estuvo
          // en background (el rAF se congela y al volver el delta sería enorme → el track
          // saltaba a una zona sin tarjetas visibles)
          const dt = Math.min((ts - lastTsRef.current) / 1000, 0.1)
          // Flujo izq→der: el offset crece 0 → halfWidth (final de la copia A = inicio de B);
          // al llegar reinicia a 0 (posición idéntica → invisible)
          offsetRef.current += SPEED_PX_S * dt
          ensureMetrics()
          if (halfW > 0 && offsetRef.current >= halfW) {
            offsetRef.current -= halfW
          }
          if (halfW > 0) {
            track.style.transform = `translateX(${-offsetRef.current}px)`
          }
          frameCount++
          if (frameCount % 8 === 0) applyCenter()
        }
      }
      lastTsRef.current = ts
      rafRef.current = requestAnimationFrame(frame)
    }
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
          Descubre tu próxima <span className="cats-gold">obsesión</span>
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
                href={`/collections/${c.handle}`}
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

        <button className="cats-nav prev" onClick={() => step(-1)} aria-label="Colección anterior">
          ←
        </button>
        <button className="cats-nav next" onClick={() => step(1)} aria-label="Siguiente colección">
          →
        </button>
      </div>
    </section>
  )
}
