import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import InfiniteProducts from "@modules/store/components/infinite-products"
import EmptyState from "@modules/store/components/empty-state"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  query,
  collection,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  query?: string
  collection?: string
  minPrice?: string
  maxPrice?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 100, // Fetch all for infinite scroll locally
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products },
  } = await listProductsWithSort({
    page: 1,
    queryParams,
    sortBy,
    countryCode,
  })

  // Filtrar por búsqueda (query)
  if (query) {
    products = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Filtrar por precio
  if (minPrice || maxPrice) {
    const min = minPrice ? parseFloat(minPrice) : 0
    const max = maxPrice ? parseFloat(maxPrice) : Infinity

    products = products.filter((p) => {
      const variant = p.variants?.[0] as any
      const price = (variant?.calculated_price as number) || 0
      return price >= min && price <= max
    })
  }

  return (
    <>
      {products.length === 0 ? (
        <EmptyState
          query={query}
          filters={!!(collection || minPrice || maxPrice)}
        />
      ) : (
        <InfiniteProducts initialProducts={products} region={region} />
      )}
    </>
  )
}
