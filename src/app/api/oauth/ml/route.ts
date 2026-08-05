import { NextResponse } from "next/server"

/**
 * OAuth callback para Mercado Libre (Rancho 2 — integración API).
 * ML redirige aquí con ?code=... tras autorizar la aplicación.
 * Solo muestra el code para que el operador lo copie — no expone datos.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state") ?? ""

  if (!code) {
    return NextResponse.json({ error: "sin code en la URL" }, { status: 400 })
  }

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>OAuth Mercado Libre — code recibido</title>
<style>
  body { font-family: system-ui, sans-serif; background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
  .card { max-width: 640px; padding: 32px; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
  code { display: block; background: #f6f6f6; padding: 12px; border-radius: 8px; word-break: break-all; font-size: 13px; margin: 12px 0; }
  button { background: #3483fa; color: #fff; border: 0; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h2>Código de autorización recibido ✅</h2>
    <p>Copia este código y envíalo al agente:</p>
    <code id="code">${code}</code>
    <button onclick="navigator.clipboard.writeText(document.getElementById('code').textContent)">Copiar código</button>
    <p style="color:#777;font-size:12px;margin-top:16px">state: ${state || "—"}</p>
  </div>
</body>
</html>`

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
