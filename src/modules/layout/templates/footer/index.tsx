import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-white text-brand-brown pt-12 pb-12 md:pt-20 md:pb-16 px-6 mt-auto border-t border-gray-100">
      
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-24 mb-6">
        <div className="flex flex-col gap-y-8">
          <LocalizedClientLink 
            href="/" 
            className="flex items-center justify-start hover:opacity-70 transition-all duration-300"
          >
            <Image 
              src="https://res.cloudinary.com/dgo9tm9e2/image/upload/v1780690110/logo-junio-negro_cyhwth.png"
              alt="Tienda Le Bon Marché" 
              width={1822} 
              height={548} 
              className="w-[200px] md:w-[260px] lg:w-[300px] h-auto object-contain"
            />
          </LocalizedClientLink>
          <p className="text-brand-gray text-sm leading-relaxed max-w-xs font-normal">
            Una selección exclusiva de productos exóticos, tecnología y piezas de lujo pensada para los más exigentes. Hecho con pasión en Bucaramanga para toda Colombia.
          </p>
          <div className="flex gap-x-8 text-[11px] font-bold tracking-[0.2em] text-brand-brown opacity-60">
            <a href="https://instagram.com/tiendalebonmarche" className="hover:opacity-100 transition-opacity" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <a href="https://facebook.com/tiendalebonmarche" className="hover:opacity-100 transition-opacity" target="_blank" rel="noreferrer">FACEBOOK</a>
            <a href="https://tiktok.com/@tiendalebonmarche" className="hover:opacity-100 transition-opacity" target="_blank" rel="noreferrer">TIKTOK</a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-brand-brown opacity-40">
            Colección
          </h4>
          <ul className="space-y-4 text-sm font-medium text-brand-brown">
            {collections && collections.length > 0 ? (
              collections.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink className="hover:text-brand-olive transition-colors duration-300" href={`/collections/${c.handle}`}>
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))
            ) : (
              <>
                <li><LocalizedClientLink href="/store" className="hover:text-brand-olive transition-colors">Catálogo Completo</LocalizedClientLink></li>
                <li><LocalizedClientLink href="/store" className="hover:text-brand-olive transition-colors">Novedades</LocalizedClientLink></li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-brand-brown opacity-40">
            Legal & Soporte
          </h4>
          <ul className="space-y-4 text-sm font-medium text-brand-brown">
            <li><LocalizedClientLink href="/legal/terminos" className="hover:text-brand-olive transition-colors">Términos y Condiciones</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/legal/privacidad" className="hover:text-brand-olive transition-colors">Privacidad y Habeas Data</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/legal/devoluciones" className="hover:text-brand-olive transition-colors">Garantías y Devoluciones</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/legal/envios" className="hover:text-brand-olive transition-colors">Envíos & Entregas</LocalizedClientLink></li>
          </ul>
        </div>

        <div className="flex flex-col gap-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-brand-brown opacity-40">
            Contacto & Empresa
          </h4>
          <div className="text-brand-gray text-xs leading-relaxed max-w-[250px] space-y-1">
            <p className="font-bold text-brand-brown">Tienda Le Bon Marché</p>
            <p>NIT: 901.000.000-X</p>
            <p>Bucaramanga, Santander, Colombia</p>
            <p className="mt-2"><a href="mailto:soporte@tiendalebonmarche.com" className="hover:text-brand-olive underline underline-offset-2">soporte@tiendalebonmarche.com</a></p>
          </div>
          <a href="https://wa.me/573027567783" className="text-xl mt-2 font-sans font-bold text-brand-brown hover:text-brand-olive transition-colors" target="_blank" rel="noreferrer">
            +57 302 756 7783
          </a>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-y-6">
        <div className="text-[10px] text-brand-gray font-medium tracking-[0.1em] opacity-60">
          &copy; {new Date().getFullYear()} TIENDA LE BON MARCHÉ. TODOS LOS DERECHOS RESERVADOS.
        </div>
        <div className="flex gap-x-8 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-brown opacity-60">
          <LocalizedClientLink href="/legal/privacidad" className="hover:opacity-100 transition-opacity">POLÍTICA DE PRIVACIDAD</LocalizedClientLink>
          <LocalizedClientLink href="/store" className="hover:opacity-100 transition-opacity">FAQ</LocalizedClientLink>
        </div>
      </div>
      <div id="footer-brand-text" className="w-full bg-white pt-6 pb-12 border-t border-gray-100 overflow-hidden reveal-up">
        <p className="text-[12.5vw] leading-[0.8] font-sans font-black tracking-[-0.07em] text-center w-full text-black uppercase whitespace-nowrap select-none" role="presentation">
          LEBONMARCHÉ
        </p>
      </div>
    </footer>
  )
}
