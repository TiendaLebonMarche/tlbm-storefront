"use server"

import { HttpTypes } from "@medusajs/types"

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1003778973247"

/**
 * Envía un mensaje al canal de Telegram usando el bot de notificaciones.
 */
async function sendTelegramNotification(text: string) {
  if (!TG_BOT_TOKEN) {
    console.warn("sendTelegram: TELEGRAM_BOT_TOKEN no configurado")
    return
  }
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      }
    )
    if (!res.ok) {
      const err = await res.text()
      console.warn("sendTelegram: error", res.status, err)
    } else {
      console.log("✅ Notificación enviada a Telegram")
    }
  } catch (err) {
    console.warn("sendTelegram: error de conexión:", err)
  }
}

/**
 * Envía un email de confirmación de orden al cliente usando Resend API.
 * No lanza errores para no interrumpir el flujo de checkout.
 */
async function sendResendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn("sendOrderEmail: RESEND_API_KEY no configurado")
    return { success: false, error: "Resend not configured" }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tienda Le Bon Marché <no-reply@tiendalebonmarche.com>",
        to: [to],
        subject: subject,
        html: html,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("sendOrderEmail: Resend error", res.status, errorText)
      return { success: false, error: errorText }
    }

    const result = await res.json()
    console.log(`✅ Email enviado a ${to}: ${result.id}`)
    return { success: true, id: result.id }
  } catch (err) {
    console.error("sendOrderEmail: error de conexión:", err)
    return { success: false, error: String(err) }
  }
}

/**
 * Genera el HTML del email de confirmación de orden.
 */
