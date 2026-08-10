"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { CollectionCard } from "."

// Marquee CONTINUO (10-ago-2026 v3): movimiento DERECHA→izquierda suave y pulcro,
// la siguiente tarjeta entra por la derecha. Loop SEAMLESS: 2 copias; al completar
// la copia A se reinicia a 0 (posición idéntica → el salto última→primera NO se nota).
// translateX NEGATIVO: el track fluye hacia la izquierda, el viewport SIEMPRE está
// lleno (el contenido viene de la derecha). Con translateX positivo el borde izquierdo
// del viewport se vaciaba a 32px/s — el "espacio en blanco al moverse" (bug #449).
// Tarjetas GRANDES y SIN zoom por frame (el reescalado constante era lo "pesado").
const SPEED_PX_S = 32
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
  // Lazy initializer: leer prefers-reduced-motion una sola vez al montar (en
  // vez de setState en effect — React 19). Guard SSR (window no existe en server).
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  // Escuchar cambios de prefers-reduced-motion (WCAG): sin movimiento automático
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // Bucle continuo rAF: offset crece 0 → halfW (final copia A = inicio copia B);
  // al llegar reinicia a 0 → salto INVISIBLE. Sin lectura de layout por frame.
  useEffect(() => {
    if (reducedMotion) return
    const track = trackRef.current
    if (!track) return

    let halfW = 0

    const ensureMetrics = () => {
      // halfW = pitch REAL de una copia (padding + gap incluidos) = offsetLeft de la
      // primera tarjeta de la copia B. scrollWidth/2 NO coincide con el pitch (el
      // padding lateral 32px + gap entre copias desalinean el reinicio ~24px).
      if (halfW > 0) return
      const firstB = track.children[cards.length] as HTMLElement | undefined
      if (firstB) {
        halfW = firstB.offsetLeft - (track.offsetLeft || 0)
        if (halfW > 0) return
      }
      const w = track.scrollWidth
      if (w <= 0) return
      halfW = w / 2
    }

    // Re-medir si cambia el viewport (clamp(280px,24vw,340px) varía con el ancho)
    const onResize = () => {
      halfW = 0
    }
    window.addEventListener("resize", onResize)

    const frame = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTsRef.current) {
          // Clamp dt (máx 100ms): evita el salto si la pestaña estuvo en background
          const dt = Math.min((ts - lastTsRef.current) / 1000, 0.1)
          offsetRef.current += SPEED_PX_S * dt
          ensureMetrics()
          if (halfW > 0 && offsetRef.current >= halfW) {
            offsetRef.current -= halfW
          }
          if (halfW > 0) {
            // translateX NEGATIVO → el track fluye hacia la IZQUIERDA
            // (las tarjetas entran por la derecha y salen por la izquierda;
            // el viewport nunca se vacía — sin huecos blancos)
            track.style.transform = `translateX(${-offsetRef.current}px)`
          }
        }
      }
      lastTsRef.current = ts
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [reducedMotion, cards.length])

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
    if (animate) track.style.transition = `transform 600ms cubic-bezier(0.16,1,0.3,1)`
    track.style.transform = `translateX(${-offsetRef.current}px)`
    if (animate) {
      setTimeout(() => {
        track.style.transition = "none"
      }, 600)
    }
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current
      if (!track) return
      const card = track.querySelector<HTMLElement>("[data-cat-card]")
      const gap = parseFloat(getComputedStyle(track).gap) || 16
      const stepPx = card ? card.offsetWidth + gap : 356
      setOffset(offsetRef.current + dir * stepPx)
      pauseTemporarily()
    },
    [setOffset, pauseTemporarily]
  )

  // SWIPE táctil: pointer events; swipe > umbral ajusta el offset y cancela el click
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, moved: false }
      pause()
    },
    [pause]
  )

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const p = pointerRef.current
    if (!p) return
    const dx = e.clientX - p.x
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      p.moved = true
      const track = trackRef.current
      if (track) {
        track.style.transition = "none"
        // Acompañar al dedo: arrastrar a la izquierda (dx<0) adelanta el flujo
        track.style.transform = `translateX(${-offsetRef.current + dx}px)`
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
        const track = trackRef.current
        if (track) {
          const card = track.querySelector<HTMLElement>("[data-cat-card]")
          const gap = parseFloat(getComputedStyle(track).gap) || 16
          const stepPx = card ? card.offsetWidth + gap : 356
          // Flujo izquierda: arrastrar a la izquierda (dx<0) = siguiente tarjeta
          const dir = dx < 0 ? 1 : -1
          setOffset(offsetRef.current + dir * stepPx)
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
                className="cat-card"
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
