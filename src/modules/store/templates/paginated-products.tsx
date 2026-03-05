import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import EmptyState from "@modules/store/components/empty-state"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

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
    limit: 100, // Aumentamos para filtrar localmente
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
    response: { products, count },
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
      const price = p.variants?.[0]?.calculated_price || 0
      return price >= min && price <= max
    })
  }

  // Paginar manualmente
  const startIndex = (page - 1) * PRODUCT_LIMIT
  const endIndex = startIndex + PRODUCT_LIMIT
  const paginatedProducts = products.slice(startIndex, endIndex)
  const totalPages = Math.ceil(products.length / PRODUCT_LIMIT)

  return (
    <>
      {products.length === 0 ? (
        <EmptyState
          query={query}
          filters={!!(collection || minPrice || maxPrice)}
        />
      ) : (
        <>
          <div className="mb-6 text-xs text-gray-600 font-medium">
            Mostrando {startIndex + 1} - {Math.min(endIndex, products.length)} de{" "}
            <span className="font-bold text-brand-black">{products.length} productos</span>
          </div>
          <ul
            className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 mb-12"
            data-testid="products-list"
          >
            {paginatedProducts.map((p) => {
              return (
                <li key={p.id}>
                  <ProductPreview product={p} region={region} />
                </li>
              )
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              data-testid="product-pagination"
              page={page}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </>
  )
}
