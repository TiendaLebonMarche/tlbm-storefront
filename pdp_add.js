const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
  const ctx = browser.contexts()[0];
  const page = ctx.pages().find((p) => !p.url().includes("about:blank")) || ctx.pages()[0];
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("https://www.tiendalebonmarche.com/co/productos/pack-parlante-monster-s320-40w-redmi-buds", { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1200);

  // Scroll al área del botón AÑADIR (franja móvil)
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Añadir") && b.dataset.testid === "mobile-cart-button");
    if (btn) btn.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(800);
  const franjaVisible = await page.locator('[data-testid="mobile-actions"]').isVisible().catch(() => false);
  console.log("FRANJA MOBILE VISIBLE:", franjaVisible);
  await page.screenshot({ path: "/tmp/pdp_mobile_franja.png" });

  // Clic en Añadir (franja móvil)
  await page.locator('[data-testid="mobile-cart-button"]').click({ timeout: 6000 }).catch((e) => console.log("click err:", e.message.slice(0, 100)));
  await page.waitForTimeout(1500);

  // Medir overflow DESPUÉS de agregar + estado de la bolsa
  const despues = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    return {
      overflowX: doc.scrollWidth > doc.clientWidth,
      diffDoc: doc.scrollWidth - doc.clientWidth,
      bodyScrollW: body.scrollWidth,
      bodyClientW: body.clientWidth,
      bodyOverflow: getComputedStyle(body).overflow,
      bodyOverflowX: getComputedStyle(body).overflowX,
      vw: window.innerWidth,
      bolsaAbierta: document.body.innerText.includes("Tu bolsa"),
    };
  });
  console.log("DESPUES DE AGREGAR:", JSON.stringify(despues, null, 1));
  await page.screenshot({ path: "/tmp/pdp_mobile_agregado.png" });

  // Cerrar la bolsa si está abierta (clic en la franja izquierda)
  await page.mouse.click(20, 400).catch(() => {});
  await page.waitForTimeout(800);
  const final = await page.evaluate(() => {
    const doc = document.documentElement;
    return { overflowX: doc.scrollWidth > doc.clientWidth, diff: doc.scrollWidth - doc.clientWidth, bolsaAbierta: document.body.innerText.includes("Tu bolsa") };
  });
  console.log("FINAL:", JSON.stringify(final, null, 1));

  await page.setViewportSize({ width: 1691, height: 862 });
  await browser.close();
})();
