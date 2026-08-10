/**
 * Google Tag Manager / dataLayer helpers
 * Centralized event tracking for tiendalebonmarche.com
 */

// dataLayer global: ya declarado por @next/third-parties/google (GoogleTagManager)

// Ensure dataLayer exists
const ensureDataLayer = () => {
  if (typeof window === "undefined") return false
  window.dataLayer = window.dataLayer || []
  return true
}

/**
 * Push a generic event to dataLayer
 */
export const pushEvent = (event: string, data?: Record<string, unknown>) => {
  if (!ensureDataLayer()) return
  // ensureDataLayer() garantiza la inicialización (non-null assertion)
  window.dataLayer!.push({
    event,
    ...data,
  })
}

/**
 * E-commerce events following GA4 Enhanced Ecommerce spec
 */

export const trackViewItem = (product: {
  id: string
  name: string
  price: number
  category?: string
  variant?: string
}) => {
  pushEvent("view_item", {
    ecommerce: {
      currency: "COP",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || "",
          item_variant: product.variant || "",
          price: product.price,
          quantity: 1,
        },
      ],
    },
  })
}

export const trackAddToCart = (product: {
  id: string
  name: string
  price: number
  quantity: number
  category?: string
  variant?: string
}) => {
  pushEvent("add_to_cart", {
    ecommerce: {
      currency: "COP",
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || "",
          item_variant: product.variant || "",
          price: product.price,
          quantity: product.quantity,
        },
      ],
    },
  })
}

export const trackRemoveFromCart = (product: {
  id: string
  name: string
  price: number
  quantity: number
}) => {
  pushEvent("remove_from_cart", {
    ecommerce: {
      currency: "COP",
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    },
  })
}

export const trackBeginCheckout = (cart: {
  total: number
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    category?: string
  }>
}) => {
  pushEvent("begin_checkout", {
    ecommerce: {
      currency: "COP",
      value: cart.total,
      items: cart.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || "",
        price: item.price,
        quantity: item.quantity,
      })),
    },
  })
}

export const trackPurchase = (order: {
  id: string
  total: number
  shipping?: number
  tax?: number
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    category?: string
  }>
}) => {
  pushEvent("purchase", {
    ecommerce: {
      transaction_id: order.id,
      currency: "COP",
      value: order.total,
      shipping: order.shipping || 0,
      tax: order.tax || 0,
      items: order.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || "",
        price: item.price,
        quantity: item.quantity,
      })),
    },
  })
}

/**
 * Business events
 */
export const trackWhatsAppClick = (page: string) => {
  pushEvent("whatsapp_click", {
    page_path: page,
  })
}

export const trackSearch = (query: string, resultsCount: number) => {
  pushEvent("search", {
    search_term: query,
    results_count: resultsCount,
  })
}
