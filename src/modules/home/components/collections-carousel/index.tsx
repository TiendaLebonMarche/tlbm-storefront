import { listCollections } from "@lib/data/collections"
import CollectionsCarouselClient from "./collections-carousel-client"

// Imágenes abstractas premium por handle de colección (generadas con IA 11-ago-2026,
// Nano Banana Pro — sin productos, atmósfera/color/textura con paleta estratégica por
// categoría). Las 12 colecciones tienen imagen — ya no hay fallback a thumbnail.
const COLLECTION_IMAGES: Record<string, string> = {
  "parlantes-y-audio": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786472410/categories/cat-parlantes-y-audio.jpg",
  "gaming-y-pc": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786472776/categories/cat-gaming-y-pc.jpg",
  "moda-y-bolsos": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786472861/categories/cat-moda-y-bolsos.jpg",
  "hogar-y-cocina": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786472915/categories/cat-hogar-y-cocina.jpg",
  juguetes: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473072/categories/cat-juguetes.jpg",
  "camaras-insta360": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473095/categories/cat-camaras-insta360.jpg",
  "drones-y-dji": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473150/categories/cat-drones-y-dji.jpg",
  "deportes-y-aire-libre": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473192/categories/cat-deportes-y-aire-libre.png",
  smartwatches: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473246/categories/cat-smartwatches.jpg",
  "tablets-y-stylus": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473270/categories/cat-tablets-y-stylus.jpg",
  starlink: "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473296/categories/cat-starlink.jpg",
  "amor-y-amistad": "https://res.cloudinary.com/dgo9tm9e2/image/upload/f_auto,q_auto/v1786473351/categories/cat-amor-y-amistad.jpg",
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
