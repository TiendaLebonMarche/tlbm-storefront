"use client"

import { trackWhatsAppClick } from "@lib/util/analytics"
import { usePathname } from "next/navigation"

const WHATSAPP_NUMBER = "573027567783"

interface WhatsAppButtonProps {
  message?: string
  label?: string
  subtitle?: string
  size?: "sm" | "md" | "lg"
  variant?: "pill" | "inline"
  className?: string
}

const defaultMessages: Record<string, string> = {
  default: "Holaa, vengo de la tienda Tienda Le Bon Marché, me gustaría recibir asesoría.",
  product: "Holaa, vi un producto en Tienda Le Bon Marché y me gustaría saber más detalles antes de comprar.",
  cart: "Holaa, estoy viendo mi carrito en Tienda Le Bon Marché y tengo algunas dudas antes de finalizar mi compra.",
  checkout: "Holaa, estoy en el checkout de Tienda Le Bon Marché y necesito ayuda con mi pedido.",
  shipping: "Holaa, quisiera saber sobre opciones de envío para mi pedido en Tienda Le Bon Marché.",
  help: "Holaa, vengo de Tienda Le Bon Marché y necesito ayuda.",
}

const WhatsAppButton = ({
  message = "default",
  label = "Escríbenos",
  subtitle,
  size = "md",
  variant = "pill",
  className = "",
}: WhatsAppButtonProps) => {
  const pathname = usePathname()

  const text = encodeURIComponent(defaultMessages[message] || defaultMessages.default)

  const sizes = {
    sm: "text-xs gap-1.5 py-1.5 px-3",
    md: "text-sm gap-2 py-2.5 px-5",
    lg: "text-base gap-2.5 py-3 px-6",
  }

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  if (variant === "inline") {
    return (
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(pathname)}
        className={`inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 group ${className}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>{label}</span>
      </a>
    )
  }

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(pathname)}
      className={`inline-flex items-center justify-center ${sizes[size]} rounded-full font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg group relative overflow-hidden ${className}`}
      style={{ backgroundColor: "#25D366" }}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {/* Icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${iconSizes[size]} relative z-10`}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {/* Label */}
      <span className="relative z-10">{label}</span>
      {subtitle && <span className="relative z-10 text-white/80 text-[10px] ml-1 hidden sm:inline">· {subtitle}</span>}
    </a>
  )
}

export default WhatsAppButton
