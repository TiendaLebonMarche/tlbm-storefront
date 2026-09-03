import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-64px)] bg-white px-6 text-center">
      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-black">
        Error 404
      </span>
      <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-brand-black leading-none">
        No encontrado
      </h1>
      <span className="w-12 h-[2px] bg-gold rounded-full" />
      <p className="text-brand-gray text-sm font-light max-w-sm leading-relaxed">
        La página o producto que buscas no existe o fue removido. Explora nuestro catálogo completo.
      </p>
      <div className="flex gap-4 mt-4 flex-wrap justify-center">
        <LocalizedClientLink
          href="/store"
          className="px-8 py-3 bg-brand-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-black transition-colors duration-300"
        >
          Ver Tienda
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/"
          className="px-8 py-3 border border-brand-black text-brand-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-black hover:text-white transition-all duration-300"
        >
          Ir al inicio
        </LocalizedClientLink>
      </div>
    </div>
  )
}
