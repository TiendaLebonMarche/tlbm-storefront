// Utilidades SEO compartidas (extraídas del PDP 07-ago-2026 — guía oficial Google titles ≤60c)

// Title SEO: Google trunca ~60-70 chars en SERP; cortar en límite de palabra (no a mitad)
// El template del layout añade " | Le Bon Marché" (~16c) al final → pasar max ≈ 45 para title final ≤60c
export function truncateTitle(title: string, max = 50): string {
  if (title.length <= max) return title
  const cut = title.slice(0, max)
  const lastSpace = cut.lastIndexOf(" ")
  return `${(lastSpace > 25 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}
