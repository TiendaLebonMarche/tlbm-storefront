"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties, ReactNode } from "react"
import { SEASON, SEASONAL_DECOR } from "@lib/season"
import type { SketchName } from "@lib/season"

// Capa de escenografía del hero (Fase 4/5, upgrade 03-sep "paquete completo").
// - En "default" no renderiza nada → el diseño actual queda IDÉNTICO.
// - Decoración MIXTA: emojis + dibujos hand-drawn (SVG de trazo sketch que se
//   dibujan solos al entrar — stroke-dashoffset).
// - Entrada escalonada (--i), movimiento por kind (float/drift/fall/sway/rise).
// - Glow ambiental por tema + telarañas SVG (halloween).
// - Se pausa cuando el hero sale de viewport (rendimiento móvil).

// Dibujos a mano (trazo orgánico tipo marcador). Paleta vía currentColor?
// No: colores fijos de cada escenario para no depender de tokens en SVG paths.
const SKETCH_STROKES: Record<SketchName, { stroke: string; fill: string; fillOpacity: number }> = {
  heart: { stroke: "#D6336C", fill: "#FF8FB3", fillOpacity: 0.16 },
  sparkle: { stroke: "#D4AF37", fill: "#F6DF8E", fillOpacity: 0.3 },
}

// Los sketches se recolorizan por escenario vía CSS [data-theme] (clases .sk-heart/.sk-sparkle).
const SKETCHES: Record<SketchName, ReactNode> = {
  heart: (
    <>
      <path
        className="sk-fill"
        d="M50 84 C22 62 12 42 22 29 C31 17 47 21 50 33 C53 21 69 17 78 29 C88 42 78 62 50 84 Z"
      />
      <path d="M40 26 C44 19 56 19 60 26" />
      <path d="M50 76 C34 60 26 46 31 36" opacity="0.55" />
    </>
  ),
  sparkle: (
    <>
      <path
        className="sk-fill"
        d="M50 12 C52 34 54 42 62 50 C54 58 52 66 50 88 C48 66 46 58 38 50 C46 42 48 34 50 12 Z"
      />
      <path d="M18 30 C26 34 32 38 36 44" opacity="0.8" />
      <path d="M82 62 C74 66 68 70 64 76" opacity="0.8" />
    </>
  ),
}

function Sketch({ name }: { name: SketchName }) {
  const c = SKETCH_STROKES[name]
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <g
        className={name === "heart" ? "sk-heart" : "sk-sparkle"}
        fill="none"
        stroke={c.stroke}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {SKETCHES[name]}
      </g>
      {/* relleno sutil separado para que no herede dasharray (fadein propio) */}
    </svg>
  )
}

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
          <svg className="decor-web decor-web--tl" width="150" height="150" viewBox="0 0 150 150" fill="none">
            <path d="M150 0 L0 0 L0 150" stroke="currentColor" strokeWidth="1.4" />
            <path d="M150 0 L38 38 L0 150" stroke="currentColor" strokeWidth="0.9" />
            <path d="M150 0 L75 38 L0 112" stroke="currentColor" strokeWidth="0.9" />
            <path d="M150 0 L112 38 L0 75" stroke="currentColor" strokeWidth="0.9" />
            <path d="M38 0 L0 38" stroke="currentColor" strokeWidth="0.7" />
            <path d="M75 0 L0 75" stroke="currentColor" strokeWidth="0.7" />
            <path d="M112 0 L0 112" stroke="currentColor" strokeWidth="0.7" />
          </svg>
          <svg className="decor-web decor-web--tr" width="150" height="150" viewBox="0 0 150 150" fill="none">
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

      {/* Ítems mixtos (emoji o hand-drawn): stagger de entrada + movimiento */}
      {items.map((it, i) => {
        const kind = it.kind ?? "float"
        const style: CSSProperties & Record<"--i" | "--d" | "--dur", string> = {
          top: it.top,
          left: it.left,
          "--i": String(i),
          "--d": it.delay ?? "0s",
          "--dur": it.duration ?? "",
        }
        if (it.svg) {
          return (
            <span
              key={i}
              className={`decor-${kind} decor-svg`}
              style={style}
            >
              <Sketch name={it.svg} />
            </span>
          )
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
