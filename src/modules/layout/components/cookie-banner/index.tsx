"use client"

import { useState, useEffect } from "react"
import { Button } from "@medusajs/ui"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem("tlbm_cookies_accepted")
    if (!hasAccepted) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("tlbm_cookies_accepted", "true")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none flex justify-center"
        >
          <div className="w-full max-w-4xl bg-[#322214]/95 backdrop-blur-xl shadow-2xl rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pointer-events-auto border border-white/10">
            <div className="flex-1 space-y-3">
              <h3 className="text-white font-serif text-lg font-bold leading-none">Transparencia y Privacidad (Habeas Data)</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-2xl">
                Usamos <strong>cookies técnicas</strong> esenciales para el carrito de compras. Además, aplicamos <strong>Inteligencia Artificial</strong> en tiempo real para rastrear precios y garantizarte la oferta más justa globalmente. Al continuar, aceptas nuestro manejo ético de datos protegido con cifrado SSL.
              </p>
            </div>
            <div className="flex-shrink-0 flex gap-3 w-full md:w-auto">
              <Button 
                variant="secondary" 
                className="w-full md:w-auto bg-transparent border-white/20 text-white hover:bg-white/10"
                onClick={() => window.location.href = '/legal/privacidad'}
              >
                Saber más
              </Button>
              <Button 
                className="w-full md:w-auto bg-[#50652a] text-white outline-none ring-0 focus:ring-0 border-0 shadow-lg shadow-black/20 hover:bg-[#6a8435] transition-colors"
                onClick={handleAccept}
              >
                Aceptar todo
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
