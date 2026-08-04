"use client"

import { Fragment } from "react"

export type TopMarqueeVariant = "gold" | "dark"

interface TopMarqueeProps {
  variant?: TopMarqueeVariant
}

/**
 * Marquesina superior de texto — misma cinta del index (MarqueeBar del hero),
 * reutilizable con dos variantes:
 *  - "gold": fondo #D4AF37 + texto #1A1A1A (index)
 *  - "dark": fondo #0A0A0F + texto #D4AF37 (páginas de producto)
 *
 * LOOP SEAMLESS EXACTO (transición imperceptible):
 *  - Track animado: `inline-flex` (display del keyframe) → ancho = contenido real,
 *    NO clamped por el padre (overflow-hidden). SIN gap entre las 2 copias.
 *  - 2 copias idénticas; keyframe translateX(0 → -50%) = ancho EXACTO de 1 copia.
 *  - Cada copia: empieza con ✦ y termina con la última frase (sin ✦ final).
 *    La unión se lee: `...metropolitana [gap] ✦ Bienvenidos...` — IDÉNTICO al
 *    interior (`...exóticos [gap] ✦ Pagos...`) → sin duplicación de separador.
 *  - El gap de unión lo da el `pr-*` de la copia; el interior usa `gap-*` interno.
 *  - Sin márgenes laterales (mx) que alteren el ritmo del loop.
 */
const PHRASES = [
  "Bienvenidos a Le Bon Marché",
  "Tienda virtual en Bucaramanga",
  "Productos 100% originales",
  "Envíos a toda Colombia",
]

export default function TopMarquee({ variant = "gold" }: TopMarqueeProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={`relative z-50 overflow-hidden ${
        isDark ? "bg-[#0A0A0F]" : "bg-[#D4AF37]"
      }`}
    >
      {/* Track animado: SIN gap entre copias (el pr-* de cada copia da el ritmo) */}
      {/* R2 auditoría: texto 11px más legible, separador único ·, mensaje corto y calmado */}
      <div className="flex whitespace-nowrap animate-marquee-fixed py-2">
        {[0, 1].map((set) => (
          <span
            key={set}
            className={`inline-flex items-center gap-5 pr-5 text-[10px] md:text-[11px] font-medium tracking-[0.1em] uppercase ${
              isDark ? "text-[#D4AF37]" : "text-black/85"
            }`}
          >
            <span className={isDark ? "opacity-60" : "opacity-40"}>·</span>
            {PHRASES.map((phrase, i) => (
              <Fragment key={i}>
                <span>{phrase}</span>
                {i < PHRASES.length - 1 && (
                  <span className={isDark ? "opacity-60" : "opacity-40"}>·</span>
                )}
              </Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
