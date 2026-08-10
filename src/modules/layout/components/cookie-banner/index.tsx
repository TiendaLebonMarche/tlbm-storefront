"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem("tlbm_cookies_accepted")
    if (!hasAccepted) {
      // Longer delay so user sees content first
      const timer = setTimeout(() => setIsVisible(true), 3000)
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
          className="fixed bottom-0 left-0 right-0 z-[500] px-3 pb-3 md:px-4 md:pb-4 pointer-events-none flex justify-center"
        >
          <div className="w-full max-w-3xl bg-brand-black/90 backdrop-blur-xl shadow-2xl rounded-sm p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-auto border border-white/10">
            <div className="flex-1 space-y-1.5">
              <p className="text-white/80 text-[11px] md:text-xs leading-relaxed">
                Usamos cookies técnicas esenciales para el carrito. Al continuar, aceptas nuestro manejo ético de datos protegido con cifrado SSL.
              </p>
            </div>
            <div className="flex-shrink-0 flex gap-2 w-full md:w-auto">
              <LocalizedClientLink
                href="/legal/privacidad"
                className="w-full md:w-auto bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-[11px] font-semibold uppercase tracking-wider px-4 min-h-[48px] flex items-center justify-center transition-all duration-300"
              >
                Privacidad
              </LocalizedClientLink>
              <button 
                className="w-full md:w-auto bg-white text-brand-black text-[11px] font-bold uppercase tracking-wider px-5 min-h-[48px] flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
                onClick={handleAccept}
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
