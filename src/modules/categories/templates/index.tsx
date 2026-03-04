import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="py-12 bg-white" data-testid="category-container">
      <div className="content-container flex flex-col small:flex-row small:items-start gap-x-12">
        <div className="small:sticky small:top-24 w-full small:w-[250px] flex-shrink-0">
          <RefinementList sortBy={sort} data-testid="sort-by-container" />
        </div>
        <div className="w-full">
          <div className="mb-12 border-b border-gray-100 pb-8 flex flex-col gap-y-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-x-2 text-[10px] uppercase tracking-widest text-gray-400">
              <LocalizedClientLink href="/store" className="hover:text-brand-gold transition-colors">
                Tienda
              </LocalizedClientLink>
              {parents && parents.reverse().map((parent) => (
                <span key={parent.id} className="flex items-center gap-x-2">
                  <span className="text-gray-300">/</span>
                  <LocalizedClientLink
                    href={`/categories/${parent.handle}`}
                    className="hover:text-brand-gold transition-colors"
                  >
                    {parent.name}
                  </LocalizedClientLink>
                </span>
              ))}
              <span className="text-gray-300">/</span>
              <span className="text-brand-gold font-bold">{category.name}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif text-brand-black" data-testid="category-page-title">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="mt-4 text-gray-500 text-sm max-w-[600px] leading-relaxed italic font-serif">
                    &ldquo;{category.description}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {category.category_children && category.category_children.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {category.category_children.map((c) => (
                  <LocalizedClientLink
                    key={c.id}
                    href={`/categories/${c.handle}`}
                    className="px-4 py-2 border border-gray-100 bg-gray-50/50 text-brand-black text-[10px] uppercase tracking-widest font-bold hover:bg-brand-black hover:text-white transition-all duration-300 rounded-full"
                  >
                    {c.name}
                  </LocalizedClientLink>
                ))}
              </div>
            )}
          </div>

          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
