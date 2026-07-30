import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import NewsletterForm from "./newsletter-form"

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
              <a href="https://instagram.com/tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com/tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://tiktok.com/@tiendalebonmarche" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110" title="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://wa.me/573027567783" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-[#D4AF37] border border-white/20 hover:border-[#D4AF37]/40 transition-all duration-300 hover:scale-110" title="WhatsApp">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
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
                <NewsletterForm />
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
            <div className="flex gap-2.5 items-center flex-wrap justify-center">
              <span className="w-[60px] h-[34px] rounded-md flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/20 border border-gray-200/50 hover:border-[#D4AF37]/20 p-1.5" title="Nequi">
                <img src="/payments/nequi.svg" alt="Nequi" className="h-5 w-auto object-contain" loading="lazy" />
              </span>
              <span className="w-[60px] h-[34px] rounded-md flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/20 border border-gray-200/50 hover:border-[#D4AF37]/20 p-1.5" title="Mercado Pago">
                <img src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785444639/mercadopago_xx7b9e.svg" alt="Mercado Pago" className="h-5 w-auto object-contain" loading="lazy" />
              </span>
              <span className="w-[60px] h-[34px] rounded-md flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/20 border border-gray-200/50 hover:border-[#D4AF37]/20 p-1.5" title="Mastercard">
                <img src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785444639/mastercard_gfpcyy.svg" alt="Mastercard" className="h-5 w-auto object-contain" loading="lazy" />
              </span>
              <span className="w-[60px] h-[34px] rounded-md flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/20 border border-gray-200/50 hover:border-[#D4AF37]/20 p-1.5" title="Daviplata">
                <img src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785444639/daviplata_oiquqy.svg" alt="Daviplata" className="h-5 w-auto object-contain" loading="lazy" />
              </span>
              <span className="w-[60px] h-[34px] rounded-md flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/20 border border-gray-200/50 hover:border-[#D4AF37]/20 p-1.5" title="PSE Colombia">
                <img src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785444639/pse-logo_wxdnoy.png" alt="PSE Colombia" className="h-5 w-auto object-contain" loading="lazy" />
              </span>
              <span className="w-[60px] h-[34px] rounded-md flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/20 border border-gray-200/50 hover:border-[#D4AF37]/20 p-1.5" title="Bre-B">
                <img src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785444639/Bre-B_dhmaex.svg" alt="Bre-B" className="h-5 w-auto object-contain" loading="lazy" />
              </span>
              <span className="w-[60px] h-[34px] rounded-md flex items-center justify-center bg-white hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#D4AF37]/20 border border-gray-200/50 hover:border-[#D4AF37]/20 p-1.5" title="Binance">
                <img src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1785444639/Binance_logo_zbndn0.svg" alt="Binance" className="h-5 w-auto object-contain" loading="lazy" />
              </span>
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
