import { SEASON, SEASONAL_DECOR } from "@lib/season"

// Capa de escenografía flotante (pointer-events:none, z-5).
// En "default" no renderiza nada → el diseño actual queda IDÉNTICO.
// Cada temporada define sus ítems en SEASONAL_DECOR (src/lib/season.ts).
export default function SeasonalDecor() {
  const items = SEASONAL_DECOR[SEASON]
  if (SEASON === "default" || items.length === 0) return null

  return (
    <div className="seasonal-decor" aria-hidden="true" data-season={SEASON}>
      {items.map((it, i) =>
        it.drift ? (
          <span
            key={i}
            className="decor-drift text-3xl md:text-4xl opacity-70"
            style={{
              left: it.left,
              animationDuration: it.duration ?? "20s",
              animationDelay: it.delay ?? "0s",
            }}
          >
            {it.emoji}
          </span>
        ) : (
          <span
            key={i}
            className="decor-item text-3xl md:text-5xl opacity-80"
            style={{
              top: it.top,
              left: it.left,
              animationDelay: it.delay ?? "0s",
            }}
          >
            {it.emoji}
          </span>
        )
      )}
    </div>
  )
}
