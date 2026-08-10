const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
  const ctx = browser.contexts()[0];
  const page = ctx.pages().find((p) => !p.url().includes("about:blank")) || ctx.pages()[0];
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto("https://www.tiendalebonmarche.com/co/productos/pack-parlante-monster-s320-40w-redmi-buds", { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(1200);

  // 1) Estado inicial: overflow + franja de acciones (AÑADIR + WhatsApp)
  const antes = await page.evaluate(() => {
    const doc = document.documentElement;
    // Franja de acciones: botón AÑADIR y su contenedor
    const addBtn = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("AÑADIR") || b.textContent.includes("Añadir") || b.textContent.includes("ADD"));
    const addInfo = addBtn ? (() => {
      const r = addBtn.getBoundingClientRect();
      let cont = addBtn.parentElement;
      const cr = cont.getBoundingClientRect();
      const cs = getComputedStyle(cont);
      let cont2 = cont.parentElement;
      const cr2 = cont2.getBoundingClientRect();
      const cs2 = getComputedStyle(cont2);
      return { btnTop: Math.round(r.top), btnBottom: Math.round(r.bottom), contCls: (cont.className || "").slice(0, 90), contPos: cs.position, contBottom: Math.round(cr.bottom), cont2Cls: (cont2.className || "").slice(0, 90), cont2Pos: cs2.position, cont2Bottom: Math.round(cr2.bottom), vh: window.innerHeight };
    })() : null;
    return { overflowX: doc.scrollWidth > doc.clientWidth, diff: doc.scrollWidth - doc.clientWidth, vw: window.innerWidth, addInfo };
  });
  console.log("ANTES:", JSON.stringify(antes, null, 1));
  await page.screenshot({ path: "/tmp/pdp_mobile_antes.png" });

  // 2) Scroll al fondo para ver el comportamiento de la franja
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const scrolled = await page.evaluate(() => {
    const doc = document.documentElement;
    const addBtn = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("AÑADIR") || b.textContent.includes("Añadir"));
    const r = addBtn ? addBtn.getBoundingClientRect() : null;
    return { scrollY: Math.round(window.scrollY), maxScroll: Math.round(doc.scrollHeight - window.innerHeight), btnTop: r ? Math.round(r.top) : null, btnBottom: r ? Math.round(r.bottom) : null, vh: window.innerHeight };
  });
  console.log("SCROLLED:", JSON.stringify(scrolled, null, 1));
  await page.screenshot({ path: "/tmp/pdp_mobile_scrolled.png" });

  await page.setViewportSize({ width: 1691, height: 862 });
  await browser.close();
})();
