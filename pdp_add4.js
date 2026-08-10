const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
  const ctx = browser.contexts()[0];
  const page = ctx.pages().find((p) => !p.url().includes("about:blank")) || ctx.pages()[0];
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("https://www.tiendalebonmarche.com/co/productos/cable-starlink-mini-2m-usb-c", { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1200);

  const info = await page.evaluate(() => {
    const btn = document.querySelector('[data-testid="add-product-button"]');
    const mobileBtn = document.querySelector('[data-testid="mobile-cart-button"]');
    return { desktopDisabled: btn?.disabled, desktopText: btn?.textContent.trim().slice(0, 30), mobileText: mobileBtn?.textContent.trim().slice(0, 30) };
  });
  console.log("BOTONES:", JSON.stringify(info, null, 1));

  // Clic real en el botón desktop
  const addBtn = page.locator('[data-testid="add-product-button"]').first();
  await addBtn.click({ timeout: 8000 }).catch((e) => console.log("click err:", e.message.slice(0, 100)));

  const times = [0, 300, 800, 1500];
  const samples = [];
  let prev = 0;
  for (const ms of times) {
    await page.waitForTimeout(ms === 0 ? 80 : ms - prev);
    prev = ms;
    const s = await page.evaluate((t) => {
      const doc = document.documentElement;
      return { t, overflowX: doc.scrollWidth > doc.clientWidth, diff: doc.scrollWidth - doc.clientWidth, bolsa: document.body.innerText.includes("Tu bolsa"), bodyOverflow: getComputedStyle(document.body).overflow, scrollY: Math.round(window.scrollY) };
    }, ms);
    samples.push(s);
  }
  console.log("SAMPLES:", JSON.stringify(samples, null, 1));
  await page.screenshot({ path: "/tmp/pdp_cable_agregado.png" });

  // Cerrar bolsa con clic en la franja izquierda
  await page.mouse.click(20, 400).catch(() => {});
  await page.waitForTimeout(800);
  console.log("BOLSA CERRADA:", !(await page.evaluate(() => document.body.innerText.includes("Tu bolsa"))));

  await page.setViewportSize({ width: 1691, height: 862 });
  await browser.close();
})();
