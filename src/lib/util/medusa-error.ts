export default function medusaError(error: any): never {
  if (error.response) {
    const message = error.response.data?.message || error.response.data || "Error del servidor"

    // Solo intentamos construir la URL si tenemos la configuración necesaria
    if (error.config?.url) {
      try {
        const u = new URL(error.config.url, error.config.baseURL)
        console.error("Resource:", u.toString())
      } catch (e) { }
    }

    console.error("Response data:", error.response.data)
    console.error("Status code:", error.response.status)

    throw new Error(typeof message === 'string' ? message : "Error inesperado del servidor")
  } else if (error.request) {
    throw new Error("No se recibió respuesta del servidor. Verifica tu conexión o CORS.")
  } else {
    throw new Error(error.message || "Error desconocido al configurar la petición")
  }
}