function buildOrderConfirmationEmail(order: any) {
  const shipping = order.shipping_address || {}
  const items = order.items || []
  const total = order.total || 0
  const displayId = order.display_id || order.id?.slice(-8) || ""

  const itemsHtml = items
    .map(
      (item: any) =>
        `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
            <strong>${item.title}</strong> x ${item.quantity}
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">
            $${(item.unit_price * item.quantity).toLocaleString("es-CO")} COP
          </td>
        </tr>`
    )
    .join("")

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: #000; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; font-size: 24px; margin: 0; font-family: Georgia, serif;">Tienda Le Bon Marché</h1>
              <p style="color: #aaa; font-size: 12px; margin: 8px 0 0;">Bucaramanga, Colombia</p>
            </td>
          </tr>

          <!-- Success -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <div style="width: 60px; height: 60px; background: #000; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 style="font-size: 22px; color: #000; margin: 0 0 8px;">¡Gracias por tu compra!</h2>
              <p style="color: #666; font-size: 14px; margin: 0;">Orden #${displayId}</p>
            </td>
          </tr>

          <!-- Customer info -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px; background: #f5f5f5; border-radius: 6px;">
                    <p style="margin: 0 0 4px; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Cliente</p>
                    <p style="margin: 0; font-size: 14px; color: #000;">${shipping.first_name || ""} ${shipping.last_name || ""}</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #666;">${shipping.phone || ""}</p>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #666;">
                      ${shipping.address_1 || ""}, ${shipping.city || ""}, ${shipping.province || ""}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 0 30px;">
              <h3 style="font-size: 14px; color: #000; border-bottom: 2px solid #000; padding-bottom: 8px;">Productos</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding: 20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 16px; font-weight: bold; color: #000;">TOTAL</td>
                  <td style="font-size: 16px; font-weight: bold; color: #000; text-align: right;">
                    $${total.toLocaleString("es-CO")} COP
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Payment info -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <p style="font-size: 12px; color: #999; margin: 0;">
                Método de pago: Efectivo — Pendiente de confirmación.<br>
                Un asesor se comunicará contigo para coordinar la entrega.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f5f5f5; padding: 20px 30px; text-align: center;">
              <p style="font-size: 11px; color: #999; margin: 0;">
                Tienda Le Bon Marché · Bucaramanga, Santander, Colombia<br>
                <a href="https://wa.me/573027567783" style="color: #000;">WhatsApp: +57 302 756 7783</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Envía notificaciones cuando se crea una orden nueva:
 * 1. Email de confirmación al cliente vía Resend
 * 2. Mensaje al canal de Telegram vía el bot Gerente de Ventas
 *
 * Totalmente defensiva para no interrumpir el flujo de compra.
 */
export async function sendOrderNotification(cartOrOrder: any, customerEmail?: string, cartShipping?: any) {
  try {
    if (!cartOrOrder) return { success: false, error: "No order data" }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@tiendalebonmarche.com"

    // Extraemos información de forma segura
    // Prioridad: datos explícitos del carrito (cartShipping) > datos de la orden
    // Esto resuelve el bug de Medusa v2 que no transfiere shipping_address al hacer complete()
    const shipping = cartShipping || cartOrOrder.shipping_address || {}
    // Usar el email recibido explícitamente, o fallback a order.email, o metadata
    const email = customerEmail || cartOrOrder.email || shipping?.metadata?.customer_email

    const customerInfo = {
      nombre: shipping?.first_name
        ? `${shipping.first_name} ${shipping.last_name || ""}`.trim()
        : "Invitado",
      email: email || "No proporcionado",
      whatsapp: shipping?.phone || "No proporcionado",
      municipio: shipping?.city || "Por definir",
      direccion: shipping?.address_1 || "Por definir",
      observaciones: shipping?.address_2 || "Ninguna",
    }

    const orderDetails = {
      id: cartOrOrder.id?.slice(-8) || "",
      display_id: cartOrOrder.display_id,
      total: cartOrOrder.total || 0,
      pago:
        cartOrOrder.payment_collection?.payment_sessions?.[0]?.provider_id ||
        "Pendiente",
      metodo_envio: cartOrOrder.shipping_methods?.[0]?.name || "Por definir",
    }

    console.log("-----------------------------------------")
    console.log("📢 NUEVA VENTA REGISTRADA - LE BON MARCHÉ")
    console.log("-----------------------------------------")
    console.log("👤 CLIENTE:", customerInfo)
    console.log("📦 RESUMEN:", orderDetails)
    console.log("-----------------------------------------")

    // --- 1. Enviar email de confirmación al cliente ---
    if (email && email !== "No proporcionado") {
      const emailData = { ...cartOrOrder, shipping_address: shipping }
      const emailResult = await sendResendEmail(
        email,
        `Tu orden #${orderDetails.display_id || orderDetails.id} está confirmada — Tienda Le Bon Marché`,
        buildOrderConfirmationEmail(emailData)
      )

      if (emailResult.success) {
        console.log(`✅ Email de confirmación enviado a ${email}`)
      } else {
        console.warn(`⚠️ No se pudo enviar email a ${email}:`, emailResult.error)
      }
    }

    // --- 2. Enviar notificación a Telegram ---
    const itemsLines = (cartOrOrder.items || []).map((item: any) => {
      const qty = item.quantity || 1
      const unitPrice = item.unit_price || 0
      return `  ${qty}x ${item.title}\n     $${unitPrice.toLocaleString("es-CO")} c/u → $${(unitPrice * qty).toLocaleString("es-CO")}`
    })

    const displayId = orderDetails.display_id || cartOrOrder.id?.slice(-8) || ""
    const total = orderDetails.total || 0
    
    let tgMsg = `🆕 *NUEVA VENTA #${displayId}*\n`
    tgMsg += `━━━━━━━━━━━━━━━━━━━━\n\n`
    tgMsg += `🆕 *Estado:* PENDIENTE — Pago por confirmar\n\n`
    tgMsg += `📧 *Email:* ${customerInfo.email}\n`
    tgMsg += `👤 *Nombre:* ${customerInfo.nombre}\n`
    tgMsg += `📞 *WhatsApp:* ${customerInfo.whatsapp}\n`
    tgMsg += `📍 *Dirección:* ${customerInfo.direccion}, ${customerInfo.municipio}\n\n`
    tgMsg += `━━━ *PRODUCTOS* ━━━\n`
    tgMsg += `${itemsLines.join("\n")}\n\n`
    tgMsg += `━━━ *TOTALES* ━━━\n`
    tgMsg += `  Total: $${total.toLocaleString("es-CO")} COP\n`
    tgMsg += `━━━━━━━━━━━━━━━━━━━━\n`

    await sendTelegramNotification(tgMsg)

    return { success: true }
  } catch (err) {
    console.error("Critical error in notification action:", err)
    return { success: false }
  }
}
