import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <div className="group text-center">
      <LocalizedClientLink href={`/products/${product.handle}`} data-testid="product-wrapper">
        <div className="relative overflow-hidden bg-gray-50 aspect-square mb-4">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </div>
      </LocalizedClientLink>

      {/* Generamos un Tag Visual basado en el Collection o Genérico */}
      <span className="text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-sm mb-1 inline-block bg-slate-100 text-slate-600">
        {product.collection?.title || "Exclusivo"}
      </span>

      <p className="text-[9px] text-gray-400 mb-2 uppercase tracking-wide">
        #{product.type?.value || "Luxury"}
      </p>

      <LocalizedClientLink href={`/products/${product.handle}`}>
        <h3 className="text-lg font-serif" data-testid="product-title">{product.title}</h3>
      </LocalizedClientLink>

      {cheapestPrice && <PreviewPrice price={cheapestPrice as any} />}

      <LocalizedClientLink href={`/products/${product.handle}`} className="w-full inline-block border border-brand-black flex items-center justify-center py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-black hover:text-white transition-all">
        Ver Detalles
      </LocalizedClientLink>
    </div>
  )
}
