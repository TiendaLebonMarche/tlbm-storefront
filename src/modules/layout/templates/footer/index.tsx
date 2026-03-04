import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-6 mt-auto border-t border-brand-black/20">
      <div className="max-w-[95rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="flex flex-col gap-y-6">
          <h3 className="font-serif text-3xl text-white tracking-tight leading-none italic">
            Le <span className="text-brand-gold not-italic font-sans font-bold text-2xl tracking-widest uppercase ml-1">Bon Marché</span>
          </h3>
          <p className="text-gray-500 text-xs leading-loose max-w-sm uppercase tracking-wide font-medium">
            Rastreamos los productos más exóticos del mundo. Gadgets importados y piezas luxury a los mejores precios del mercado.
          </p>
          <div className="flex gap-x-6 text-[10px] font-bold tracking-[0.2em] text-gray-400">
            <a href="https://instagram.com/tiendalebonmarche" className="hover:text-brand-gold transition-all duration-300 transform hover:-translate-y-1" target="_blank" rel="noreferrer underline decoration-brand-gold underline-offset-8">INSTAGRAM</a>
            <a href="#" className="hover:text-brand-gold transition-all duration-300 transform hover:-translate-y-1">TIKTOK</a>
            <a href="#" className="hover:text-brand-gold transition-all duration-300 transform hover:-translate-y-1">FACEBOOK</a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-brand-gold/80 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-brand-gold/30"></span> COLECCIÓN
          </h4>
          <ul className="space-y-5 text-[11px] uppercase tracking-widest text-gray-500 font-medium">
            {collections && collections.length > 0 ? (
              collections.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink className="hover:text-white transition-colors duration-300 flex items-center gap-2 group" href={`/collections/${c.handle}`}>
                    <span className="w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-3"></span>
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))
            ) : (
              <>
                <li><LocalizedClientLink href="/store" className="hover:text-white transition-colors">Catálogo</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/store" className="hover:text-white transition-colors">Novedades</LocalizedClientLink></li>
              </>
            )}
            <li>
              <LocalizedClientLink href="/store" className="text-brand-gold hover:text-white transition-colors duration-300 pt-2 block">
                VER TODO EL CATÁLOGO
              </LocalizedClientLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-brand-gold/80 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-brand-gold/30"></span> SERVICIO
          </h4>
          <ul className="space-y-5 text-[11px] uppercase tracking-widest text-gray-500 font-medium">
            <li><LocalizedClientLink href="/store" className="hover:text-white transition">Garantías</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-white transition">Envíos Nacionales</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-white transition">Cambios y Devoluciones</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-white transition">Términos y Condiciones</LocalizedClientLink></li>
          </ul>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-brand-gold">EXCLUSIVO</h4>
          <p className="text-[10px] text-gray-400 mb-6 tracking-widest">ATENCIÓN PERSONALIZADA POR WHATSAPP</p>
          <a href="https://wa.me/573027567783" className="text-xl md:text-2xl font-serif text-white hover:text-brand-gold transition-all duration-500 block" target="_blank" rel="noreferrer">
            +57 302 756 7783
          </a>
          <span className="text-[9px] text-gray-600 tracking-[0.3em] font-medium block mt-6 cursor-default italic uppercase">Premium Concierge</span>
        </div>
      </div>

      <div className="max-w-[95rem] mx-auto border-t border-white/5 pt-12 flex flex-col items-center gap-y-6">
        <div className="flex gap-x-8 text-[9px] uppercase tracking-[0.3em] font-medium text-gray-700">
          <LocalizedClientLink href="/store" className="hover:text-white transition">Privacidad</LocalizedClientLink>
          <LocalizedClientLink href="/store" className="hover:text-white transition">Envío Internacional</LocalizedClientLink>
          <LocalizedClientLink href="/store" className="hover:text-white transition">FAQ</LocalizedClientLink>
        </div>
        <div className="text-[10px] text-gray-600 font-medium tracking-[0.2em]">
          &copy; {new Date().getFullYear()} <span className="text-gray-400">TIENDA LE BON MARCHÉ</span>. TODOS LOS DERECHOS RESERVADOS.
        </div>
      </div>
    </footer>
  )
}
