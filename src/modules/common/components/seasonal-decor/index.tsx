"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { SEASON, SEASONAL_DECOR } from "@lib/season"

// Capa de escenografía del hero (Fase 4/5).
// - En "default" no renderiza nada → el diseño actual queda IDÉNTICO.
// - Entrada escalonada automática (--i = índice), movimiento por kind.
// - Glow ambiental por tema + telarañas (halloween) en las esquinas.
// - Se pausa (animation-play-state) cuando el hero sale de viewport (móvil).
export default function SeasonalDecor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const items = SEASONAL_DECOR[SEASON]

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("paused", !entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (SEASON === "default" || items.length === 0) return null

  return (
    <div
      ref={wrapRef}
      className="seasonal-decor"
      aria-hidden="true"
      data-season={SEASON}
    >
      {/* Glow ambiental por tema (pulso lento, esquinas opuestas al texto) */}
      <div className="decor-glow decor-glow--tl" />
      <div className="decor-glow decor-glow--br" />

      {/* Telarañas de esquina (Halloween) */}
      {SEASON === "halloween" && (
        <>
          <svg
            className="decor-web decor-web--tl"
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
          >
            <path d="M150 0 L0 0 L0 150" stroke="currentColor" strokeWidth="1.4" />
            <path d="M150 0 L38 38 L0 150" stroke="currentColor" strokeWidth="0.9" />
            <path d="M150 0 L75 38 L0 112" stroke="currentColor" strokeWidth="0.9" />
            <path d="M150 0 L112 38 L0 75" stroke="currentColor" strokeWidth="0.9" />
            <path d="M38 0 L0 38" stroke="currentColor" strokeWidth="0.7" />
            <path d="M75 0 L0 75" stroke="currentColor" strokeWidth="0.7" />
            <path d="M112 0 L0 112" stroke="currentColor" strokeWidth="0.7" />
          </svg>
          <svg
            className="decor-web decor-web--tr"
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
          >
            <path d="M0 0 L150 0 L150 150" stroke="currentColor" strokeWidth="1.4" />
            <path d="M0 0 L112 38 L150 150" stroke="currentColor" strokeWidth="0.9" />
            <path d="M0 0 L75 38 L150 112" stroke="currentColor" strokeWidth="0.9" />
            <path d="M0 0 L38 38 L150 75" stroke="currentColor" strokeWidth="0.9" />
            <path d="M112 0 L150 38" stroke="currentColor" strokeWidth="0.7" />
            <path d="M75 0 L150 75" stroke="currentColor" strokeWidth="0.7" />
            <path d="M38 0 L150 112" stroke="currentColor" strokeWidth="0.7" />
          </svg>
        </>
      )}

      {/* Ítems flotantes: stagger de entrada + movimiento por kind */}
      {items.map((it, i) => {
        const kind = it.kind ?? "float"
        const style: CSSProperties & Record<"--i" | "--d" | "--dur", string> = {
          top: it.top,
          left: it.left,
          "--i": String(i),
          "--d": it.delay ?? "0s",
          "--dur": it.duration ?? "",
        }
        return (
          <span
            key={i}
            className={`decor-${kind} ${
              kind === "drift" ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"
            }`}
            style={style}
          >
            {it.emoji}
          </span>
        )
      })}
    </div>
  )
}
