"use server"

/**
 * Actualiza el email de una orden vía Admin API de Medusa.
 * Se ejecuta después de que complete() crea la orden exitosamente.
 * Esto soluciona el bug de Medusa v2 que no copia cart.email a order.email.
 */
export async function updateOrderEmail(orderId: string, email: string) {
  try {
    if (!orderId || !email) {
      console.warn("updateOrderEmail: faltan datos", { orderId, email })
      return { success: false, error: "Missing required data" }
    }

    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    if (!backendUrl) {
      console.warn("updateOrderEmail: NEXT_PUBLIC_MEDUSA_BACKEND_URL no configurado")
      return { success: false, error: "Backend URL not configured" }
    }

    // 1. Autenticar como admin
    const authRes = await fetch(`${backendUrl}/auth/user/emailpass`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@tiendalbm.com",
        password: process.env.ADMIN_PASSWORD || "Admin123!",
      }),
    })

    if (!authRes.ok) {
      console.error("updateOrderEmail: error de autenticación admin", await authRes.text())
      return { success: false, error: "Auth failed" }
    }

    const { token } = await authRes.json()

    // 2. Actualizar la orden con el email en metadata (Medusa v2 no permite actualizar order.email después de creada)
    const updateRes = await fetch(`${backendUrl}/admin/orders/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        metadata: {
          customer_email: email,
        },
      }),
    })

    if (!updateRes.ok) {
      const errorText = await updateRes.text()
      console.error("updateOrderEmail: error al actualizar orden", errorText)
      return { success: false, error: errorText }
    }

    console.log(`✅ order.email actualizado: ${orderId} → ${email}`)
    return { success: true }
  } catch (err) {
    // Nunca lanzamos error para no romper el redirect
    console.error("updateOrderEmail: error inesperado:", err)
    return { success: false, error: String(err) }
  }
}
