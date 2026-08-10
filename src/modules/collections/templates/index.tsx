import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div>
      {/* Header editorial — patrón /co/store (PageHeader) */}
      <div className="pt-8 pb-10 px-6">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-black mb-3 block">
                Colección
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-black leading-none tracking-tighter">
                {collection.title}
              </h1>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-gray-100" />
        </div>
      </div>

      <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={collection.products?.length}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
