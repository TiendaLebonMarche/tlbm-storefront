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
  "Bienvenidos Tienda Le Bon Marché",
  "Tienda virtual en la ciudad de Bucaramanga",
  "Productos exclusivos, originales y exóticos",
  "Pagos por Nequi, Daviplata, Bre-B, Baloto, MasterCard, Visa, Mercado Pago",
  "Envíos en Bucaramanga y su área metropolitana",
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
      <div className="flex whitespace-nowrap animate-marquee-fixed py-2">
        {[0, 1].map((set) => (
          <span
            key={set}
            className={`inline-flex items-center gap-6 pr-6 text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase ${
              isDark ? "text-[#D4AF37]" : "text-[#1A1A1A]"
            }`}
          >
            {/* Empieza con ✦, termina con la última frase → unión limpia */}
            <span className={isDark ? "opacity-70" : "opacity-50"}>✦</span>
            {PHRASES.map((phrase, i) => (
              <Fragment key={i}>
                <span>{phrase}</span>
                {i < PHRASES.length - 1 && (
                  <span className={isDark ? "opacity-70" : "opacity-50"}>✦</span>
                )}
              </Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
