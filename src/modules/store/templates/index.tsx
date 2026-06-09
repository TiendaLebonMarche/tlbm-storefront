import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import SearchBar from "@modules/store/components/search-bar"
import FilterPanel from "@modules/store/components/filter-panel"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCollections } from "@lib/data/collections"

import PaginatedProducts from "./paginated-products"
import ActiveFilters from "../components/active-filters"

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

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  return (
    <div className="bg-white min-h-screen" data-testid="category-container">
      
      {/* ── Editorial Store Header ── */}
      <div className="border-b border-gray-100 pt-8 pb-10 px-6">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-olive mb-3 block">
                Selección Exclusiva — Le Bon Marché
              </span>
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-brown leading-none tracking-tighter"
                data-testid="store-page-title"
              >
                Nuestra <em className="italic font-light">Colección</em>
              </h1>
            </div>
            <p className="text-gray-400 text-xs font-light leading-relaxed max-w-xs md:text-right">
              Artículos originales y codiciados del mercado global,{" "}
              traídos con el mejor servicio a Bucaramanga.
            </p>
          </div>
          {/* Thin divider line */}
          <div className="mt-8 h-px w-full bg-gray-100" />
        </div>
      </div>

      <div className="content-container px-6 py-10">
        <div className="flex flex-col medium:flex-row gap-x-10 gap-y-8">

          {/* ── Sidebar ── */}
          <aside className="medium:sticky medium:top-28 w-full medium:w-[200px] flex-shrink-0 self-start">
            <div className="space-y-8">
              <SearchBar />
              <RefinementList sortBy={sort} />
              <FilterPanel collections={collections || []} />
            </div>
          </aside>

          {/* ── Main Grid ── */}
          <div className="flex-1 min-w-0">
            {/* Active filter badges */}
            <ActiveFilters />

            {/* Active search label */}
            {query && (
              <div className="mb-6 pb-4 border-b border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-medium">
                  Resultados para:{" "}
                  <span className="text-brand-brown font-bold italic">&quot;{query}&quot;</span>
                </p>
              </div>
            )}

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
