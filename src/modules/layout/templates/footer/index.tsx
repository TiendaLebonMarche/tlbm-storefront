import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-white text-brand-brown pt-12 pb-10 md:pt-20 md:pb-14 px-6 mt-auto border-t border-gray-100">

      {/* ── MAIN GRID ─────────────────────────────────────────────────── */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">

        {/* Col 1: Brand */}
        <div className="flex flex-col gap-y-6">
          <LocalizedClientLink
            href="/"
            className="flex items-center justify-start hover:opacity-70 transition-all duration-300"
          >
            <Image
              src="/logo.png"
              alt="Tienda Le Bon Marché"
              width={180}
              height={50}
              className="logo-img h-10 md:h-12 w-auto object-contain"
            />
          </LocalizedClientLink>
          <p className="text-brand-gray text-sm leading-relaxed max-w-xs font-normal">
            Una selección exclusiva de productos exóticos, tecnología y piezas
            de lujo pensada para los más exigentes. Hecho con pasión en
            Bucaramanga para toda Colombia.
          </p>

          {/* Social */}
          <div className="flex gap-x-6 text-[11px] font-bold tracking-[0.2em] text-brand-brown opacity-60">
            <a
              href="https://instagram.com/tiendalebonmarche"
              className="hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Tienda Le Bon Marché"
            >
              INSTAGRAM
            </a>
            <a
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="Facebook de Tienda Le Bon Marché"
            >
              FACEBOOK
            </a>
            <a
              href="#"
              className="hover:opacity-100 transition-opacity"
              aria-label="TikTok de Tienda Le Bon Marché"
            >
              TIKTOK
            </a>
          </div>
        </div>

        {/* Col 2: Colección */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-brand-brown opacity-40">
            Colección
          </h4>
          <ul className="space-y-4 text-sm font-medium text-brand-brown">
            {collections && collections.length > 0 ? (
              collections.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    className="hover:text-brand-olive transition-colors duration-300"
                    href={`/collections/${c.handle}`}
                  >
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))
            ) : (
              <>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-brand-olive transition-colors"
                  >
                    Catálogo Completo
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-brand-olive transition-colors"
                  >
                    Novedades
                  </LocalizedClientLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Col 3: Ayuda & Legal */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-brand-brown opacity-40">
            Ayuda &amp; Legal
          </h4>
          <ul className="space-y-4 text-sm font-medium text-brand-brown">
            <li>
              <LocalizedClientLink
                href="/politica-de-devoluciones"
                className="hover:text-brand-olive transition-colors"
              >
                Devoluciones &amp; Garantías
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/terminos-y-condiciones"
                className="hover:text-brand-olive transition-colors"
              >
                Términos y Condiciones
              </LocalizedClientLink>
            </li>
            <li>
              <LocalizedClientLink
                href="/politica-de-privacidad"
                className="hover:text-brand-olive transition-colors"
              >
                Política de Privacidad
              </LocalizedClientLink>
            </li>
            <li>
              <a
                href="https://www.sic.gov.co"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-olive transition-colors opacity-70 hover:opacity-100"
                aria-label="Superintendencia de Industria y Comercio - Colombia"
              >
                SIC Colombia ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: WhatsApp VIP */}
        <div className="flex flex-col gap-y-5">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-0 text-brand-brown opacity-40">
            Atención VIP por WhatsApp
          </h4>
          <p className="text-brand-gray text-xs leading-relaxed max-w-[220px]">
            ¿Buscas algo muy exclusivo o un libro de colección? Escríbenos y nos
            encargamos de traértelo.
          </p>
          <a
            href="https://wa.me/573027567783"
            className="text-lg font-sans font-bold text-brand-brown hover:text-brand-olive transition-colors"
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
          >
            +57 302 756 7783
          </a>
          <p className="text-[11px] text-brand-gray opacity-60 leading-relaxed">
            📧 hola@tiendalebonmarche.com
          </p>
        </div>
      </div>

      {/* ── LEGAL BOTTOM BAR ──────────────────────────────────────────── */}
      <div className="max-w-[90rem] mx-auto border-t border-gray-100 pt-8 space-y-4">

        {/* Legal Info Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] text-brand-gray opacity-60">
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-medium tracking-wide">
            <span>📍 Conjunto Oasis de Mardel, Real de minas, Bucaramanga</span>
            <span className="hidden sm:inline">·</span>
            <span>NIT: [Ingresa tu NIT aquí]</span>
            <span className="hidden sm:inline">·</span>
            <span>✉ hola@tiendalebonmarche.com</span>
            <span className="hidden sm:inline">·</span>
            <span>🔒 Sitio protegido con SSL/HTTPS</span>
          </div>
          <a
            href="https://www.sic.gov.co"
            target="_blank"
            rel="noreferrer"
            className="text-brand-gray hover:opacity-100 transition-opacity font-medium underline underline-offset-2"
            aria-label="Superintendencia de Industria y Comercio Colombia"
          >
            Consumidor protegido por la SIC
          </a>
        </div>

        {/* Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4">
          <div className="text-[10px] text-brand-gray font-medium tracking-[0.1em] opacity-60">
            &copy; {new Date().getFullYear()} TIENDA LE BON MARCHÉ. TODOS LOS
            DERECHOS RESERVADOS. · Ley 1480/2011 · Ley 1581/2012
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-brown opacity-60">
            <LocalizedClientLink
              href="/politica-de-privacidad"
              className="hover:opacity-100 transition-opacity"
            >
              Privacidad
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/terminos-y-condiciones"
              className="hover:opacity-100 transition-opacity"
            >
              Términos
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/politica-de-devoluciones"
              className="hover:opacity-100 transition-opacity"
            >
              Devoluciones
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
