import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import SearchBar from "@modules/store/components/search-bar"
import FilterPanel from "@modules/store/components/filter-panel"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCollections } from "@lib/data/collections"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  query,
  collection,
  minPrice,
  maxPrice,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  query?: string
  collection?: string
  minPrice?: string
  maxPrice?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Obtener colecciones para el filtro
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <div className="py-12 bg-gray-50 min-h-screen" data-testid="category-container">
      <div className="content-container flex flex-col small:flex-row small:items-start gap-x-8">
        {/* Sidebar - Filtros */}
        <div className="small:sticky small:top-32 w-full small:w-[280px] flex-shrink-0">
          <div className="space-y-5">
            <RefinementList sortBy={sort} />
            <FilterPanel collections={collections || []} />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full">
          {/* Header */}
          <div className="mb-8">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
              Catálogo
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-black mb-4" data-testid="store-page-title">
              Nuestra Colección <span className="italic">Exótica</span>
            </h1>
            <p className="text-gray-600 text-sm font-light max-w-[400px] leading-relaxed">
              Curaduría exclusiva de piezas de lujo y tecnología de vanguardia. Descubre productos auténticos y certificados.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Resultados Info */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs text-gray-600 font-medium">
              {query && (
                <span>
                  Resultados para <span className="font-bold text-brand-black">"{query}"</span>
                </span>
              )}
            </p>
          </div>

          {/* Productos */}
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              query={query}
              collection={collection}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
