"use client"

import { useState, useEffect } from "react"
import { trackWhatsAppClick } from "@lib/util/analytics"
import { usePathname } from "next/navigation"

const WHATSAPP_NUMBER = "573027567783"

export const WhatsAppHelpButton = () => {
  const pathname = usePathname()
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const text = encodeURIComponent(
    `Hola, estaba viendo este producto en Tienda Le Bon Marché y tengo una consulta:\n${url || `https://tiendalebonmarche.com${pathname}`}`
  )

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(pathname)}
      className="relative overflow-hidden group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-emerald-500/25"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#25D366" }} />
      {/* Icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 relative z-10">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="relative z-10">¿Dudas? Pregúntanos</span>
    </a>
  )
}

export const WhatsAppCTABuy = () => {
  const pathname = usePathname()
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const text = encodeURIComponent(
    `Hola, quiero comprar este producto de Tienda Le Bon Marché pero prefiero pagar por transferencia/efectivo:\n${url || `https://tiendalebonmarche.com${pathname}`}`
  )

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(pathname)}
      className="relative overflow-hidden group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-white text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-emerald-500/30 w-full justify-center"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      {/* Icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 relative z-10">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="relative z-10 flex flex-col items-start">
        <span>Compra por WhatsApp</span>
        <span className="text-[10px] font-normal text-white/70 tracking-normal">Transferencia · Efectivo · Asesoría</span>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform ml-auto">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
  )
}
