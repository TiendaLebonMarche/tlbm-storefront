import { NextResponse } from "next/server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "@lib/data/cookies"

/**
 * Sugerencias de búsqueda DINÁMICAS — 11-ago-2026 (decisión Julián).
 *
 * Búsquedas populares = SOLO marcas TOP reconocidas que TLBM maneja e irá
 * integrando (allowlist curada). Se detectan en los títulos del catálogo real:
 * si una marca de la lista tiene productos, aparece; si no, no. NUNCA salen
 * marcas genéricas ni poco conocidas (Passau, Voyager, Meidosa, KYSONA...).
 *
 * Colecciones = listCollections() real (tags "collections", invalidable con el
 * subscriber de Medusa → revalidateTag cuando cambian).
 *
 * GET /api/search-suggestions → { collections: [{title, handle}], popular: string[] }
 */

// ── Allowlist de MARCAS TOP (curada 11-ago-2026) ────────────────────────────
// key = forma normalizada para matchear títulos; label = cómo se muestra.
// Agregar aquí cada marca nueva que TLBM integre: aparecerá sola cuando tenga
// productos en el catálogo (la caché se invalida con el revalidateTag de Medusa).
const TOP_BRANDS: { key: string; label: string }[] = [
  // Marcas que TLBM ya maneja (verificadas en catálogo y brand marquee)
  { key: "xiaomi", label: "Xiaomi" },
  { key: "redmi", label: "Redmi" },
  { key: "samsung", label: "Samsung" },
  { key: "apple", label: "Apple" },
  { key: "sony", label: "Sony" },
  { key: "jbl", label: "JBL" },
  { key: "bose", label: "Bose" },
  { key: "monster", label: "Monster" },
  { key: "starlink", label: "Starlink" },
  { key: "dji", label: "DJI" },
  { key: "insta360", label: "Insta360" },
  { key: "acer", label: "Acer" },
  { key: "dell", label: "Dell" },
  { key: "puma", label: "Puma" },
  { key: "nike", label: "Nike" },
  { key: "adidas", label: "Adidas" },
  { key: "under armour", label: "Under Armour" },
  { key: "fila", label: "Fila" },
  { key: "champion", label: "Champion" },
  // Marcas top globales que TLBM puede ir integrando (solo aparecen si hay stock)
  { key: "anker", label: "Anker" },
  { key: "logitech", label: "Logitech" },
  { key: "marshall", label: "Marshall" },
  { key: "skullcandy", label: "Skullcandy" },
  { key: "sennheiser", label: "Sennheiser" },
  { key: "garmin", label: "Garmin" },
  { key: "casio", label: "Casio" },
  { key: "seiko", label: "Seiko" },
  { key: "hp", label: "HP" },
  { key: "lenovo", label: "Lenovo" },
  { key: "microsoft", label: "Microsoft" },
  { key: "nintendo", label: "Nintendo" },
  { key: "razer", label: "Razer" },
  { key: "corsair", label: "Corsair" },
  { key: "hyperx", label: "HyperX" },
  { key: "dyson", label: "Dyson" },
  { key: "philips", label: "Philips" },
  { key: "ray ban", label: "Ray-Ban" },
  { key: "oakley", label: "Oakley" },
  { key: "guess", label: "Guess" },
  { key: "tommy hilfiger", label: "Tommy Hilfiger" },
  { key: "calvin klein", label: "Calvin Klein" },
  { key: "levis", label: "Levi's" },
  { key: "reebok", label: "Reebok" },
  { key: "converse", label: "Converse" },
  { key: "vans", label: "Vans" },
  { key: "lacoste", label: "Lacoste" },
  { key: "fossil", label: "Fossil" },
  { key: "swatch", label: "Swatch" },
  { key: "havaianas", label: "Havaianas" },
  { key: "gopro", label: "GoPro" },
  { key: "polaroid", label: "Polaroid" },
]

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9 ]/g, " ") // solo letras/dígitos/espacios

export async function GET() {
  try {
    const nextCols = await getCacheOptions("collections")
    const nextProds = await getCacheOptions("products")

    // 1) Colecciones reales (force-cache + tags → invalidable on-demand)
    const { collections } = await sdk.client.fetch<{
      collections: { id: string; title: string; handle: string }[]
    }>("/store/collections", {
      query: { limit: 20, fields: "id,title,handle" },
      next: nextCols,
      cache: "force-cache",
    })

    // 2) Productos (títulos) para detectar marcas top presentes en el catálogo
    const { products } = await sdk.client.fetch<{
      products: { id: string; title: string }[]
    }>("/store/products", {
      query: { limit: 100, fields: "title", order: "-created_at" },
      next: nextProds,
      cache: "force-cache",
    })

    // Contar cuántos productos tienen cada marca top (match por palabra completa)
    const brandCount = new Map<string, number>()
    for (const p of products) {
      if (!p.title) continue
      const title = normalize(p.title)
      for (const brand of TOP_BRANDS) {
        // \b no sirve con dígitos ("insta360") → validar límites manualmente
        const regex = new RegExp(`(^|\\s)${brand.key}(\\s|$)`)
        if (regex.test(title)) {
          brandCount.set(brand.label, (brandCount.get(brand.label) || 0) + 1)
        }
      }
    }

    // Top marcas por número de productos (mínimo 1 producto para aparecer)
    const popular = Array.from(brandCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([label]) => label)

    return NextResponse.json({
      collections: collections.slice(0, 6).map((c) => ({ title: c.title, handle: c.handle })),
      popular,
    })
  } catch (error) {
    console.error("[search-suggestions] error:", error)
    return NextResponse.json(
      { error: "no se pudieron cargar sugerencias", collections: [], popular: [] },
      { status: 500 }
    )
  }
}
