import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import RelatedProductsList from "./related-products-list"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Define query params with higher limit and broader criteria
  const queryParams: HttpTypes.StoreProductListParams = {
    limit: 50, // Fetch more to shuffle for variety
    is_giftcard: false,
  }

  if (region?.id) {
    queryParams.region_id = region.id
  }

  // Use collection or categories for relevance
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  } else if (product.categories && product.categories.length > 0) {
    queryParams.category_id = product.categories.map(c => c.id)
  }

  let { response: { products } } = await listProducts({
    queryParams,
    countryCode,
  })

  // If we have very few products, broaden the search to the whole store
  if (products.length < 10) {
    const fallbackData = await listProducts({
      queryParams: { limit: 50, is_giftcard: false, region_id: region.id },
      countryCode,
    })
    products = fallbackData.response.products
  }

  // Shuffle and filter out the current product
  const filteredProducts = products
    .filter((p) => p.id !== product.id)
    // Math.random en server component: 1x/request (ISR/dynamic)
    // eslint-disable-next-line react-hooks/purity -- server component, 1x/request
    .sort(() => 0.5 - Math.random()) // Randomize for variety
    .slice(0, 20) // Limit to 20 for the infinite scroll

  if (!products.length) {
    return null
  }

  return <RelatedProductsList products={filteredProducts} region={region} />
}
