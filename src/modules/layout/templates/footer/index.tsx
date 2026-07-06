import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  return (
    <footer className="bg-[#08080C] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-14 reveal">
          {/* Brand */}
          <div>
            <LocalizedClientLink href="/" className="flex items-center gap-3 mb-6 group">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#D4AF37,#C8912E)" }}
              >
                <span className="text-[#0A0A0F] text-xs font-black tracking-wider">LBM</span>
              </div>
              <span className="text-sm font-bold tracking-tight text-white/80">LE BON MARCHÉ</span>
            </LocalizedClientLink>
            <p className="text-sm leading-relaxed max-w-xs font-light text-white/20 mb-6">
              Selección exclusiva de tecnología, gadgets y accesorios de lujo. Curados con pasión desde Bucaramanga para toda Colombia.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/10 text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">IG</a>
              <a href="https://facebook.com/tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/10 text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">FB</a>
              <a href="https://tiktok.com/@tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/10 text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">TT</a>
              <a href="https://wa.me/573027567783" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/10 text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110">WA</a>
            </div>
          </div>

          {/* Colección */}
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[.35em] mb-8 text-white/15">Colección</h4>
            <ul className="space-y-3.5">
              {collections && collections.length > 0 ? (
                collections.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <LocalizedClientLink
                      href={`/collections/${c.handle}`}
                      className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {c.title}
                    </LocalizedClientLink>
                  </li>
                ))
              ) : (
                <>
                  <li><LocalizedClientLink href="/store" className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Catálogo</LocalizedClientLink></li>
                  <li><LocalizedClientLink href="/store" className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Novedades</LocalizedClientLink></li>
                </>
              )}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[.35em] mb-8 text-white/15">Ayuda</h4>
            <ul className="space-y-3.5">
              <li><LocalizedClientLink href="/legal/envios" className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Envíos</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/legal/devoluciones" className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Devoluciones</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/legal/terminos" className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Términos</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/legal/privacidad" className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">Privacidad</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/store" className="text-sm text-white/30 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block">FAQ</LocalizedClientLink></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-[.35em] mb-8 text-white/15">Contacto</h4>
            <ul className="space-y-3.5">
              <li className="text-sm text-white/30">Bucaramanga, Santander</li>
              <li><a href="mailto:hola@tiendalebonmarche.com" className="text-sm text-white/30 hover:text-[#D4AF37] transition-colors duration-300">hola@tiendalebonmarche.com</a></li>
              <li><a href="https://wa.me/573027567783" className="text-sm text-white/30 hover:text-[#D4AF37] transition-colors duration-300">+57 302 756 7783</a></li>
              <li className="mt-8">
                <div className="text-[9px] font-bold uppercase tracking-[.25em] text-white/15 mb-3">Newsletter</div>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="bg-white/[0.03] border border-white/10 rounded-l-full px-4 py-2.5 text-xs text-white/60 placeholder-white/20 outline-none flex-1 focus:border-[#D4AF37]/40 transition-colors duration-300"
                    style={{ caretColor: "#D4AF37" }}
                  />
                  <button
                    className="btn-shine text-[#0A0A0F] px-5 py-2.5 rounded-r-full text-[9px] font-bold uppercase tracking-[.18em] border-none cursor-pointer"
                    style={{ background: "linear-gradient(135deg,#D4AF37,#C8912E)" }}
                  >
                    OK
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/12 text-[10px]">© {new Date().getFullYear()} Le Bon Marché. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <div className="flex gap-4 text-white/12 text-[9px]">
              <span>Emprendimiento de Bucaramanga, Col</span>
              <span>·</span>
              <span>100% Original Garantizado</span>
            </div>
            <div className="flex gap-2.5">
              <span className="w-7 h-5 rounded flex items-center justify-center bg-white/5 text-white/20 text-[7px] font-bold">Nequi</span>
              <span className="w-7 h-5 rounded flex items-center justify-center bg-white/5 text-white/20 text-[7px] font-bold">Davi</span>
              <span className="w-7 h-5 rounded flex items-center justify-center bg-white/5 text-white/20 text-[7px] font-bold">Visa</span>
              <span className="w-7 h-5 rounded flex items-center justify-center bg-white/5 text-white/20 text-[7px] font-bold">Mst</span>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="w-full overflow-hidden mt-14 pointer-events-none select-none">
        <p
          className="font-serif text-center whitespace-nowrap leading-none tracking-[-.02em]"
          style={{
            fontSize: "clamp(4rem,16vw,14rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,.03)",
          }}
        >
          LE BON MARCHÉ
        </p>
      </div>
    </footer>
  )
}
