import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  // Datos con fallback — si la API falla no se cae el footer
  let collections: any[] = []
  let productCategories: any[] = []
  
  try {
    const result = await listCollections({ fields: "*products" })
    collections = result?.collections || []
  } catch (e) {
    console.warn("[Footer] Error loading collections:", e)
  }
  
  try {
    productCategories = (await listCategories()) || []
  } catch (e) {
    console.warn("[Footer] Error loading categories:", e)
  }

  return (
    <footer className="bg-[#08080C] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-14 reveal">
          {/* Brand */}
          <div>
            <LocalizedClientLink href="/" className="inline-block mb-6">
              <div className="relative w-[160px] md:w-[220px] h-[44px] md:h-[60px]">
                <Image
                  src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1784320861/logo-julio_nezqqe.png"
                  alt="Tienda Le Bon Marché"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </LocalizedClientLink>
            <p className="text-sm leading-relaxed max-w-xs text-white/90 mb-6">
              Selección exclusiva de tecnología, gadgets y accesorios de lujo. Curados con pasión desde Bucaramanga para toda Colombia.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/20 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">IG</a>
              <a href="https://facebook.com/tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/20 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">FB</a>
              <a href="https://tiktok.com/@tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/20 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">TT</a>
              <a href="https://wa.me/573027567783" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/20 text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">WA</a>
            </div>
          </div>

          {/* Colección */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[.35em] mb-8 text-white">Colección</h4>
            <ul className="space-y-3">
              {collections.length > 0 ? (
                collections.slice(0, 5).map((c: any) => (
                  <li key={c.id}>
                    <LocalizedClientLink href={`/collections/${c.handle}`} className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))
              ) : (
                <>
                  <li><LocalizedClientLink href="/store" className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Catálogo</LocalizedClientLink></li>
                  <li><LocalizedClientLink href="/store" className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Novedades</LocalizedClientLink></li>
                </>
              )}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[.35em] mb-8 text-white">Ayuda</h4>
            <ul className="space-y-3">
              <li><LocalizedClientLink href="/legal/envios" className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Envíos</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/legal/devoluciones" className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Devoluciones</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/legal/terminos" className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Términos</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/legal/privacidad" className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Privacidad</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/legal/terminos" className="text-sm text-white hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">FAQ</LocalizedClientLink></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[.35em] mb-8 text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="text-sm text-white">Bucaramanga, Santander</li>
              <li><a href="mailto:info@tiendalebonmarche.com" className="text-sm text-white hover:text-[#D4AF37] transition-colors duration-300">info@tiendalebonmarche.com</a></li>
              <li><a href="https://wa.me/573027567783" className="text-sm text-white hover:text-[#D4AF37] transition-colors duration-300">+57 302 756 7783</a></li>
              <li className="mt-8">
                <div className="text-[10px] font-bold uppercase tracking-[.25em] text-white/70 mb-3">Newsletter</div>
                <div className="flex">
                  <input type="email" placeholder="tu@email.com" className="bg-white/10 border border-white/30 rounded-l-full px-5 py-3 text-sm text-white placeholder-white/60 outline-none flex-1 focus:border-[#D4AF37]/40 transition-colors duration-300 min-h-[48px]" style={{ caretColor: "#D4AF37" }} />
                  <button className="px-6 py-3 rounded-r-full text-[10px] font-bold uppercase tracking-[.18em] border-none cursor-pointer text-white bg-[#D4AF37] hover:bg-[#D4AF37]/80 transition-all duration-300 min-h-[48px]">→</button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-[11px]">© {new Date().getFullYear()} Le Bon Marché. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <div className="flex gap-4 text-white/70 text-[10px]">
              <span>Emprendimiento de Bucaramanga, Col</span>
              <span>·</span>
              <span>100% Original Garantizado</span>
            </div>
            <div className="flex gap-2.5">
              <span className="w-8 h-6 rounded flex items-center justify-center bg-white/15 text-white text-[8px] font-bold">Nequi</span>
              <span className="w-8 h-6 rounded flex items-center justify-center bg-white/15 text-white text-[8px] font-bold">Davi</span>
              <span className="w-8 h-6 rounded flex items-center justify-center bg-white/15 text-white text-[8px] font-bold">Visa</span>
              <span className="w-8 h-6 rounded flex items-center justify-center bg-white/15 text-white text-[8px] font-bold">Mst</span>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark — full-width sin causar overflow */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden mt-14 pointer-events-none select-none">
        <p className="font-serif text-center whitespace-nowrap leading-none tracking-[-.02em] text-white/8" style={{ fontSize: "clamp(2.5rem,12vw,10rem)", fontWeight: 700 }}>
          LE BON MARCHÉ
        </p>
      </div>
    </footer>
  )
}
