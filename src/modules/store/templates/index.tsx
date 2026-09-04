import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import SearchBar from "@modules/store/components/search-bar"
import FilterPanel from "@modules/store/components/filter-panel"
import FilterDrawer from "@modules/store/components/filter-drawer"
import CollectionFilter from "@modules/store/components/collection-filter"
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

  // force-cache + tag 'collections': el subscriber de Medusa (revalidate.ts)
  // invalida con revalidateTag('collections') cuando Catálogo crea/edita
  // colecciones vía admin API → el filtro siempre refleja las colecciones
  // actuales SIN sacrificar la caché (reemplaza el parche noStore de Jul 2026).
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  // El searchParam ?collection= trae el ID de la colección (como lo setea
  // FilterPanel y CollectionFilter). PaginatedProducts espera collectionId.
  const resolvedCollectionId = collection || undefined

  return (
    <div className="bg-white min-h-screen" data-testid="category-container">
      
      {/* ── Editorial Store Header ── */}
      <div className="pt-6 pb-6 px-6">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-black mb-3 block">
                Selección Exclusiva — Le Bon Marché
              </span>
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-black leading-none tracking-tighter"
                data-testid="store-page-title"
              >
                Nuestra <em className="italic font-light">Colección</em>
              </h1>
            </div>
            <p className="text-brand-gray text-xs font-light leading-relaxed max-w-xs md:text-right">
              Productos originales y difíciles de encontrar,{" "}
              traídos directo a Bucaramanga con envío a toda Colombia.
            </p>
          </div>
          {/* Thin divider line */}
          <div className="mt-8 h-px w-full bg-gray-100" />
        </div>
      </div>

      <div className="content-container px-6 py-7">
        {/* ── Filtro de colecciones (pills elegantes, todo el ancho) ── */}
        <CollectionFilter collections={collections || []} />

        <div className="flex flex-col medium:flex-row gap-x-10 gap-y-8">

          {/* ── Filtros móviles: botón sticky + drawer ── */}
          <FilterDrawer sortBy={sort} collections={collections || []} />

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden medium:block medium:sticky medium:top-28 w-full medium:w-[200px] flex-shrink-0 self-start">
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
              <div className="mb-6 pb-4 border-b border-brand-gray-light">
                <p className="text-[10px] text-brand-gray uppercase tracking-[0.3em] font-medium">
                  Resultados para:{" "}
                  <span className="text-brand-black font-bold italic">&quot;{query}&quot;</span>
                </p>
              </div>
            )}

            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
                query={query}
                collectionId={resolvedCollectionId}
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
