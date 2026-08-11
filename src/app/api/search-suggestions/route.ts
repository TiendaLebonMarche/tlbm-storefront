import { NextResponse } from "next/server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "@lib/data/cookies"

/**
 * Sugerencias de búsqueda DINÁMICAS — 11-ago-2026 (decisión Julián).
 *
 * Las búsquedas populares y colecciones del modal de la lupa NO son estáticas:
 * se derivan de la base de datos real (Medusa) en cada build/cache:
 *   - colecciones: listCollections() real (tags "collections" — se invalida con
 *     el subscriber de Medusa → revalidateTag cuando cambian).
 *   - búsquedas populares: tokenización de los títulos de productos (top 100),
 *     con stopwords y términos genéricos filtrados → los chips reflejan el
 *     catálogo ACTUAL (si agregas parlantes nuevos, "parlante" sube).
 *
 * GET /api/search-suggestions → { collections: [{title, handle}], popular: string[] }
 */
const STOPWORDS = new Set([
  "de", "la", "el", "los", "las", "con", "para", "por", "en", "y", "o", "un",
  "una", "unos", "unas", "al", "del", "que", "es", "a", "e", "i", "su", "sus",
  "se", "lo", "le", "no", "mas", "más", "como", "cuando", "todo", "toda",
])

// Términos genéricos que no aportan como búsqueda (especificaciones, colores, relleno)
const GENERIC = new Set([
  "bluetooth", "inalambrico", "inalámbrico", "original", "nuevo", "nueva",
  "pack", "mini", "pro", "max", "led", "usb", "recargable", "portatil",
  "portátil", "negro", "blanco", "gris", "azul", "rojo", "verde", "rosa",
  "grande", "pequeno", "pequeño", "con", "para", "2", "3", "4", "5", "6",
  "7", "8", "9", "10", "w", "v2", "v3", "x5", "x4", "s320", "buds",
  "bolsa", "funda", "cable", "cargador", "estuche", "soporte", "protector",
  "control", "mochila", "morral", "case", "cover", "tapita", "gorra",
  "40w", "30w", "15w", "20w", "50w", "100w", "watt", "watts", "mah",
  "impermeable", "ergonomico", "ergonómico", "silencioso", "gaming",
])

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9 ]/g, " ")

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

    // 2) Productos (títulos) para derivar búsquedas populares
    const { products } = await sdk.client.fetch<{
      products: { id: string; title: string }[]
    }>("/store/products", {
      query: { limit: 100, fields: "title", order: "-created_at" },
      next: nextProds,
      cache: "force-cache",
    })

    // Tokenizar títulos → frecuencia → top términos (excluyendo stopwords/genéricos)
    const freq = new Map<string, number>()
    for (const p of products) {
      if (!p.title) continue
      const tokens = normalize(p.title).split(/\s+/)
      for (const t of tokens) {
        if (t.length < 3 || t.length > 20) continue
        if (STOPWORDS.has(t) || GENERIC.has(t)) continue
        freq.set(t, (freq.get(t) || 0) + 1)
      }
    }

    // Añadir las categorías de los productos (alta señal: reflejan el catálogo)
    for (const c of collections) {
      const tokens = normalize(c.title).split(/\s+/)
      for (const t of tokens) {
        if (t.length < 3 || t.length > 20) continue
        if (STOPWORDS.has(t) || GENERIC.has(t)) continue
        freq.set(t, (freq.get(t) || 0) + 3) // las colecciones pesan más
      }
    }

    // Solo términos con frecuencia ≥2 (evita ruido de 1 solo producto)
    const popular = Array.from(freq.entries())
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([term]) => term)

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
