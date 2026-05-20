import { renderHook } from "@testing-library/react"
import { useProductPrice } from "../use-product-price"
import { getProductPrice } from "@lib/util/get-product-price"

// Mock getProductPrice utility
jest.mock("@lib/util/get-product-price", () => ({
  getProductPrice: jest.fn(),
}))

describe("useProductPrice", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return null prices if product is not provided", () => {
    const { result } = renderHook(() =>
      useProductPrice({ product: null as any })
    )
    expect(result.current).toEqual({ cheapestPrice: null, variantPrice: null })
  })

  it("should call getProductPrice and return its results", () => {
    const mockPrices = {
      cheapestPrice: { calculated_price: "$100.00" },
      variantPrice: { calculated_price: "$120.00" },
    }
    ;(getProductPrice as jest.Mock).mockReturnValue(mockPrices)

    const mockProduct = { id: "prod_1", title: "Test Product" } as any
    const { result } = renderHook(() =>
      useProductPrice({ product: mockProduct, variantId: "var_1" })
    )

    expect(getProductPrice).toHaveBeenCalledWith({
      product: mockProduct,
      variantId: "var_1",
    })
    expect(result.current).toEqual(mockPrices)
  })
})
