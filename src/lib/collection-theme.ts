// Acento de color por colección — página /collections y tarjetas de categoría.
//
// Paletas: "COLOR COMBO · PART 09" (@design.deb), verificadas píxel a píxel y
// calibradas para MODO CLARO. El sistema es ADITIVO: estas variables las inyecta
// cada tarjeta de forma inline (server-side, sin JS), así que :root y los bloques
// [data-theme] de la escenografía por temporada quedan intactos.
//
// TRES REGLAS, y ninguna es de gusto — salen de medir contraste (WCAG 2.2):
//
//   fill  → SIEMPRE relleno (píldora) con `ink` encima. NUNCA como color de texto
//           sobre blanco: ninguno de los 10 alcanza 4,5:1 (el mejor, #FF4103, 3,49:1).
//   rule  → filete superior. Se usa el miembro de la pareja que supera 3:1 sobre
//           blanco, que es lo que exige el criterio 1.4.11 para un gráfico con
//           significado. Los vivos más claros serían invisibles como filete:
//           lima 1,12:1 · menta 1,48:1 · durazno 1,51:1 · moss 1,57:1 · cúrcuma 1,66:1.
//   dark  → índice, flecha y título en hover. Todos ≥ 10:1 sobre blanco.
//
// Contraste medido de cada píldora (relleno + tinta), de menor a mayor:
//   Moda y Bolsos 5,07:1 · Cámaras Insta360 5,29:1 · Hogar y Cocina 7,19:1
//   Tablets 9,07:1 · Juguetes 9,11:1 · Parlantes 9,37:1 · Deportes 10,23:1
//   Smartwatches 10,23:1 · Starlink 11,74:1 · Gaming 12,09:1 · Drones 12,13:1
// (todas AA o AAA; ninguna por debajo del mínimo de 4,5:1)

export type CollectionTheme = {
  /** Color vivo: relleno de la píldora. */
  fill: string
  /** Tinta sobre el relleno: el miembro oscuro de la pareja. */
  ink: string
  /** Filete superior (≥ 3:1 sobre blanco). */
  rule: string
  /** Índice, flecha y título en hover (≥ 10:1 sobre blanco). */
  dark: string
}

export const COLLECTION_THEMES: Record<string, CollectionTheme> = {
  "parlantes-y-audio": { fill: "#FFBE0B", ink: "#2A2312", rule: "#2A2312", dark: "#2A2312" },
  "deportes-y-aire-libre": { fill: "#E4FD97", ink: "#2D3E2C", rule: "#2D3E2C", dark: "#2D3E2C" },
  "gaming-y-pc": { fill: "#B6FF00", ink: "#3C1A47", rule: "#3C1A47", dark: "#3C1A47" },
  "moda-y-bolsos": { fill: "#FD1843", ink: "#0A0A0F", rule: "#FD1843", dark: "#0A0A0F" },
  "drones-y-dji": { fill: "#21F1A8", ink: "#171717", rule: "#171717", dark: "#171717" },
  "camaras-insta360": { fill: "#FF4103", ink: "#001621", rule: "#FF4103", dark: "#001621" },
  starlink: { fill: "#2BEE34", ink: "#141414", rule: "#141414", dark: "#141414" },
  "hogar-y-cocina": { fill: "#FFC6A8", ink: "#741A2F", rule: "#741A2F", dark: "#741A2F" },
  "tablets-y-stylus": { fill: "#004741", ink: "#F0EDE4", rule: "#004741", dark: "#004741" },
  smartwatches: { fill: "#E4FD97", ink: "#2D3E2C", rule: "#2D3E2C", dark: "#2D3E2C" },
  juguetes: { fill: "#59C749", ink: "#0A0A0F", rule: "#59C749", dark: "#0A0A0F" },
  "amor-y-amistad": { fill: "#FD1843", ink: "#0A0A0F", rule: "#FD1843", dark: "#0A0A0F" },
}

/** Colección sin productos: atenuada en gris, sin color. Un color fuerte en una
 *  categoría vacía es una promesa que la página no cumple. */
export const EMPTY_COLLECTION_THEME: CollectionTheme = {
  fill: "#F2F2F3",
  ink: "#5C5C5C",
  rule: "#DCDCDC",
  dark: "#5C5C5C",
}

/** Handle sin paleta asignada (colección nueva): cae al dorado de marca. */
export const FALLBACK_COLLECTION_THEME: CollectionTheme = {
  fill: "#E8C84A",
  ink: "#2A2312",
  rule: "#B8860B",
  dark: "#B8860B",
}

/**
 * Paleta de una colección. `count` se usa para atenuar las colecciones vacías.
 */
export function collectionTheme(handle: string, count?: number): CollectionTheme {
  if (count === 0) return EMPTY_COLLECTION_THEME
  return COLLECTION_THEMES[handle] ?? FALLBACK_COLLECTION_THEME
}

/** Variables CSS que consume globals.css (.collection-card*). */
export function collectionThemeVars(theme: CollectionTheme): Record<string, string> {
  return {
    "--ct-fill": theme.fill,
    "--ct-ink": theme.ink,
    "--ct-rule": theme.rule,
    "--ct-dark": theme.dark,
  }
}
