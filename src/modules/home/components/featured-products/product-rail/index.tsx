import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <div className="max-w-[95rem] mx-auto px-6 md:px-12 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif mb-3 capitalize">{collection.title}</h2>
        <div className="w-24 h-[1px] bg-brand-black mx-auto"></div>
        <div className="mt-6">
          <InteractiveLink href={`/collections/${collection.handle}`}>
            Ver Colección Exclusiva
          </InteractiveLink>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12">
        {pricedProducts.slice(0, 8).map((product) => (
          <li key={product.id} className="group text-center">
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
