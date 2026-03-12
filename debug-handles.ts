import { sdk } from "./src/lib/config"

async function debugCategories() {
  try {
    const response = await sdk.client.fetch("/store/product-categories", {
      query: {
        fields: "handle,name"
      }
    })
    console.log("Categories:", JSON.stringify(response, null, 2))
    
    const collections = await sdk.client.fetch("/store/collections", {
        query: {
          fields: "handle,title"
        }
      })
    console.log("Collections:", JSON.stringify(collections, null, 2))
  } catch (error) {
    console.error("Error fetching categories:", error)
  }
}

debugCategories()
