import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import CollectionsCarouselClient from "./collections-carousel-client"

// Imágenes temáticas por handle de colección (aprobadas 07-ago — Unsplash; reemplazar
// por generadas con IA cuando se recargue fal.ai). Colecciones sin imagen temática
// (smartwatches, tablets, starlink, amor-y-amistad) quedan fuera del carousel —
// siguen accesibles en el SideMenu y en el filtro de /store.
const COLLECTION_IMAGES: Record<string, string> = {
  "parlantes-y-audio": "/categories/electronicos.jpg",
  "gaming-y-pc": "/categories/computacion.jpg",
  "moda-y-bolsos": "/categories/moda.jpg",
  "hogar-y-cocina": "/categories/hogar.jpg",
  juguetes: "/categories/juguetes.jpg",
  "camaras-insta360": "/categories/camaras.jpg",
  "drones-y-dji": "/categories/drones.jpg",
  "deportes-y-aire-libre": "/categories/bolsas.jpg",
}

export type CollectionCard = {
  name: string
  handle: string
  image: string
}

async function findFallbackImage(collectionId: string): Promise<string | null> {
  const { response } = await listProducts({
    countryCode: "co",
    queryParams: { collection_id: [collectionId], limit: 1, fields: "thumbnail" },
  }).catch(() => ({ response: { products: [] } }))
  const thumb = response.products?.[0]?.thumbnail
  return typeof thumb === "string" && thumb.startsWith("http") ? thumb : null
}

export default async function CollectionsCarousel() {
  const { collections } = await listCollections({
    fields: "id,title,handle",
  }).catch(() => ({ collections: [] }))

  // Fallbacks de imagen en PARALELO (evita waterfall N+1)
  const cards: CollectionCard[] = await Promise.all(
    (collections as Array<{ id: string; title: string; handle: string }>).map(
      async (col) => {
        const handle = col.handle as string
        const image = COLLECTION_IMAGES[handle] ?? (await findFallbackImage(col.id as string))
        if (!image) return null
        return { name: col.title as string, handle, image }
      }
    )
  ).then((results) => results.filter((c): c is CollectionCard => c !== null))

  if (cards.length === 0) return null

  return <CollectionsCarouselClient cards={cards} />
}
