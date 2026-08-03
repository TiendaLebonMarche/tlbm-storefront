import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

/**
 * Revalidación on-demand de la caché de Next.js (ISR).
 *
 * Lo llama el subscriber `revalidate.ts` del backend de Medusa cuando el
 * departamento de Catálogo crea/edita/elimina productos, colecciones o
 * categorías (o cuando cambia el stock tras una venta).
 *
 * Patrón oficial del starter de Medusa (force-cache + tags + revalidateTag):
 * - Páginas/Server Functions cachean con tags planos por entidad
 *   ("products", "collections", "categories").
 * - Este endpoint invalida esos tags → la próxima visita sirve datos frescos
 *   (stale-while-revalidate), sin rebuild ni pérdida total de caché.
 *
 * Protegido por el secreto compartido REVALIDATE_SECRET (mismo valor en
 * Vercel y en el .env del backend de Medusa).
 */
const ALLOWED_TAGS = new Set([
  "products",
  "collections",
  "categories",
  "regions",
])

export async function POST(request: NextRequest) {
  let payload: { secret?: string; tags?: string[]; tag?: string } = {}

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (payload.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const requestedTags = Array.isArray(payload.tags)
    ? payload.tags
    : payload.tag
      ? [payload.tag]
      : []

  if (requestedTags.length === 0) {
    return NextResponse.json({ error: "Missing tags" }, { status: 400 })
  }

  const validTags = requestedTags.filter((tag) => ALLOWED_TAGS.has(tag))

  if (validTags.length === 0) {
    return NextResponse.json({ error: "No valid tags" }, { status: 400 })
  }

  validTags.forEach((tag) => revalidateTag(tag))

  return NextResponse.json({
    revalidated: validTags,
    now: Date.now(),
  })
}
