"use client"

import { Fragment } from "react"

/**
 * Marquesina superior — REDISEÑO 07-ago-2026 (aprobado por Julián, ref tm_v4.png):
 *
 *  ┌────────────────────────────────────────────────────────────────┐
 *  │ [TLBM ▸]  · Bienvenidos a Le Bon Marché · Tienda virtual...    │
 *  └────────────────────────────────────────────────────────────────┘
 *
 *  - Etiqueta FIJA: dorada `var(--gold)` + logo abreviado TLBM (PNG transparente
 *    con letras negras), corte diagonal en el borde derecho (~18px) que invade
 *    la banda. NO lleva texto — solo el logo.
 *  - Banda móvil: `var(--ink)` con las 4 frases de siempre, separador `·`
 *    BLANCO (el diseño aprobado los muestra blancos, no dorados), loop seamless
 *    45s desktop / 50s mobile (`.animate-marquee-fixed`), pausa al hover.
 *  - Sistema de escenografía: etiqueta usa `var(--gold)`, banda `var(--ink)`
 *    → `[data-theme]` la recoloriza sola sin tocar el componente.
 *
 * LOOP SEAMLESS (no re-negociar): 2 copias idénticas, keyframe
 * translateX(0 → -50%), gap de unión = `pr` de cada copia (NUNCA gap entre
 * copias en el track — rompería el -50%).
 */
const PHRASES = [
  "Bienvenidos a Le Bon Marché",
  "Tienda virtual en Bucaramanga",
  "Productos 100% originales",
  "Envíos a toda Colombia",
]

// Logo abreviado TLBM — PNG transparente con letras negras (723×248, ratio 2.92).
// Sobre la etiqueta dorada da exactamente el diseño aprobado (TLBM negro sobre dorado).
const LABEL_LOGO_URL =
  "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785519483/favicon_kvkibv.png"

export default function TopMarquee() {
  return (
    <div
      className="relative z-50 flex items-stretch overflow-hidden bg-(--ink)"
      aria-label="Tienda Le Bon Marché — mensajes de la tienda"
    >
      {/* ── Etiqueta FIJA: dorada + logo TLBM, corte diagonal ── */}
      <div
        aria-hidden="true"
        className="relative z-10 flex shrink-0 items-center bg-(--gold) py-[5px] pl-3.5 pr-5 md:py-[6px] md:pl-5 md:pr-7"
        style={{
          clipPath: "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LABEL_LOGO_URL}
          alt="Le Bon Marché"
          draggable={false}
          className="h-[26px] w-auto md:h-[34px]"
        />
      </div>

      {/* ── Banda móvil: 2 copias, loop seamless ── */}
      <div className="flex min-w-0 flex-1 items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-fixed">
          {[0, 1].map((set) => (
            <span
              key={set}
              aria-hidden={set === 1}
              className="inline-flex items-center gap-[14px] pr-[14px] text-[10px] font-medium uppercase tracking-[0.12em] text-white/85 md:gap-[18px] md:pr-[18px] md:text-[11px]"
            >
              <span className="opacity-70">·</span>
              {PHRASES.map((phrase, i) => (
                <Fragment key={i}>
                  <span>{phrase}</span>
                  {i < PHRASES.length - 1 && (
                    <span className="opacity-70">·</span>
                  )}
                </Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
