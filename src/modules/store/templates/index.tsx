import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="py-12 bg-white" data-testid="category-container">
      <div className="content-container flex flex-col small:flex-row small:items-start gap-x-12">
        <div className="small:sticky small:top-24 w-full small:w-[250px] flex-shrink-0">
          <RefinementList sortBy={sort} />
        </div>
        <div className="w-full">
          <div className="mb-12 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Catálogo</span>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-black" data-testid="store-page-title">
                Nuestra Colección <span className="italic">Exótica</span>
              </h1>
            </div>
            <p className="text-gray-400 text-xs font-medium max-w-[300px] leading-relaxed">
              Curaduría exclusiva de piezas de lujo y tecnología de vanguardia.
            </p>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
