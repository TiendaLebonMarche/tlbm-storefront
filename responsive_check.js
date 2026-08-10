// Verificación RESPONSIVE real: /co/guias, /co/collections, /co/quienes-somos
// en viewport móvil (375x812) y tablet (768x1024) + desktop (1440x900).
// Comprueba: header (hamburguesa+logo+carrito), sin overflow horizontal,
// drawer funcional (abre y cierra con clic afuera).
const { chromium } = require("playwright");

// Usar el chromium del sistema en vez de descargar el de playwright
const EXEC = ["/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/snap/bin/chromium"].find((p) => require("fs").existsSync(p));

const BASE = "https://www.tiendalebonmarche.com";
const PAGES = ["/co/guias", "/co/collections", "/co/quienes-somos", "/co/store"];
const VIEWPORTS = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

(async () => {
  // Conectarse al browser de Hermes (CDP en 127.0.0.1:9223) — crea contextos
  // con viewport emulado SIN tocar la pestaña activa de la sesión.
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
  const results = [];
  for (const vp of VIEWPORTS) {
    for (const page of PAGES) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
      const pg = await ctx.newPage();
      const errors = [];
      pg.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
      await pg.goto(BASE + page, { waitUntil: "networkidle", timeout: 45000 });
      await pg.waitForTimeout(800);

      // Header: botón Menú + logo + carrito
      const menuBtn = await pg.locator('[data-testid="nav-menu-button"]').first().isVisible().catch(() => false);
      const logo = await pg.locator("#main-header img").first().isVisible().catch(() => false);
      const cart = await pg.locator('#main-header a[href*="cart"], #main-header a[aria-label*="carrito"]').first().isVisible().catch(() => false);

      // Overflow horizontal
      const overflow = await pg.evaluate(() => {
        const doc = document.documentElement;
        return { scrollW: doc.scrollWidth, clientW: doc.clientWidth, overflowX: doc.scrollWidth > doc.clientWidth };
      });

      // Drawer: abrir con clic, verificar items, cerrar con clic afuera
      let drawerOk = null;
      if (vp.name !== "desktop-1440") {
        await pg.locator('[data-testid="nav-menu-button"]').first().click().catch(() => {});
        await pg.waitForTimeout(700);
        const drawerVisible = await pg.locator('[data-testid="nav-menu-popup"]').first().isVisible().catch(() => false);
        const items = drawerVisible
          ? await pg.locator('[data-testid="nav-menu-popup"] a').allTextContents().then((t) => t.map((s) => s.trim()).filter(Boolean).slice(0, 7))
          : [];
        // Cerrar con clic afuera (en el área derecha fuera del drawer)
        await pg.mouse.click(vp.width - 60, 300);
        await pg.waitForTimeout(600);
        const cerrado = !(await pg.locator('[data-testid="nav-menu-popup"]').first().isVisible().catch(() => false));
        drawerOk = { drawerVisible, items, cerrado };
      }

      await pg.screenshot({ path: `/tmp/resp_${vp.name}_${page.replace(/\//g, "_")}.png`, fullPage: false });
      results.push({ vp: vp.name, page, menuBtn, logo, cart, overflow: overflow.overflowX, overflowDiff: overflow.scrollW - overflow.clientW, drawerOk, jsErrors: errors.length });
      await ctx.close();
    }
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
