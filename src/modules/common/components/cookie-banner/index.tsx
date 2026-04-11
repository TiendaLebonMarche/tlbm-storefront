"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"

const COOKIE_KEY = "tlbm_cookie_consent"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Don't show on legal pages
    const legalPaths = [
      "/politica-de-privacidad",
      "/terminos-y-condiciones",
      "/politica-de-devoluciones",
    ]
    const isLegalPage = legalPaths.some((p) => pathname?.includes(p))
    if (isLegalPage) return

    try {
      const consent = localStorage.getItem(COOKIE_KEY)
      if (!consent) {
        // Small delay for elegance
        const timer = setTimeout(() => setVisible(true), 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage not available (SSR or private mode)
    }
  }, [pathname])

  const accept = (type: "all" | "essential") => {
    try {
      localStorage.setItem(
        COOKIE_KEY,
        JSON.stringify({
          accepted: type,
          date: new Date().toISOString(),
        })
      )
    } catch {
      // fallback silently
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
      className={`
        fixed bottom-0 left-0 right-0 z-[200]
        px-4 pb-4 pt-0
        sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:px-0 sm:pb-0
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div className="bg-brand-brown text-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-brand-olive to-[#8A9A86]" />

        <div className="p-5 sm:p-6">
          {/* Icon + Title */}
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl mt-0.5 flex-shrink-0" aria-hidden>🍪</span>
            <div>
              <h2
                id="cookie-banner-title"
                className="text-sm font-bold text-white leading-snug"
              >
                Usamos cookies
              </h2>
              <p className="text-xs text-white/70 leading-relaxed mt-1">
                Usamos cookies técnicas (esenciales para el carrito y la sesión)
                y analíticas (para mejorar tu experiencia). Puedes elegir qué
                aceptar.
              </p>
            </div>
          </div>

          {/* Link */}
          <p className="text-[11px] text-white/50 mb-4">
            Más info en nuestra{" "}
            <LocalizedClientLink
              href="/politica-de-privacidad#cookies"
              className="underline text-white/70 hover:text-white transition-colors"
            >
              Política de Privacidad
            </LocalizedClientLink>
            .
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button
              id="cookie-accept-all"
              onClick={() => accept("all")}
              className="w-full bg-white text-brand-brown text-xs font-bold py-3 px-4 rounded-xl hover:bg-brand-olive hover:text-white transition-all duration-300 active:scale-[0.98]"
            >
              Aceptar todas las cookies
            </button>
            <button
              id="cookie-accept-essential"
              onClick={() => accept("essential")}
              className="w-full bg-transparent border border-white/30 text-white/80 text-xs font-medium py-2.5 px-4 rounded-xl hover:border-white/60 hover:text-white transition-all duration-300 active:scale-[0.98]"
            >
              Solo esenciales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
