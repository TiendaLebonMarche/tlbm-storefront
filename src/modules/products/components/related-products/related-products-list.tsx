"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "../product-preview"
import Reveal from "@modules/common/components/reveal"

type RelatedProductsListProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

const RelatedProductsList: React.FC<RelatedProductsListProps> = ({ products, region }) => {
  return (
    <div className="product-page-constraint">
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product, i) => (
          <li key={product.id}>
            <Reveal delay={i * 100}>
              <ProductPreview region={region} product={product} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RelatedProductsList
