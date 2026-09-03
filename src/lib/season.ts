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
export const SEASONAL_DECOR: Record<Season, Array<{ emoji: string; top: string; left: string; delay?: string; drift?: boolean; duration?: string }>> = {  default: [],
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

// ── COPY DE TEMPORADA (Fase 3, 03-sep-2026) ────────────────────────────────
// Textos aprobados en /root/escenografia-ejemplo.html y escenografia-navidad-sv.html.
// "default" no tiene copy → componentes usan su copy normal.
// En temporada el HERO muestra UN solo slide temático (foto slide 1 + copy) y la
// TopMarquee cambia frases + separador. highlight DEBE ser subcadena de title
// (el render hace title.split(highlight) y lo pinta con text-gold-dark).
export type SeasonalHeroCopy = {
  label: string
  title: string
  highlight: string
  subtitle?: string
  cta: string
}
export type SeasonalCopy = {
  topbar: string[]
  separator: string
  hero: SeasonalHeroCopy
}
export const SEASON_COPY: Partial<Record<Season, SeasonalCopy>> = {
  halloween: {
    topbar: [
      "Noche de miedo en Le Bon Marché",
      "Ofertas terroríficas",
      "Productos 100% originales",
      "Envíos a toda Colombia",
    ],
    separator: "🎃",
    hero: {
      label: "🦇🎃👻 Edición Halloween 👻🎃🦇",
      title: "¡Esta noche todo da miedo…\nmenos nuestros precios!",
      highlight: "todo da miedo",
      cta: "🎃 Explorar ofertas 🎃",
    },
  },
  navidad: {
    topbar: [
      "Época navideña en Le Bon Marché",
      "Regalos originales para todos",
      "Productos 100% originales",
      "Envíos a toda Colombia",
    ],
    separator: "❄️",
    hero: {
      label: "🎅🎄❄️ Edición Navidad ❄️🎄🎅",
      title: "El regalo 100% original\nque sí quieren recibir",
      highlight: "100% original",
      cta: "🎁 Explorar regalos 🎁",
    },
  },
  "san-valentin": {
    topbar: [
      "14 de febrero en Le Bon Marché",
      "Detalles que sí sorprenden",
      "Productos 100% originales",
      "Envíos a toda Colombia",
    ],
    separator: "❤️",
    hero: {
      label: "💘🌹💝 Edición San Valentín 💝🌹💘",
      title: "El detalle 100% original\nque enamora",
      highlight: "100% original",
      cta: "💝 Explorar detalles 💝",
    },
  },
}
