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
    <div className="bg-white min-h-screen" data-testid="category-container">
      <div className="content-container">
        {/* Editorial Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Selección Exclusiva
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-brand-black mb-6" data-testid="store-page-title">
            Nuestra <span className="italic">Colección</span>
          </h1>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto mb-8" />
          <p className="text-gray-500 text-sm font-light leading-relaxed">
            Cazamos por usted los artículos más originales y codiciados del mercado global. Cero &quot;gato por liebre&quot;, solo la máxima calidad traída con el mejor servicio.
          </p>
        </div>

        <div className="flex flex-col medium:flex-row gap-x-12">
          {/* Sidebar - Filtros más limpios */}
          <aside className="medium:sticky medium:top-32 w-full medium:w-[240px] flex-shrink-0 mb-12 medium:mb-0">
            <div className="space-y-10">
              <SearchBar />
              <RefinementList sortBy={sort} />
              <FilterPanel collections={collections || []} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Resultados Info - Minimalista */}
            {query && (
              <div className="mb-8 pb-4 border-b border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                  Resultados para: <span className="text-brand-black italic">&quot;{query}&quot;</span>
                </p>
              </div>
            )}

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
    </div>
  )
}

export default StoreTemplate
