"use client"

import { Fragment, useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { SEASON, SEASON_COPY, SEASON_DEADLINE } from "@lib/season"
import type { SeasonDeadline } from "@lib/season"

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
 *  - Banda móvil: `var(--ink)` con frases en loop seamless 45s desktop /
 *    50s mobile, separador `·` BLANCO (diseño aprobado), pausa nunca (marca,
 *    decisión Julián 11-ago: la marquesina SIEMPRE se mueve).
 *  - Sistema de escenografía: etiqueta usa `var(--gold)`, banda `var(--ink)`
 *    → `[data-theme]` la recoloriza sola sin tocar el componente.
 *  - Temporada (Fase 3/5): frases cortas de SEASON_COPY + mensaje de deadline
 *    logístico SOLO en la ventana [D-14, D] (urgencia real, NN/g 2026).
 *
 * LOOP SEAMLESS (no re-negociar): 2 copias idénticas, keyframe
 * translateX(0 → -50%), gap de unión = `pr` de cada copia (NUNCA gap entre
 * copias en el track — rompería el -50%).
 */
const PHRASES = [
  "Tienda virtual en Bucaramanga",
  "Productos 100% originales",
  "Envíos a toda Colombia",
  "Entrega 24 h en Bucaramanga",
  "Nequi · Daviplata · TC · PSE",
  "Soporte por WhatsApp",
]

// Copy de temporada activo (undefined en default → comportamiento actual idéntico)
const seasonalCopy = SEASON_COPY[SEASON]
const basePhrases = seasonalCopy?.topbar ?? PHRASES
const separator = seasonalCopy?.separator ?? "·"

// ¿El deadline aplica HOY? Ventana [D-14, D] del año en curso (o año siguiente).
function deadlineActive(d: SeasonDeadline | undefined): boolean {
  if (!d) return false
  const now = new Date()
  const y = now.getFullYear()
  const target = new Date(y, d.month - 1, d.day)
  const start = new Date(y, d.month - 1, d.day - 14)
  if (now > target) return false // se acabó la ventana este año
  return now >= start
}

// Logo abreviado TLBM — PNG transparente con letras negras (723×248, ratio 2.92).
const LABEL_LOGO_URL =
  "https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785519483/favicon_kvkibv.png"

export default function TopMarquee() {
  const [phrases, setPhrases] = useState<string[]>(() => {
    const d = SEASON_DEADLINE[SEASON]
    return deadlineActive(d) ? [...basePhrases, d!.message] : basePhrases
  })

  // Re-evalúa tras mount (frontera de día/husos): evita mismatch de hidratación.
  useEffect(() => {
    const d = SEASON_DEADLINE[SEASON]
    setPhrases(deadlineActive(d) ? [...basePhrases, d!.message] : basePhrases)
  }, [])

  return (
    <div
      className="relative z-50 flex items-stretch overflow-hidden bg-[var(--ink)]"
      aria-label="Tienda Le Bon Marché — mensajes de la tienda"
    >
      {/* ── Etiqueta FIJA: dorada + logo TLBM, corte diagonal — clic → index ── */}
      <LocalizedClientLink
        href="/"
        aria-label="Tienda Le Bon Marché — ir al inicio"
        className="relative z-10 flex flex-shrink-0 items-center bg-[var(--gold)] py-[7px] pl-4 pr-6 md:py-[9px] md:pl-6 md:pr-8 transition-opacity hover:opacity-90"
        style={{
          clipPath: "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LABEL_LOGO_URL}
          alt="Le Bon Marché"
          draggable={false}
          className="h-[28px] w-auto md:h-[38px]"
        />
      </LocalizedClientLink>

      {/* ── Banda móvil: 2 copias, loop seamless ── */}
      <div className="flex min-w-0 flex-1 items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-fixed">
          {[0, 1].map((set) => (
            <span
              key={set}
              aria-hidden={set === 1}
              className="inline-flex items-center gap-[14px] pr-[14px] text-[10px] font-medium uppercase tracking-[0.12em] text-white/85 md:gap-[18px] md:pr-[18px] md:text-[11px]"
            >
              <span className="opacity-70">{separator}</span>
              {phrases.map((phrase, i) => (
                <Fragment key={i}>
                  <span>{phrase}</span>
                  {i < phrases.length - 1 && (
                    <span className="opacity-70">{separator}</span>
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
