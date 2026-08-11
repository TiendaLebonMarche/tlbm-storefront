import { listCollections } from "@lib/data/collections"
import CollectionsCarouselClient from "./collections-carousel-client"

// Imágenes LIFESTYLE premium por handle de colección (generadas con IA 11-ago-2026,
// Nano Banana Pro — escenas de vida con personas jóvenes colombianas, energía y color;
// el momento es el mensaje, sin producto protagonista). Las 12 colecciones tienen imagen.
const COLLECTION_IMAGES: Record<string, string> = {
  "parlantes-y-audio": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786474556/categories/cat-v3-parlantes-y-audio.jpg",
  "gaming-y-pc": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786474944/categories/cat-v3-gaming-y-pc.png",
  "moda-y-bolsos": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786474962/categories/cat-v3-moda-y-bolsos.png",
  "hogar-y-cocina": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786474975/categories/cat-v3-hogar-y-cocina.png",
  juguetes: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786474991/categories/cat-v3-juguetes.png",
  "camaras-insta360": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786475046/categories/cat-v3-camaras-insta360.png",
  "drones-y-dji": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786475081/categories/cat-v3-drones-y-dji.png",
  "deportes-y-aire-libre": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786475106/categories/cat-v3-deportes-y-aire-libre.jpg",
  smartwatches: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786475139/categories/cat-v3-smartwatches.png",
  "tablets-y-stylus": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786475183/categories/cat-v3-tablets-y-stylus.png",
  starlink: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786475208/categories/cat-v3-starlink.jpg",
  "amor-y-amistad": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786475250/categories/cat-v3-amor-y-amistad.png",
}

export type CollectionCard = {
  name: string
  handle: string
  image: string
}

export default async function CollectionsCarousel() {
  const { collections } = await listCollections({
    fields: "id,title,handle",
  }).catch(() => ({ collections: [] }))

  // Las 12 colecciones tienen imagen propia (COLLECTION_IMAGES) — sin fallback.
  const cards: CollectionCard[] = (collections as Array<{ id: string; title: string; handle: string }>)
    .map((col) => {
      const handle = col.handle as string
      const image = COLLECTION_IMAGES[handle]
      if (!image) return null
      return { name: col.title as string, handle, image }
    })
    .filter((c): c is CollectionCard => c !== null)

  if (cards.length === 0) return null

  return <CollectionsCarouselClient cards={cards} />
}
