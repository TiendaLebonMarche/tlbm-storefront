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
    <section className="w-full bg-brand-black text-white py-20 md:py-32 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
      </div>

      <div className="content-container px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block animate-pulse">
            Exclusividad Total
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-4 leading-tight">
            Acceso VIP a <br />Ofertas Exclusivas
          </h2>
          
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-12 font-light leading-relaxed">
            Suscríbete a nuestro newsletter y recibe un <span className="text-brand-gold font-bold">descuento del 15%</span> en tu próxima compra. Además, serás el primero en conocer lanzamientos y colecciones limitadas.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-0 mb-6">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-3 md:py-4 bg-white text-brand-black placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <button
              type="submit"
              className="px-8 md:px-12 py-3 md:py-4 bg-brand-gold text-brand-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-300 whitespace-nowrap"
            >
              Suscribir
            </button>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <p className="text-brand-gold text-sm font-bold mb-6 animate-pulse">
              ✓ ¡Bienvenido! Revisa tu email para el código de descuento (15% OFF)
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-[9px] text-gray-500 font-light">
            Respetamos tu privacidad. Desuscríbete en cualquier momento.
          </p>

          {/* Benefits */}
          <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-6">
            <div>
              <p className="text-xl mb-2">📧</p>
              <p className="text-[10px] font-bold uppercase tracking-widest">Ofertas Semanales</p>
            </div>
            <div>
              <p className="text-xl mb-2">🎁</p>
              <p className="text-[10px] font-bold uppercase tracking-widest">15% Descuento</p>
            </div>
            <div>
              <p className="text-xl mb-2">⭐</p>
              <p className="text-[10px] font-bold uppercase tracking-widest">Acceso Exclusivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
