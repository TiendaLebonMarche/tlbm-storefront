"use client"

import { useState, FormEvent } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setMessage("Correo inválido")
      return
    }
    // Por ahora solo feedback visual — luego se conecta a API
    setStatus("success")
    setMessage("¡Gracias por suscribirte!")
    setEmail("")
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="bg-white/10 border border-white/30 rounded-l-full px-5 py-3 text-sm text-white placeholder-white/60 outline-hidden flex-1 focus:border-[#D4AF37]/40 transition-colors duration-300 min-h-[48px]"
          style={{ caretColor: "#D4AF37" }}
          aria-label="Correo electrónico"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-r-full text-[10px] font-bold uppercase tracking-[.18em] border-none cursor-pointer text-white bg-[#D4AF37] hover:bg-[#D4AF37]/80 transition-all duration-300 min-h-[48px]"
        >
          →
        </button>
      </div>
      {status !== "idle" && (
        <span className={`text-[10px] font-medium ${status === "success" ? "text-green-400" : "text-red-400"}`}>
          {message}
        </span>
      )}
    </form>
  )
}
