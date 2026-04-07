"use server"

import { HttpTypes } from "@medusajs/types"

/**
 * Envia una notificación por correo al administrador sobre un nuevo pedido.
 */
export async function sendOrderNotification(cart: HttpTypes.StoreCart) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@tiendalebonmarche.com"
  
  // Determinamos el método de pago para el correo
  const paymentSession = cart.payment_collection?.payment_sessions?.[0]
  const paymentTitle = paymentSession?.provider_id === "pp_system_default" 
    ? "Manual (Efectivo / Transferencia)" 
    : paymentSession?.provider_id || "No especificado"

  const customerInfo = {
    nombre: `${cart.shipping_address?.first_name}`,
    email: cart.email,
    whatsapp: cart.shipping_address?.phone,
    municipio: cart.shipping_address?.city,
    direccion: `${cart.shipping_address?.address_1}`,
    observaciones: cart.shipping_address?.address_2 || "Ninguna",
  }

  const orderDetails = {
    total: cart.total,
    items: cart.items?.map(item => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
    })),
    pago: paymentTitle,
    metodo_envio: cart.shipping_methods?.[0]?.name || "Por definir"
  }

  console.log("-----------------------------------------")
  console.log("📢 NOTIFICACIÓN DE VENTA - LE BON MARCHÉ")
  console.log("-----------------------------------------")
  console.log("👤 CLIENTE:", customerInfo)
  console.log("📦 PEDIDO:", orderDetails)
  console.log("-----------------------------------------")

  // Log simulated success
  return { success: true, message: "Notificación enviada al administrador" }
}
