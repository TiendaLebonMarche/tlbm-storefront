const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
  const ctx = browser.contexts()[0];
  const page = ctx.pages().find((p) => !p.url().includes("about:blank")) || ctx.pages()[0];
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("https://www.tiendalebonmarche.com/co/productos/parlante-passau-40w", { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1200);

  // Scroll al área del botón y capturar la franja
  await page.evaluate(() => {
    const btn = document.querySelector('[data-testid="mobile-cart-button"]');
    if (btn) btn.scrollIntoView({ block: "center" });
    window.scrollBy(0, -60);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "/tmp/pdp_simple_franja.png" });

  // Clic forzado en Añadir (franja móvil)
  const btn = page.locator('[data-testid="mobile-cart-button"]');
  await btn.click({ force: true, timeout: 6000 }).catch((e) => console.log("click err:", e.message.slice(0, 120)));
  await page.waitForTimeout(1600);

  const despues = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      overflowX: doc.scrollWidth > doc.clientWidth,
      diff: doc.scrollWidth - doc.clientWidth,
      bolsaAbierta: document.body.innerText.includes("Tu bolsa"),
      bodyOverflow: getComputedStyle(document.body).overflow,
      htmlOverflow: getComputedStyle(doc).overflow,
      scrollY: Math.round(window.scrollY),
    };
  });
  console.log("DESPUES:", JSON.stringify(despues, null, 1));
  await page.screenshot({ path: "/tmp/pdp_simple_agregado.png" });

  // Cerrar la bolsa con clic en la franja izquierda
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
