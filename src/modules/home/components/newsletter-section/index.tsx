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
    <section className="w-full bg-brand-soft text-brand-brown pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden relative">
      <div className="content-container px-4 md:px-8 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Header */}
          <span className="text-brand-olive font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
            Novedades Exclusivas
          </span>
          
          <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 leading-tight">
            Únete a la Comunidad
          </h2>
          
          <p className="text-brand-gray text-sm md:text-base max-w-md mx-auto mb-10 font-normal leading-relaxed">
            Suscríbete para recibir actualizaciones sobre nuevas colecciones, eventos exclusivos y un <span className="font-bold underline decoration-brand-olive underline-offset-4">15% de descuento</span> en tu primer pedido.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 mb-6 border-b border-brand-brown/20 pb-2 group focus-within:border-brand-olive transition-colors">
            <input
              type="email"
              placeholder="Tu dirección de correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-transparent text-brand-brown placeholder-brand-brown/40 text-sm outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 text-brand-brown font-bold uppercase text-[10px] tracking-[0.3em] hover:text-brand-olive transition-colors whitespace-nowrap"
            >
              Suscribir
            </button>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <p className="text-brand-olive text-sm font-bold mb-6 transition-all">
              ✓ ¡Gracias! Revisa tu email para el beneficio exclusivo.
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-[10px] text-brand-brown/50 font-medium tracking-wide">
            Al suscribirte, aceptas nuestra política de privacidad.
          </p>

        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
