// Config central de escenografía por temporada (07-ago-2026, upgrade 03-sep).
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

// ── Decoración por temporada (Fase 5, 03-sep-2026) ──────────────────────────
// kind: "float" (flotar suave) | "drift" (cruzar el hero, top variable) |
//       "fall" (copos/confeti cayendo, solo left) | "sway" (vaivén lateral).
// top/left en % del hero. delay/duration en CSS time. La entrada es escalonada
// automáticamente (--i = índice del array). Zonas libres del hero: esquinas y
// bordes; el texto (izquierda centro) y los dots (abajo centro) nunca se tocan.
export type DecorKind = "float" | "drift" | "fall" | "sway"
export type DecorItem = {
  emoji: string
  kind?: DecorKind
  top?: string
  left?: string
  delay?: string
  duration?: string
}
export const SEASONAL_DECOR: Record<Season, DecorItem[]> = {
  default: [],
  halloween: [
    { emoji: "🎃", kind: "float", top: "16%", left: "3.5%" },
    { emoji: "🕷️", kind: "float", top: "9%", left: "23%", delay: "0.5s" },
    { emoji: "🦇", kind: "drift", top: "20%", delay: "1s", duration: "14s" },
    { emoji: "🎃", kind: "float", top: "62%", left: "92%", delay: "0.3s" },
    { emoji: "🦇", kind: "drift", top: "50%", delay: "4.5s", duration: "18s" },
    { emoji: "👻", kind: "float", top: "84%", left: "7%", delay: "1.2s" },
    { emoji: "🕷️", kind: "float", top: "76%", left: "88%", delay: "1.6s" },
  ],
  navidad: [
    { emoji: "❄️", kind: "fall", left: "7%", delay: "0s", duration: "10s" },
    { emoji: "⭐", kind: "float", top: "13%", left: "88%", delay: "0.4s" },
    { emoji: "❄️", kind: "fall", left: "28%", delay: "1.2s", duration: "12s" },
    { emoji: "❄️", kind: "fall", left: "52%", delay: "2.2s", duration: "9s" },
    { emoji: "🎄", kind: "float", top: "66%", left: "4%", delay: "0.8s" },
    { emoji: "🎁", kind: "float", top: "80%", left: "90%", delay: "1.4s" },
    { emoji: "❄️", kind: "fall", left: "78%", delay: "3.1s", duration: "11s" },
    { emoji: "⭐", kind: "float", top: "50%", left: "94%", delay: "2s" },
  ],
  "san-valentin": [
    { emoji: "💖", kind: "sway", top: "17%", left: "4%" },
    { emoji: "💘", kind: "sway", top: "11%", left: "88%", delay: "0.6s" },
    { emoji: "🌹", kind: "float", top: "64%", left: "5%", delay: "0.4s" },
    { emoji: "💝", kind: "float", top: "74%", left: "91%", delay: "1s" },
    { emoji: "💕", kind: "sway", top: "46%", left: "93%", delay: "1.6s" },
    { emoji: "💗", kind: "sway", top: "86%", left: "16%", delay: "2.1s" },
  ],
}

// ── COPY DE TEMPORADA (Fase 3 + ajuste premium Fase 5, 03-sep-2026) ─────────
// Textos aprobados en /root/escenografia-ejemplo.html y escenografia-navidad-sv.html.
// Regla investigación (Copyhackers/NN/g/Shopify Luxury 2026): a más escenografía,
// menos palabras de temporada → frases CORTAS, 1 emoji puntual al inicio,
// separador tipográfico (no emojis entre palabra y palabra).
// "default" no tiene copy → componentes usan su copy normal.
// En temporada el HERO muestra UN solo slide temático (foto slide 1 + copy).
// highlight DEBE ser subcadena de title (el render hace title.split(highlight)).
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
      "🎃 Noche de miedo en Le Bon Marché",
      "Productos 100% originales",
      "Envíos a toda Colombia",
    ],
    separator: "·",
    hero: {
      label: "🦇🎃👻 Edición Halloween 👻🎃🦇",
      title: "¡Esta noche todo da miedo…\nmenos nuestros precios!",
      highlight: "todo da miedo",
      cta: "🎃 Explorar ofertas 🎃",
    },
  },
  navidad: {
    topbar: [
      "❄️ Época navideña en Le Bon Marché",
      "Regalos originales para todos",
      "Productos 100% originales",
    ],
    separator: "·",
    hero: {
      label: "🎅🎄❄️ Edición Navidad ❄️🎄🎅",
      title: "El regalo 100% original\nque sí quieren recibir",
      highlight: "100% original",
      cta: "🎁 Explorar regalos 🎁",
    },
  },
  "san-valentin": {
    topbar: [
      "💘 14 de febrero en Le Bon Marché",
      "Detalles que sí sorprenden",
      "Productos 100% originales",
    ],
    separator: "·",
    hero: {
      label: "💘🌹💝 Edición San Valentín 💝🌹💘",
      title: "El detalle 100% original\nque enamora",
      highlight: "100% original",
      cta: "💝 Explorar detalles 💝",
    },
  },
}

// ── Deadline logístico por temporada (Fase 5) ───────────────────────────────
// La TopMarquee muestra el mensaje SOLO en la ventana [D-14, D] (urgencia real,
// nunca "todo el año" — NN/g + r/ecommerce). Sin año: la frase es perpetua.
export type SeasonDeadline = { month: number; day: number; message: string }
export const SEASON_DEADLINE: Partial<Record<Season, SeasonDeadline>> = {
  halloween: { month: 10, day: 31, message: "Pide antes del 28 oct y recibe a tiempo 🎃" },
  navidad: { month: 12, day: 25, message: "Pide antes del 18 dic y recibe antes de Navidad 🎁" },
  "san-valentin": { month: 2, day: 14, message: "Pide antes del 11 feb y llega a tiempo 💘" },
}
