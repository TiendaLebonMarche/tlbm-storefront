const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
  const ctx = browser.contexts()[0];
  const page = ctx.pages().find((p) => !p.url().includes("about:blank")) || ctx.pages()[0];
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("https://www.tiendalebonmarche.com/co/productos/parlante-passau-40w", { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1200);

  // Clic en el botón Añadir DESKTOP (add-product-button — accionable)
  const addBtn = page.locator('[data-testid="add-product-button"]').first();
  console.log("add btn visible:", await addBtn.isVisible().catch(() => false));
  await addBtn.click({ timeout: 8000 }).catch((e) => console.log("click err:", e.message.slice(0, 120)));

  // Medir overflow en varios momentos
  const times = [0, 200, 700, 1500, 2500];
  const samples = [];
  let prev = 0;
  for (const ms of times) {
    await page.waitForTimeout(ms === 0 ? 50 : ms - prev);
    prev = ms;
    const s = await page.evaluate((t) => {
      const doc = document.documentElement;
      return { t, overflowX: doc.scrollWidth > doc.clientWidth, diff: doc.scrollWidth - doc.clientWidth, bolsa: document.body.innerText.includes("Tu bolsa"), scrollY: Math.round(window.scrollY) };
    }, ms);
    samples.push(s);
  }
  console.log("SAMPLES:", JSON.stringify(samples, null, 1));
  await page.screenshot({ path: "/tmp/pdp_add_desktop_btn.png" });

  await page.setViewportSize({ width: 1691, height: 862 });
  await browser.close();
})();
