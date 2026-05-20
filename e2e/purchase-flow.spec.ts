import { test, expect } from "@playwright/test"

test.describe("Purchase Flow & Product Page E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Go to a known dynamic product page (e.g. using a generic or mock handle)
    // For local tests, we can target the store homepage first or navigate
    await page.goto("/co/store")
  })

  test("should load the store page and display product grid", async ({ page }) => {
    // Verify that the product grid exists
    const productGrid = page.locator("[data-testid=product-wrapper]")
    await expect(productGrid.first()).toBeVisible()
  })

  test("should navigate to a product page, check details & SEO schema", async ({ page }) => {
    // Click on the first product card
    const firstProduct = page.locator("[data-testid=product-wrapper]").first()
    await firstProduct.click()

    // Assert that we are on a product page
    await expect(page).toHaveURL(/\/co\/productos\//)

    // Verify title and breadcrumbs are loaded
    const productTitle = page.locator("[data-testid=product-title]").first()
    await expect(productTitle).toBeVisible()
    
    // Check if JSON-LD schemas are embedded in the document head/body
    const jsonLdScripts = page.locator('script[type="application/ld+json"]')
    await expect(jsonLdScripts.first()).toBeAttached()

    const scriptsCount = await jsonLdScripts.count()
    expect(scriptsCount).toBeGreaterThanOrEqual(2) // Schema Product + Schema BreadcrumbList
  })

  test("should add product to cart and verify cart drawer opens", async ({ page }) => {
    // Navigate directly to the first product on the store page
    const firstProduct = page.locator("[data-testid=product-wrapper]").first()
    await firstProduct.click()

    // Ensure the main button is visible and active
    const addToCartButton = page.locator("[data-testid=add-product-button]").first()
    await expect(addToCartButton).toBeVisible()

    // If there are options to select (e.g. Size, Color), select them
    const options = page.locator("[data-testid=product-options]")
    const optionCount = await options.count()
    if (optionCount > 0) {
      for (let i = 0; i < optionCount; i++) {
        const firstOptionVal = options.nth(i).locator("button").first()
        await firstOptionVal.click()
      }
    }

    // Click on 'Añadir a mi bolsa'
    await addToCartButton.click()

    // Check for success feedback (e.g., green indicator or 'Añadido con éxito')
    await expect(page.locator("text=Añadido con éxito").first()).toBeVisible()
  })
})
