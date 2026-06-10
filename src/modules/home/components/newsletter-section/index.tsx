"use client"

import { FormEvent, useState } from "react"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Aquí se integraría con tu servicio de email
    console.log("Suscripción:", email)
    setIsSubmitted(true)
    setEmail("")
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section className="w-full bg-brand-gray-light text-brand-black pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden relative">
      <div className="content-container px-4 md:px-8 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Header */}
          <span className="text-brand-black font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
            Novedades Exclusivas
          </span>
          
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6 leading-tight max-w-lg mx-auto">
            Únete a los clientes VIP que ya reciben en Colombia nuestra selección privada
          </h2>
          
          <p className="text-brand-gray text-sm md:text-base max-w-md mx-auto mb-10 font-normal leading-relaxed">
            Suscríbete y recibe acceso prioritario a piezas raras antes de que se agoten, además de un <span className="font-bold underline decoration-brand-olive underline-offset-4">15% de descuento</span> en tu primera compra.
          </p>

          {/* Form */}
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 mb-8"
            data-mcp-toolname="subscribe-newsletter"
            data-mcp-tooldescription="Subscribe to the Le Bon Marché VIP newsletter for exclusive products and discounts"
          >
            <input
              type="email"
              aria-label="Correo electrónico para suscripción"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-full px-8 py-4 bg-white border border-brand-gray-light placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-brand-black transition-all shadow-sm"
            />
            <button
              type="submit"
              className="pill-button bg-brand-black text-white hover:bg-brand-black transition-all"
            >
              Suscribir
            </button>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <p className="text-brand-black text-sm font-bold mb-6 transition-all">
              ✓ ¡Gracias! Revisa tu email para el beneficio exclusivo.
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-[10px] text-brand-black/50 font-medium tracking-wide">
            Al suscribirte, aceptas nuestra política de privacidad.
          </p>

        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
