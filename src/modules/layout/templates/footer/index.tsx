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
      
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-12">
        <div className="flex flex-col gap-y-8">
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
            Una selección exclusiva de productos exóticos, tecnología y piezas de lujo pensada para los más exigentes. Hecho con pasión en Bucaramanga para toda Colombia.
          </p>
          <div className="flex gap-x-8 text-[11px] font-bold tracking-[0.2em] text-brand-brown opacity-60">
            <a href="https://instagram.com/tiendalebonmarche" className="hover:opacity-100 transition-opacity" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <a href="#" className="hover:opacity-100 transition-opacity">FACEBOOK</a>
            <a href="#" className="hover:opacity-100 transition-opacity">TIKTOK</a>
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
            Ayuda & Soporte
          </h4>
          <ul className="space-y-4 text-sm font-medium text-brand-brown">
            <li><LocalizedClientLink href="/store" className="hover:text-brand-olive transition-colors">Envíos & Entregas</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-brand-olive transition-colors">Garantías</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-brand-olive transition-colors">Términos de Servicio</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store" className="hover:text-brand-olive transition-colors">Contacto</LocalizedClientLink></li>
          </ul>
        </div>

        <div className="flex flex-col gap-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-brand-brown opacity-40">
            Atención VIP por WhatsApp
          </h4>
          <p className="text-brand-gray text-xs leading-relaxed max-w-[200px] mb-2">
            Un gusto saludarte. ¿Buscas algo muy exclusivo o un libro de colección? Escríbenos y nos encargamos de traértelo.
          </p>
          <a href="https://wa.me/573027567783" className="text-lg font-sans font-bold text-brand-brown hover:text-brand-olive transition-colors" target="_blank" rel="noreferrer">
            +57 302 756 7783
          </a>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-y-6">
        <div className="text-[10px] text-brand-gray font-medium tracking-[0.1em] opacity-60">
          &copy; {new Date().getFullYear()} TIENDA LE BON MARCHÉ. TODOS LOS DERECHOS RESERVADOS.
        </div>
        <div className="flex gap-x-8 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-brown opacity-60">
          <LocalizedClientLink href="/store" className="hover:opacity-100 transition-opacity">POLÍTICA DE PRIVACIDAD</LocalizedClientLink>
          <LocalizedClientLink href="/store" className="hover:opacity-100 transition-opacity">FAQ</LocalizedClientLink>
        </div>
      </div>
    </footer>
  )
}
