// Config central de escenografía por temporada (07-ago-2026).
// ACTIVACIÓN MANUAL: cambiar SEASON a "halloween" | "navidad" | "san-valentin" → commit + push → deploy.
// "default" = diseño actual IDÉNTICO (sin escenografía).
// Al volver a "default", todo se desmonta solo.

export type Season = "default" | "halloween" | "navidad" | "san-valentin"

// ⚙️ ÚNICO valor a cambiar para activar una temporada
export const SEASON: Season = "default"

// Registro de temporadas (para documentación y uso futuro del SeasonalDecor)
export const SEASONS: Record<Season, { label: string; emoji: string }> = {
  default: { label: "Diseño por defecto", emoji: "" },
  halloween: { label: "Halloween", emoji: "🎃" },
  navidad: { label: "Navidad", emoji: "🎄" },
  "san-valentin": { label: "San Valentín", emoji: "💘" },
}

// Decoración por temporada — lista de ítems flotantes (emojis) con posición/delay/drift.
// Refinar al montar cada escena (ver /root/escenografia/*.html aprobados).
export const SEASONAL_DECOR: Record<Season, Array<{ emoji: string; top: string; left: string; delay?: string; drift?: boolean; duration?: string }>> = {
  default: [],
  halloween: [
    { emoji: "🎃", top: "8%", left: "6%", delay: "0s" },
    { emoji: "🦇", top: "14%", left: "88%", delay: "1.2s", drift: true, duration: "18s" },
    { emoji: "🎃", top: "72%", left: "90%", delay: "2s" },
    { emoji: "🕷️", top: "30%", left: "4%", delay: "0.6s" },
    { emoji: "🦇", top: "60%", left: "8%", delay: "3s", drift: true, duration: "22s" },
    { emoji: "👻", top: "84%", left: "70%", delay: "1.8s", drift: true, duration: "26s" },
  ],
  navidad: [
    { emoji: "❄️", top: "6%", left: "10%", delay: "0s", drift: true, duration: "16s" },
    { emoji: "🎄", top: "70%", left: "6%", delay: "1s" },
    { emoji: "⭐", top: "12%", left: "80%", delay: "2s" },
    { emoji: "❄️", top: "40%", left: "92%", delay: "3s", drift: true, duration: "20s" },
    { emoji: "🎁", top: "82%", left: "88%", delay: "1.5s" },
    { emoji: "❄️", top: "66%", left: "40%", delay: "0.8s", drift: true, duration: "24s" },
  ],
  "san-valentin": [
    { emoji: "💖", top: "8%", left: "8%", delay: "0s" },
    { emoji: "💘", top: "16%", left: "86%", delay: "1.4s" },
    { emoji: "🌹", top: "74%", left: "6%", delay: "2.2s" },
    { emoji: "💝", top: "84%", left: "88%", delay: "0.9s" },
    { emoji: "💕", top: "50%", left: "4%", delay: "3s", drift: true, duration: "21s" },
    { emoji: "💗", top: "38%", left: "94%", delay: "2.6s", drift: true, duration: "19s" },
  ],
}
