// Verificación RESPONSIVE REAL vía CDP del browser de Hermes (127.0.0.1:9223).
// Cambia el viewport de la pestaña ACTIVA → mide + captura + abre/cierra drawer.
const { chromium } = require("playwright");

const BASE = "https://www.tiendalebonmarche.com";
const PAGES = ["/co/guias", "/co/collections", "/co/quienes-somos"];
const VW = 390; // iPhone-ish

(async () => {
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
  const ctx = browser.contexts()[0];
  const page = ctx.pages().find((p) => !p.url().includes("about:blank")) || ctx.pages()[0];
  const results = [];

  for (const path of PAGES) {
    await page.setViewportSize({ width: VW, height: 844 });
    await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(900);

    const info = await page.evaluate(() => {
      const doc = document.documentElement;
      const menuBtn = document.querySelector('[data-testid="nav-menu-button"]');
      const logo = document.querySelector("#main-header img");
      const cart = document.querySelector('#main-header a[href*="cart"]');
      const marquee = !!document.querySelector('[class*="marquee"]');
      const cartBtn = !!document.querySelector('#main-header button[aria-label*="carrito" i], #main-header [data-testid*="cart"]');
      return {
        vw: window.innerWidth,
        overflowX: doc.scrollWidth > doc.clientWidth,
        diff: doc.scrollWidth - doc.clientWidth,
        menuBtnVisible: !!menuBtn && menuBtn.getBoundingClientRect().width > 0,
        logoVisible: !!logo && logo.getBoundingClientRect().width > 0,
        cartVisible: !!cart && cart.getBoundingClientRect().width > 0,
        cartBtnVisible: cartBtn,
        marquee,
      };
    });

    // Abrir drawer
    await page.locator('[data-testid="nav-menu-button"]').first().click().catch(() => {});
    await page.waitForTimeout(700);
    const drawerVisible = await page.locator('[data-testid="nav-menu-popup"]').first().isVisible().catch(() => false);
    const items = drawerVisible
      ? (await page.locator('[data-testid="nav-menu-popup"] a').allTextContents()).map((s) => s.trim()).filter(Boolean).slice(0, 8)
      : [];
    await page.screenshot({ path: `/tmp/resp_mobile_${path.replace(/\//g, "_")}.png` });
    // Cerrar con clic afuera (zona derecha fuera del drawer: ahora 48px de franja en mobile)
    await page.mouse.click(VW - 20, 300).catch(() => {});
    await page.waitForTimeout(600);
    const cerrado = !(await page.locator('[data-testid="nav-menu-popup"]').first().isVisible().catch(() => false));

    results.push({ page: path, ...info, drawerVisible, items, drawerCerradoConClicFuera: cerrado });
  }

  // Restaurar viewport de escritorio
  await page.setViewportSize({ width: 1691, height: 862 });
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
