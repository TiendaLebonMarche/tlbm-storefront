"use server"

import { HttpTypes } from "@medusajs/types"

/**
 * Envia una notificación por correo al administrador sobre un nuevo pedido.
 * 
 * NOTA: En un entorno real, aquí se integraría un servicio como Resend, SendGrid o Postmark.
 * Por ahora, preparamos la estructura y simulamos el envío.
 */
export async function sendOrderNotification(cart: HttpTypes.StoreCart) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@tiendalebonmarche.com"
  
  const customerInfo = {
    nombre: `${cart.shipping_address?.first_name} ${cart.shipping_address?.last_name}`,
    email: cart.email,
    whatsapp: cart.shipping_address?.phone,
    direccion: `${cart.shipping_address?.address_1}, ${cart.shipping_address?.city}`,
    observaciones: cart.shipping_address?.address_2 || "Ninguna",
  }

  const orderDetails = {
    total: cart.total,
    items: cart.items?.map(item => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
    })),
    payment: "Efectivo / Transferencia (Pendiente)"
  }

  console.log("--- NUEVA ORDEN RECIBIDA ---")
  console.log("Cliente:", customerInfo)
  console.log("Detalles:", orderDetails)
  console.log("----------------------------")

  // Aquí iría el código de integración con el servicio de correo
  // Ejemplo con Resend (pseudocódigo):
  // await resend.emails.send({
  //   from: 'Tienda Le Bon Marché <ventas@tiendalebonmarche.com>',
  //   to: adminEmail,
  //   subject: `Nuevo Pedido - ${customerInfo.nombre}`,
  //   html: `<h1>Nuevo pedido de ${customerInfo.nombre}</h1>...`
  // })

  return { success: true }
}
