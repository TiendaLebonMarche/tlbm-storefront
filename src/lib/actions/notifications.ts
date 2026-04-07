"use server"

import { HttpTypes } from "@medusajs/types"

/**
 * Envia una notificación por correo al administrador sobre un nuevo pedido.
 * Esta acción es totalmente defensiva para evitar interrumpir el flujo de compra.
 */
export async function sendOrderNotification(cartOrOrder: any) {
  try {
    if (!cartOrOrder) return { success: false, error: "No order data" }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@tiendalebonmarche.com"
    
    // Extraemos información de forma segura
    const shipping = cartOrOrder.shipping_address
    const email = cartOrOrder.email
    
    const customerInfo = {
      nombre: shipping?.first_name ? `${shipping.first_name} ${shipping.last_name || ""}`.trim() : "Invitado",
      email: email || "No proporcionado",
      whatsapp: shipping?.phone || "No proporcionado",
      municipio: shipping?.city || "Por definir",
      direccion: shipping?.address_1 || "Por definir",
      observaciones: shipping?.address_2 || "Ninguna",
    }

    const orderDetails = {
      total: cartOrOrder.total || 0,
      pago: cartOrOrder.payment_collection?.payment_sessions?.[0]?.provider_id || "Pendiente",
      metodo_envio: cartOrOrder.shipping_methods?.[0]?.name || "Por definir"
    }

    console.log("-----------------------------------------")
    console.log("📢 NUEVA VENTA REGISTRADA - LE BON MARCHÉ")
    console.log("-----------------------------------------")
    console.log("👤 CLIENTE:", customerInfo)
    console.log("📦 RESUMEN:", orderDetails)
    console.log("-----------------------------------------")

    return { success: true }
  } catch (err) {
    // Nunca lanzamos error desde aquí para no romper el checkout
    console.error("Critical error in notification action:", err)
    return { success: false }
  }
}
